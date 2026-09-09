import fs from "node:fs";
import path from "node:path";

const locales = ["es", "de", "fr", "ar", "id", "pt", "ru"];
const pages = [
  { rel: "index.astro", importPath: "../index.astro" },
  { rel: "about.astro", importPath: "../about.astro" },
  { rel: "contact.astro", importPath: "../contact.astro" },
  { rel: "shop.astro", importPath: "../shop.astro" },
  { rel: "policies/index.astro", importPath: "../../policies/index.astro" },
  { rel: "policies/terms-of-service.astro", importPath: "../../policies/terms-of-service.astro" },
  { rel: "policies/privacy-policy.astro", importPath: "../../policies/privacy-policy.astro" },
  { rel: "policies/refund-policy.astro", importPath: "../../policies/refund-policy.astro" },
  { rel: "policies/shipping-tax.astro", importPath: "../../policies/shipping-tax.astro" },
];

const root = path.join(process.cwd(), "src", "pages");

for (const locale of locales) {
  for (const page of pages) {
    const target = path.join(root, locale, page.rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(
      target,
      `---\nimport Page from "${page.importPath}";\n---\n\n<Page />\n`,
      "utf8",
    );
  }

  const slugTarget = path.join(root, locale, "shop", "[slug].astro");
  fs.mkdirSync(path.dirname(slugTarget), { recursive: true });
  fs.writeFileSync(
    slugTarget,
    `---\nimport Page from "../../shop/[slug].astro";\nimport { productSlugStaticPaths } from "@/lib/product-slug-paths";\n\nexport function getStaticPaths() {\n  return productSlugStaticPaths();\n}\n---\n\n<Page />\n`,
    "utf8",
  );
}

console.log("Locale pages generated.");
