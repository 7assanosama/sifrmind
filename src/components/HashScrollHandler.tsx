"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/navigation";

export function HashScrollHandler() {
  const pathname = usePathname();
  const handledRef = useRef(false);

  useEffect(() => {
    handledRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);

    const scrollToElement = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        handledRef.current = true;
        return true;
      }
      return false;
    };

    if (scrollToElement()) return;

    const observer = new MutationObserver(() => {
      if (!handledRef.current && scrollToElement()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timeout = setTimeout(() => {
      observer.disconnect();
      if (!handledRef.current) scrollToElement();
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
