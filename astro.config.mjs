// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Set PUBLIC_SITE_URL in CI/hosting environment to override for production.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://tejesh.me",
  integrations: [react(), mdx(), sitemap()]
});