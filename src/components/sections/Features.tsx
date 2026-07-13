"use client";

import {
  WorkflowIcon,
  SparklesIcon,
  ChartIcon,
  LayersIcon,
  ZapIcon,
  ShieldIcon,
} from "@/components/icons/SifrMindIcons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { ComponentType } from "react";

const CAPABILITY_PREFIX = "CAP";

const capabilityKeys = [
  "automation",
  "aiAssistance",
  "analytics",
  "integrations",
  "performance",
  "security",
] as const;

type CapabilityKey = (typeof capabilityKeys)[number];

const capabilityIcons: Record<CapabilityKey, ComponentType<{ className?: string }>> = {
  automation: WorkflowIcon,
  aiAssistance: SparklesIcon,
  analytics: ChartIcon,
  integrations: LayersIcon,
  performance: ZapIcon,
  security: ShieldIcon,
};

interface Capability {
  title: string;
  description: string;
}

interface FeaturesProps {
  messages: {
    subtitle: string;
    headline: string;
    description: string;
    items: Capability[];
    closing: string;
  };
}

export default function Features({ messages }: FeaturesProps) {
  return (
    <Section id="features">
      <Container>
        <SectionHeading title={messages.headline} subtitle={messages.subtitle} />

        <ScrollReveal>
          <p className="text-center text-text-secondary max-w-xl mx-auto mb-16 md:mb-20 leading-relaxed">
            {messages.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {messages.items.map((item, index) => {
            const key = capabilityKeys[index];
            const Icon = key ? capabilityIcons[key] : null;

            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <GlassCard
                  hover={false}
                  className="h-full p-7 md:p-8 hover:-translate-y-1 hover:border-border-active transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-text-muted uppercase mb-3">
                      {CAPABILITY_PREFIX} · {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px bg-border w-8 mb-5" />

                    <div className="w-12 h-12 rounded-radius-md bg-gradient-to-br from-brand-soft to-transparent flex items-center justify-center mb-5">
                      {Icon && <Icon className="w-5 h-5 text-brand/60" />}
                    </div>

                    <h3 className="text-base font-bold text-text-primary mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
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
