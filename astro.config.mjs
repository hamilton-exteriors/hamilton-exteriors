// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hamilton-exteriors.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({
    customPages: [
      // City pages (served by Ghost CMS via catch-all route)
      'https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca',
      'https://hamilton-exteriors.com/service-areas/alameda-county-ca/berkeley-ca',
      'https://hamilton-exteriors.com/service-areas/alameda-county-ca/fremont-ca',
      'https://hamilton-exteriors.com/service-areas/alameda-county-ca/hayward-ca',
      'https://hamilton-exteriors.com/service-areas/alameda-county-ca/san-leandro-ca',
      'https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/antioch-ca',
      'https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/concord-ca',
      'https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/richmond-ca',
      'https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/san-ramon-ca',
      'https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/walnut-creek-ca',
      'https://hamilton-exteriors.com/service-areas/marin-county-ca/larkspur-ca',
      'https://hamilton-exteriors.com/service-areas/marin-county-ca/mill-valley-ca',
      'https://hamilton-exteriors.com/service-areas/marin-county-ca/novato-ca',
      'https://hamilton-exteriors.com/service-areas/marin-county-ca/san-rafael-ca',
      'https://hamilton-exteriors.com/service-areas/napa-county-ca/napa-ca',
      'https://hamilton-exteriors.com/service-areas/napa-county-ca/american-canyon-ca',
      'https://hamilton-exteriors.com/service-areas/napa-county-ca/st-helena-ca',
      'https://hamilton-exteriors.com/service-areas/napa-county-ca/calistoga-ca',
      'https://hamilton-exteriors.com/service-areas/napa-county-ca/yountville-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/san-jose-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/palo-alto-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/mountain-view-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/sunnyvale-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/cupertino-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/santa-clara-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/saratoga-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/los-gatos-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/campbell-ca',
      'https://hamilton-exteriors.com/service-areas/santa-clara-county-ca/milpitas-ca',
    ],
    filter: (page) => {
      // Exclude noindex pages from sitemap
      const exclude = ['/success', '/quote-calculator', '/404', '/privacy-policy', '/privacy-notice-ca', '/terms', '/eeo-policy', '/opt-out'];
      return !exclude.some(path => page.includes(path));
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
