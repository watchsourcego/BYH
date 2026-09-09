/** Parse CNY amount from catalog price lines like `Price 2.7¥`. */
export function parseCnyFromPrice(price: string): number | null {
  const match = price.match(/([\d,.]+)\s*¥/);
  if (!match) return null;
  const value = Number.parseFloat(match[1].replace(",", ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}
