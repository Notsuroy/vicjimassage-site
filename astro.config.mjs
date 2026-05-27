import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://vicjimassage.com.br',
  integrations: [tailwind()],
  build: { format: 'directory' },
});
