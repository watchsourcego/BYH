/**
 * Product detail pages — one entry per product folder under `public/products/`.
 * Data is loaded from each folder's `parameters.txt` and variant images at build time.
 */

import fs from "node:fs";
import path from "node:path";
import { parseParametersFile } from "../lib/parseParameters";

export interface ProductParameter {
  label: string;
  value: string;
}

export interface ProductParameterSection {
  title: string;
  items: ProductParameter[];
}

export interface ProductVariant {
  id: string;
  label: string;
  image: string;
}

export interface ProductDetail {
  slug: string;
  sku: string;
  title: string;
  price: string;
  description: string;
  imageBase: string;
  variants: ProductVariant[];
  parameters: ProductParameterSection[];
}

export const MIN_ORDER_QUANTITY = "Minimum quantity is 300pcs per color";

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

function slugFromSku(sku: string): string {
  return sku.toLowerCase();
}

function variantIdFromFilename(filename: string, index: number): string {
  const plain = filename.match(/(\d{2})\.(?:webp|png)$/i);
  if (plain) return plain[1];

  const suffixed = filename.match(/(\d{2})-[^.]+\.(?:webp|png)$/i);
  if (suffixed) return suffixed[1];

  return String(index + 1).padStart(2, "0");
}

function discoverVariants(sku: string, folderPath: string): ProductVariant[] {
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(?:webp|png)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((file, index) => {
    const id = variantIdFromFilename(file, index);
    return {
      id,
      label: `Color ${id}`,
      image: `/products/${sku}/${file}`,
    };
  });
}

function buildDescription(
  itemName: string,
  sku: string,
  sections: ProductParameterSection[],
): string {
  const basicInfo = sections.find((section) => section.title === "Basic Info");
  const colors =
    basicInfo?.items.find((item) => item.label === "Available Colors")?.value ??
    "";
  const functions =
    basicInfo?.items.find((item) => item.label === "Functions")?.value ?? "";

  const details = [colors, functions].filter(Boolean).join(". ");
  return details
    ? `${itemName} (${sku}). ${details}.`
    : `${itemName} (${sku}).`;
}

function loadProductDetail(sku: string): ProductDetail | null {
  const folderPath = path.join(PRODUCTS_DIR, sku);
  const paramsPath = path.join(folderPath, "parameters.txt");

  if (!fs.existsSync(paramsPath)) return null;

  const content = fs.readFileSync(paramsPath, "utf-8");
  const { price, sections } = parseParametersFile(content);
  const basicInfo = sections.find((section) => section.title === "Basic Info");
  const itemName =
    basicInfo?.items.find((item) => item.label === "Item Name")?.value ?? sku;
  const variants = discoverVariants(sku, folderPath);

  if (!variants.length) return null;

  const slug = slugFromSku(sku);

  return {
    slug,
    sku,
    title: itemName,
    price,
    description: buildDescription(itemName, sku, sections),
    imageBase: `/products/${sku}`,
    variants,
    parameters: sections,
  };
}

function loadAllProducts(): Record<string, ProductDetail> {
  if (!fs.existsSync(PRODUCTS_DIR)) return {};

  const products: Record<string, ProductDetail> = {};

  for (const entry of fs.readdirSync(PRODUCTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "homepage-Transparent") continue;

    const product = loadProductDetail(entry.name);
    if (product) {
      products[product.slug] = product;
    }
  }

  return products;
}

export const productDetails: Record<string, ProductDetail> = loadAllProducts();

export function getProductDetail(slug: string): ProductDetail | undefined {
  const aliases: Record<string, string> = {
    "byh-26-18": "byh-26-18-normol",
  };
  const resolvedSlug = aliases[slug] ?? slug;
  return productDetails[resolvedSlug];
}

export function getAllProductDetails(): ProductDetail[] {
  return Object.values(productDetails).sort((a, b) =>
    a.sku.localeCompare(b.sku, undefined, { numeric: true }),
  );
}
