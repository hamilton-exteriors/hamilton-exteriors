#!/usr/bin/env node
/**
 * IndexNow URL submission script.
 * Run after deploy to notify Bing/Yandex/Naver of updated pages.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs                  # submit all sitemap URLs
 *   node scripts/indexnow-submit.mjs /roofing /blog   # submit specific paths
 *   node scripts/indexnow-submit.mjs --core            # submit core pages only
 */

const SITE = 'https://hamilton-exteriors.com';
const KEY = '524a5da56e0e45ef9f726d847b63daf4';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10_000; // IndexNow accepts up to 10k URLs per request

const CORE_URLS = [
  '/', '/roofing', '/siding', '/windows', '/adu', '/custom-homes',
  '/additions', '/buy', '/service-areas', '/blog',
];

/** Parse all <loc> URLs from the live sitemap */
async function fetchSitemapUrls() {
  const indexRes = await fetch(`${SITE}/sitemap-index.xml`, { signal: AbortSignal.timeout(15_000) });
  if (!indexRes.ok) throw new Error(`Sitemap index fetch failed: ${indexRes.status}`);
  const indexXml = await indexRes.text();

  // Extract child sitemap URLs (skip image-sitemap — IndexNow is for HTML pages)
  const sitemapUrls = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1])
    .filter(u => !u.includes('image-sitemap'));

  const allUrls = [];
  for (const sitemapUrl of sitemapUrls) {
    const res = await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) { console.warn(`Skipping ${sitemapUrl}: ${res.status}`); continue; }
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    allUrls.push(...urls);
  }
  return allUrls;
}

async function submit(urls) {
  // IndexNow batch limit is 10k — split if needed
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const body = {
      host: 'hamilton-exteriors.com',
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: batch,
    };

    console.log(`Submitting batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs to IndexNow...`);

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (res.ok || res.status === 202) {
      console.log(`  Accepted (${res.status})`);
    } else {
      console.error(`  Rejected: ${res.status} ${await res.text()}`);
      process.exit(1);
    }
  }
  console.log(`Done — ${urls.length} URLs submitted.`);
}

const args = process.argv.slice(2);

let urls;
if (args.includes('--core')) {
  urls = CORE_URLS.map(p => `${SITE}${p}`);
} else if (args.length > 0) {
  urls = args.filter(a => !a.startsWith('--')).map(u => u.startsWith('http') ? u : `${SITE}${u}`);
} else {
  // Default: pull all URLs from live sitemap
  try {
    urls = await fetchSitemapUrls();
    console.log(`Fetched ${urls.length} URLs from sitemap.`);
  } catch (e) {
    console.warn(`Could not fetch sitemap (${e.message}), falling back to core URLs.`);
    urls = CORE_URLS.map(p => `${SITE}${p}`);
  }
}

submit(urls);
