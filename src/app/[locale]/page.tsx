import { getT } from "@/lib/i18n";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale, "metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const hero = await getT(locale, "hero");
  const whySifr = await getT(locale, "whySifr");
  const products = await getT(locale, "products");
  const principles = await getT(locale, "principles");
  const features = await getT(locale, "features");
  const processT = await getT(locale, "process");
  const faq = await getT(locale, "faq");
  const cta = await getT(locale, "cta");
  const footer = await getT(locale, "footer");

  const messages = {
    hero: {
      headline1: hero("headline1"),
      headline2: hero("headline2"),
      supporting: hero("supporting"),
      description: hero("description"),
      cta1: hero("cta1"),
      cta2: hero("cta2"),
    },
    whySifr: {
      subtitle: whySifr("subtitle"),
      headline: whySifr("headline"),
      heroQuote: {
        line1: whySifr("heroQuote.line1"),
        line2: whySifr("heroQuote.line2"),
      },
      story: whySifr.raw("story") as string[],
      principle: whySifr("principle"),
      pillars: whySifr.raw("pillars") as { title: string; description: string }[],
      closing: whySifr("closing"),
    },
    products: {
      subtitle: products("subtitle"),
      headline: products("headline"),
      description: products("description"),
      timeline: {
        today: products("timeline.today"),
        future: products("timeline.future"),
      },
      dash: {
        name: products("dash.name"),
        description: products("dash.description"),
        status: products("dash.status"),
        features: products.raw("dash.features") as string[],
        cta: products("dash.cta"),
      },
      ecosystem: {
        name: products("ecosystem.name"),
        description: products("ecosystem.description"),
        status: products("ecosystem.status"),
        features: products.raw("ecosystem.features") as string[],
        cta: products("ecosystem.cta"),
      },
      philosophy: {
        subtitle: products("philosophy.subtitle"),
        quote: products("philosophy.quote"),
        supporting: products("philosophy.supporting"),
      },
    },
    principles: {
      subtitle: principles("subtitle"),
      headline: principles("headline"),
      statement: principles("statement"),
      items: principles.raw("items") as { title: string; description: string }[],
      closing: principles("closing"),
    },
    features: {
      subtitle: features("subtitle"),
      headline: features("headline"),
      description: features("description"),
      items: features.raw("items") as { title: string; description: string }[],
      closing: features("closing"),
    },
    process: {
      subtitle: processT("subtitle"),
      headline: processT("headline"),
      description: processT("description"),
      steps: processT.raw("steps") as { id: string; title: string; description: string }[],
      closing: processT("closing"),
    },
    faq: {
      subtitle: faq("subtitle"),
      headline: faq("headline"),
      description: faq("description"),
      items: faq.raw("items") as { question: string; answer: string }[],
      closing: faq("closing"),
    },
    cta: {
      brand: {
        name: cta("brand.name"),
        tagline: cta("brand.tagline"),
      },
      headlinePart1: cta("headlinePart1"),
      headlinePart2: cta("headlinePart2"),
      subtext: cta("subtext"),
      cta1: cta("cta1"),
      cta2: cta("cta2"),
    },
    footer: {
      brand: {
        first: footer("brand.first"),
        second: footer("brand.second"),
      },
      statement: footer("statement"),
      description: footer("description"),
      connect: footer("connect"),
      product: {
        title: footer("product.title"),
        links: footer.raw("product.links") as { label: string; href: string }[],
      },
      company: {
        title: footer("company.title"),
        links: footer.raw("company.links") as { label: string; href: string }[],
      },
      legal: {
        title: footer("legal.title"),
        links: footer.raw("legal.links") as { label: string; href: string }[],
      },
      signature: footer("signature"),
      copyright: footer("copyright"),
    },
  };

  return <HomeClient messages={messages} locale={locale} />;
}
