import type { TranslateFn } from "@/i18n/ui";

export function getMainNav(t: TranslateFn, href: (path: string) => string) {
  return [
    { label: t("Nav.home"), href: href("/") },
    { label: t("Nav.shop"), href: href("/shop") },
    { label: t("Nav.about"), href: href("/about") },
    { label: t("Nav.contact"), href: href("/contact") },
  ] as const;
}

export function getPolicyNav(t: TranslateFn, href: (path: string) => string) {
  return [
    { label: t("Nav.termsOfService"), href: href("/policies/terms-of-service") },
    { label: t("Nav.privacyPolicy"), href: href("/policies/privacy-policy") },
    { label: t("Nav.refundPolicy"), href: href("/policies/refund-policy") },
    { label: t("Nav.shippingTax"), href: href("/policies/shipping-tax") },
  ] as const;
}

export function getMobileNav(t: TranslateFn, href: (path: string) => string) {
  return [
    { label: t("Nav.home"), href: href("/"), icon: "home" as const },
    { label: t("Nav.shop"), href: href("/shop"), icon: "shop" as const },
    { label: t("Nav.about"), href: href("/about"), icon: "about" as const },
    { label: t("Nav.contact"), href: href("/contact"), icon: "contact" as const },
    { label: t("Nav.policies"), href: href("/policies"), icon: "policies" as const },
  ];
}
