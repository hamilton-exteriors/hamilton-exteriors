/**
 * Custom server wrapper for the Astro Node standalone adapter.
 *
 * Fixes two gaps in the default adapter:
 *  1. Compression — adds gzip for HTML, CSS, JS, SVG, JSON
 *  2. Font caching — sets Cache-Control for /fonts/ (1 week)
 *     and /images/ static assets (1 day)
 *
 * The adapter already handles /_astro/ hashed assets with immutable caching,
 * but fonts in /fonts/ default to max-age=0 because the `send` library
 * only respects the adapter's assetsDir (_astro/).
 */

import http from 'node:http';
import compression from 'compression';

// Prevent the adapter from auto-starting its own server
process.env.ASTRO_NODE_AUTOSTART = 'disabled';

const { handler } = await import('./dist/server/entry.mjs');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = process.env.HOST ?? '0.0.0.0';

// Configure compression middleware (threshold 1KB, level 6)
const compress = compression({ threshold: 1024, level: 6 });

/**
 * Cache-Control rules for static files not covered by the adapter:
 *  - /fonts/  → 1 week (unhashed but rarely change)
 *  - /images/ → 1 day  (unhashed)
 *  - /_astro/ → handled by adapter (immutable, 1 year)
 *  - HTML     → handled by Astro middleware (5 min browser, 1 hr CDN)
 */
const STATIC_CACHE_RULES = [
  { pattern: /^\/fonts\//i, value: 'public, max-age=604800' },        // 1 week
  { pattern: /^\/images\//i, value: 'public, max-age=86400' },        // 1 day
  { pattern: /^\/favicon/i, value: 'public, max-age=604800' },        // 1 week
];

const server = http.createServer((req, res) => {
  const pathname = (req.url || '').split('?')[0];

  // For static asset paths, intercept writeHead to override send's default max-age=0
  const rule = STATIC_CACHE_RULES.find(r => r.pattern.test(pathname));
  if (rule) {
    const originalWriteHead = res.writeHead.bind(res);
    res.writeHead = function (statusCode, ...args) {
      // Override after send has set its headers but before they're flushed
      res.setHeader('Cache-Control', rule.value);
      res.writeHead = originalWriteHead;
      return originalWriteHead(statusCode, ...args);
    };
  }

  // Run compression middleware, then delegate to Astro
  compress(req, res, () => {
    handler(req, res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
