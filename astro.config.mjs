import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://noticiasgeopolitica.vercel.app',
  integrations: [tailwind(), mdx()],
  adapter: vercel(),
});

