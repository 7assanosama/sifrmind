"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return null;
}