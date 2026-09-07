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
  return {
    slug,
    name: nameFromFilename(filename),
    image: `${IMAGE_BASE}/${filename}`,
  };
});

export const shopProducts: HomeProduct[] = watchCatalog.map((watch) => ({
  id: watch.slug,
  name: watch.name,
  href: `/shop/${watch.slug}`,
  image: watch.image,
  imageAlt: `BYH ${watch.name} kids watch`,
  style: { width: "clamp(140px, 18vw, 220px)" },
}));

/**
 * Each watch gets a unique scatter position — intentionally irregular,
 * inspired by skylrk.com's floating product collage.
 */
const irregularLayouts: HomeProduct["style"][] = [
  { top: "11vh", left: "6%", width: "clamp(118px, 13vw, 200px)", rotate: "-14deg", zIndex: 3 },
  { top: "32vh", left: "40%", width: "clamp(135px, 15vw, 220px)", rotate: "5deg", zIndex: 5 },
  { top: "19vh", right: "4%", width: "clamp(112px, 12vw, 188px)", rotate: "16deg", zIndex: 2 },
  { top: "34vh", left: "19%", width: "clamp(120px, 13vw, 198px)", rotate: "-6deg", zIndex: 4 },
  { top: "28vh", left: "68%", width: "clamp(115px, 13vw, 192px)", rotate: "11deg", zIndex: 3 },
  { top: "52vh", right: "11%", width: "clamp(122px, 14vw, 204px)", rotate: "-9deg", zIndex: 6 },
  { top: "58vh", left: "3%", width: "clamp(110px, 12vw, 186px)", rotate: "7deg", zIndex: 2 },
  { top: "71vh", left: "42%", width: "clamp(125px, 14vw, 208px)", rotate: "-12deg", zIndex: 4 },

  { top: "94vh", left: "13%", width: "clamp(116px, 13vw, 194px)", rotate: "10deg", zIndex: 3 },
  { top: "102vh", right: "7%", width: "clamp(124px, 14vw, 206px)", rotate: "-15deg", zIndex: 5 },
  { top: "116vh", left: "56%", width: "clamp(108px, 12vw, 182px)", rotate: "6deg", zIndex: 2 },
  { top: "131vh", left: "27%", width: "clamp(121px, 13vw, 200px)", rotate: "-8deg", zIndex: 4 },
  { top: "124vh", right: "18%", width: "clamp(114px, 13vw, 190px)", rotate: "13deg", zIndex: 3 },
  { top: "148vh", left: "8%", width: "clamp(119px, 13vw, 196px)", rotate: "-11deg", zIndex: 6 },
  { top: "155vh", left: "72%", width: "clamp(126px, 14vw, 210px)", rotate: "9deg", zIndex: 3 },
  { top: "168vh", left: "38%", width: "clamp(111px, 12vw, 184px)", rotate: "-5deg", zIndex: 2 },

  { top: "188vh", right: "5%", width: "clamp(123px, 14vw, 205px)", rotate: "12deg", zIndex: 4 },
  { top: "198vh", left: "11%", width: "clamp(117px, 13vw, 192px)", rotate: "-10deg", zIndex: 3 },
  { top: "212vh", left: "61%", width: "clamp(109px, 12vw, 180px)", rotate: "7deg", zIndex: 5 },
  { top: "226vh", left: "33%", width: "clamp(127px, 14vw, 212px)", rotate: "-13deg", zIndex: 2 },
  { top: "241vh", right: "14%", width: "clamp(113px, 13vw, 188px)", rotate: "15deg", zIndex: 4 },
  { top: "252vh", left: "5%", width: "clamp(120px, 13vw, 198px)", rotate: "-7deg", zIndex: 3 },
  { top: "264vh", left: "49%", width: "clamp(115px, 13vw, 192px)", rotate: "10deg", zIndex: 6 },
  { top: "278vh", left: "22%", width: "clamp(122px, 14vw, 202px)", rotate: "-9deg", zIndex: 4 },
];

export const homeProducts: HomeProduct[] = watchCatalog.map((watch, index) => ({
  id: watch.slug,
  name: watch.name,
  href: `/shop/${watch.slug}`,
  image: watch.image,
  imageAlt: `BYH ${watch.name} kids watch`,
  style: irregularLayouts[index],
}));

export const galleryHeightVh = 318;
