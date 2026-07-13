import { getT } from "@/lib/i18n";
import NavbarClient from "./NavbarClient";
import NavbarActions from "./NavbarActions";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getT(locale, "navbar");
  const a11y = await getT(locale, "accessibility");

  const links = [
    { label: t.raw("links")[1], href: "#products" },
    { label: t.raw("links")[0], href: "#why-sifr" },
    { label: t.raw("links")[2], href: "#process" },
    { label: t.raw("links")[3], href: "/contact" },
  ];

  return (
    <NavbarClient
      links={links}
      mobileCtaLabel={t("cta")}
      brandFirst={locale === "ar" ? "صفر " : "Sifr "}
      brandSecond={locale === "ar" ? "مايند" : "Mind"}
      homeAriaLabel={locale === "ar" ? "صفر مايند — الرئيسية" : "Sifr Mind — Home"}
      ariaMainNav={a11y("mainNavigation")}
      ariaOpenMenu={a11y("openMenu")}
      ariaCloseMenu={a11y("closeMenu")}
      languageSwitcher={
        <NavbarActions
          label={locale === "ar" ? "EN" : "عربي"}
          ariaLabel={locale === "ar" ? a11y("switchToEnglish") : a11y("switchToArabic")}
          targetLocale={locale === "ar" ? "en" : "ar"}
        />
      }
    />
  );
}
