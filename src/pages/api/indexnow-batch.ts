/**
 * IndexNow batch submission — notifies Bing, Yandex, and Naver about all site URLs.
 *
 * Call POST /api/indexnow-batch after deploys to fast-track indexing of pSEO pages.
 * Accepts an optional JSON body { urls: string[] } to submit specific URLs,
 * or submits all core + pSEO URLs when called with no body.
 *
 * Protected by INDEXNOW_SECRET env var — pass as Bearer token or ?secret= param.
 */

import type { APIRoute } from 'astro';

const INDEXNOW_KEY = '524a5da56e0e45ef9f726d847b63daf4';
const INDEXNOW_SECRET = import.meta.env.INDEXNOW_SECRET || '';
const SITE = 'https://hamilton-exteriors.com';

const counties = [
  { slug: 'alameda-county-ca', cities: ['oakland-ca', 'berkeley-ca', 'fremont-ca', 'hayward-ca', 'san-leandro-ca', 'dublin-ca', 'pleasanton-ca', 'livermore-ca', 'union-city-ca', 'alameda-ca', 'castro-valley-ca'] },
  { slug: 'contra-costa-county-ca', cities: ['antioch-ca', 'concord-ca', 'richmond-ca', 'san-ramon-ca', 'walnut-creek-ca', 'lafayette-ca', 'orinda-ca', 'danville-ca', 'brentwood-ca', 'pittsburg-ca'] },
  { slug: 'marin-county-ca', cities: ['larkspur-ca', 'mill-valley-ca', 'novato-ca', 'san-rafael-ca'] },
  { slug: 'napa-county-ca', cities: ['napa-ca', 'american-canyon-ca', 'st-helena-ca', 'calistoga-ca', 'yountville-ca'] },
  { slug: 'santa-clara-county-ca', cities: ['san-jose-ca', 'palo-alto-ca', 'mountain-view-ca', 'sunnyvale-ca', 'cupertino-ca', 'santa-clara-ca', 'saratoga-ca', 'los-gatos-ca', 'campbell-ca', 'milpitas-ca'] },
  { slug: 'san-mateo-county-ca', cities: ['redwood-city-ca', 'san-mateo-ca', 'burlingame-ca', 'daly-city-ca', 'south-san-francisco-ca'] },
];
const services = ['roofing', 'siding', 'windows', 'adu', 'custom-homes', 'additions', 'decks'];

function getAllUrls(): string[] {
  const urls: string[] = [];

  // Core pages
  urls.push(
    SITE,
    `${SITE}/roofing`, `${SITE}/siding`, `${SITE}/windows`,
    `${SITE}/adu`, `${SITE}/custom-homes`, `${SITE}/additions`,
    `${SITE}/service-areas`, `${SITE}/about/alex-hamilton-li`,
    `${SITE}/financing`, `${SITE}/blog`,
  );

  // Sub-service pages
  const subServices = [
    'roofing/asphalt-shingles', 'roofing/metal', 'roofing/tile', 'roofing/energy',
    'siding/vinyl', 'siding/fiber-cement', 'siding/stucco', 'siding/waterproofing',
    'windows/single-hung', 'windows/single-slider', 'windows/sliding-glass-doors',
    'windows/picture', 'windows/double-hung', 'windows/casement',
    'adu/detached', 'adu/design', 'adu/permits', 'adu/garage-conversions',
    'custom-homes/ground-up', 'custom-homes/design', 'custom-homes/permits', 'custom-homes/additions-renovations',
    'additions/second-story', 'additions/room-extensions', 'additions/adus-guest-houses', 'additions/full-remodels',
  ];
  for (const s of subServices) urls.push(`${SITE}/${s}`);

  // County pages
  for (const c of counties) urls.push(`${SITE}/service-areas/${c.slug}`);

  // County+service pages
  for (const c of counties) {
    for (const s of services) urls.push(`${SITE}/service-areas/${c.slug}/${s}`);
  }

  // City pages
  for (const c of counties) {
    for (const city of c.cities) urls.push(`${SITE}/service-areas/${c.slug}/${city}`);
  }

  // City+service pages
  for (const c of counties) {
    for (const city of c.cities) {
      for (const s of services) urls.push(`${SITE}/service-areas/${c.slug}/${city}/${s}`);
    }
  }

  return urls;
}

export const POST: APIRoute = async ({ request }) => {
  // Auth check
  if (INDEXNOW_SECRET) {
    const auth = request.headers.get('authorization')?.replace('Bearer ', '') || '';
    const param = new URL(request.url).searchParams.get('secret') || '';
    if (auth !== INDEXNOW_SECRET && param !== INDEXNOW_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // Accept optional URL list in body, otherwise submit all
  let urls: string[];
  try {
    const body = await request.json().catch(() => null);
    urls = Array.isArray(body?.urls) && body.urls.length > 0 ? body.urls : getAllUrls();
  } catch {
    urls = getAllUrls();
  }

  // IndexNow accepts max 10,000 URLs per request — batch if needed
  const batchSize = 10_000;
  const results: Array<{ batch: number; status: number; count: number }> = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'hamilton-exteriors.com',
          key: INDEXNOW_KEY,
          keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
        signal: AbortSignal.timeout(15_000),
      });
      results.push({ batch: Math.floor(i / batchSize) + 1, status: res.status, count: batch.length });
      console.log(`[indexnow-batch] Batch ${Math.floor(i / batchSize) + 1}: ${res.status} (${batch.length} URLs)`);
    } catch (e) {
      console.error(`[indexnow-batch] Batch ${Math.floor(i / batchSize) + 1} failed:`, e);
      results.push({ batch: Math.floor(i / batchSize) + 1, status: 0, count: batch.length });
    }
  }

  return new Response(JSON.stringify({ submitted: urls.length, results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const ALL: APIRoute = async () => {
  return new Response('Method not allowed', { status: 405 });
};
