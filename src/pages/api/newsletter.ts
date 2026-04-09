import type { APIRoute } from 'astro';
import { identifyProfile, trackServerEvent } from '../../lib/analytics';
import { sendMetaEvent, getMetaCookies } from '../../lib/meta-capi';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid form data.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const email = formData.get('footerEmail')?.toString().trim().slice(0, 254);
  const name = formData.get('footerName')?.toString().trim().slice(0, 100);

  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Valid email is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Wire up to Mailchimp, ConvertKit, or your email service
  if (import.meta.env.DEV) console.log(`[Newsletter] ${name || 'Anonymous'} <${email}>`);

  const [firstName, ...lastParts] = (name || '').split(' ');

  // Identify + track server-side (ad-blocker proof)
  identifyProfile({
    email,
    ...(firstName && { firstName }),
    ...(lastParts.length && { lastName: lastParts.join(' ') }),
  });
  trackServerEvent('newsletter_subscribed', { profileId: email, source: 'footer' });

  // Meta CAPI — Lead event for newsletter signup (lower intent than form, but still a lead)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const userAgent = request.headers.get('user-agent') || '';
  const cookies = getMetaCookies(request);
  const pageUrl = request.headers.get('referer') || 'https://hamilton-exteriors.com';

  sendMetaEvent({
    eventName: 'Lead',
    eventId: `newsletter_${Date.now()}`,
    eventSourceUrl: pageUrl,
    userData: {
      email,
      ...(firstName && { firstName }),
      ...(lastParts.length && { lastName: lastParts.join(' ') }),
      clientIp,
      userAgent,
      fbc: cookies.fbc,
      fbp: cookies.fbp,
    },
    customData: {
      contentType: 'newsletter',
      contentIds: ['newsletter_signup'],
    },
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
