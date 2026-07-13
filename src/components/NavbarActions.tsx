"use client";

import { usePathname, useRouter } from "next/navigation";

interface NavbarActionsProps {
  label: string;
  ariaLabel: string;
}

export default function NavbarActions({ label, ariaLabel }: NavbarActionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "ar";
  const targetLocale = currentLocale === "ar" ? "en" : "ar";

  const toggleLanguage = () => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center justify-center h-8 px-3 rounded-radius-sm text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card border border-border transition-all duration-200"
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}
