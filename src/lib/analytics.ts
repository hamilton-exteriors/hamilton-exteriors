/**
 * Analytics utility — fires events to OpenPanel + GTM dataLayer.
 * Client-side: use window.op('track', ...) directly or data-track attributes.
 * Server-side: use trackServerEvent() from form handlers.
 *
 * OpenPanel is the SOURCE OF TRUTH for all marketing attribution.
 * BackOffice is the CRM for the sales process — it fires webhooks when
 * lead status changes, but does not track marketing.
 *
 * OpenPanel docs: https://openpanel.dev/docs/sdks/sdk
 *
 * ── UTM Parameter Strategy ──────────────────────────────────────────
 * OpenPanel auto-captures UTM params from the URL on every page view.
 * Server-side events also attach UTMs as event properties for redundancy.
 *
 * | Parameter    | Convention              | Examples                          |
 * |------------- |-------------------------|-----------------------------------|
 * | utm_source   | platform name           | google, fb, ig, nextdoor, yelp    |
 * | utm_medium   | marketing channel       | cpc, paid_social, email, referral |
 * | utm_campaign | descriptive_snake_case  | spring_roofing_2026, adu_launch   |
 * | utm_content  | ad creative variant     | video_testimonial_v1, static_pricing_a |
 * | utm_term     | keyword / audience      | roof+replacement, homeowners_45plus |
 *
 * Rules:
 * - Always lowercase, underscores for spaces, no special characters
 * - Campaign names: {season}_{service}_{year}_{geo} (e.g. spring_roofing_2026_bayarea)
 * - Use utm_content to A/B test ad creatives — name format: {format}_{hook}_{variant}
 *
 * ── Facebook Ads URL Parameters ─────────────────────────────────────
 * Set in Ads Manager > Ad Level > Tracking > URL Parameters:
 *
 *   utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}
 *
 * Dynamic params: {{campaign.name}}, {{campaign.id}}, {{adset.name}},
 * {{adset.id}}, {{ad.name}}, {{ad.id}}, {{site_source_name}} (fb|ig|msg|an),
 * {{placement}}
 *
 * IMPORTANT: {{campaign.name}} resolves at publish time — rename BEFORE publishing.
 *
 * Ad naming convention for utm_content:
 *   {format}_{hook}_{variant}  →  video_testimonial_smith_v1
 *                                  carousel_beforeafter_v2
 *                                  static_pricing_a
 *
 * ── Google Ads Tracking Template ────────────────────────────────────
 * Set at Account Level > Settings > Tracking Template:
 *
 *   {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=CAMPAIGN_NAME&utm_term={keyword}&utm_content={creative}&matchtype={matchtype}&network={network}&device={device}
 *
 * Replace CAMPAIGN_NAME manually per campaign (Google has no {campaignname} param).
 * Auto-tagging (gclid) is on by default — keep it, works alongside UTMs.
 *
 * ── Attribution Flow ────────────────────────────────────────────────
 * 1. User lands → Layout.astro persists UTMs + fbclid/gclid in sessionStorage
 * 2. Form submit → UTMs flow to OpenPanel identify (profile) + event props
 * 3. OpenPanel dashboard → filter leads by utm_campaign, utm_content for ROI
 * 4. Deal closes → BackOffice fires POST /api/conversions → OpenPanel revenue()
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
