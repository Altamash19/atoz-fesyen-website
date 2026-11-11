import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { PricesView } from "@/views/PricesView";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  return buildMetadata({ lang: lang as Locale, path: "/prices", title: t.prices.title, description: t.prices.subtitle });
}

export default async function PricesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return <PricesView lang={lang} />;
}
