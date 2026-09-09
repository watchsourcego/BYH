export type DisplayCurrencyCode =
  | "CNY"
  | "USD"
  | "EUR"
  | "GBP"
  | "AUD"
  | "CAD"
  | "JPY"
  | "KRW"
  | "SGD"
  | "HKD"
  | "INR"
  | "BRL"
  | "MXN"
  | "RUB"
  | "TRY"
  | "IDR"
  | "MYR"
  | "THB"
  | "PHP"
  | "VND"
  | "AED"
  | "SAR"
  | "PLN"
  | "CHF"
  | "NZD"
  | "SEK"
  | "NOK"
  | "DKK"
  | "ILS"
  | "ZAR"
  | "PKR"
  | "NGN";

export type DisplayCurrencyOption = {
  code: DisplayCurrencyCode;
  symbol: string;
  label: string;
};

export const DISPLAY_CURRENCY_COOKIE = "byh-display-currency";

/** Session fallback so currency survives locale navigation before explicit pick. */
export const DISPLAY_CURRENCY_SESSION_KEY = "byh-display-currency-session";

export function readDisplayCurrencyCookie(): DisplayCurrencyCode | null {
  if (typeof document === "undefined") return null;
  const prefix = `${DISPLAY_CURRENCY_COOKIE}=`;
  const entry = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  if (!entry) return null;
  const value = decodeURIComponent(entry.slice(prefix.length));
  return isDisplayCurrencyCode(value) ? value : null;
}

export function writeDisplayCurrencyCookie(code: DisplayCurrencyCode): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${DISPLAY_CURRENCY_COOKIE}=${encodeURIComponent(code)};path=/;max-age=${maxAge};SameSite=Lax`;
}

export function readDisplayCurrencySession(): DisplayCurrencyCode | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const value = sessionStorage.getItem(DISPLAY_CURRENCY_SESSION_KEY);
    return value && isDisplayCurrencyCode(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeDisplayCurrencySession(code: DisplayCurrencyCode): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(DISPLAY_CURRENCY_SESSION_KEY, code);
  } catch {
    /* ignore quota / privacy mode */
  }
}

/** USD-based rates used when `/api/display-fx` is unavailable (offline / local dev). */
export const DISPLAY_FX_FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  CNY: 7.25,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.55,
  CAD: 1.4,
  JPY: 150,
  KRW: 1380,
  SGD: 1.34,
  HKD: 7.82,
  INR: 86.5,
  BRL: 5.75,
  MXN: 19.5,
  RUB: 92,
  TRY: 34.5,
  IDR: 16200,
  MYR: 4.45,
  THB: 34.2,
  PHP: 58.5,
  VND: 25450,
  AED: 3.6725,
  SAR: 3.75,
  PLN: 3.95,
  CHF: 0.88,
  NZD: 1.7,
  SEK: 10.5,
  NOK: 10.8,
  DKK: 6.9,
  ILS: 3.7,
  ZAR: 18.2,
  PKR: 278,
  NGN: 1600,
};

export const DISPLAY_CURRENCIES: DisplayCurrencyOption[] = [
  { code: "CNY", symbol: "¥", label: "CNY · ¥" },
  { code: "USD", symbol: "$", label: "USD · $" },
  { code: "EUR", symbol: "€", label: "EUR · €" },
  { code: "GBP", symbol: "£", label: "GBP · £" },
  { code: "AUD", symbol: "A$", label: "AUD · A$" },
  { code: "CAD", symbol: "C$", label: "CAD · C$" },
  { code: "JPY", symbol: "¥", label: "JPY · ¥" },
  { code: "KRW", symbol: "₩", label: "KRW · ₩" },
  { code: "SGD", symbol: "S$", label: "SGD · S$" },
  { code: "HKD", symbol: "HK$", label: "HKD · HK$" },
  { code: "INR", symbol: "₹", label: "INR · ₹" },
  { code: "BRL", symbol: "R$", label: "BRL · R$" },
  { code: "MXN", symbol: "MX$", label: "MXN · MX$" },
  { code: "RUB", symbol: "₽", label: "RUB · ₽" },
  { code: "TRY", symbol: "₺", label: "TRY · ₺" },
  { code: "IDR", symbol: "Rp", label: "IDR · Rp" },
  { code: "MYR", symbol: "RM", label: "MYR · RM" },
  { code: "THB", symbol: "฿", label: "THB · ฿" },
  { code: "PHP", symbol: "₱", label: "PHP · ₱" },
  { code: "VND", symbol: "₫", label: "VND · ₫" },
  { code: "AED", symbol: "د.إ", label: "AED · د.إ" },
  { code: "SAR", symbol: "﷼", label: "SAR · ﷼" },
  { code: "PLN", symbol: "zł", label: "PLN · zł" },
  { code: "CHF", symbol: "CHF", label: "CHF" },
  { code: "NZD", symbol: "NZ$", label: "NZD · NZ$" },
  { code: "SEK", symbol: "kr", label: "SEK · kr" },
  { code: "NOK", symbol: "kr", label: "NOK · kr" },
  { code: "DKK", symbol: "kr", label: "DKK · kr" },
  { code: "ILS", symbol: "₪", label: "ILS · ₪" },
  { code: "ZAR", symbol: "R", label: "ZAR · R" },
  { code: "PKR", symbol: "₨", label: "PKR · ₨" },
  { code: "NGN", symbol: "₦", label: "NGN · ₦" },
];

export const DISPLAY_CURRENCY_CODES = DISPLAY_CURRENCIES.map((c) => c.code);

export function isDisplayCurrencyCode(value: string): value is DisplayCurrencyCode {
  return DISPLAY_CURRENCY_CODES.includes(value as DisplayCurrencyCode);
}

export const CURRENCY_FLAG_REGION: Record<DisplayCurrencyCode, string> = {
  CNY: "CN",
  USD: "US",
  EUR: "EU",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  JPY: "JP",
  KRW: "KR",
  SGD: "SG",
  HKD: "HK",
  INR: "IN",
  BRL: "BR",
  MXN: "MX",
  RUB: "RU",
  TRY: "TR",
  IDR: "ID",
  MYR: "MY",
  THB: "TH",
  PHP: "PH",
  VND: "VN",
  AED: "AE",
  SAR: "SA",
  PLN: "PL",
  CHF: "CH",
  NZD: "NZ",
  SEK: "SE",
  NOK: "NO",
  DKK: "DK",
  ILS: "IL",
  ZAR: "ZA",
  PKR: "PK",
  NGN: "NG",
};

export function flagEmojiFromRegion(region: string): string {
  const r = region.toUpperCase();
  if (r === "EU") return "🇪🇺";
  if (r.length !== 2) return "🏳️";
  const base = 0x1f1e6;
  return [...r]
    .map((ch) => String.fromCodePoint(base + ch.charCodeAt(0) - 65))
    .join("");
}

export function currencyFlagEmoji(code: DisplayCurrencyCode): string {
  return flagEmojiFromRegion(CURRENCY_FLAG_REGION[code] ?? "XX");
}

export const LOCALE_DEFAULT_DISPLAY_CURRENCY: Record<string, DisplayCurrencyCode> = {
  en: "USD",
  de: "EUR",
  fr: "EUR",
  es: "EUR",
  pt: "BRL",
  ru: "RUB",
  ar: "AED",
  id: "IDR",
};

export function inferDisplayCurrencyFromLocale(locale: string): DisplayCurrencyCode {
  const base = locale.split("-")[0]?.toLowerCase() ?? "en";
  return LOCALE_DEFAULT_DISPLAY_CURRENCY[base] ?? "USD";
}

function getCurrencyOption(code: DisplayCurrencyCode): DisplayCurrencyOption {
  return DISPLAY_CURRENCIES.find((c) => c.code === code) ?? DISPLAY_CURRENCIES[0];
}

function formatForeignAmount(amount: number, code: DisplayCurrencyCode): string {
  const zeroDecimal = new Set<DisplayCurrencyCode>(["JPY", "KRW", "VND", "IDR"]);
  if (zeroDecimal.has(code)) return String(Math.round(amount));
  return amount.toFixed(2);
}

export function formatCnyLabel(cny: number): string {
  const body = Number.isInteger(cny) ? String(cny) : cny.toFixed(2);
  return `¥${body}`;
}

export type DisplayCnyParts = {
  /** Settlement amount, e.g. `¥3.6`. */
  cny: string;
  /** Foreign amount only, e.g. `$0.50`. Null when currency is CNY or FX is unavailable. */
  approx: string | null;
};

function formatForeignSymbolAmount(amount: number, code: DisplayCurrencyCode): string {
  const opt = getCurrencyOption(code);
  const body = formatForeignAmount(amount, code);
  if (opt.symbol.length <= 2 || opt.symbol === "RM" || opt.symbol === "Rp") {
    return `${opt.symbol}${body}`;
  }
  return `${opt.symbol} ${body}`;
}

/** Append ISO code when the symbol alone would be ambiguous (e.g. ¥ CNY vs JPY). */
const APPROX_DISAMBIGUATE = new Set<DisplayCurrencyCode>(["JPY", "SEK", "NOK", "DKK"]);

function formatApproxForeignAmount(amount: number, code: DisplayCurrencyCode): string {
  const formatted = formatForeignSymbolAmount(amount, code);
  return APPROX_DISAMBIGUATE.has(code) ? `${formatted} ${code}` : formatted;
}

/** Split catalog CNY into settlement + optional foreign reference for stacked UI. */
export function formatDisplayCnyParts(
  cny: number,
  code: DisplayCurrencyCode,
  rates: Record<string, number> | null,
): DisplayCnyParts | null {
  if (!Number.isFinite(cny) || cny < 0) return null;
  const cnyLabel = formatCnyLabel(cny);
  if (cny === 0 || code === "CNY") return { cny: cnyLabel, approx: null };
  if (!rates) return { cny: cnyLabel, approx: null };

  const amount = cnyToDisplayAmount(cny, code, rates);
  if (amount == null) return { cny: cnyLabel, approx: null };

  return { cny: cnyLabel, approx: formatApproxForeignAmount(amount, code) };
}

export function cnyToDisplayAmount(
  cny: number,
  code: DisplayCurrencyCode,
  rates: Record<string, number>,
): number | null {
  if (!Number.isFinite(cny) || cny <= 0) return null;
  if (code === "CNY") return Math.round(cny * 100) / 100;

  const cnyPerUsd = rates.CNY;
  if (!cnyPerUsd || cnyPerUsd <= 0) return null;

  if (code === "USD") {
    return Math.round((cny / cnyPerUsd) * 100) / 100;
  }

  const usdToTarget = rates[code];
  if (usdToTarget == null || usdToTarget <= 0) return null;
  return (cny / cnyPerUsd) * usdToTarget;
}

export function formatDisplayCnyAmount(
  cny: number,
  code: DisplayCurrencyCode,
  rates: Record<string, number> | null,
  approxLabel = "approx.",
): string | null {
  if (!Number.isFinite(cny) || cny <= 0) return null;
  const parts = formatDisplayCnyParts(cny, code, rates);
  if (!parts) return null;
  if (!parts.approx) return parts.cny;
  return `${parts.cny} (${approxLabel} ${parts.approx})`;
}
