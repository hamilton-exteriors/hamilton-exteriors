import type { APIRoute } from 'astro';

/**
 * Proxy roof-scan requests to the dedicated backend service.
 *
 * Previously this file imported backend services directly from
 * roof-scan/backend/dist/, which coupled the Astro build to backend
 * dependencies (node-cache, geotiff, @turf/*). Now we proxy to the
 * backend over HTTP, keeping the frontend and backend fully decoupled.
 */

const BACKEND_URL = import.meta.env.PUBLIC_ROOF_SCAN_API
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
