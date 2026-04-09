/**
 * Analytics utility — fires events to OpenPanel + GTM dataLayer.
 * Client-side: use window.op('track', ...) directly or data-track attributes.
 * Server-side: use trackServerEvent() from form handlers.
 *
 * OpenPanel docs: https://openpanel.dev/docs/sdks/sdk
 *
 * ── UTM Parameter Strategy ──────────────────────────────────────────
 * OpenPanel auto-captures UTM params from the URL. Use these conventions:
 *
 * | Parameter    | Convention              | Examples                          |
 * |------------- |-------------------------|-----------------------------------|
 * | utm_source   | platform name           | google, facebook, nextdoor, yelp  |
 * | utm_medium   | marketing channel       | cpc, social, email, referral      |
 * | utm_campaign | descriptive_snake_case  | spring_roofing_2026, adu_launch   |
 * | utm_content  | variant or placement    | hero_cta, sidebar_banner          |
 * | utm_term     | keyword (paid search)   | roof+replacement+castro+valley    |
 *
 * Rules:
 * - Always lowercase, underscores for spaces
 * - Campaign names: {season}_{service}_{year} (e.g. spring_roofing_2026)
 * - Use utm_content to A/B test ad creatives or CTA placements
 * - Track in a shared spreadsheet before launching any campaign
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
 *
 * Pass profileId in props to attribute the event to a known user.
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

/**
 * Create or update a user profile in OpenPanel (server-side).
 * Uses email as the stable profileId so client + server events unify.
 *
 * IMPORTANT: This creates a fresh SDK instance per call to avoid the
 * singleton race condition — the module-level `op` instance is shared
 * across concurrent SSR requests, so calling op.identify() on it would
 * bleed profileId between visitors.
 */
/**
 * Track revenue server-side in OpenPanel.
 * Call after a purchase or closed deal to attribute revenue to a profile.
 */
export async function trackRevenue(
  amount: number,
  props?: EventProps,
) {
  if (!import.meta.env.OPENPANEL_CLIENT_SECRET) return;

  try {
    const isolated = new OpenPanel({
      clientId: import.meta.env.OPENPANEL_CLIENT_ID || 'edc36a20-3fa1-49e8-bae6-d0be0abfadec',
      clientSecret: import.meta.env.OPENPANEL_CLIENT_SECRET || '',
    });

    await isolated.revenue(amount, props || {});
  } catch (e) {
    console.error('[analytics] revenue tracking failed:', e);
  }
}

export async function identifyProfile(profile: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  properties?: Record<string, string | number | boolean>;
}) {
  if (!import.meta.env.OPENPANEL_CLIENT_SECRET) return;

  try {
    const isolated = new OpenPanel({
      clientId: import.meta.env.OPENPANEL_CLIENT_ID || 'edc36a20-3fa1-49e8-bae6-d0be0abfadec',
      clientSecret: import.meta.env.OPENPANEL_CLIENT_SECRET || '',
    });

    await isolated.identify({
      profileId: profile.email,
      email: profile.email,
      ...(profile.firstName && { firstName: profile.firstName }),
      ...(profile.lastName && { lastName: profile.lastName }),
      properties: {
        ...(profile.phone && { phone: profile.phone }),
        ...profile.properties,
      },
    });
  } catch (e) {
    console.error('[analytics] identify failed:', e);
  }
}
