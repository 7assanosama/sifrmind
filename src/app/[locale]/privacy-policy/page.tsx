import { getT } from "@/lib/i18n";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_SECTIONS } from "@/data/legal";
import type { LegalSectionData } from "@/types/legal";

async function buildSections(
  locale: string,
  definitions: typeof PRIVACY_SECTIONS,
): Promise<LegalSectionData[]> {
  return Promise.all(
    definitions.map(async (def) => {
      const t = await getT(
        locale,
        `privacyPolicy.${def.translationKey}`,
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
  const t = await getT(locale, "privacyPolicy.metadata");

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      languages: { en: "/en/privacy-policy", ar: "/ar/privacy-policy" },
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

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const hero = await getT(locale, "privacyPolicy.hero");
  const navigation = await getT(locale, "privacyPolicy.navigation");
  const bottomCta = await getT(locale, "privacyPolicy.bottomCta");

  const [sections, navItems] = await Promise.all([
    buildSections(locale, PRIVACY_SECTIONS),
    Promise.all(
      PRIVACY_SECTIONS.map(async (def) => ({
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
