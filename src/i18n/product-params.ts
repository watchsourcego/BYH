import type { TranslateFn } from "./ui";

/** English section titles from parameters.txt → message key. */
const SECTION_KEYS: Record<string, string> = {
  "Basic Info": "ProductParam.sections.basicInfo",
  "Dimensions & Weight": "ProductParam.sections.dimensionsWeight",
  Materials: "ProductParam.sections.materials",
};

/** English field labels from parameters.txt → message key. */
const LABEL_KEYS: Record<string, string> = {
  "Item Name": "ProductParam.labels.itemName",
  "Model / Item NO.": "ProductParam.labels.modelNo",
  Movement: "ProductParam.labels.movement",
  Battery: "ProductParam.labels.battery",
  "Available Colors": "ProductParam.labels.availableColors",
  Functions: "ProductParam.labels.functions",
  "Water Resistance": "ProductParam.labels.waterResistance",
  Waterproof: "ProductParam.labels.waterproof",
  "Case Size": "ProductParam.labels.caseSize",
  "Case Thickness": "ProductParam.labels.caseThickness",
  "Lanyard Diameter": "ProductParam.labels.lanyardDiameter",
  "Total Length": "ProductParam.labels.totalLength",
  "Lanyard Perimeter": "ProductParam.labels.lanyardPerimeter",
  "Net Weight": "ProductParam.labels.netWeight",
  "Band Width": "ProductParam.labels.bandWidth",
  "Wrist Fit / Perimeter": "ProductParam.labels.wristFitPerimeter",
  "Case Material": "ProductParam.labels.caseMaterial",
  "Lanyard / Strap Material": "ProductParam.labels.lanyardStrapMaterial",
  "Strap Material": "ProductParam.labels.strapMaterial",
  "Mirror / Crystal": "ProductParam.labels.mirrorCrystal",
  Mirror: "ProductParam.labels.mirror",
  "Clasp / Hook Material": "ProductParam.labels.claspHookMaterial",
  "Buckle / Pin Material": "ProductParam.labels.bucklePinMaterial",
  Buckle: "ProductParam.labels.buckle",
  Caseback: "ProductParam.labels.caseback",
};

/** Repeated catalog values → message key (exact English match). */
const VALUE_KEYS: Record<string, string> = {
  No: "ProductParam.values.no",
  "Yes (Waterproof)": "ProductParam.values.yesWaterproof",
  "LED Digital Movement": "ProductParam.values.ledDigitalMovement",
  "Hour, Minute, Second, Month, Date": "ProductParam.values.functionsStandard",
  "1130 Button Cell × 2 pcs": "ProductParam.values.batteryCells",
  "Plastic ABS": "ProductParam.values.plasticAbs",
  "Plastic TPU": "ProductParam.values.plasticTpu",
  "Plastic TPE": "ProductParam.values.plasticTpe",
  "Plastic PC": "ProductParam.values.plasticPc",
  "Plastic Back Cover": "ProductParam.values.plasticBackCover",
  "Plastic ABS Base Sealing": "ProductParam.values.plasticAbsBaseSealing",
  "Braided Fabric": "ProductParam.values.braidedFabric",
  Glass: "ProductParam.values.glass",
  "Zinc Alloy": "ProductParam.values.zincAlloy",
  "Stainless Iron": "ProductParam.values.stainlessIron",
  "Stainless Steel": "ProductParam.values.stainlessSteel",
  "Stainless Steel (Stainless Iron)": "ProductParam.values.stainlessSteelIron",
  "LED Watch": "ProductParam.values.ledWatch",
  "Button LED Watch": "ProductParam.values.buttonLedWatch",
  "Touch LED Watch": "ProductParam.values.touchLedWatch",
  "Touch LED Wrist Watch": "ProductParam.values.touchLedWristWatch",
  "Touch LED Pendant Watch": "ProductParam.values.touchLedPendantWatch",
  "LED Watch (M4 Two-Color Strap Version)":
    "ProductParam.values.ledWatchM4TwoColorStrap",
  "LED Watch (M3 Transparent Version)": "ProductParam.values.ledWatchM3Transparent",
  "LED Watch ": "ProductParam.values.ledWatch",
};

export function translateParamSection(title: string, t: TranslateFn): string {
  const key = SECTION_KEYS[title];
  return key ? t(key) : title;
}

export function translateParamLabel(label: string, t: TranslateFn): string {
  const key = LABEL_KEYS[label];
  return key ? t(key) : label;
}

export function translateParamValue(value: string, t: TranslateFn): string {
  const colorsMatch = value.match(/^(\d+)\s+Colors$/i);
  if (colorsMatch) {
    const count = Number.parseInt(colorsMatch[1]!, 10);
    if (count === 1) return t("ProductParam.values.colorOne");
    return t("ProductParam.values.colors", { count });
  }

  const key = VALUE_KEYS[value];
  return key ? t(key) : value;
}

/** Variant swatch label, e.g. Color 01 → Couleur 01 */
export function translateVariantLabel(label: string, t: TranslateFn): string {
  const match = label.match(/^Color\s+(\d+)$/i);
  if (match) return t("ProductParam.variantColor", { id: match[1]! });
  return label;
}
