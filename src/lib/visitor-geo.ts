import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import {
  inferDisplayCurrencyFromLocale,
  isDisplayCurrencyCode,
  type DisplayCurrencyCode,
} from "@/lib/display-currency";

export const LOCALE_PICKED_COOKIE = "byh-locale-picked";

/** ISO 3166-1 alpha-2 (and common alpha-3) → display currency we support. */
const COUNTRY_TO_CURRENCY: Record<string, DisplayCurrencyCode> = {
  US: "USD",
  GB: "GBP",
  IE: "EUR",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
  SK: "EUR",
  SI: "EUR",
  EE: "EUR",
  LV: "EUR",
  LT: "EUR",
  MT: "EUR",
  CY: "EUR",
  HR: "EUR",
  AU: "AUD",
  CA: "CAD",
  JP: "JPY",
  KR: "KRW",
  SG: "SGD",
  HK: "HKD",
  IN: "INR",
  BR: "BRL",
  MX: "MXN",
  RU: "RUB",
  TR: "TRY",
  ID: "IDR",
  MY: "MYR",
  TH: "THB",
  PH: "PHP",
  VN: "VND",
  AE: "AED",
  SA: "SAR",
  QA: "AED",
  KW: "AED",
  BH: "AED",
  OM: "AED",
  PL: "PLN",
  CH: "CHF",
  NZ: "NZD",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  IL: "ILS",
  NG: "NGN",
  PK: "PKR",
  ZA: "ZAR",
  CN: "CNY",
  TW: "CNY",
  AR: "USD",
  CO: "USD",
  CL: "USD",
  PE: "USD",
  EG: "AED",
  MA: "EUR",
  DZ: "EUR",
  TN: "EUR",
  SN: "EUR",
  CI: "EUR",
  KE: "USD",
  GH: "USD",
  UG: "USD",
  TZ: "USD",
  RW: "USD",
  UA: "EUR",
  BY: "RUB",
  KZ: "RUB",
  USA: "USD",
  GBR: "GBP",
  DEU: "EUR",
  FRA: "EUR",
  ESP: "EUR",
  ITA: "EUR",
  NLD: "EUR",
  BEL: "EUR",
  AUT: "EUR",
  PRT: "EUR",
  AUS: "AUD",
  CAN: "CAD",
  JPN: "JPY",
  KOR: "KRW",
  SGP: "SGD",
  HKG: "HKD",
  IND: "INR",
  BRA: "BRL",
  MEX: "MXN",
  RUS: "RUB",
  TUR: "TRY",
  IDN: "IDR",
  MYS: "MYR",
  THA: "THB",
  PHL: "PHP",
  VNM: "VND",
  ARE: "AED",
  SAU: "SAR",
  POL: "PLN",
  CHE: "CHF",
  NZL: "NZD",
  SWE: "SEK",
  NOR: "NOK",
  DNK: "DKK",
  ISR: "ILS",
  NGA: "NGN",
  PAK: "PKR",
  ZAF: "ZAR",
  CHN: "CNY",
};

/** Country → one of the storefront locales (unsupported languages map to the closest). */
const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  US: "en",
  GB: "en",
  IE: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IN: "en",
  NG: "en",
  ZA: "en",
  SG: "en",
  PH: "en",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  EC: "es",
  UY: "es",
  PY: "es",
  BO: "es",
  VE: "es",
  CR: "es",
  PA: "es",
  GT: "es",
  HN: "es",
  SV: "es",
  NI: "es",
  DO: "es",
  CU: "es",
  PR: "es",
  FR: "fr",
  BE: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  MA: "fr",
  TN: "fr",
  DZ: "fr",
  DE: "de",
  AT: "de",
  CH: "de",
  LI: "de",
  PT: "pt",
  BR: "pt",
  AO: "pt",
  MZ: "pt",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  SA: "ar",
  AE: "ar",
  QA: "ar",
  KW: "ar",
  BH: "ar",
  OM: "ar",
  EG: "ar",
  JO: "ar",
  IQ: "ar",
  LB: "ar",
  LY: "ar",
  YE: "ar",
  SY: "ar",
  SD: "ar",
  PS: "ar",
  ID: "id",
};

function normalizeCountryCode(raw?: string | null): string | null {
  if (!raw?.trim()) return null;
  const upper = raw.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(upper)) return upper;
  if (/^[A-Z]{3}$/.test(upper) && COUNTRY_TO_CURRENCY[upper]) return upper;
  return null;
}

export function suggestCurrencyFromVisitor(
  countryCode?: string | null,
  locale?: string | null,
): DisplayCurrencyCode {
  const cc = normalizeCountryCode(countryCode);
  if (cc && COUNTRY_TO_CURRENCY[cc]) return COUNTRY_TO_CURRENCY[cc];

  const loc = (locale || "").trim().toLowerCase().slice(0, 2);
  if (loc && loc !== "en") {
    const fromLocale = inferDisplayCurrencyFromLocale(loc);
    if (fromLocale) return fromLocale;
  }

  return "USD";
}

export function suggestLocaleFromCountryCode(countryCode?: string | null): Locale {
  const cc = normalizeCountryCode(countryCode);
  if (cc && COUNTRY_TO_LOCALE[cc]) return COUNTRY_TO_LOCALE[cc];
  return defaultLocale;
}

export function normalizeGeoCurrency(value: unknown): DisplayCurrencyCode | null {
  return typeof value === "string" && isDisplayCurrencyCode(value) ? value : null;
}

export function normalizeGeoLocale(value: unknown): Locale | null {
  return typeof value === "string" && isLocale(value) ? value : null;
}
