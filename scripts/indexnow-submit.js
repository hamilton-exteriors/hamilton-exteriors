#!/usr/bin/env node
/**
 * IndexNow submission script — run after deploy to notify Bing/Yandex/Naver
 * Usage: node scripts/indexnow-submit.js [url1] [url2] ...
 * If no URLs provided, submits the sitemap-index for re-crawl.
 */

const INDEXNOW_KEY = '524a5da56e0e45ef9f726d847b63daf4';
const HOST = 'hamilton-exteriors.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function submitUrls(urls) {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`[IndexNow] Submitted ${urls.length} URL(s) — status ${res.status}`);
  } else {
    const text = await res.text();
    console.error(`[IndexNow] Failed: ${res.status} ${text}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const urls = args.length > 0
  ? args
  : [
      `https://${HOST}/`,
      `https://${HOST}/roofing`,
      `https://${HOST}/siding`,
      `https://${HOST}/windows`,
      `https://${HOST}/adu`,
      `https://${HOST}/custom-homes`,
      `https://${HOST}/additions`,
      `https://${HOST}/blog`,
      `https://${HOST}/service-areas`,
    ];

submitUrls(urls);
