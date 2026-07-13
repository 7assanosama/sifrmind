"use client";

import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
            {subtitle}
          </p>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-text-primary">
        {title}
      </h2>
    </ScrollReveal>
  );
}
