"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FAQProps {
  messages: {
    subtitle: string;
    headline: string;
    description: string;
    items: FaqItem[];
    closing: string;
  };
}

export default function FAQ({ messages }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <Container>
        <SectionHeading title={messages.headline} subtitle={messages.subtitle} />

        <ScrollReveal>
          <p className="text-lg text-text-secondary max-w-xl mx-auto text-center leading-relaxed mb-16 md:mb-20">
            {messages.description}
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {messages.items.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-q-${index}`;
            const answerId = `faq-a-${index}`;

            return (
              <ScrollReveal key={index} delay={index * 0.03}>
                <GlassCard
                  hover={false}
                  className={cn(
                    "transition-all duration-300",
                    isOpen && "border-border-active"
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggle(index)}
                      className="flex items-center justify-between w-full text-left group"
                    >
                      <span
                        className={cn(
                          "text-base font-medium transition-colors duration-200 pr-4",
                          isOpen
                            ? "text-text-primary"
                            : "text-text-secondary group-hover:text-text-primary"
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300",
                          isOpen && "rotate-45"
                        )}
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className={cn(
                            "transition-colors duration-200",
                            isOpen ? "text-brand" : "text-text-muted"
                          )}
                        >
                          <path
                            d="M7 1v12M1 7h12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.2, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="h-px bg-border w-8 mb-5" />
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
