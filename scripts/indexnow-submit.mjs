#!/usr/bin/env node
/**
 * IndexNow URL submission script.
 * Run after deploy to notify Bing/Yandex/Naver of updated pages.
 *
 * Usage: node scripts/indexnow-submit.mjs [url1] [url2] ...
 * No args = submit all key pages + recent blog posts.
 */

const SITE = 'https://hamilton-exteriors.com';
const KEY = '176391810415c623c205bb23fef07dbf';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Core pages that change frequently
const CORE_URLS = [
  '/',
  '/roofing',
  '/siding',
  '/windows',
  '/adu',
  '/custom-homes',
  '/additions',
  '/buy',
  '/service-areas',
  '/blog',
];

async function submit(urls) {
  const body = {
    host: 'hamilton-exteriors.com',
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`IndexNow accepted (${res.status})`);
  } else {
    console.error(`IndexNow rejected: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const urls = args.length > 0
  ? args.map(u => u.startsWith('http') ? u : `${SITE}${u}`)
  : CORE_URLS.map(p => `${SITE}${p}`);

submit(urls);
