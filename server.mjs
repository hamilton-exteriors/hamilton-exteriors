/**
 * Custom server wrapper for the Astro Node standalone adapter.
 *
 *  1. Cache-Control for static assets
 *  2. Security headers
 *  3. www → apex 301 redirect
 *
 * Note: Brotli/gzip compression is handled by Railway's CDN edge,
 * so we don't compress here.
 */

import http from 'node:http';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';

const { handler } = await import('./dist/server/entry.mjs');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = process.env.HOST ?? '0.0.0.0';

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

  handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
