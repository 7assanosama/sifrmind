"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "@/navigation";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LEGAL_CONFIG } from "@/config/legal";
import ReadingProgress from "./ReadingProgress";
import LegalTOC from "./LegalTOC";
import LegalSectionComponent from "./LegalSection";
import BackToTop from "./BackToTop";
import type { LegalPageProps } from "@/types/legal";

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

function countWords(sections: LegalPageProps["sections"]): number {
  const texts = sections.flatMap((s) => {
    const parts: string[] = [];
    if (s.body) parts.push(s.body);
    if (s.items) parts.push(...s.items);
    if (s.subsections) {
      for (const sub of s.subsections) {
        if (sub.body) parts.push(sub.body);
        if (sub.items) parts.push(...sub.items);
      }
    }
    if (s.card?.body) parts.push(s.card.body);
    return parts;
  });
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}

export default function LegalPage({
  title,
  subtitle,
  sections,
  navItems,
  bottomCta,
}: LegalPageProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const readingTime = useMemo(() => {
    const words = countWords(sections);
    return Math.max(1, Math.ceil(words / 200));
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const setRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  }, []);

  const handleCopyLink = useCallback(
    (sectionId: string) => {
      const url = `${window.location.origin}${pathname}#${sectionId}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(sectionId);
        setTimeout(() => setCopiedId(null), 2000);
      });
    },
    [pathname],
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sifr Mind",
        item: "https://sifrmind.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://sifrmind.com${pathname}`,
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand/[0.04] via-brand/[0.02] to-transparent rounded-full blur-3xl" />
          <div className="absolute right-1/3 top-24 w-72 h-72 bg-brand/[0.03] rounded-full blur-[100px]" />
          <div className="absolute left-1/3 top-40 w-56 h-56 bg-brand/[0.02] rounded-full blur-[80px]" />
        </div>

        <Container className="text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-medium text-text-muted">
                <span className="size-1.5 rounded-full bg-brand" />
                Legal Document
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-medium text-text-muted">
                Last Updated: {LEGAL_CONFIG.lastUpdated}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-medium text-text-muted">
                {readingTime} min read
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-text-primary mb-4 max-w-3xl mx-auto">
              {title}
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ═══════════════════ CONTENT + TOC ═══════════════════ */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-14 relative">
            <aside className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pt-2">
                <LegalTOC items={navItems} activeId={activeId} />
              </div>
            </aside>

            <div className="min-w-0 max-w-[780px]">
              {sections.map((section) => (
                <LegalSectionComponent
                  key={section.id}
                  section={section}
                  isCopied={copiedId === section.id}
                  onCopyLink={() => handleCopyLink(section.id)}
                  setRef={setRef}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ BOTTOM CTA ═══════════════════ */}
      <section className="pb-20 md:pb-32">
        <Container>
          <FadeUp>
            <div className="relative text-center py-16 md:py-20 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/[0.03] via-transparent to-transparent"
              />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-text-primary mb-3 max-w-2xl mx-auto">
                {bottomCta.headline}
              </h2>
              <p className="text-base md:text-lg text-text-secondary mb-8 max-w-lg mx-auto">
                {bottomCta.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={`mailto:${LEGAL_CONFIG.supportEmail}`}>
                  <Button variant="primary" size="lg">
                    <Mail size={16} strokeWidth={1.75} />
                    {bottomCta.primaryCta}
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${LEGAL_CONFIG.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

      <BackToTop />
    </main>
  );
}
