"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/ui/MobileMenu";
import { SmartLink } from "@/components/SmartLink";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarClientProps {
  links: NavLink[];
  mobileCtaLabel: string;
  brandFirst: string;
  brandSecond: string;
  homeAriaLabel: string;
  ariaMainNav: string;
  ariaOpenMenu: string;
  ariaCloseMenu: string;
  languageSwitcher: React.ReactNode;
}

export default function NavbarClient({
  links,
  mobileCtaLabel,
  brandFirst,
  brandSecond,
  homeAriaLabel,
  ariaMainNav,
  ariaOpenMenu,
  ariaCloseMenu,
  languageSwitcher,
}: NavbarClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleSectionObserve = useCallback(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    const cleanup = handleSectionObserve();
    return cleanup;
  }, [handleSectionObserve, pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-0 right-0 z-999 mx-auto w-[90%] max-w-360 transition-all duration-500",
          scrolled ? "top-2" : "top-4",
        )}
        aria-label={ariaMainNav}
      >
        {/* Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl -z-10 pointer-events-none transition-all duration-500",
            scrolled
              ? "bg-surface-card/80 backdrop-blur-xl border border-border shadow-glass"
              : "bg-surface-card/20 backdrop-blur-md border border-border",
          )}
        />

        <div className="h-14 flex items-center justify-between px-4 md:px-6">
          {/* Logo + Mobile hamburger */}
          <div className="flex items-center gap-0 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-radius-md text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors"
              aria-label={ariaOpenMenu}
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 5h14M2 9h14M2 13h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Link
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              href="/"
              aria-label={homeAriaLabel}
            >
              <span className="text-lg font-bold text-brand">
                {brandFirst}
                <span className="text-text-primary font-semibold">
                  {brandSecond}
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <LayoutGroup id="nav-links">
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

              return (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-radius-sm",
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-radius-sm bg-nav-active-bg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </SmartLink>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {languageSwitcher}
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2">
            {languageSwitcher}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        ctaLabel={mobileCtaLabel}
        ariaCloseMenu={ariaCloseMenu}
      />
    </>
  );
}
