"use client";

import { useRef } from "react";
import type { ComponentType } from "react";
import {
  Mail,
  MessageCircle,
  Clock,
  Handshake,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type IconProps = { size?: number; className?: string; strokeWidth?: number };
type IconComponent = ComponentType<IconProps>;

interface ContactClientProps {
  messages: {
    hero: { label: string; headline: string; description: string };
    cards: {
      email: { title: string; description: string; value: string; cta: string; href: string };
      whatsapp: { title: string; description: string; value: string; cta: string; href: string };
      instagram: { title: string; description: string; value: string; cta: string; href: string };
      facebook: { title: string; description: string; value?: string; cta: string; href: string };
    };
    quickInfo: {
      responseTime: { title: string; description: string };
      availability: { title: string; description: string };
      collaboration: { title: string; description: string };
    };
    bottomCta: {
      headline: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
}

interface CardData {
  title: string;
  description: string;
  value?: string;
  cta: string;
  href: string;
}

const cardIcons = [Mail, FaWhatsapp, FaInstagram, FaFacebookF] as const;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactClient({ messages }: ContactClientProps) {
  const { hero, cards: cardMsgs, quickInfo, bottomCta } = messages;
  const reduce = useReducedMotion();

  const contactCards: (CardData & { Icon: IconComponent })[] = [
    { ...cardMsgs.email, Icon: cardIcons[0] },
    { ...cardMsgs.whatsapp, Icon: cardIcons[1] },
    { ...cardMsgs.instagram, Icon: cardIcons[2] },
    { ...cardMsgs.facebook, Icon: cardIcons[3] },
  ];

  const quickInfoCards: { title: string; description: string; Icon: IconComponent }[] = [
    { ...quickInfo.responseTime, Icon: Clock },
    { ...quickInfo.availability, Icon: Users },
    { ...quickInfo.collaboration, Icon: Handshake },
  ];

  return (
    <main className="min-h-screen">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-12">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand/[0.04] via-brand/[0.02] to-transparent rounded-full blur-3xl" />
          <div className="absolute right-1/3 top-24 w-72 h-72 bg-brand/[0.03] rounded-full blur-[100px]" />
          <div className="absolute left-1/3 top-40 w-56 h-56 bg-brand/[0.02] rounded-full blur-[80px]" />
        </div>

        <Container className="text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 mb-5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                {hero.label}
              </span>
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-text-primary mb-4 max-w-3xl mx-auto">
              {hero.headline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              {hero.description}
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ═══════════════════ CONTACT CARDS ═══════════════════ */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
            {contactCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.06}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative flex flex-col h-full p-7",
                    "rounded-3xl bg-white/[0.03]",
                    "border border-white/[0.08]",
                    "backdrop-blur-xl",
                    "shadow-[0_4px_24px_rgba(255,255,255,0.02)]",
                    "hover:border-brand/20",
                    "hover:shadow-[0_12px_48px_rgba(255,255,255,0.04)]",
                    "transition-all duration-400 ease-out",
                  )}
                >
                  <div className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-brand/[0.08] mb-5 transition-transform duration-400 ease-out group-hover:scale-110">
                    <card.Icon size={22} className="text-brand" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                    {card.description}
                  </p>
                  {card.value && (
                    <p className="text-sm font-medium text-text-primary mb-5">
                      {card.value}
                    </p>
                  )}
                  <a href={card.href} target="_blank" rel="noopener noreferrer">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center gap-2 w-full h-11 px-5",
                        "rounded-full text-sm font-medium",
                        "bg-brand text-background",
                        "hover:bg-brand-hover",
                        "shadow-[0_2px_12px_rgba(255,255,255,0.06)]",
                        "hover:shadow-[0_4px_20px rgba(255,255,255,0.08)]",
                        "transition-all duration-300",
                      )}
                    >
                      {card.cta}
                      <ArrowRight size={14} strokeWidth={2} />
                    </span>
                  </a>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════ QUICK INFO ═══════════════════ */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto px-4">
            {quickInfoCards.map((card, i) => (
              <FadeUp key={card.title} delay={0.1 + i * 0.06}>
                <div className="flex flex-col items-center text-center gap-3 p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/[0.08]">
                    <card.Icon size={20} strokeWidth={1.75} className="text-brand" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {card.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════ BOTTOM CTA ═══════════════════ */}
      <section className="pb-20 md:pb-32 px-4">
        <Container>
          <FadeUp>
            <div className="relative text-center py-16 md:py-20 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/[0.03] via-transparent to-transparent"
              /> 
              <p className="text-base md:text-lg text-text-secondary mb-8 max-w-lg mx-auto">
                {bottomCta.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="mailto:support@sifrmind.com">
                  <Button variant="primary" size="lg">
                    <Mail size={16} strokeWidth={1.75} />
                    {bottomCta.primaryCta}
                  </Button>
                </a>
                <a href="https://wa.me/201029231051" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    <MessageCircle size={16} strokeWidth={1.75} />
                    {bottomCta.secondaryCta}
                  </Button>
                </a>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
