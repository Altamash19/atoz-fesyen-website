import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryIds, type CategoryId } from "@/data/catalog";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getCategory } from "@/lib/catalog";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { CatalogView } from "@/views/CatalogView";

type Props = { params: Promise<{ lang: string; category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => categoryIds.map((category) => ({ lang, category })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const l = lang as Locale;
  return buildMetadata({ lang: l, path: `/category/${cat.id}`, title: cat.name[l], description: `${cat.blurb[l]} ${getDictionary(l).product.metaSuffix}` });
}

export default async function CategoryPage({ params }: Props) {
  const { lang, category } = await params;
  if (!isLocale(lang) || !getCategory(category)) notFound();
  return <CatalogView lang={lang} category={category as CategoryId} />;
}
