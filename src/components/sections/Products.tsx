"use client";

import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SmartLink } from "@/components/SmartLink";
import {
  DashboardIcon,
  SparklesIcon,
  CheckIcon,
} from "@/components/icons/SifrMindIcons";

interface Product {
  name: string;
  description: string;
  status: string;
  features: string[];
  cta: string;
}

interface ProductsProps {
  locale: string;
  messages: {
    subtitle: string;
    headline: string;
    description: string;
    timeline: { today: string; future: string };
    dash: Product;
    ecosystem: Product;
    philosophy: { subtitle: string; quote: string; supporting: string };
  };
}

function ProductCard({
  product,
  icon,
  featured,
  locale,
}: {
  product: Product;
  icon: ReactNode;
  featured?: boolean;
  locale: string;
}) {
  return (
    <ScrollReveal>
      <GlassCard
        className={`h-full ${
          featured
            ? "p-8 md:p-10 border-2 border-border-active hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500"
            : ""
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-radius-md bg-gradient-to-br from-brand-soft to-transparent flex items-center justify-center">
            {icon}
          </div>
          <Badge variant={featured ? "brand" : "default"}>
            {product.status}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6 space-y-2.5">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckIcon className="w-4 h-4 text-brand shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          {featured ? (
            <a
              href={"https://www.dash.sifrmind.com/" + locale}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-text-muted hover:text-brand transition-colors duration-200"
            >
              {product.cta}
            </a>
          ) : (
            <SmartLink
              href="#philosophy"
              className="inline-flex items-center text-sm font-medium text-text-muted hover:text-brand transition-colors duration-200"
            >
              {product.cta}
            </SmartLink>
          )}
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

export default function Products({ messages, locale }: ProductsProps) {
  return (
    <Section id="products">
      <Container>
        <SectionHeading
          subtitle={messages.subtitle}
          title={messages.headline}
        />
        <p className="text-center text-text-secondary max-w-2xl mx-auto mb-16 md:mb-20 leading-relaxed">
          {messages.description}
        </p>

        <div className="flex items-center gap-0 w-full max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand ring-2 ring-brand/15" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary">
              {messages.timeline.today}
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-brand/30 to-border mx-3 md:mx-6" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-text-muted" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
              {messages.timeline.future}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
          <ProductCard
            product={messages.dash}
            icon={<DashboardIcon className="w-5 h-5 text-brand/60" />}
            featured
            locale={locale}
          />
          <ProductCard
            product={messages.ecosystem}
            icon={<SparklesIcon className="w-5 h-5 text-brand/60" />}
            locale={locale}
          />
        </div>

        <div id="philosophy" className="text-center max-w-2xl mx-auto mt-28 md:mt-36">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
                {messages.philosophy.subtitle}
              </p>
            </div>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-text-primary leading-relaxed">
              &ldquo;{messages.philosophy.quote}&rdquo;
            </blockquote>
            <p className="mt-6 md:mt-8 text-sm md:text-base text-text-secondary leading-relaxed">
              {messages.philosophy.supporting}
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
