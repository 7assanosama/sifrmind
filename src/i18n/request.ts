import { getRequestConfig } from 'next-intl/server';
import { routing } from '../routing';

export default getRequestConfig(async ({ locale }) => {
  // Resolve locale, falling back to 'en' if undefined or invalid
  const resolvedLocale = routing.locales.includes(locale as "en" | "ar")
    ? (locale as "en" | "ar")
    : 'en';

  const messages =
    resolvedLocale === 'ar'
      ? (await import('./../../messages/ar.json')).default
      : (await import('./../../messages/en.json')).default;

  return { locale: resolvedLocale, messages };
});
