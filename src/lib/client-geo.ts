import {
  normalizeGeoCurrency,
  normalizeGeoLocale,
  type Locale,
} from "@/lib/visitor-geo";
import type { DisplayCurrencyCode } from "@/lib/display-currency";

export type VisitorGeo = {
  countryCode: string | null;
  currency: DisplayCurrencyCode | null;
  locale: Locale | null;
};

let geoPromise: Promise<VisitorGeo | null> | null = null;

/** Shared client fetch for IP geo (country + suggested currency/locale). */
export function fetchVisitorGeo(): Promise<VisitorGeo | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!geoPromise) {
    geoPromise = fetch("/api/geo", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as {
          countryCode?: unknown;
          currency?: unknown;
          locale?: unknown;
        };
        const countryCode =
          typeof data.countryCode === "string" && /^[A-Z]{2}$/.test(data.countryCode)
            ? data.countryCode
            : null;
        return {
          countryCode,
          currency: normalizeGeoCurrency(data.currency),
          locale: normalizeGeoLocale(data.locale),
        };
      })
      .catch(() => null);
  }
  return geoPromise;
}
