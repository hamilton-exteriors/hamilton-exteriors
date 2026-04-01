import { defineMiddleware } from 'astro:middleware';

/**
 * Performance middleware — sets Cache-Control headers based on response type.
 *
 * - Static assets (images, fonts, CSS, JS): immutable, 1-year cache
 * - HTML pages: 5 min browser cache, 1 hour CDN cache
 * - API routes: no-store
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = context.url;

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
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('text/html') || !contentType) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
  }

  return response;
});
