import type { ProductParameterSection } from "../data/productDetails";

export interface ParsedParameters {
  price: string;
  sections: ProductParameterSection[];
}

export function parseParametersFile(content: string): ParsedParameters {
  const lines = content.split(/\r?\n/);
  const price = lines[0]?.trim() ?? "";

  const sections: ProductParameterSection[] = [];
  let currentSection: ProductParameterSection | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      if (currentSection?.items.length) {
        sections.push(currentSection);
        currentSection = null;
      }
      continue;
    }

    const tabIndex = line.indexOf("\t");
    if (tabIndex === -1) continue;

    const label = line.slice(0, tabIndex).trim();
    const value = line.slice(tabIndex + 1).trim();

    if (!value) {
      if (currentSection?.items.length) {
        sections.push(currentSection);
      }
      currentSection = { title: label, items: [] };
      continue;
    }

    if (!currentSection) continue;
    currentSection.items.push({ label, value });
  }

  if (currentSection?.items.length) {
    sections.push(currentSection);
  }

  return { price, sections };
}
