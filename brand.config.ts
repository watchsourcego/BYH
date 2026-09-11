/**
 * Single source of truth for this brand site.
 * BYH — children's watch manufacturer.
 */
export const brand = {
  name: "BYHTIMEPIECE",
  legalName: "BYH Electronic Watch Co., Ltd.",
  tagline: "Youthful watches built for every adventure.",
  siteUrl: "https://byhtimepiece.com",
  /**
   * Silences Facebook Sharing Debugger “missing fb:app_id” only — does not change link previews.
   * Replace with your App ID from Meta for Developers if you create a Facebook app.
   */
  facebookAppId: "966242223397117",
  seo: {
    description:
      "BYH — Manufacturer of kids LED touch-screen digital watches. Wholesale & OEM from Dongguan, China.",
    homeIntro:
      "Kids LED touch-screen digital watches built for every adventure. Explore our full collection or learn about our factory in Dongguan.",
    /** White background — Open Graph, WhatsApp, Facebook (square fills preview better) */
    ogImage: "/logo/BYH-logo.webp",
    ogImageWidth: 800,
    ogImageHeight: 800,
  },

  logos: {
    /** White background, black wordmark — social previews & favicon */
    solid: "/logo/BYH-logo.webp",
    /** Transparent background, black wordmark — light surfaces */
    dark: "/logo/BYH-logo-black-Transparent.webp",
    /** Transparent background, white wordmark — headers & gradient backgrounds */
    light: "/logo/BYH-logo-white-Transparent.webp",
  },
  supportEmail: "support@byhtimepiece.com",
  whatsapp: "+86 180 2429 0526",
  whatsappUrl: "https://wa.me/8618024290526",
  address: {
    line1: "No. 8, Jinshagang 6th Road",
    city: "Dongguan",
    region: "Guangdong",
    country: "China",
    full: "No. 8, Jinshagang 6th Road, Dongguan, China",
    lat: 22.9531,
    lng: 113.7179,
  },

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
