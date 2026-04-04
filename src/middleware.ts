import { defineMiddleware } from 'astro:middleware';

/**
 * Performance middleware — sets Cache-Control headers based on response type.
 *
 * - Static assets (images, fonts, CSS, JS): immutable, 1-year cache
 * - HTML pages: 5 min browser cache, 1 hour CDN cache
 * - API routes: no-store
 */
// Permanent redirects for common probes and URL aliases
const REDIRECTS: Record<string, string> = {
  '/sitemap.xml': '/sitemap-index.xml',
  '/privacy': '/privacy-policy',
  '/blog/untitled-2': '/blog',
};

const GHOST_ORIGIN = 'https://ghost-production-42337.up.railway.app';

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

  const response = await next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  response.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://api.mapbox.com https://backoffice-production-99b7.up.railway.app",
    "style-src 'self' 'unsafe-inline'",
    "img-src * data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.google.com https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.com https://*.conversionsapigateway.com https://*.a.run.app https://hamilton-exteriors.com https://hamilton-exteriors-production.up.railway.app https://backoffice-production-99b7.up.railway.app",
    "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://td.doubleclick.net https://www.facebook.com",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '));

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
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=604800');
  }

  return response;
});
