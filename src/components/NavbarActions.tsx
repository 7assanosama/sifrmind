"use client";

import { usePathname, useRouter } from "@/navigation";

interface NavbarActionsProps {
  label: string;
  ariaLabel: string;
  targetLocale: string;
}

export default function NavbarActions({ label, ariaLabel, targetLocale }: NavbarActionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    router.push(pathname, { locale: targetLocale });
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
