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

  // Build metadata — only include truthy values
  const metadata: Record<string, unknown> = {};
  if (body.address) metadata.address = body.address;
  if (body.service) metadata.service = body.service;
  if (body.serviceDetail) metadata.serviceDetail = body.serviceDetail;
  if (body.step) metadata.step = body.step;
  if (body.page_url) metadata.page_url = body.page_url;

  let result;
  try {
    result = await sendToBackOffice({
      name,
      ...(phone && { phone }),
      ...(email && { email }),
      source: 'website-form',
      ...(Object.keys(metadata).length > 0 && { metadata }),
      ...(body.utm_source && { utm_source: String(body.utm_source) }),
      ...(body.utm_medium && { utm_medium: String(body.utm_medium) }),
      ...(body.utm_campaign && { utm_campaign: String(body.utm_campaign) }),
    });
  } catch (err) {
    console.error('[partial] sendToBackOffice threw:', (err as Error).message);
    return json({ error: 'Failed to send lead' }, 502);
  }

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
