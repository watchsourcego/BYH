import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, hreflangCodes } from "./src/i18n/config.ts";

export default defineConfig({
  site: "https://byhtimepiece.com",
  output: "static",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale,
        locales: hreflangCodes,
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["ar", "de", "en", "es", "fr", "id", "pt", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
