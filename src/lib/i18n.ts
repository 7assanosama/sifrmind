import { getTranslations } from "next-intl/server";
import { cache } from "react";

export const getT = cache((locale: string, namespace: string) => {
  return getTranslations({
    locale,
    namespace,
  });
});
