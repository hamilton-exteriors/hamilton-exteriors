import type { APIRoute } from 'astro';
import { sendToBackOffice } from '../../../lib/backoffice';

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

  const result = await sendToBackOffice({
    name,
    phone: phone || undefined,
    email: email || undefined,
    source: 'website-form',
    metadata: {
      address: body.address || undefined,
      service: body.service || undefined,
      serviceDetail: body.serviceDetail || undefined,
      step: body.step || undefined,
      page_url: body.page_url || undefined,
    },
    utm_source: String(body.utm_source || '') || undefined,
    utm_medium: String(body.utm_medium || '') || undefined,
    utm_campaign: String(body.utm_campaign || '') || undefined,
  });

  if (!result.success) {
    return json({ error: result.error || 'Failed to save lead' }, 502);
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
