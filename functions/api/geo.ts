type DisplayCurrencyCode =
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

type Locale = "ar" | "de" | "en" | "es" | "fr" | "id" | "pt" | "ru";

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
};

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  US: "en",
  GB: "en",
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
  FR: "fr",
  BE: "fr",
  LU: "fr",
  SN: "fr",
  MA: "fr",
  DE: "de",
  AT: "de",
  CH: "de",
  PT: "pt",
  BR: "pt",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  SA: "ar",
  AE: "ar",
  QA: "ar",
  EG: "ar",
  ID: "id",
};

function readCountryCode(request: Request): string | null {
  const cf = (request as Request & { cf?: { country?: string } }).cf;
  const raw = cf?.country ?? request.headers.get("CF-IPCountry");
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(upper) ? upper : null;
}

/** Visitor country + suggested display currency/locale from Cloudflare IP geo. */
export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const countryCode = readCountryCode(context.request);
  const currency = countryCode ? (COUNTRY_TO_CURRENCY[countryCode] ?? "USD") : null;
  const locale = countryCode ? (COUNTRY_TO_LOCALE[countryCode] ?? "en") : null;

  return Response.json(
    {
      countryCode,
      currency,
      locale,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
