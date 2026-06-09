"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HiColorSwatch } from "react-icons/hi";
import { IoLanguage } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { ReactNode } from "react";

const languages = ["عربى", "English"];

interface DropdownProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

function Dropdown({ icon, title, children, className = "" }: DropdownProps) {
  return (
    <div className="dropdown dropdown-end" tabIndex={0}>
      <div
        role="button"
        className="btn btn-link gap-1 px-0"
        aria-label={title}
        title={title}
      >
        {icon}
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content menu w-48 overflow-y-auto mt-4 rounded-2xl bg-black/10 backdrop-blur-xs border border-white/10 z-[1] ${className}`}
      >
        <li className="menu-title text-[#0060F5] border-b border-white/10 text-center text-sm font-bold mb-1">
          {title}
        </li>
        {children}
      </ul>
    </div>
  );
}

interface NavbarActionsProps {
  themeMessages: {
    title: string;
    themes: { key: string; title: string }[];
  };
  languageTitle: string;
  accountMessages: {
    title: string;
    menuItems: { title: string; url: string }[];
  };
}

export default function NavbarActions({
  themeMessages,
  languageTitle,
  accountMessages,
}: NavbarActionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const setTheme = async (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    await fetch("/api/theme", {
      method: "POST",
      body: JSON.stringify({ theme }),
    });
  };

  const setLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-2">
      {/* Theme Dropdown 
      <Dropdown
        icon={
          <HiColorSwatch
            className="transition hover:opacity-80"
            size={24}
            color="#0060F5"
          />
        }
        title={themeMessages.title}
        className="max-h-80 flex-nowrap"
      >
        {themeMessages.themes.map((theme) => (
          <li key={theme.key} className="text-xs text-[#0060F5]">
            <button
              onClick={() => setTheme(theme.key)}
              data-set-theme={theme.key}
            >
              {theme.title}
            </button>
          </li>
        ))}
      </Dropdown>
      */}

      {/* Language Dropdown */}
      <Dropdown
        icon={
          <IoLanguage
            className="transition hover:opacity-80"
            size={24}
            color="#0060F5"
          />
        }
        title={languageTitle}
      >
        {languages.map((language) => (
          <li key={language}>
            <button className="btn btn-sm btn-link hover:bg-[#0060F5]/25 no-underline hover:border-transparent w-full text-center text-xs text-white font-semibold"
              onClick={() => setLanguage(language === "عربى" ? "ar" : "en")}
            >
              {language}
            </button>
          </li>
        ))}
      </Dropdown>
    </div>
  );
}
