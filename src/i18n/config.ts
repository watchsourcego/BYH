/** Storefront locales — default `en` keeps unprefixed URLs (`/shop`). */
export const locales = ["ar", "de", "en", "es", "fr", "id", "pt", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 tags for `<link rel="alternate" hreflang>` and sitemap `xhtml:link`. */
export const hreflangCodes: Record<Locale, string> = {
  en: "en",
  es: "es",
  pt: "pt",
  ru: "ru",
  fr: "fr",
  de: "de",
  ar: "ar",
  id: "id",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
  id: "Bahasa Indonesia",
};

/** ISO region for locale flag emoji in the FAB. */
export const localeFlagRegion: Record<Locale, string> = {
  en: "US",
  es: "ES",
  pt: "BR",
  ru: "RU",
  fr: "FR",
  de: "DE",
  ar: "SA",
  id: "ID",
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

export function localeFlagEmoji(locale: Locale): string {
  return flagEmojiFromRegion(localeFlagRegion[locale] ?? "XX");
}
