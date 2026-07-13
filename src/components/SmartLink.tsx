"use client";

import { useCallback } from "react";
import { Link, usePathname, useRouter } from "@/navigation";

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

  const isHashLink = href.startsWith("#");
  const isHomepage = pathname === "/";
  const hashId = isHashLink ? href.slice(1) : "";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) onClick();

      if (!isHashLink) return;

      e.preventDefault();

      if (isHomepage) {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push({ pathname: "/", hash: hashId } as any);
      }
    },
    [isHashLink, isHomepage, hashId, router, onClick],
  );

  if (isHashLink) {
    return (
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
