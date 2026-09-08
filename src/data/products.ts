/**
 * Homepage & shop products.
 * Images live in `public/products/homepage-Transparent/`.
 */
export interface HomeProduct {
  id: string;
  name: string;
  href: string;
  image: string;
  imageAlt: string;
  style: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: string;
    rotate?: string;
    zIndex?: number;
  };
}

const IMAGE_BASE = "/products/homepage-Transparent";

const homepageImages = [
  "BYH-26-1.webp",
  "BYH-26-2.webp",
  "BYH-26-3.webp",
  "BYH-26-4.webp",
  "BYH-26-5.webp",
  "BYH-26-6.webp",
  "BYH-26-7.webp",
  "BYH-26-8.webp",
  "BYH-26-9.webp",
  "BYH-26-10.webp",
  "BYH-26-11.webp",
  "BYH-26-12.webp",
  "BYH-26-13.webp",
  "BYH-26-14.webp",
  "BYH-26-15.webp",
  "BYH-26-16.webp",
  "BYH-26-17.webp",
  "BYH-26-18.webp",
  "BYH-26-18-Christmas.webp",
  "BYH-26-19.webp",
  "BYH-26-20.webp",
  "BYH-26-21.webp",
  "BYH-26-22.webp",
  "BYH-26-23.webp",
] as const;

function slugFromFilename(filename: string): string {
  return filename.replace(/\.webp$/i, "").toLowerCase();
}

function nameFromFilename(filename: string): string {
  return filename.replace(/\.webp$/i, "");
}

const watchCatalog = homepageImages.map((filename) => {
  const slug = slugFromFilename(filename);
  const hrefSlug = slug === "byh-26-18" ? "byh-26-18-normol" : slug;
  return {
    slug,
    hrefSlug,
    name: nameFromFilename(filename),
    image: `${IMAGE_BASE}/${filename}`,
  };
});

export const shopProducts: HomeProduct[] = watchCatalog.map((watch) => ({
  id: watch.slug,
  name: watch.name,
  href: `/shop/${watch.hrefSlug}`,
  image: watch.image,
  imageAlt: `BYH ${watch.name} kids watch`,
  style: { width: "clamp(140px, 18vw, 220px)" },
}));

/**
 * Desktop scatter — watches spread across the full width in organic bands.
 * Center text zone (~26%–74% × 14vh–44vh) stays clear on the hero screen.
 */
const irregularLayouts: HomeProduct["style"][] = [
  // Hero — 0–80vh
  { top: "9vh", left: "12%", width: "clamp(115px, 12vw, 190px)", rotate: "-14deg", zIndex: 3 },
  { top: "13vh", left: "68%", width: "clamp(112px, 12vw, 185px)", rotate: "6deg", zIndex: 2 },
  { top: "24vh", left: "20%", width: "clamp(110px, 11vw, 180px)", rotate: "9deg", zIndex: 4 },
  { top: "22vh", left: "76%", width: "clamp(112px, 12vw, 188px)", rotate: "-11deg", zIndex: 3 },
  { top: "48vh", left: "16%", width: "clamp(118px, 13vw, 195px)", rotate: "-7deg", zIndex: 5 },
  { top: "50vh", left: "64%", width: "clamp(120px, 13vw, 198px)", rotate: "12deg", zIndex: 4 },
  { top: "64vh", left: "32%", width: "clamp(112px, 12vw, 186px)", rotate: "5deg", zIndex: 3 },
  { top: "70vh", left: "78%", width: "clamp(118px, 13vw, 192px)", rotate: "-13deg", zIndex: 5 },

  // Band 2 — 85–160vh
  { top: "88vh", left: "10%", width: "clamp(116px, 13vw, 194px)", rotate: "10deg", zIndex: 3 },
  { top: "94vh", left: "72%", width: "clamp(122px, 13vw, 204px)", rotate: "-14deg", zIndex: 5 },
  { top: "106vh", left: "38%", width: "clamp(108px, 12vw, 182px)", rotate: "4deg", zIndex: 2 },
  { top: "114vh", left: "58%", width: "clamp(118px, 13vw, 196px)", rotate: "-9deg", zIndex: 4 },
  { top: "122vh", left: "18%", width: "clamp(114px, 13vw, 190px)", rotate: "11deg", zIndex: 3 },
  { top: "136vh", left: "82%", width: "clamp(122px, 14vw, 204px)", rotate: "8deg", zIndex: 3 },
  { top: "142vh", left: "28%", width: "clamp(108px, 12vw, 182px)", rotate: "-6deg", zIndex: 2 },
  { top: "154vh", left: "52%", width: "clamp(118px, 13vw, 196px)", rotate: "-10deg", zIndex: 6 },

  // Band 3 — 165–240vh
  { top: "168vh", left: "14%", width: "clamp(118px, 13vw, 196px)", rotate: "11deg", zIndex: 4 },
  { top: "180vh", left: "48%", width: "clamp(180px, 18vw, 280px)", rotate: "-10deg", zIndex: 3 },
  { top: "198vh", left: "76%", width: "clamp(110px, 12vw, 184px)", rotate: "7deg", zIndex: 5 },
  { top: "210vh", left: "22%", width: "clamp(122px, 13vw, 200px)", rotate: "-12deg", zIndex: 2 },
  { top: "222vh", left: "62%", width: "clamp(115px, 13vw, 192px)", rotate: "14deg", zIndex: 4 },
  { top: "234vh", left: "36%", width: "clamp(118px, 13vw, 196px)", rotate: "-8deg", zIndex: 3 },

  // Band 4 — 245–310vh
  { top: "248vh", left: "8%", width: "clamp(116px, 13vw, 194px)", rotate: "9deg", zIndex: 3 },
  { top: "272vh", left: "58%", width: "clamp(120px, 13vw, 198px)", rotate: "-11deg", zIndex: 6 },
];

export const homeProducts: HomeProduct[] = watchCatalog.map((watch, index) => ({
  id: watch.slug,
  name: watch.name,
  href: `/shop/${watch.hrefSlug}`,
  image: watch.image,
  imageAlt: `BYH ${watch.name} kids watch`,
  style: irregularLayouts[index],
}));

export const galleryHeightVh = 318;
