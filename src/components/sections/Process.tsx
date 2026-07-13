"use client";

import {
  EyeIcon,
  LayersIcon,
  WorkflowIcon,
  CompassIcon,
} from "@/components/icons/SifrMindIcons";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { ComponentType } from "react";

const JOURNEY_PREFIX = "STEP";

type JourneyKey = "observe" | "simplify" | "automate" | "grow";

const journeyIcons: Record<
  JourneyKey,
  ComponentType<{ className?: string }>
> = {
  observe: EyeIcon,
  simplify: LayersIcon,
  automate: WorkflowIcon,
  grow: CompassIcon,
};

interface JourneyStep {
  id: string;
  title: string;
  description: string;
}

interface ProcessProps {
  messages: {
    subtitle: string;
    headline: string;
    description: string;
    steps: JourneyStep[];
    closing: string;
  };
}

export default function Process({ messages }: ProcessProps) {
  return (
    <Section id="process">
      <Container>
        <SectionHeading title={messages.headline} subtitle={messages.subtitle} />

        <ScrollReveal>
          <p className="text-center text-text-secondary max-w-xl mx-auto mb-16 md:mb-20 leading-relaxed">
            {messages.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {messages.steps.map((step, index) => {
            const Icon =
              step.id in journeyIcons
                ? journeyIcons[step.id as JourneyKey]
                : null;

            return (
              <ScrollReveal key={step.id} delay={index * 0.1}>
                <GlassCard
                  hover={false}
                  className="h-full p-7 md:p-8 hover:-translate-y-1 hover:border-border-active transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-text-muted uppercase mb-3">
                      {JOURNEY_PREFIX} · {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="h-px bg-border w-8 mb-5" />

                    <div className="w-12 h-12 rounded-radius-md bg-gradient-to-br from-brand-soft to-transparent flex items-center justify-center mb-5">
                      {Icon && <Icon className="w-5 h-5 text-brand/60" />}
                    </div>

                    <h3 className="text-base font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      {step.description}
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
