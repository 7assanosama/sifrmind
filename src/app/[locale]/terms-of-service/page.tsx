import { getT } from "@/lib/i18n";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS_SECTIONS } from "@/data/legal";
import type { LegalSectionData } from "@/types/legal";

async function buildSections(
  locale: string,
  definitions: typeof TERMS_SECTIONS,
): Promise<LegalSectionData[]> {
  return Promise.all(
    definitions.map(async (def) => {
      const t = await getT(
        locale,
        `termsOfService.${def.translationKey}`,
      );
      return {
        id: def.id,
        heading: t("heading"),
        body: t.has("body") ? t("body") : undefined,
        items: t.has("items")
          ? (t.raw("items") as string[])
          : undefined,
      };
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale, "termsOfService.metadata");

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: "/en/terms-of-service",
        ar: "/ar/terms-of-service",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "Sifr Mind",
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const hero = await getT(locale, "termsOfService.hero");
  const navigation = await getT(locale, "termsOfService.navigation");
  const bottomCta = await getT(locale, "termsOfService.bottomCta");

  const [sections, navItems] = await Promise.all([
    buildSections(locale, TERMS_SECTIONS),
    Promise.all(
      TERMS_SECTIONS.map(async (def) => ({
        id: def.id,
        label: navigation(def.translationKey),
      })),
    ),
  ]);

  return (
    <LegalPage
      title={hero("title")}
      subtitle={hero("subtitle")}
      sections={sections}
      navItems={navItems}
      bottomCta={{
        headline: bottomCta("headline"),
        description: bottomCta("description"),
        primaryCta: bottomCta("primaryCta"),
        secondaryCta: bottomCta("secondaryCta"),
      }}
    />
  );
}
