import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { AboutView } from "@/views/AboutView";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  return buildMetadata({ lang: lang as Locale, path: "/about", title: t.nav.about, description: t.about.intro });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return <AboutView lang={lang} />;
}
