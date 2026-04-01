import type { APIRoute } from 'astro';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
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

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
