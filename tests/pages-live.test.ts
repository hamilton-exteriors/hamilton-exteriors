import { describe, it, expect } from 'vitest';

const BASE = 'https://hamilton-exteriors-production.up.railway.app';
const SITEMAP_URL = `${BASE}/sitemap-0.xml`;

async function getAllUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m =>
    m[1].replace('https://hamilton-exteriors.com', BASE)
  );
  return urls;
}

describe('All sitemap pages return 200', async () => {
  const urls = await getAllUrls();

  // Also test pages not in sitemap
  const extraUrls = [
    `${BASE}/`,
    `${BASE}/roofing`,
    `${BASE}/siding`,
    `${BASE}/windows`,
    `${BASE}/adu`,
    `${BASE}/custom-homes`,
    `${BASE}/additions`,
    `${BASE}/buy`,
    `${BASE}/blog`,
    `${BASE}/service-areas`,
  ];

  const allUrls = [...new Set([...urls, ...extraUrls])];

  console.log(`Testing ${allUrls.length} URLs...`);

  for (const url of allUrls) {
    const path = url.replace(BASE, '') || '/';
    it(`GET ${path} → 200`, async () => {
      const res = await fetch(url, { redirect: 'follow' });
      expect(res.status, `${path} returned ${res.status}`).toBe(200);
    }, 15000);
  }
});
