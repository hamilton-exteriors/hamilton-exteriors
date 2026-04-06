/**
 * Custom server wrapper for the Astro Node standalone adapter.
 *
 *  1. Brotli compression for text assets (HTML, CSS, JS, SVG, JSON)
 *  2. Cache-Control for /fonts/ (1 week) and /images/ (1 day)
 *  3. www → apex 301 redirect
 */

import http from 'node:http';
import { createBrotliCompress, constants } from 'node:zlib';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';

const { handler } = await import('./dist/server/entry.mjs');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = process.env.HOST ?? '0.0.0.0';

const COMPRESSIBLE = /^text\/|\/json|\/javascript|\/xml|\/svg\+xml|\/html/i;
const MIN_SIZE = 1024;

const STATIC_CACHE_RULES = [
  { pattern: /^\/_astro\//i, value: 'public, max-age=31536000, immutable' },
  { pattern: /^\/fonts\//i, value: 'public, max-age=604800' },
  { pattern: /^\/images\//i, value: 'public, max-age=86400' },
  { pattern: /^\/favicon/i, value: 'public, max-age=604800' },
];

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Content-Security-Policy': "frame-ancestors 'self'",
};

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
  const acceptsBr = (req.headers['accept-encoding'] || '').includes('br');

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

  // If client doesn't accept Brotli, skip compression
  if (!acceptsBr) {
    handler(req, res);
    return;
  }

  // Intercept the response to apply Brotli.
  // Astro's static file handler may never call writeHead explicitly (it relies
  // on Node's implicit header flush during write), so we buffer everything and
  // flush in end() using headArgs if available, or status 200 as default.
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);
  const originalWriteHead2 = res.writeHead.bind(res);
  const chunks = [];
  let headArgs = null;

  res.writeHead = function (statusCode, ...args) {
    headArgs = [statusCode, ...args];
    return res;
  };

  res.write = function (chunk) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    return true;
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    const body = Buffer.concat(chunks);
    const contentType = res.getHeader('content-type') || '';
    const contentEncoding = res.getHeader('content-encoding');
    const shouldCompress = !contentEncoding && COMPRESSIBLE.test(contentType) && body.length >= MIN_SIZE;

    if (shouldCompress) {
      res.removeHeader('content-length');
      res.setHeader('content-encoding', 'br');
      res.setHeader('vary', 'Accept-Encoding');
      originalWriteHead2(...(headArgs || [200]));

      const br = createBrotliCompress({
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 4,
        },
      });
      br.on('data', (c) => originalWrite(c));
      br.on('end', () => originalEnd());
      br.end(body);
    } else {
      originalWriteHead2(...(headArgs || [200]));
      originalEnd(body);
    }
  };

  handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
