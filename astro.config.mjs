// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

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
      // City pages (29 cities)
      ...cityPages,
      // City+service and county+service pages excluded until Ghost CMS data exists
      // (174 + 30 pages were 404ing, polluting sitemap with dead URLs)
    ],
    filter: (page) => {
      // Exclude noindex pages from sitemap
      const exclude = ['/success', '/quote-calculator', '/404', '/privacy-policy', '/privacy-notice-ca', '/terms', '/eeo-policy', '/opt-out', '/buy/scan', '/additions-2', '/additions-3'];
      return !exclude.some(path => page.includes(path));
    },
    serialize: (item) => {
      // Don't set lastmod — a per-build timestamp is meaningless to crawlers
      delete item.lastmod;
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
