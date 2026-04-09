/**
 * Meta Conversions API (CAPI) — server-side event forwarding.
 *
 * Sends events directly to Meta's servers, bypassing ad blockers.
 * Combined with client-side Pixel, uses event_id deduplication so
 * Meta counts each conversion exactly once.
 *
 * Env vars required:
 *   META_PIXEL_ID        — from Meta Events Manager
 *   META_CAPI_TOKEN      — long-lived access token from Events Manager > Settings
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api/
 */

import { createHash } from 'node:crypto';

const PIXEL_ID = import.meta.env.META_PIXEL_ID || '';
const ACCESS_TOKEN = import.meta.env.META_CAPI_TOKEN || '';
const API_VERSION = 'v22.0';
const ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

// Use test event code in non-production for Events Manager debugging
const TEST_EVENT_CODE = import.meta.env.META_TEST_EVENT_CODE || '';

/** SHA-256 hash a value (lowercase, trimmed) per Meta's requirements */
function sha256(value: string): string {
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

/** Normalize phone to E.164 before hashing */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // Prepend US country code if 10 digits
  return digits.length === 10 ? `1${digits}` : digits;
}

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  fbc?: string;  // _fbc cookie — DO NOT hash
  fbp?: string;  // _fbp cookie — DO NOT hash
}

interface CustomData {
  currency?: string;
  value?: number;
  contentIds?: string[];
  contentType?: string;
  [key: string]: unknown;
}

interface CAPIEvent {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  /** 'website' for browser events, 'system_generated' for CRM/offline conversions */
  actionSource?: 'website' | 'system_generated';
  userData: UserData;
  customData?: CustomData;
}

/**
 * Send a server-side event to Meta Conversions API.
 * Non-blocking — failures are logged but never throw.
 */
export async function sendMetaEvent(event: CAPIEvent): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Silently skip if not configured — don't break the site
    return;
  }

  const userData: Record<string, unknown> = {};

  // Hash PII fields per Meta spec
  if (event.userData.email) {
    userData.em = [sha256(event.userData.email)];
  }
  if (event.userData.phone) {
    userData.ph = [sha256(normalizePhone(event.userData.phone))];
  }
  if (event.userData.firstName) {
    userData.fn = [sha256(event.userData.firstName)];
  }
  if (event.userData.lastName) {
    userData.ln = [sha256(event.userData.lastName)];
  }

  // Pass-through fields (NOT hashed)
  if (event.userData.clientIp) {
    userData.client_ip_address = event.userData.clientIp;
  }
  if (event.userData.userAgent) {
    userData.client_user_agent = event.userData.userAgent;
  }
  if (event.userData.fbc) {
    userData.fbc = event.userData.fbc;
  }
  if (event.userData.fbp) {
    userData.fbp = event.userData.fbp;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource || 'website',
        user_data: userData,
        ...(event.customData && {
          custom_data: {
            ...(event.customData.currency && { currency: event.customData.currency }),
            ...(event.customData.value != null && { value: event.customData.value }),
            ...(event.customData.contentIds && { content_ids: event.customData.contentIds }),
            ...(event.customData.contentType && { content_type: event.customData.contentType }),
          },
        }),
      },
    ],
  };

  if (TEST_EVENT_CODE) {
    payload.test_event_code = TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(`${ENDPOINT}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[meta-capi] ${event.eventName} failed (${res.status}):`, body);
    }
  } catch (e) {
    console.error('[meta-capi] request failed:', (e as Error).message);
  }
}

/**
 * Helper to extract _fbc and _fbp cookies from a request.
 * These cookies are set by the Meta Pixel and improve Event Match Quality.
 */
export function getMetaCookies(request: Request): { fbc?: string; fbp?: string } {
  const cookie = request.headers.get('cookie') || '';
  const fbc = cookie.match(/_fbc=([^;]+)/)?.[1];
  const fbp = cookie.match(/_fbp=([^;]+)/)?.[1];
  return { fbc, fbp };
}
