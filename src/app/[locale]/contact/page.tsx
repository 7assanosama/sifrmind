import { getT } from "@/lib/i18n";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale, "contact");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const hero = await getT(locale, "contact.hero");
  const cards = await getT(locale, "contact.cards");
  const quickInfo = await getT(locale, "contact.quickInfo");
  const bottomCta = await getT(locale, "contact.bottomCta");

  const messages = {
    hero: {
      label: hero("label"),
      headline: hero("headline"),
      description: hero("description"),
    },
    cards: {
      email: {
        title: cards("email.title"),
        description: cards("email.description"),
        value: cards("email.value"),
        cta: cards("email.cta"),
        href: cards("email.href"),
      },
      whatsapp: {
        title: cards("whatsapp.title"),
        description: cards("whatsapp.description"),
        value: cards("whatsapp.value"),
        cta: cards("whatsapp.cta"),
        href: cards("whatsapp.href"),
      },
      instagram: {
        title: cards("instagram.title"),
        description: cards("instagram.description"),
        value: cards("instagram.value"),
        cta: cards("instagram.cta"),
        href: cards("instagram.href"),
      },
      facebook: {
        title: cards("facebook.title"),
        description: cards("facebook.description"),
        cta: cards("facebook.cta"),
        href: cards("facebook.href"),
      },
    },
    quickInfo: {
      responseTime: {
        title: quickInfo("responseTime.title"),
        description: quickInfo("responseTime.description"),
      },
      availability: {
        title: quickInfo("availability.title"),
        description: quickInfo("availability.description"),
      },
      collaboration: {
        title: quickInfo("collaboration.title"),
        description: quickInfo("collaboration.description"),
      },
    },
    bottomCta: {
      headline: bottomCta("headline"),
      description: bottomCta("description"),
      primaryCta: bottomCta("primaryCta"),
      secondaryCta: bottomCta("secondaryCta"),
    },
  };

  return <ContactClient messages={messages} />;
}
