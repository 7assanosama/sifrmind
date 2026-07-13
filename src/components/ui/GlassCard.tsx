import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-radius-lg border border-border bg-surface-card/50 backdrop-blur-xl p-6 md:p-8",
        hover &&
          "transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-glass",
        className
      )}
    >
      {children}
    </div>
  );
}
