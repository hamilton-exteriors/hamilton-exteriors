import type { APIRoute } from 'astro';
import { sendMetaEvent } from '../../lib/meta-capi';
import { trackRevenue } from '../../lib/analytics';

const API_KEY = import.meta.env.BACKOFFICE_API_KEY || '';

/**
 * POST /api/conversions — CRM-to-CAPI bridge.
 *
 * Called by BackOffice when a lead converts (signs contract, deposit received).
 * Fires a Meta CAPI Purchase event with action_source: "system_generated"
 * and an OpenPanel revenue event, so Meta's algorithm learns to find people
 * who become actual customers — not just form-fillers.
 *
 * Required fields: email, value
 * Optional: phone, firstName, lastName, service, fbclid, fbc, ref
 *
 * Auth: X-API-Key header (same key as the leads webhook)
 */
export const POST: APIRoute = async ({ request }) => {
  // Authenticate — same API key BackOffice uses for leads
  const authKey = request.headers.get('x-api-key');
  if (!API_KEY || authKey !== API_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const email = String(body.email || '').trim();
  const value = Number(body.value) || 0;

  if (!email) return json({ error: 'email is required' }, 400);
  if (value <= 0) return json({ error: 'value must be positive' }, 400);

  const phone = String(body.phone || '').trim() || undefined;
  const firstName = String(body.firstName || '').trim() || undefined;
  const lastName = String(body.lastName || '').trim() || undefined;
  const service = String(body.service || 'general').trim();
  const ref = String(body.ref || `conv-${Date.now()}`).trim();
  const fbc = String(body.fbc || '').trim() || undefined;

  // Fire Meta CAPI Purchase event — system_generated since this comes from CRM, not browser
  const eventId = `conversion_${ref}`;
  sendMetaEvent({
    eventName: 'Purchase',
    eventId,
    eventSourceUrl: 'https://hamilton-exteriors.com',
    actionSource: 'system_generated',
    userData: {
      email,
      phone,
      firstName,
      lastName,
      fbc, // Stored from original visit — critical for attribution
    },
    customData: {
      currency: 'USD',
      value,
      contentType: 'service',
      contentIds: [service],
    },
  });

  // OpenPanel revenue — attributes dollar value to the user profile
  trackRevenue(value, {
    profileId: email,
    ref,
    service,
    source: 'crm_conversion',
  });

  return json({ ok: true, eventId, value });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
