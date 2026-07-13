"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import InteractiveSifrBackground from "@/components/InteractiveSifrBackground";

interface HeroProps {
  locale: string;
  messages: {
    headline1: string;
    headline2: string;
    supporting: string;
    description: string;
    cta1: string;
    cta2: string;
  };
}

export default function Hero({ messages, locale }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(useTransform(mouseX, [-500, 500], [-12, 12]), {
    damping: 40,
    stiffness: 120,
  });

  const y = useSpring(useTransform(mouseY, [-500, 500], [-12, 12]), {
    damping: 40,
    stiffness: 120,
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const reduced = shouldReduceMotion;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "var(--font-ibm-plex-arabic)" }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"
        aria-hidden="true"
      />

      {/* Interactive sifr particles */}
      <InteractiveSifrBackground />

      {/* Cursor glow */}
      {!reduced && (
        <motion.div
          className="pointer-events-none fixed w-40 h-40 rounded-full bg-brand/5 blur-3xl"
          style={{
            left: mouseX,
            top: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          aria-hidden="true"
        />
      )}

      {/* Center content */}
      <motion.div
        style={reduced ? undefined : { x, y }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Headline */}
        <motion.h1
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-primary text-4xl md:text-6xl lg:text-8xl font-bold leading-normal tracking-tight"
        >
          {messages.headline1}
          <br />
          <span className="text-text-primary">{messages.headline2}</span>
        </motion.h1>

        {/* Supporting headline */}
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg md:text-xl text-text-secondary font-light"
        >
          {messages.supporting}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base text-text-muted max-w-xl mx-auto leading-relaxed"
        >
          {messages.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={"https://www.dash.sifrmind.com/" + locale}>
            <Button variant="primary" size="lg">
              {messages.cta1}
            </Button>
          </Link>
          <Link href={locale + "/contact"}>
            <Button variant="ghost" size="lg">
              {messages.cta2}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Vignette — theme-aware */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, transparent 35%, var(--color-background) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, 4, 0],
                  opacity: [0.45, 1, 0.45],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-9 w-5.5 justify-center rounded-full border border-border bg-nav-active-bg/50 p-1.5 backdrop-blur-md"
        >
          <span className="h-2 w-1 rounded-full bg-text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
