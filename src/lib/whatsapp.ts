import { brand } from "../../brand.config";

export function buildWhatsAppUrl(message: string): string {
  return `${brand.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function homeWhatsAppMessage(): string {
  return `Hi, I'm interested in BYH kids LED watches. I came from your homepage: ${brand.siteUrl}/`;
}

export function productWhatsAppMessage(options: {
  title: string;
  sku: string;
  color: string;
  pageUrl: string;
}): string {
  return [
    `Hi, I'm interested in the following product:`,
    ``,
    `Product: ${options.title}`,
    `Model: ${options.sku}`,
    `Color: ${options.color}`,
    `Page: ${options.pageUrl}`,
  ].join("\n");
}
