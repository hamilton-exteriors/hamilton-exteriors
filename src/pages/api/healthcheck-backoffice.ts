import type { APIRoute } from 'astro';

/**
 * GET /api/healthcheck-backoffice — pings BackOffice and reports status.
 *
 * Point an external uptime monitor (UptimeRobot, BetterStack, etc.) at this
 * endpoint. Returns 200 when BackOffice is healthy, 503 when the Supabase
 * project is paused or the service is down — the same failure mode that
 * silently dropped a real lead on 2026-04-23.
 *
 * On failure, emails admin@ via Resend so we hear about outages even without
 * an external monitor configured.
 */

const BACKOFFICE_URL = 'https://backoffice-production-99b7.up.railway.app/';
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || '';

interface HealthcheckResult {
  ok: boolean;
  status: number;
  auth?: string;
  error?: string;
  checkedAt: string;
}

export const GET: APIRoute = async () => {
  const result = await checkBackOffice();

  if (!result.ok && RESEND_API_KEY) {
    try {
      await notifyOutage(result);
    } catch (err) {
      console.error('[healthcheck] Failed to send outage email:', (err as Error).message);
    }
  }

  return new Response(JSON.stringify(result), {
    status: result.ok ? 200 : 503,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};

async function checkBackOffice(): Promise<HealthcheckResult> {
  const checkedAt = new Date().toISOString();
  try {
    const res = await fetch(BACKOFFICE_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      return { ok: false, status: res.status, error: `HTTP ${res.status}`, checkedAt };
    }

    const body = await res.json().catch(() => null) as { auth?: string } | null;
    // Healthy BackOffice responds with {"auth":"supabase", ...}. If Supabase is
    // paused, the whole domain NXDOMAINs and this never gets here.
    if (!body || body.auth !== 'supabase') {
      return {
        ok: false,
        status: res.status,
        error: 'Unexpected response shape — BackOffice likely degraded',
        checkedAt,
      };
    }

    return { ok: true, status: res.status, auth: body.auth, checkedAt };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: (err as Error).message,
      checkedAt,
    };
  }
}

async function notifyOutage(result: HealthcheckResult): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Hamilton Leads <leads@notifications.hamilton-exteriors.com>',
      to: ['admin@hamilton-exteriors.com'],
      subject: `[ALERT] BackOffice unreachable — leads may be dropping`,
      text: [
        `BackOffice healthcheck FAILED.`,
        ``,
        `Checked at:  ${result.checkedAt}`,
        `HTTP status: ${result.status}`,
        `Error:       ${result.error}`,
        `URL:         ${BACKOFFICE_URL}`,
        ``,
        `While this is failing, new leads submitted to hamilton-exteriors.com`,
        `will NOT persist to the CRM. The Resend email backstop will still`,
        `capture them in this inbox, but the CRM automations won't fire.`,
        ``,
        `Most common cause: Supabase project paused (payment failure or inactivity).`,
        `Check: https://supabase.com/dashboard/project/oxenhdksyqgmbuzaftnv`,
      ].join('\n'),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}
