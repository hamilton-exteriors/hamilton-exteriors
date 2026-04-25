/**
 * BackOffice CRM webhook client.
 *
 * Sends lead data to the BackOffice leads webhook which handles dedup,
 * contact creation, and speed-to-lead automation triggers.
 */

const WEBHOOK_URL = import.meta.env.BACKOFFICE_WEBHOOK_URL || '';
const API_KEY = import.meta.env.BACKOFFICE_API_KEY || '';

export interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  source: string;
  metadata?: Record<string, unknown>;
  notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  fbclid?: string;
  fbc?: string;
  gclid?: string;
}

export interface BackOfficeResult {
  success: boolean;
  duplicate?: boolean;
  lead?: { id: string; name: string; email: string | null };
  error?: string;
}

/**
 * Send lead data to the BackOffice webhook.
 *
 * The webhook deduplicates by phone/email — calling it multiple times
 * for the same contact (e.g. on each form step) won't create duplicates.
 *
 * Retries transient failures (network errors, 5xx, timeouts) up to 3 times
 * with exponential backoff (250ms, 750ms, 2250ms). Never retries 4xx — those
 * are permanent (bad API key, validation error) and retrying wastes time.
 * Callers should fall back to the Resend email notification if this returns
 * success=false so the lead is still recoverable from the inbox.
 */
export async function sendToBackOffice(payload: LeadPayload): Promise<BackOfficeResult> {
  if (!WEBHOOK_URL || !API_KEY) {
    console.warn('[backoffice] Webhook not configured — skipping lead send');
    return { success: false, error: 'Webhook not configured' };
  }

  const MAX_ATTEMPTS = 3;
  let lastError = 'unknown error';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        return await res.json() as BackOfficeResult;
      }

      const body = await res.json().catch(() => ({}));
      const errMsg = (body as { error?: string }).error || `HTTP ${res.status}`;
      lastError = errMsg;

      // 4xx = permanent (bad key, validation error). Don't retry.
      if (res.status >= 400 && res.status < 500) {
        console.error(`[backoffice] Webhook rejected (${res.status}):`, errMsg);
        return { success: false, error: errMsg };
      }

      console.warn(`[backoffice] Attempt ${attempt}/${MAX_ATTEMPTS} failed (${res.status}):`, errMsg);
    } catch (err) {
      lastError = (err as Error).message;
      console.warn(`[backoffice] Attempt ${attempt}/${MAX_ATTEMPTS} threw:`, lastError);
    }

    if (attempt < MAX_ATTEMPTS) {
      const delay = 250 * Math.pow(3, attempt - 1); // 250, 750, 2250
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  console.error(`[backoffice] Gave up after ${MAX_ATTEMPTS} attempts:`, lastError);
  return { success: false, error: lastError };
}
