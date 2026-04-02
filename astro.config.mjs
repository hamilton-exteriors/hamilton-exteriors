// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Load .env so Ghost vars are available at config time
const env = loadEnv('production', process.cwd(), 'PUBLIC_');

// ── Fetch Ghost blog posts for sitemap ──────────────────────
const GHOST_URL = env.PUBLIC_GHOST_URL || '';
const GHOST_KEY = env.PUBLIC_GHOST_CONTENT_API_KEY || '';

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
      // Exclude service-area CMS pages and internal tags
      url.searchParams.set('filter', 'tag:-hash-service-area-city+tag:-hash-service-area-county+tag:-hash-service-area-city-service');
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

// Build a lookup of blog lastmod dates for the serialize function
const blogLastmodMap = new Map(blogSitemapEntries.map(e => [e.url, e.lastmod]));
const buildDate = new Date().toISOString();

// City+service URL generation for sitemap
const counties = [
  { slug: 'alameda-county-ca', cities: ['oakland-ca', 'berkeley-ca', 'fremont-ca', 'hayward-ca', 'san-leandro-ca'] },
  { slug: 'contra-costa-county-ca', cities: ['antioch-ca', 'concord-ca', 'richmond-ca', 'san-ramon-ca', 'walnut-creek-ca'] },
  { slug: 'marin-county-ca', cities: ['larkspur-ca', 'mill-valley-ca', 'novato-ca', 'san-rafael-ca'] },
  { slug: 'napa-county-ca', cities: ['napa-ca', 'american-canyon-ca', 'st-helena-ca', 'calistoga-ca', 'yountville-ca'] },
  { slug: 'santa-clara-county-ca', cities: ['san-jose-ca', 'palo-alto-ca', 'mountain-view-ca', 'sunnyvale-ca', 'cupertino-ca', 'santa-clara-ca', 'saratoga-ca', 'los-gatos-ca', 'campbell-ca', 'milpitas-ca'] },
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

// County+service pages (5 counties x 6 services = 30 pages)
const countyServicePages = counties.flatMap(c =>
  services.map(s => `https://hamilton-exteriors.com/service-areas/${c.slug}/${s}`)
);

// https://astro.build/config
export default defineConfig({
  site: 'https://hamilton-exteriors.com',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({
    customPages: [
      // Blog posts from Ghost CMS
      ...blogSitemapEntries.map(e => e.url),
      // City pages (29 cities)
      ...cityPages,
      // City+service pages (29 cities x 6 services = 174 pages)
      ...cityServicePages,
      // County+service pages (5 counties x 6 services = 30 pages)
      ...countyServicePages,
    ],
    filter: (page) => {
      // Exclude noindex pages from sitemap
      const exclude = ['/success', '/quote-calculator', '/404', '/privacy-policy', '/privacy-notice-ca', '/terms', '/eeo-policy', '/opt-out', '/buy/scan', '/additions-2', '/additions-3', '/blog/coming-soon', '/blog/untitled'];
      return !exclude.some(path => page.includes(path));
    },
    serialize: (item) => {
      // Add lastmod for blog posts (real content-change dates from Ghost)
      const blogDate = blogLastmodMap.get(item.url);
      if (blogDate) {
        item.lastmod = new Date(blogDate).toISOString();
      } else {
        // For non-blog pages, use build date so Google can prioritize crawling
        item.lastmod = buildDate;
      }
      return item;
    },
  })],
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
