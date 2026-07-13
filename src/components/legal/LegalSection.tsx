"use client";

import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LegalSectionData } from "@/types/legal";

interface LegalSectionProps {
  section: LegalSectionData;
  isCopied: boolean;
  onCopyLink: () => void;
  setRef: (id: string, el: HTMLElement | null) => void;
}

export default function LegalSection({
  section,
  isCopied,
  onCopyLink,
  setRef,
}: LegalSectionProps) {
  const { id, heading, body, items, subsections, card } = section;

  return (
    <section
      id={id}
      ref={(el) => setRef(id, el)}
      className="mb-14 md:mb-20 scroll-mt-28"
    >
      <div className="group flex items-start gap-3 mb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          {heading}
        </h2>
        <button
          onClick={onCopyLink}
          className="relative mt-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 p-1.5 rounded-md hover:bg-surface-card-hover text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={`Copy link to ${heading} section`}
        >
          {isCopied ? (
            <Check size={14} strokeWidth={2.5} />
          ) : (
            <Link2 size={14} strokeWidth={2} />
          )}
        </button>
        {isCopied && (
          <span
            className="text-xs text-text-muted mt-2 flex-shrink-0"
            aria-live="polite"
          >
            &#10003; Link copied
          </span>
        )}
      </div>

      {body && (
        <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6 max-w-[68ch]">
          {body}
        </p>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-3 mb-6">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-base md:text-lg text-text-secondary leading-relaxed"
            >
              <span className="mt-[10px] size-1.5 rounded-full bg-brand shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {subsections && subsections.length > 0 && (
        <div className="space-y-8 mt-8">
          {subsections.map((sub, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {sub.heading}
              </h3>
              {sub.body && (
                <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4 max-w-[68ch]">
                  {sub.body}
                </p>
              )}
              {sub.items && sub.items.length > 0 && (
                <ul className="space-y-3">
                  {sub.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-base md:text-lg text-text-secondary leading-relaxed"
                    >
                      <span className="mt-[10px] size-1.5 rounded-full bg-brand shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {card && (
        <div
          className={cn(
            "mt-8 p-6 md:p-8 rounded-2xl border backdrop-blur-xl",
            card.type === "notice"
              ? "bg-brand/[0.05] border-brand/[0.1]"
              : "bg-surface-card/50 border-border/50",
          )}
        >
          <p
            className={cn(
              "text-base md:text-lg leading-relaxed",
              card.type === "quote"
                ? "italic text-text-primary font-medium"
                : "text-text-secondary",
            )}
          >
            {card.body}
          </p>
        </div>
      )}
    </section>
  );
}
