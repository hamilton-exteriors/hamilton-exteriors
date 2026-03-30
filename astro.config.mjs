// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
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
