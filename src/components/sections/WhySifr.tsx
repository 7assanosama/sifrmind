"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface WhySifrProps {
  messages: {
    subtitle: string;
    headline: string;
    heroQuote: { line1: string; line2: string };
    story: string[];
    principle: string;
    pillars: { title: string; description: string }[];
    closing: string;
  };
}

export default function WhySifr({ messages }: WhySifrProps) {
  return (
    <Section id="why-sifr" className="relative overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[28rem] md:text-[36rem] font-bold text-deco-text leading-none scale-110">
          0
        </span>
      </div>

      <Container className="relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
            <p className="text-sm font-medium tracking-[0.12em] text-text-secondary">
              {messages.subtitle}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-text-primary">
            {messages.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed">
            {messages.heroQuote.line1}
          </p>
          <p className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-text-primary mt-4">
            {messages.heroQuote.line2}
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6 mb-20 md:mb-24">
          {messages.story.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-text-secondary">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="max-w-2xl mx-auto mb-20 md:mb-28">
          <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed text-center shrink-0">
              {messages.principle}
            </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto mb-20 md:mb-28 px-4">
          {messages.pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.1}>
              <div className="text-center border-t border-border pt-8">
                <p className="text-xs font-mono tracking-widest text-brand/40 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-medium text-text-primary leading-relaxed">
            {messages.closing}
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
