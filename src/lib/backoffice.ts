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
 */
export async function sendToBackOffice(payload: LeadPayload): Promise<BackOfficeResult> {
  if (!WEBHOOK_URL || !API_KEY) {
    console.warn('[backoffice] Webhook not configured — skipping lead send');
    return { success: false, error: 'Webhook not configured' };
  }

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

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error('[backoffice] Webhook error:', res.status, body);
      return { success: false, error: (body as any).error || `HTTP ${res.status}` };
    }

    const data = await res.json() as BackOfficeResult;
    return data;
  } catch (err) {
    console.error('[backoffice] Webhook request failed:', (err as Error).message);
    return { success: false, error: (err as Error).message };
  }
}
