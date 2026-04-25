import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://refaelach.github.io',
  base: '/gmba-class-19-skills',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
