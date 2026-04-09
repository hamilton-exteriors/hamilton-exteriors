import type { APIRoute } from 'astro';

/** Proxy roof-scan requests to the backend service. */

const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL
  || 'https://roof-scan-api-production.up.railway.app';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    const response = await fetch(`${BACKEND_URL}/api/roof-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Roof scan proxy failed:', err.message);
    return new Response(
      JSON.stringify({
        error: 'Unable to reach roof scan service. Please try again.',
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
