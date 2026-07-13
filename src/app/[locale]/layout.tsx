import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Providers } from "../providers";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const a11y = await getTranslations({ locale, namespace: "accessibility" });

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairo.variable} ${ibmPlexArabic.variable} ${cairo.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {/* Skip to content */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-radius-sm focus:text-sm focus:font-medium focus:outline-none"
        >
          {a11y("skipToContent")}
        </a>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar locale={locale} />
            {children}
            <HashScrollHandler />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
