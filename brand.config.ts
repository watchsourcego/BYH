/**
 * Single source of truth for this brand site.
 * BYH — children's watch manufacturer.
 */
export const brand = {
  name: "BYH",
  tagline: "Youthful watches built for every adventure.",
  siteUrl: "https://byhtimepiece.com",
  supportEmail: "support@byhtimepiece.com",

  colors: {
    primary: "#0a1628",
    accent: "#ff4d6d",
    accentSecondary: "#00d4ff",
    background: "#1a1a2e",
    text: "#ffffff",
    textMuted: "rgb(255 255 255 / 0.72)",
    onPrimary: "#ffffff",
  },

  fonts: {
    display: '"Syne", system-ui, sans-serif',
    body: '"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  },

  assets: {
    baseUrl: "",
  },
} as const;

export type BrandConfig = typeof brand;

export function brandAsset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${brand.assets.baseUrl}${normalized}`;
}
