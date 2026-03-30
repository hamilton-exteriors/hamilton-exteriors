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
  integrations: [sitemap()],
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
