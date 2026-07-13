"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offset = directionOffset[direction];

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={cn("opacity-100", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
