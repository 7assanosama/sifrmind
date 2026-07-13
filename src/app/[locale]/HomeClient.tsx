"use client";

import Hero from "@/components/sections/Hero";
import WhySifr from "@/components/sections/WhySifr";
import Products from "@/components/sections/Products";
import Principles from "@/components/sections/Principles";
import Features from "@/components/sections/Features";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

interface HomeClientProps {
  locale: string;
  messages: {
    hero: {
      headline1: string;
      headline2: string;
      supporting: string;
      description: string;
      cta1: string;
      cta2: string;
    };
    whySifr: {
      subtitle: string;
      headline: string;
      heroQuote: { line1: string; line2: string };
      story: string[];
      principle: string;
      pillars: { title: string; description: string }[];
      closing: string;
    };
    products: {
      subtitle: string;
      headline: string;
      description: string;
      timeline: { today: string; future: string };
      dash: {
        name: string;
        description: string;
        status: string;
        features: string[];
        cta: string;
      };
      ecosystem: {
        name: string;
        description: string;
        status: string;
        features: string[];
        cta: string;
      };
      philosophy: {
        subtitle: string;
        quote: string;
        supporting: string;
      };
    };
    principles: {
      subtitle: string;
      headline: string;
      statement: string;
      items: { title: string; description: string }[];
      closing: string;
    };
    features: {
      subtitle: string;
      headline: string;
      description: string;
      items: { title: string; description: string }[];
      closing: string;
    };
    process: {
      subtitle: string;
      headline: string;
      description: string;
      steps: { id: string; title: string; description: string }[];
      closing: string;
    };
    faq: {
      subtitle: string;
      headline: string;
      description: string;
      items: { question: string; answer: string }[];
      closing: string;
    };
    cta: {
      brand: {
        name: string;
        tagline: string;
      };
      headlinePart1: string;
      headlinePart2: string;
      subtext: string;
      cta1: string;
      cta2: string;
    };
    footer: {
      brand: {
        first: string;
        second: string;
      };
      statement: string;
      description: string;
      connect: string;
      product: {
        title: string;
        links: { label: string; href: string }[];
      };
      company: {
        title: string;
        links: { label: string; href: string }[];
      };
      legal: {
        title: string;
        links: { label: string; href: string }[];
      };
      signature: string;
      copyright: string;
    };
  };
}

export default function HomeClient({ messages, locale }: HomeClientProps) {
  return (
    <>
      <main>
        <Hero messages={messages.hero} locale={locale} />
        <WhySifr messages={messages.whySifr} />
        <Products messages={messages.products} locale={locale} />
        <Principles messages={messages.principles} />
        <Features messages={messages.features} />
        <Process messages={messages.process} />
        <FAQ messages={messages.faq} />
        <CTA messages={messages.cta} locale={locale} />
      </main>
      <Footer messages={messages.footer} />
    </>
  );
}
