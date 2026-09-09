import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://byhtimepiece.com",
  output: "static",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["ar", "de", "en", "es", "fr", "id", "pt", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
