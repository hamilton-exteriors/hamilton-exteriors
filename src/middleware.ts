import { defineMiddleware } from 'astro:middleware';
import crypto from 'node:crypto';

/**
 * Middleware — security headers (CSP nonces), caching, redirects, Ghost media proxy.
 *
 * CSP nonces: A unique nonce is generated per request and injected into all <script>
 * tags via HTML rewriting. Combined with 'strict-dynamic', this allows:
 * - Nonced inline scripts (GTM, Mapbox, etc.)
 * - Scripts dynamically created by trusted scripts (GTM tag injection)
 * - Astro-bundled external scripts (via nonce on their <script type="module"> tags)
 */
// Permanent redirects for common probes and URL aliases
const REDIRECTS: Record<string, string> = {
  '/sitemap.xml': '/sitemap-index.xml',
  '/privacy': '/privacy-policy',
  '/blog/untitled-2': '/blog',
  '/additions-2': '/additions',
  '/additions-3': '/additions',
};

const GHOST_ORIGIN = import.meta.env.GHOST_URL || '';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Handle permanent redirects before processing
  const redirectTo = REDIRECTS[pathname];
  if (redirectTo) {
    return new Response(null, { status: 301, headers: { Location: redirectTo } });
  }

  // Proxy Ghost media through canonical domain — avoids fragile Railway subdomain in OG tags
  if (pathname.startsWith('/content/images/')) {
    const ghostUrl = `${GHOST_ORIGIN}${pathname}`;
    const upstream = await fetch(ghostUrl, { signal: AbortSignal.timeout(10_000) });
    if (!upstream.ok) return new Response(null, { status: upstream.status });
    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  // Generate per-request nonce for CSP
  const nonce = crypto.randomUUID();
  context.locals.nonce = nonce;

  const response = await next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), browsing-topics=()');

  // CSP with nonce + strict-dynamic:
  // - 'nonce-xxx': trusts inline scripts with this nonce
  // - 'strict-dynamic': trusts scripts created by nonced scripts (GTM tag injection)
  // - 'unsafe-inline': fallback for browsers that don't support nonces (ignored when nonce present)
  // - https:: fallback for browsers that don't support strict-dynamic
  const csp = [
    "default-src 'self'",
    `script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https:`,
    "style-src 'self' 'unsafe-inline'",
    "img-src * data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.com https://*.conversionsapigateway.com https://*.a.run.app https://hamilton-exteriors.com https://hamilton-exteriors-production.up.railway.app https://backoffice-production-99b7.up.railway.app https://gtm-production-6018.up.railway.app",
    "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://td.doubleclick.net https://www.facebook.com",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // API routes — never cache
  if (pathname.startsWith('/api/') || pathname.startsWith('/api.')) {
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  // Static assets — long-lived immutable cache
  // Astro hashed assets come through /_astro/, but also catch common extensions
  const isStaticAsset =
    pathname.startsWith('/_astro/') ||
    /\.(js|css|woff2?|ttf|otf|eot|ico|svg|png|jpe?g|webp|avif|gif)$/i.test(pathname);

  if (isStaticAsset) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  }

  // HTML pages — short browser cache, longer CDN cache
  // Don't cache error responses (404s are transient)
  const contentType = response.headers.get('Content-Type') || '';
  if (response.status >= 400) {
    response.headers.set('Cache-Control', 'no-store');
  } else if (contentType.includes('text/html') || !contentType) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  }

  // Inject nonces into all <script> tags for HTML responses.
  // This covers Astro-bundled modules, is:inline scripts, and define:vars scripts.
  // JSON-LD <script type="application/ld+json"> gets a nonce too — harmless, not executed.
  if (contentType.includes('text/html') && response.body) {
    const html = await response.text();
    const noncedHtml = html.replace(/<script(?=[\s>])/gi, `<script nonce="${nonce}"`);
    return new Response(noncedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return response;
});
