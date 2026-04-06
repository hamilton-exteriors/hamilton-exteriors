/**
 * Ghost CMS webhook receiver — triggers Railway redeploy when content changes.
 *
 * Ghost fires `site.changed` on post publish/update/delete.
 * This endpoint calls Railway's GraphQL API to redeploy the service,
 * keeping the sitemap and cached content fresh.
 */

import type { APIRoute } from 'astro';

const RAILWAY_API_TOKEN = import.meta.env.RAILWAY_API_TOKEN || '';
const RAILWAY_SERVICE_ID = import.meta.env.RAILWAY_SERVICE_ID || '';
const RAILWAY_ENVIRONMENT_ID = import.meta.env.RAILWAY_ENVIRONMENT_ID || '';

export const POST: APIRoute = async ({ request }) => {
  // Validate this is a Ghost webhook (basic check)
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response('Bad request', { status: 400 });
  }

  if (!RAILWAY_API_TOKEN || !RAILWAY_SERVICE_ID) {
    console.error('[ghost-webhook] Missing RAILWAY_API_TOKEN or RAILWAY_SERVICE_ID');
    return new Response('Not configured', { status: 503 });
  }

  try {
    // Trigger Railway redeploy via GraphQL API
    const res = await fetch('https://backboard.railway.com/graphql/v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation redeploy($serviceId: String!, $environmentId: String) {
          serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)
        }`,
        variables: {
          serviceId: RAILWAY_SERVICE_ID,
          ...(RAILWAY_ENVIRONMENT_ID && { environmentId: RAILWAY_ENVIRONMENT_ID }),
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await res.json();

    if (data.errors) {
      console.error('[ghost-webhook] Railway API error:', JSON.stringify(data.errors));
      return new Response('Redeploy failed', { status: 502 });
    }

    console.log('[ghost-webhook] Redeploy triggered successfully');

    // Notify IndexNow (Bing, Yandex, Naver) about updated content
    try {
      const body = await request.clone().json().catch(() => null);
      const slug = body?.post?.current?.slug;
      const urls = slug
        ? [`https://hamilton-exteriors.com/blog/${slug}`]
        : ['https://hamilton-exteriors.com/blog'];
      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'hamilton-exteriors.com',
          key: '524a5da56e0e45ef9f726d847b63daf4',
          keyLocation: 'https://hamilton-exteriors.com/524a5da56e0e45ef9f726d847b63daf4.txt',
          urlList: urls,
        }),
        signal: AbortSignal.timeout(5_000),
      }).then(r => console.log(`[ghost-webhook] IndexNow: ${r.status}`))
        .catch(e => console.warn('[ghost-webhook] IndexNow failed:', e));
    } catch { /* non-blocking */ }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[ghost-webhook] Error:', err);
    return new Response('Internal error', { status: 500 });
  }
};

// Reject non-POST requests
export const ALL: APIRoute = async () => {
  return new Response('Method not allowed', { status: 405 });
};
