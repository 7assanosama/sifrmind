import Link from "next/link";
import Image from "next/image";
import { getT } from "@/lib/i18n";
import NavbarActions from "./NavbarActions";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getT(locale, "navbar");

  const messages = {
    title: t("title"),
    theme: t.raw("theme"),
    account: t.raw("account"),
  };

  return (
    <div className="fixed top-4 left-0 right-0 mx-auto z-[999] w-[90%] max-w-[1440px]">
      <div className="absolute inset-0 rounded-2xl bg-black/10 backdrop-blur-xs border border-white/10 -z-10 pointer-events-none"></div>
      <div className="h-[54px] flex items-center justify-between px-4">
        {/* Left */}
        <Link className="flex items-center gap-0 transition hover:opacity-80" href={"/"}>
          <Image
            src="/icon.svg"
            alt="logo"
            width={46}
            height={46}
            priority
          />
          <p className="text-2xl text-[#0060F5] font-extrabold">
            {t("title")}
          </p>
        </Link>

        {/* Right */}
        <NavbarActions
          themeMessages={messages.theme}
          languageTitle={t("language")}
          accountMessages={messages.account}
        />
      </div>
    </div>
  );
}
