import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { ContactView } from "@/views/ContactView";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  return buildMetadata({ lang: lang as Locale, path: "/contact", title: t.contact.title, description: t.contact.subtitle });
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return <ContactView lang={lang} />;
}
