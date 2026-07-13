"use client";

import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CTAProps {
  messages: {
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
}

export default function CTA({ messages }: CTAProps) {
  return (
    <Section id="contact" className="overflow-hidden pb-0">
      <Container>
        <div className="relative text-center pt-12 md:pt-16 lg:pt-24">
          {/* Decorative zero — ambient glow layer */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[32rem] md:text-[42rem] font-bold text-deco-text blur-[100px] pointer-events-none select-none z-0 leading-none"
          >
            0
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Brand identity */}
            <ScrollReveal>
              <div className="flex flex-col items-center gap-1.5 mb-6">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand" />
                  <span className="text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
                    {messages.brand.name}
                  </span>
                </span>
                <span className="text-xs text-text-muted/60 tracking-wide">
                  {messages.brand.tagline}
                </span>
              </div>
            </ScrollReveal>

            {/* Headline — Part 1 gradient, Part 2 primary */}
            <ScrollReveal delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto text-text-primary">
                <span className="gradient-text">
                  {messages.headlinePart1}
                </span>{" "}
                {messages.headlinePart2}
              </h2>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                {messages.subtext}
              </p>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal delay={0.45}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#products">
                  <Button variant="primary" size="lg">
                    {messages.cta1}
                  </Button>
                </Link>
                <Link href="mailto:hello@sifrmind.com">
                  <Button variant="secondary" size="lg">
                    {messages.cta2}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
