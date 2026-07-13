"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
    >
      <motion.div
        className="h-full bg-brand origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
