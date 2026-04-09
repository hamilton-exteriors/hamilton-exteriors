/**
 * Custom server wrapper for the Astro Node standalone adapter.
 *
 *  1. Brotli/gzip compression for SSR responses
 *  2. Cache-Control for static assets
 *  3. Security headers
 *  4. www → apex 301 redirect
 */

import http from 'node:http';
import zlib from 'node:zlib';

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
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
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
});
