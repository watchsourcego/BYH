import en from "../../messages/en.json";
import es from "../../messages/es.json";
import pt from "../../messages/pt.json";
import ru from "../../messages/ru.json";
import fr from "../../messages/fr.json";
import de from "../../messages/de.json";
import ar from "../../messages/ar.json";
import id from "../../messages/id.json";
import { defaultLocale, isLocale, type Locale } from "./config";

type Messages = typeof en;

const catalogs: Record<Locale, Messages> = {
  en,
  es,
  pt,
  ru,
  fr,
  de,
  ar,
  id,
};

export function resolveLocale(value?: string | null): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}

function getNestedValue(obj: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

export function useTranslations(locale?: string | null): TranslateFn {
  const resolved = resolveLocale(locale);
  const catalog = catalogs[resolved];

  return (key, vars) => {
    let value = getNestedValue(catalog as Record<string, unknown>, key);
    if (value == null) {
      value = getNestedValue(en as Record<string, unknown>, key) ?? key;
    }
    if (!vars) return value;
    return Object.entries(vars).reduce(
      (text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)),
      value,
    );
  };
}

export function getMessages(locale?: string | null): Messages {
  return catalogs[resolveLocale(locale)];
}
