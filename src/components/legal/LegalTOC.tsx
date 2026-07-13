"use client";

import { cn } from "@/lib/utils";
import type { LegalNavItem } from "@/types/legal";

interface LegalTOCProps {
  items: LegalNavItem[];
  activeId: string;
}

export default function LegalTOC({ items, activeId }: LegalTOCProps) {
  return (
    <nav aria-label="Table of Contents" className="legal-toc">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-5">
        On this page
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200",
                activeId === item.id
                  ? "border-brand text-text-primary font-medium"
                  : "border-transparent text-text-muted hover:text-text-primary hover:border-border-hover",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
