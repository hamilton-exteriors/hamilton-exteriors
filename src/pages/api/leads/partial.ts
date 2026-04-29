import type { APIRoute } from 'astro';
import { sendToBackOffice } from '../../../lib/backoffice';
import { identifyProfile } from '../../../lib/analytics';
import { sendMetaEvent, getMetaCookies } from '../../../lib/meta-capi';
import { sendLeadEmail } from '../../../lib/resend';

/**
 * POST /api/leads/partial — Progressive lead capture.
 *
 * Called on each form step transition so partial leads are saved even
 * if the user abandons the form. BackOffice deduplicates by phone/email,
 * so repeated calls for the same contact are safe.
 */
export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const name = String(body.name || '').trim().slice(0, 255);
  const phone = String(body.phone || '').trim().slice(0, 50);
  const email = String(body.email || '').trim().slice(0, 255);

  if (!name || name.length < 2) {
    return json({ error: 'Name is required' }, 400);
  }
  if (!phone && !email) {
    return json({ error: 'Phone or email is required' }, 400);
  }

  // Build notes from extra fields (metadata column not yet supported in BackOffice DB)
  const parts: string[] = [];
  if (body.address) parts.push(`Address: ${body.address}`);
  if (body.service) parts.push(`Service: ${body.service}`);
  if (body.serviceDetail) parts.push(`Detail: ${body.serviceDetail}`);
  if (body.page_url) parts.push(`Page: ${body.page_url}`);
  if (body.step) parts.push(`Step: ${body.step}`);
  const notes = parts.length > 0 ? parts.join(' | ') : undefined;

  const result = await sendToBackOffice({
    name,
    ...(phone && { phone }),
    ...(email && { email }),
    source: 'website-form',
    ...(notes && { notes }),
    ...(body.utm_source && { utm_source: String(body.utm_source) }),
    ...(body.utm_medium && { utm_medium: String(body.utm_medium) }),
    ...(body.utm_campaign && { utm_campaign: String(body.utm_campaign) }),
    ...(body.fbclid && { fbclid: String(body.fbclid) }),
    ...(body.fbc && { fbc: String(body.fbc) }),
  });

  // Email backstop for partials — only fire if BackOffice actually failed.
  // Successful partials are safe in the CRM; emailing every step would spam
  // the inbox (3+ emails per complete funnel). Full submissions always email.
  if (!result.success) {
    try {
      await sendLeadEmail({
        name,
        phone: phone || undefined,
        email: email || undefined,
        address: body.address ? String(body.address) : undefined,
        service: body.service ? String(body.service) : undefined,
        serviceDetail: body.serviceDetail ? String(body.serviceDetail) : undefined,
        step: typeof body.step === 'number' ? body.step : undefined,
        source: 'partial_form',
        utm_source: body.utm_source ? String(body.utm_source) : undefined,
        utm_medium: body.utm_medium ? String(body.utm_medium) : undefined,
        utm_campaign: body.utm_campaign ? String(body.utm_campaign) : undefined,
        utm_content: body.utm_content ? String(body.utm_content) : undefined,
        utm_term: body.utm_term ? String(body.utm_term) : undefined,
        gclid: body.gclid ? String(body.gclid) : undefined,
        fbclid: body.fbclid ? String(body.fbclid) : undefined,
        pageUrl: body.page_url ? String(body.page_url) : undefined,
      });
    } catch (err) {
      console.error('[partial] Resend backstop failed:', (err as Error).message);
    }
    // Still return 502 so the client knows the CRM write failed, but the
    // email is already in the inbox as the recoverable fallback.
    return json({ error: result.error || 'Failed to save lead' }, 502);
  }

  // Identify profile server-side once we have an email.
  // Await so the Astro response doesn't race the OpenPanel/Meta writes —
  // fire-and-forget previously dropped identify payloads under load.
  if (email) {
    const [first, ...rest] = name.split(' ');

    const eventId = String(body.eventId || crypto.randomUUID());
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const userAgent = request.headers.get('user-agent') || '';
    const cookies = getMetaCookies(request);
    const fbc = cookies.fbc || (body.fbc ? String(body.fbc) : undefined);
    const fbp = cookies.fbp;
    const pageUrl = String(body.page_url || request.headers.get('referer') || 'https://hamilton-exteriors.com');

    await Promise.all([
      identifyProfile({
        email,
        firstName: first,
        lastName: rest.join(' '),
        ...(phone && { phone }),
        properties: {
          ...(body.address && { address: String(body.address) }),
          ...(body.service && { service: String(body.service) }),
          source: 'partial_form',
          ...(body.utm_source && { utm_source: String(body.utm_source) }),
          ...(body.utm_medium && { utm_medium: String(body.utm_medium) }),
          ...(body.utm_campaign && { utm_campaign: String(body.utm_campaign) }),
          ...(body.utm_content && { utm_content: String(body.utm_content) }),
          ...(body.utm_term && { utm_term: String(body.utm_term) }),
        },
      }),
      sendMetaEvent({
        eventName: 'Contact',
        eventId,
        eventSourceUrl: pageUrl,
        userData: {
          email,
          ...(phone && { phone }),
          firstName: first,
          lastName: rest.join(' '),
          clientIp,
          userAgent,
          fbc,
          fbp,
        },
      }),
    ]);
  }

  return json({
    ok: true,
    lead_id: result.lead?.id,
    duplicate: result.duplicate || false,
  });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
