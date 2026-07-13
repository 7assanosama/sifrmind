"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { setPendingHash } from "@/lib/hash-navigation";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
}

export function SmartLink({ href, children, className, onClick, role }: SmartLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const isHashLink = href.startsWith("#");
  const isHomepage = pathname === "/";
  const hashId = isHashLink ? href.slice(1) : "";

  console.log(
    `[SmartLink] locale=${locale} pathname=${pathname} href=${href}` +
    (isHashLink ? ` → hash link` : ` → plain link`),
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) onClick();

      if (!isHashLink) return;

      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      e.preventDefault();

      if (isHomepage) {
        const el = document.getElementById(hashId);
        if (el) {
          window.history.replaceState(null, "", `#${hashId}`);
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // next-intl's router.push drops hash from href objects.
        // We store the target hash in shared state so
        // HashScrollHandler can update the URL + scroll
        // after navigation completes (no race condition).
        setPendingHash(hashId);
        router.push("/", { scroll: false, locale });
      }
    },
    [isHashLink, isHomepage, hashId, router, locale, onClick],
  );

  if (isHashLink) {
    return (
      // NOTE: next-intl v4 runtime preserves `hash` from the
      // href object when passing it to Next.js Link, but the
      // current HrefObject TS type does not include it.
      // Remove this cast once next-intl adds hash support.
      <Link
        href={{ pathname: "/", hash: hashId } as any}
        className={className}
        onClick={handleClick}
        role={role}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} role={role}>
      {children}
    </Link>
  );
}
