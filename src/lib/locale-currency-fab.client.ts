import {
  DISPLAY_FX_FALLBACK_RATES,
  formatDisplayCnyParts,
  inferDisplayCurrencyFromLocale,
  isDisplayCurrencyCode,
  readDisplayCurrencyCookie,
  readDisplayCurrencySession,
  writeDisplayCurrencyCookie,
  writeDisplayCurrencySession,
  type DisplayCurrencyCode,
} from "@/lib/display-currency";
import { fetchVisitorGeo } from "@/lib/client-geo";
import { LOCALE_PICKED_COOKIE } from "@/lib/visitor-geo";
import { locales, type Locale } from "@/i18n/config";

const HOVER_LEAVE_MS = 220;
const STORE_LOCALES = locales as readonly string[];

type MenuKind = "locale" | "currency";

function flagSrc(
  code: DisplayCurrencyCode,
  regions: Record<string, string>,
): string {
  const region = (regions[code] ?? "UN").toLowerCase();
  return `https://flagcdn.com/24x18/${region}.png`;
}

function readLocalePicked(): boolean {
  return document.cookie.split("; ").some((row) => row.startsWith(`${LOCALE_PICKED_COOKIE}=`));
}

function writeLocalePicked(): void {
  document.cookie = `${LOCALE_PICKED_COOKIE}=1;path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length > 0 && STORE_LOCALES.includes(segments[0]!)) {
    segments.shift();
  }
  const rest = segments.join("/");
  if (targetLocale === "en") {
    return rest ? `/${rest}/` : "/";
  }
  return rest ? `/${targetLocale}/${rest}/` : `/${targetLocale}/`;
}

function resolveInitialCurrency(
  locale: string,
  fallback?: string | null,
): DisplayCurrencyCode {
  const fromCookie = readDisplayCurrencyCookie();
  if (fromCookie) return fromCookie;

  const fromSession = readDisplayCurrencySession();
  if (fromSession) return fromSession;

  if (fallback && isDisplayCurrencyCode(fallback)) return fallback;
  return inferDisplayCurrencyFromLocale(locale);
}

export function initLocaleCurrencyFab(
  root: HTMLElement,
  currencyFlagRegions: Record<string, string>,
): void {
  const locale = (root.dataset.currentLocale ?? "en") as Locale;
  let currency = resolveInitialCurrency(locale, root.dataset.defaultCurrency);
  let rates: Record<string, number> = { ...DISPLAY_FX_FALLBACK_RATES };
  let userPickedCurrency = Boolean(readDisplayCurrencyCookie());

  let openMenu: MenuKind | null = null;
  let menuPinned = false;
  let leaveTimer: ReturnType<typeof setTimeout> | null = null;

  const canHoverOpen = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const localeWrap = root.querySelector<HTMLElement>("[data-locale-switcher]");
  const currencyWrap = root.querySelector<HTMLElement>("[data-currency-switcher]");
  const localePopover = root.querySelector<HTMLElement>("[data-locale-popover]");
  const currencyPopover = root.querySelector<HTMLElement>("[data-currency-popover]");
  const localeTrigger = root.querySelector<HTMLElement>("[data-locale-trigger]");
  const currencyTrigger = root.querySelector<HTMLElement>("[data-currency-trigger]");
  const localeList = localePopover?.querySelector<HTMLElement>(".locale-currency-fab__list");
  const currencyList = currencyPopover?.querySelector<HTMLElement>(".locale-currency-fab__list");
  const currentCurrencyCode = root.querySelector<HTMLElement>("[data-current-currency-code]");
  const currentCurrencyFlag = root.querySelector<HTMLImageElement>("[data-current-currency-flag]");

  function clearLeaveTimer(): void {
    if (leaveTimer != null) {
      window.clearTimeout(leaveTimer);
      leaveTimer = null;
    }
  }

  function setMenuOpen(kind: MenuKind | null): void {
    openMenu = kind;
    const localeOpen = kind === "locale";
    const currencyOpen = kind === "currency";

    localePopover?.setAttribute("data-open", localeOpen ? "true" : "false");
    currencyPopover?.setAttribute("data-open", currencyOpen ? "true" : "false");
    localeTrigger?.setAttribute("aria-expanded", localeOpen ? "true" : "false");
    currencyTrigger?.setAttribute("aria-expanded", currencyOpen ? "true" : "false");
  }

  function closeMenus(): void {
    menuPinned = false;
    setMenuOpen(null);
  }

  function openMenuKind(kind: MenuKind): void {
    setMenuOpen(kind);
  }

  function updateCurrencyUi(): void {
    if (currentCurrencyCode) currentCurrencyCode.textContent = currency;
    if (currentCurrencyFlag) currentCurrencyFlag.src = flagSrc(currency, currencyFlagRegions);
    root.querySelectorAll<HTMLElement>("[data-currency-option]").forEach((btn) => {
      const selected = btn.dataset.currencyOption === currency;
      btn.setAttribute("aria-selected", selected ? "true" : "false");
      btn.classList.toggle("is-selected", selected);
    });
  }

  function refreshPrices(): void {
    document.querySelectorAll<HTMLElement>("[data-dual-cny-price]").forEach((el) => {
      const cny = Number.parseFloat(el.dataset.cnyPrice ?? "");
      if (!Number.isFinite(cny)) return;
      const parts = formatDisplayCnyParts(cny, currency, rates);
      const primary = el.querySelector<HTMLElement>("[data-cny-primary]");
      const approx = el.querySelector<HTMLElement>("[data-cny-approx]");
      if (primary && parts) primary.textContent = parts.cny;
      if (approx) {
        if (parts?.approx) {
          approx.textContent = `≈ ${parts.approx}`;
          approx.hidden = false;
        } else {
          approx.textContent = "";
          approx.hidden = true;
        }
      }
      if (parts) {
        const spoken = parts.approx ? `${parts.cny} ≈ ${parts.approx}` : parts.cny;
        el.setAttribute("aria-label", spoken);
      }
    });
  }

  function dispatchCurrencyChange(): void {
    window.dispatchEvent(new CustomEvent("byh:currency-change", { detail: { currency, rates } }));
    refreshPrices();
  }

  function selectCurrency(code: string | undefined): void {
    if (!code || !isDisplayCurrencyCode(code)) return;
    currency = code;
    userPickedCurrency = true;
    writeDisplayCurrencyCookie(code);
    writeDisplayCurrencySession(code);
    updateCurrencyUi();
    dispatchCurrencyChange();
    closeMenus();
  }

  function suggestCurrency(code: DisplayCurrencyCode): void {
    if (userPickedCurrency || readDisplayCurrencyCookie()) return;
    currency = code;
    writeDisplayCurrencySession(code);
    updateCurrencyUi();
    dispatchCurrencyChange();
  }

  function scheduleClose(kind: MenuKind): void {
    if (menuPinned) return;
    clearLeaveTimer();
    leaveTimer = window.setTimeout(() => {
      if (!menuPinned && openMenu === kind) closeMenus();
      leaveTimer = null;
    }, HOVER_LEAVE_MS);
  }

  function bindSwitcher(
    wrap: HTMLElement | null,
    kind: MenuKind,
    trigger: HTMLElement | null,
    popover: HTMLElement | null,
    list: HTMLElement | null | undefined,
  ): void {
    if (!wrap || !trigger || !popover) return;

    wrap.addEventListener("mouseenter", () => {
      if (!canHoverOpen) return;
      clearLeaveTimer();
      openMenuKind(kind);
    });

    wrap.addEventListener("mouseleave", () => {
      if (!canHoverOpen || menuPinned) return;
      scheduleClose(kind);
    });

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (openMenu === kind) {
        closeMenus();
        return;
      }
      menuPinned = true;
      clearLeaveTimer();
      openMenuKind(kind);
    });

    popover.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      menuPinned = true;
      openMenuKind(kind);
    });

    if (list) {
      list.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });
    }
  }

  root.querySelectorAll<HTMLElement>("[data-currency-option]").forEach((btn) => {
    btn.addEventListener("pointerup", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectCurrency(btn.dataset.currencyOption);
    });
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });

  root.querySelectorAll<HTMLAnchorElement>("[data-locale-link]").forEach((link) => {
    link.addEventListener("click", () => {
      writeLocalePicked();
    });
  });

  bindSwitcher(localeWrap, "locale", localeTrigger, localePopover, localeList);
  bindSwitcher(currencyWrap, "currency", currencyTrigger, currencyPopover, currencyList);

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (!openMenu) return;
      const target = event.target;
      if (!(target instanceof Node) || !root.contains(target)) {
        closeMenus();
      }
    },
    true,
  );

  window.addEventListener(
    "scroll",
    (event) => {
      if (!openMenu || menuPinned) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (localeList && (target === localeList || localeList.contains(target))) return;
      if (currencyList && (target === currencyList || currencyList.contains(target))) return;
      closeMenus();
    },
    { passive: true, capture: true },
  );

  updateCurrencyUi();
  refreshPrices();

  void fetchVisitorGeo().then((geo) => {
    if (!geo) return;
    if (!readLocalePicked() && geo.locale && geo.locale !== locale) {
      const target = switchLocalePath(window.location.pathname, geo.locale);
      if (target !== window.location.pathname) {
        window.location.replace(target);
        return;
      }
    }
    if (geo.currency) suggestCurrency(geo.currency);
  });

  void fetch("/api/display-fx")
    .then(async (res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data?.rates) {
        rates = { ...DISPLAY_FX_FALLBACK_RATES, ...data.rates };
        dispatchCurrencyChange();
      }
    })
    .catch(() => {});
}

export function initAllLocaleCurrencyFabs(
  currencyFlagRegions: Record<string, string>,
): void {
  document.querySelectorAll<HTMLElement>("[data-locale-currency-fab]").forEach((root) => {
    initLocaleCurrencyFab(root, currencyFlagRegions);
  });
}
