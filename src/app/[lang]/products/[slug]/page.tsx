import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { coverImageKey, getAllProducts, getProduct, productLabel } from "@/lib/catalog";
import { getImage } from "@/lib/images";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { ProductView } from "@/views/ProductView";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getAllProducts().map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const item = getProduct(slug);
  if (!item) return {};
  const l = lang as Locale;
  return buildMetadata({
    lang: l,
    path: `/products/${slug}`,
    title: productLabel(item),
    description: `${productLabel(item)} — ${item.tagline[l]}. ${getDictionary(l).product.metaSuffix}`,
    image: getImage(coverImageKey(item) ?? "")?.src,
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  const item = getProduct(slug);
  if (!isLocale(lang) || !item) notFound();
  return <ProductView lang={lang} item={item} />;
}
