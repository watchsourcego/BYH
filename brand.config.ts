/**
 * Single source of truth for this brand site.
 * Fork this template per watch manufacturer — edit this file first.
 */
export const brand = {
  name: "Alpina Watch Co.",
  tagline: "Precision instruments for everyday adventure.",
  siteUrl: "https://example.com",

  colors: {
    primary: "#1a2744",
    accent: "#c9a962",
    background: "#faf9f7",
    text: "#1c1c1c",
    textMuted: "#5c5c5c",
    onPrimary: "#ffffff",
  },

  fonts: {
    display: '"Playfair Display", Georgia, "Times New Roman", serif',
    body: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
  },

  /**
   * Image base URL.
   * - "" → load from this site's `public/` folder (Cloudflare Pages deploy).
   * - "https://cdn.example.com/brand-alpha" → R2 or shared CDN prefix.
   */
  assets: {
    baseUrl: "",
  },

  hero: {
    /** Relative to assets.baseUrl, or absolute if it starts with http */
    image: "/hero/main.webp",
    imageAlt: "Alpina chronograph on a leather strap",
    eyebrow: "Swiss heritage · 1926",
    headline: "Built for the hours that matter.",
    subhead:
      "Tool watches with clean dials, tight tolerances, and finishes that age with character.",
    cta: {
      label: "Explore collection",
      href: "/products",
    },
    secondaryCta: {
      label: "Our story",
      href: "/about",
    },
  },
} as const;

export type BrandConfig = typeof brand;

/** Resolve a brand asset path against optional CDN base. */
export function brandAsset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${brand.assets.baseUrl}${normalized}`;
}
