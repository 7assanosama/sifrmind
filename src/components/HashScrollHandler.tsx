"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/navigation";
import { consumePendingHash } from "@/lib/hash-navigation";

export function HashScrollHandler() {
  const pathname = usePathname();
  const handledRef = useRef(false);

  useEffect(() => {
    handledRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlHash = window.location.hash.slice(1);
    const pending = consumePendingHash();
    const hash = urlHash || pending;
    if (!hash) return;

    const scrollToElement = () => {
      const el = document.getElementById(hash);
      if (el) {
        if (pending && !urlHash) {
          window.history.replaceState(null, "", `#${hash}`);
        }
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
