"use client";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  LayersIcon,
  EyeIcon,
  SparklesIcon,
  WorkflowIcon,
  CompassIcon,
  UsersIcon,
} from "@/components/icons/SifrMindIcons";
import type { ComponentType } from "react";

const PRINCIPLE_PREFIX = "ZM";

const principleIcons: Record<string, ComponentType<{ className?: string }>> = {
  reduceComplexity: LayersIcon,
  thinkClearly: EyeIcon,
  intelligenceWithPurpose: SparklesIcon,
  quietAutomation: WorkflowIcon,
  builtToLast: CompassIcon,
  humanFirst: UsersIcon,
};

const principleKeys = [
  "reduceComplexity",
  "thinkClearly",
  "intelligenceWithPurpose",
  "quietAutomation",
  "builtToLast",
  "humanFirst",
] as const;

interface Principle {
  title: string;
  description: string;
}

interface PrinciplesProps {
  messages: {
    subtitle: string;
    headline: string;
    statement: string;
    items: Principle[];
    closing: string;
  };
}

export default function Principles({ messages }: PrinciplesProps) {
  return (
    <Section id="principles">
      <Container>
        <SectionHeading title={messages.headline} subtitle={messages.subtitle} />

        <ScrollReveal>
          <p className="text-center text-text-secondary text-lg max-w-xl mx-auto mb-16 md:mb-20 leading-relaxed">
            {messages.statement}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {messages.items.map((item, index) => {
            const key = principleKeys[index];
            const Icon = key ? principleIcons[key] : null;

            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <GlassCard className="h-full hover:-translate-y-1 hover:border-border-active transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-text-muted uppercase mb-3">
                      {PRINCIPLE_PREFIX} · {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px bg-border w-8 mb-5" />

                    <div className="w-12 h-12 rounded-radius-md bg-gradient-to-br from-brand-soft to-transparent flex items-center justify-center mb-5">
                      {Icon && <Icon className="w-5 h-5 text-brand/60" />}
                    </div>

                    <h3 className="text-base font-bold text-text-primary mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="text-center max-w-lg mx-auto mt-20 md:mt-28">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand mb-5" />
            <p className="text-sm text-text-secondary leading-relaxed">
              {messages.closing}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
