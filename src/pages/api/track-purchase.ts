import type { APIRoute } from 'astro';
import { sendMetaEvent, getMetaCookies } from '../../lib/meta-capi';
import { trackRevenue } from '../../lib/analytics';

/**
 * POST /api/track-purchase — Client-side purchase CAPI bridge.
 *
 * Called by scan-engine.js after a successful purchase to fire a
 * server-side Meta CAPI Purchase event (deduped with client Pixel
 * via shared eventId) and OpenPanel revenue.
 *
 * No API key required — this is called from the browser.
 * Rate-limited by nature (one per purchase form submission).
 */
export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const email = String(body.email || '').trim();
  const value = Number(body.value) || 0;
  const ref = String(body.ref || '').trim();

  if (!email || value <= 0 || !ref) {
    return json({ error: 'email, value, and ref are required' }, 400);
  }

  const phone = String(body.phone || '').trim() || undefined;
  const firstName = String(body.firstName || '').trim() || undefined;
  const lastName = String(body.lastName || '').trim() || undefined;
  const service = String(body.service || 'roofing').trim();

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const userAgent = request.headers.get('user-agent') || '';
  const cookies = getMetaCookies(request);
  const fbc = cookies.fbc || String(body.fbc || '').trim() || undefined;
  const fbp = cookies.fbp;
  const pageUrl = request.headers.get('referer') || 'https://hamilton-exteriors.com/buy/scan';

  const eventId = `purchase_${ref}`;

  await Promise.all([
    sendMetaEvent({
      eventName: 'Purchase',
      eventId,
      eventSourceUrl: pageUrl,
      userData: {
        email,
        phone,
        firstName,
        lastName,
        clientIp,
        userAgent,
        fbc,
        fbp,
      },
      customData: {
        currency: 'USD',
        value,
        contentType: 'product',
        contentIds: [service],
      },
    }),
    trackRevenue(value, {
      profileId: email,
      ref,
      service,
      source: 'buy_flow',
    }),
  ]);

  return json({ ok: true, eventId });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
