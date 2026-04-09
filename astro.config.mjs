// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Load .env so Ghost vars are available at config time
const env = loadEnv('production', process.cwd(), '');

// ── Fetch Ghost blog posts for sitemap ──────────────────────
const GHOST_URL = env.GHOST_URL || '';
const GHOST_KEY = env.GHOST_CONTENT_API_KEY || '';

/** @type {{ url: string; lastmod: string }[]} */
const blogSitemapEntries = [];

if (GHOST_URL && GHOST_KEY) {
  try {
    let page = 1;
    let more = true;
    while (more) {
      const url = new URL(`${GHOST_URL}/ghost/api/content/posts/`);
      url.searchParams.set('key', GHOST_KEY);
      url.searchParams.set('limit', '100');
      url.searchParams.set('page', String(page));
      url.searchParams.set('fields', 'slug,updated_at,published_at');
      // Exclude service-area CMS pages, sub-service data, and internal tags
      url.searchParams.set('filter', 'tag:-hash-service-area-city+tag:-hash-service-area-county+tag:-hash-service-area-city-service+tag:-hash-hash-sub-service');
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`Ghost API ${res.status}`);
      const data = await res.json();
      const posts = data?.posts ?? [];
      for (const post of posts) {
        blogSitemapEntries.push({
          url: `https://hamilton-exteriors.com/blog/${post.slug}`,
          lastmod: post.updated_at || post.published_at,
        });
      }
      more = posts.length === 100;
      page++;
    }
    console.log(`[sitemap] Added ${blogSitemapEntries.length} blog posts`);
  } catch (e) {
    console.warn('[sitemap] Could not fetch Ghost posts for sitemap:', e.message);
  }
}

// Fetch blog tags for tag route sitemap entries
/** @type {string[]} */
const blogTagSlugs = [];
if (GHOST_URL && GHOST_KEY) {
  try {
    const tagUrl = new URL(`${GHOST_URL}/ghost/api/content/tags/`);
    tagUrl.searchParams.set('key', GHOST_KEY);
    tagUrl.searchParams.set('include', 'count.posts');
    tagUrl.searchParams.set('limit', 'all');
    const res = await fetch(tagUrl.toString(), { signal: AbortSignal.timeout(10_000) });
    if (res.ok) {
      const data = await res.json();
      const hiddenSlugs = new Set(['hash-service-area-city', 'hash-service-area-county', 'hash-service-area-city-service', 'location_page', 'location-page', 'blog-post', 'blog_post']);
      for (const t of (data.tags ?? [])) {
        if (t.count?.posts > 0 && !t.slug.startsWith('hash-') && !hiddenSlugs.has(t.slug)) {
          blogTagSlugs.push(t.slug);
        }
      }
      console.log(`[sitemap] Added ${blogTagSlugs.length} blog tag pages`);
    }
  } catch (e) {
    console.warn('[sitemap] Could not fetch Ghost tags for sitemap:', e.message);
  }
}

// Build a lookup of blog lastmod dates for the serialize function
const blogLastmodMap = new Map(blogSitemapEntries.map(e => [e.url, e.lastmod]));

// City+service URL generation for sitemap
const counties = [
  { slug: 'alameda-county-ca', cities: ['oakland-ca', 'berkeley-ca', 'fremont-ca', 'hayward-ca', 'san-leandro-ca', 'dublin-ca', 'pleasanton-ca', 'livermore-ca', 'union-city-ca', 'alameda-ca'] },
  { slug: 'contra-costa-county-ca', cities: ['antioch-ca', 'concord-ca', 'richmond-ca', 'san-ramon-ca', 'walnut-creek-ca', 'lafayette-ca', 'orinda-ca', 'danville-ca', 'brentwood-ca', 'pittsburg-ca'] },
  { slug: 'marin-county-ca', cities: ['larkspur-ca', 'mill-valley-ca', 'novato-ca', 'san-rafael-ca'] },
  { slug: 'napa-county-ca', cities: ['napa-ca', 'american-canyon-ca', 'st-helena-ca', 'calistoga-ca', 'yountville-ca'] },
  { slug: 'santa-clara-county-ca', cities: ['san-jose-ca', 'palo-alto-ca', 'mountain-view-ca', 'sunnyvale-ca', 'cupertino-ca', 'santa-clara-ca', 'saratoga-ca', 'los-gatos-ca', 'campbell-ca', 'milpitas-ca'] },
  { slug: 'san-mateo-county-ca', cities: ['redwood-city-ca', 'san-mateo-ca', 'burlingame-ca', 'daly-city-ca', 'south-san-francisco-ca'] },
];
const services = ['roofing', 'siding', 'windows', 'adu', 'custom-homes', 'additions'];

const cityPages = counties.flatMap(c =>
  c.cities.map(city => `https://hamilton-exteriors.com/service-areas/${c.slug}/${city}`)
);

const cityServicePages = counties.flatMap(c =>
  c.cities.flatMap(city =>
    services.map(s => `https://hamilton-exteriors.com/service-areas/${c.slug}/${city}/${s}`)
  )
);

// County+service pages (6 counties x 6 services = 36 pages)
const countyServicePages = counties.flatMap(c =>
  services.map(s => `https://hamilton-exteriors.com/service-areas/${c.slug}/${s}`)
);

// Sub-service pages — fetched dynamically from Ghost CMS
/** @type {string[]} */
const subServicePages = [];
if (GHOST_URL && GHOST_KEY) {
  try {
    let page = 1;
    let more = true;
    while (more) {
      const url = new URL(`${GHOST_URL}/ghost/api/content/posts/`);
      url.searchParams.set('key', GHOST_KEY);
      url.searchParams.set('limit', '100');
      url.searchParams.set('page', String(page));
      url.searchParams.set('formats', 'html');
      url.searchParams.set('include', 'tags');
      url.searchParams.set('filter', 'tag:hash-hash-sub-service');
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`Ghost API ${res.status}`);
      const data = await res.json();
      const posts = data?.posts ?? [];
      for (const post of posts) {
        // Extract parentService/typeSlug from the JSON embedded in Ghost HTML
        const jsonMatch = post.html?.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
        if (jsonMatch?.[1]) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed.parentService && parsed.typeSlug) {
              subServicePages.push(`https://hamilton-exteriors.com/${parsed.parentService}/${parsed.typeSlug}`);
            }
          } catch { /* skip malformed */ }
        }
      }
      more = posts.length === 100;
      page++;
    }
    console.log(`[sitemap] Added ${subServicePages.length} sub-service pages from Ghost`);
  } catch (e) {
    console.warn('[sitemap] Could not fetch sub-service pages from Ghost:', e.message);
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://hamilton-exteriors.com',
  trailingSlash: 'never',
  compressHTML: true,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({
    customSitemaps: [
      'https://hamilton-exteriors.com/image-sitemap.xml',
    ],
    customPages: [
      // Top-level service pages not auto-discovered by SSR
      'https://hamilton-exteriors.com/roofing',
      'https://hamilton-exteriors.com/siding',
      'https://hamilton-exteriors.com/windows',
      'https://hamilton-exteriors.com/adu',
      'https://hamilton-exteriors.com/custom-homes',
      'https://hamilton-exteriors.com/additions',
      // Sub-service pages (26 pages)
      ...subServicePages,
      // Blog posts from Ghost CMS
      ...blogSitemapEntries.map(e => e.url),
      // Blog tag pages
      ...blogTagSlugs.map(slug => `https://hamilton-exteriors.com/blog/tag/${slug}`),
      // City pages (44 cities)
      ...cityPages,
      // City+service pages (44 cities x 6 services = 264 pages)
      ...cityServicePages,
      // County+service pages (6 counties x 6 services = 36 pages)
      ...countyServicePages,
    ],
    filter: (page) => {
      // Exclude noindex pages from sitemap (exact pathname match against end of URL)
      const exclude = ['/success', '/quote-calculator', '/404', '/privacy-policy', '/privacy-notice-ca', '/terms', '/eeo-policy', '/opt-out', '/additions-2', '/additions-3', '/blog/coming-soon', '/blog/untitled', '/buy/scan'];
      // Exact-match pages (not substring): /about is a redirect, /buy is noindex
      const exactExclude = ['/about', '/buy'];
      const pagePath = new URL(page).pathname;
      return !exclude.some(path => page.includes(path)) && !exactExclude.includes(pagePath);
    },
    serialize: (item) => {
      const path = new URL(item.url).pathname;

      // Blog posts: use real content-change dates from Ghost CMS
      const blogDate = blogLastmodMap.get(item.url);
      if (blogDate) {
        item.lastmod = new Date(blogDate).toISOString().split('T')[0];
      } else {
        // Use stable dates for non-blog pages instead of today's date
        // (identical lastmod across all URLs trains Google to ignore the signal)
        const CORE_PAGE_DATES = {
          '/': '2026-04-05',
          '/roofing': '2026-04-05',
          '/siding': '2026-03-30',
          '/windows': '2026-03-30',
          '/adu': '2026-03-30',
          '/custom-homes': '2026-03-30',
          '/additions': '2026-03-30',
          '/service-areas': '2026-03-30',
          '/about/alex-hamilton-li': '2026-04-05',
        };
        // Blog index uses newest post date; all others use stable dates
        const newestBlogDate = blogSitemapEntries.length
          ? blogSitemapEntries.reduce((a, b) => a.lastmod > b.lastmod ? a : b).lastmod
          : null;
        const blogIndexDate = newestBlogDate ? new Date(newestBlogDate).toISOString().split('T')[0] : '2026-03-30';
        item.lastmod = path === '/blog' ? blogIndexDate : (CORE_PAGE_DATES[path] || '2026-03-30');
      }

      // Google ignores changefreq and priority — omit them to keep sitemap clean
      delete item.changefreq;
      delete item.priority;

      return item;
    },
  })],
  build: {
    // Inline ALL CSS into HTML to eliminate render-blocking stylesheet requests (fixes LCP)
    inlineStylesheets: 'always',
  },
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.companycam.com' },
      { protocol: 'https', hostname: 'companycam.imgix.net' },
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
