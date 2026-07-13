"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { SmartLink } from "@/components/SmartLink";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  ctaLabel: string;
  ariaCloseMenu: string;
}

export default function MobileMenu({
  open,
  onClose,
  links,
  ctaLabel,
  ariaCloseMenu,
}: MobileMenuProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] bg-background/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[1001] w-[300px] max-w-[85vw] bg-surface-elevated border-l border-border md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close button */}
              <div className="flex justify-end mb-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-radius-md text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
                  aria-label={ariaCloseMenu}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4 4l10 10M14 4L4 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1" role="menu">
                {links.map((link) => (
                  <SmartLink
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center h-12 px-4 rounded-radius-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors duration-150"
                    )}
                    role="menuitem"
                  >
                    {link.label}
                  </SmartLink>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-border">
                <Button variant="primary" className="w-full">
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
