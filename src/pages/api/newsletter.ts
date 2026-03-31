import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('footerEmail')?.toString().trim();
  const name = formData.get('footerName')?.toString().trim();

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Wire up to Mailchimp, ConvertKit, or your email service
  // For now, log and return success
  console.log(`[Newsletter] ${name || 'Anonymous'} <${email}>`);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
