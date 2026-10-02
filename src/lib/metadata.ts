import type { Metadata } from "next";
import { site } from "@/config/site";
import { locales, localeTags, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface Options {
  lang: Locale;
  /** Path without the language prefix, e.g. "/products". Use "" for the home page. */
  path: string;
  title?: string;
  description?: string;
  image?: string;
}

/** Consistent title, description, canonical URL, hreflang alternates and Open Graph for every page. */
export function buildMetadata({ lang, path, title, description, image }: Options): Metadata {
  const t = getDictionary(lang);
  const desc = description ?? t.meta.description;
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}${path}`]));

  return {
    title: title ?? { absolute: t.meta.title },
    description: desc,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { ...languages, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeTags[lang].replace("-", "_"),
      url: `/${lang}${path}`,
      title: title ? `${title} | ${site.name}` : t.meta.title,
      description: desc,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary" },
  };
}
