import { getRelativeLocaleUrl } from "astro:i18n";
import {
  defaultLocale,
  hreflangCodes,
  isLocale,
  locales,
  type Locale,
} from "./config";

export function hreflangAlternates(
  pathname: string,
  site: URL | string,
): { hreflang: string; href: string }[] {
  const basePath = stripLocalePrefix(pathname);
  const origin = typeof site === "string" ? site : site.origin;

  return locales.map((locale) => ({
    hreflang: hreflangCodes[locale],
    href: new URL(localeHref(locale, basePath), origin).href,
  }));
}

export function hreflangDefault(pathname: string, site: URL | string): string {
  const basePath = stripLocalePrefix(pathname);
  const origin = typeof site === "string" ? site : site.origin;
  return new URL(localeHref(defaultLocale, basePath), origin).href;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return normalized;
}

export function localeHref(locale: Locale, path: string): string {
  const stripped = stripLocalePrefix(path);
  return getRelativeLocaleUrl(locale, stripped);
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  return localeHref(targetLocale, currentPath);
}

export { defaultLocale, locales };
