/**
 * Analytics utility — fires events to OpenPanel + GTM dataLayer.
 * Client-side: use window.op('track', ...) directly or data-track attributes.
 * Server-side: use trackServerEvent() from form handlers.
 *
 * OpenPanel docs: https://openpanel.dev/docs/sdks/sdk
 */

import { OpenPanel } from '@openpanel/sdk';

// ── Server-side OpenPanel instance ────────────────────────────────

const op = new OpenPanel({
  clientId: import.meta.env.OPENPANEL_CLIENT_ID || 'edc36a20-3fa1-49e8-bae6-d0be0abfadec',
  clientSecret: import.meta.env.OPENPANEL_CLIENT_SECRET || '',
});

interface EventProps {
  [key: string]: string | number | boolean;
}

/**
 * Fire a server-side event to OpenPanel (bypasses ad blockers).
 * Call from Astro actions / API routes after successful form submissions.
 * Requires OPENPANEL_CLIENT_SECRET env var on Railway.
 */
export async function trackServerEvent(
  eventName: string,
  props?: EventProps,
) {
  if (!import.meta.env.OPENPANEL_CLIENT_SECRET) return;

  try {
    await op.track(eventName, props || {});
  } catch (e) {
    // Analytics should never block the user flow
    console.error('[analytics] server event failed:', e);
  }
}
