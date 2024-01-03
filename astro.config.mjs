import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://hukasx0.github.io",
  base: '/blog',
  integrations: [tailwind(), mdx(), sitemap()],
});
