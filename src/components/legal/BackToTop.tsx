"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="back-to-top fixed bottom-8 right-8 z-50 flex items-center justify-center size-11 rounded-full glass-strong shadow-glass hover:shadow-glow transition-shadow duration-300 text-text-primary"
          aria-label="Back to top"
        >
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
