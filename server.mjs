/**
 * Custom server wrapper for the Astro Node standalone adapter.
 *
 *  1. Brotli/gzip compression for SSR responses
 *  2. Cache-Control for static assets
 *  3. Security headers
 *  4. www → apex 301 redirect
 *
 * Note: in-memory caches (e.g. _saCache in src/lib/ghost.ts) are warmed once
 * per process lifetime — redeploy to pick up new Ghost content.
 */

import http from 'node:http';
import zlib from 'node:zlib';
import { existsSync } from 'node:fs';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';

const { handler } = await import('./dist/server/entry.mjs');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = process.env.HOST ?? '0.0.0.0';

const STATIC_CACHE_RULES = [
  { pattern: /^\/_astro\//i, value: 'public, max-age=31536000, immutable' },
  { pattern: /^\/fonts\//i, value: 'public, max-age=31536000, immutable' },
  { pattern: /^\/images\//i, value: 'public, max-age=86400' },
  { pattern: /^\/favicon/i, value: 'public, max-age=604800' },
];

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(), browsing-topics=()',
  'Content-Security-Policy': "frame-ancestors 'self'",
};

/** Content types worth compressing */
const COMPRESSIBLE = /^(text\/|application\/json|application\/javascript|application\/xml|image\/svg\+xml)/;

/**
 * Wrap res to transparently compress the response body.
 * Picks brotli > gzip based on Accept-Encoding.
 */
function compressResponse(req, res) {
  const accept = req.headers['accept-encoding'] || '';
  // Skip if already compressed or not worth compressing
  const pathname = (req.url || '').split('?')[0];
  // Static assets are pre-compressed or small — skip compression overhead
  if (STATIC_CACHE_RULES.some(r => r.pattern.test(pathname))) return res;

  let encoding = null;
  let stream = null;

  if (accept.includes('br')) {
    encoding = 'br';
    stream = zlib.createBrotliCompress({
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 },
    });
  } else if (accept.includes('gzip')) {
    encoding = 'gzip';
    stream = zlib.createGzip({ level: 6 });
  }

  if (!stream) return res;

  const origWriteHead = res.writeHead.bind(res);
  const origWrite = res.write.bind(res);
  const origEnd = res.end.bind(res);
  let headSent = false;
  let shouldCompress = true;

  res.writeHead = function (statusCode, ...args) {
    headSent = true;
    const contentType = res.getHeader('content-type') || '';
    // Only compress compressible content types
    if (!COMPRESSIBLE.test(String(contentType))) {
      shouldCompress = false;
      return origWriteHead(statusCode, ...args);
    }
    res.removeHeader('content-length');
    res.setHeader('content-encoding', encoding);
    res.setHeader('vary', 'Accept-Encoding');
    return origWriteHead(statusCode, ...args);
  };

  res.write = function (chunk, ...args) {
    if (!headSent) res.writeHead(res.statusCode || 200);
    if (!shouldCompress) return origWrite(chunk, ...args);
    return stream.write(chunk, ...args);
  };

  res.end = function (chunk, ...args) {
    if (!headSent) res.writeHead(res.statusCode || 200);
    if (!shouldCompress) {
      return chunk ? origEnd(chunk, ...args) : origEnd(...args);
    }
    stream.on('data', (compressed) => origWrite(compressed));
    stream.on('end', () => origEnd());
    if (chunk) stream.end(chunk);
    else stream.end();
  };

  return res;
}

const server = http.createServer((req, res) => {
  const host = (req.headers.host || '').toLowerCase();

  // www → apex redirect
  if (host.startsWith('www.')) {
    const location = `https://hamilton-exteriors.com${req.url}`;
    res.writeHead(301, { Location: location });
    res.end();
    return;
  }

  // Security headers on every response
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(key, value);
  }

  const pathname = (req.url || '').split('?')[0];

  // Cache-Control for static assets
  const rule = STATIC_CACHE_RULES.find(r => r.pattern.test(pathname));
  if (rule) {
    const originalWriteHead = res.writeHead.bind(res);
    res.writeHead = function (statusCode, ...args) {
      res.setHeader('Cache-Control', rule.value);
      res.writeHead = originalWriteHead;
      return originalWriteHead(statusCode, ...args);
    };
  }

  handler(req, compressResponse(req, res));
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);

  // IndexNow: notify Bing/Yandex/Naver of all pages after deploy.
  // Runs once on server start as a background task — no external CI needed.
  setTimeout(async () => {
    try {
      const SITE = 'https://hamilton-exteriors.com';
      const KEY = '524a5da56e0e45ef9f726d847b63daf4';

      // Fetch URLs from live sitemap
      const indexRes = await fetch(`${SITE}/sitemap-index.xml`, { signal: AbortSignal.timeout(15_000) });
      if (!indexRes.ok) throw new Error(`Sitemap: ${indexRes.status}`);
      const indexXml = await indexRes.text();
      const sitemapUrls = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1])
        .filter(u => !u.includes('image-sitemap'));

      const urls = [];
      for (const sitemapUrl of sitemapUrls) {
        const res = await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) });
        if (!res.ok) continue;
        const xml = await res.text();
        urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
      }

      if (urls.length === 0) throw new Error('No URLs found in sitemap');

      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'hamilton-exteriors.com',
          key: KEY,
          keyLocation: `${SITE}/${KEY}.txt`,
          urlList: urls,
        }),
      });

      console.log(`[IndexNow] Submitted ${urls.length} URLs — ${res.status}`);
    } catch (e) {
      console.warn(`[IndexNow] Skipped: ${e.message}`);
    }
  }, 5_000); // 5s delay — let the server settle before fetching its own sitemap
});

// ── Overture Maps buildings parquet — self-seed on first deploy ──────────
// If the parquet isn't on the Railway volume yet, download it in the background
// via DuckDB's httpfs extension. Takes ~10 min once; persists forever on the volume.
// While downloading, the residential gate falls back to Smarty-only (fail-open).
// Version the filename so bbox expansions trigger a fresh download.
const OVERTURE_FILE = '/data/overture-bayarea-buildings-v2.parquet';
if (!existsSync(OVERTURE_FILE) && existsSync('/data')) {
  console.log('[overture] Parquet missing at /data, starting background download...');
  (async () => {
    try {
      const duckdb = await import('duckdb');
      const db = new duckdb.default.Database(':memory:');
      const con = db.connect();
      const run = (sql) => new Promise((res, rej) => con.all(sql, (e, r) => e ? rej(e) : res(r)));
      await run(`INSTALL httpfs; LOAD httpfs;`);
      await run(`SET s3_region='us-west-2';`);
      const t0 = Date.now();
      console.log('[overture] Downloading Bay Area buildings from Overture S3 via DuckDB...');
      await run(`
        COPY (
          SELECT id, subtype, class, height, num_floors, bbox
          FROM read_parquet('s3://overturemaps-us-west-2/release/2026-03-18.0/theme=buildings/type=building/*')
          WHERE bbox.xmin >= -123.5 AND bbox.xmax <= -120.0
            AND bbox.ymin >= 36.8 AND bbox.ymax <= 39.2
        ) TO '${OVERTURE_FILE}' (FORMAT PARQUET, COMPRESSION ZSTD);
      `);
      console.log(`[overture] Done in ${((Date.now() - t0) / 1000 / 60).toFixed(1)} min.`);
    } catch (err) {
      console.warn('[overture] Background download failed:', err.message);
    }
  })();
}
