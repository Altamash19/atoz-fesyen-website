export const locales = ["en", "ms"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ms: "Bahasa Melayu",
};

/** BCP-47 tags for <html lang> and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: "en-MY",
  ms: "ms-MY",
};
