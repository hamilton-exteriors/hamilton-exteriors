import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: 'Roof scan API not available — demo mode active' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  );
};
