const CACHE_TTL_MS = 60 * 60 * 1000;

const USD_FALLBACK: Record<string, number> = {
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

let cached:
  | {
      rates: Record<string, number>;
      date: string;
      at: number;
    }
  | null = null;

async function fetchFrankfurter(): Promise<{ rates: Record<string, number>; date?: string }> {
  const codes = Object.keys(USD_FALLBACK).filter((c) => c !== "USD" && c !== "CNY");
  const rates: Record<string, number> = { USD: 1 };

  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${codes.slice(0, 20).join(",")}`,
    );
    if (res.ok) {
      const data = (await res.json()) as { date?: string; rates?: Record<string, number> };
      Object.assign(rates, data.rates ?? {});
      return { rates, date: data.date };
    }
  } catch {
    /* fallback below */
  }

  return { rates };
}

async function fetchCdnRates(): Promise<Record<string, number>> {
  const urls = [
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json",
    "https://latest.currency-api.pages.dev/v1/currencies/usd.min.json",
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = (await res.json()) as { usd?: Record<string, number> };
      if (!data.usd) continue;
      const rates: Record<string, number> = { USD: 1 };
      for (const [code, rate] of Object.entries(data.usd)) {
        if (typeof rate === "number" && rate > 0) {
          rates[code.toUpperCase()] = rate;
        }
      }
      return rates;
    } catch {
      /* try next mirror */
    }
  }

  return { USD: 1, ...USD_FALLBACK };
}

async function getRates(): Promise<{ rates: Record<string, number>; date: string }> {
  const now = Date.now();
  if (cached && now - cached.at < CACHE_TTL_MS) {
    return { rates: cached.rates, date: cached.date };
  }

  const frank = await fetchFrankfurter();
  const rates: Record<string, number> = { USD: 1, ...frank.rates };

  const missing = Object.keys(USD_FALLBACK).some((code) => rates[code] == null);
  if (missing) {
    const cdn = await fetchCdnRates();
    for (const [code, rate] of Object.entries(cdn)) {
      if (rates[code] == null) rates[code] = rate;
    }
  }

  for (const [code, rate] of Object.entries(USD_FALLBACK)) {
    if (rates[code] == null) rates[code] = rate;
  }

  const date = frank.date ?? new Date().toISOString().slice(0, 10);
  cached = { rates, date, at: now };
  return { rates, date };
}

export async function onRequestGet(): Promise<Response> {
  try {
    const { rates, date } = await getRates();
    return Response.json(
      { rates, date, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json({ error: "fx_unavailable" }, { status: 503 });
  }
}
