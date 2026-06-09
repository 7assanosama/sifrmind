import { getT } from "@/lib/i18n";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getT(locale, "metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getT(locale, "Home");

  const messages = {
    heroText1: t("heroText1"),
    heroText2: t("heroText2"),
    soon: t("soon"),
  };

  return <HomeClient messages={messages} />;
}
