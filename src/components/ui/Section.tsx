import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-24 px-6 md:px-8 lg:px-12 scroll-mt-24",
        className
      )}
    >
      {children}
    </section>
  );
}
