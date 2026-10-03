import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireImage } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { ShopView } from "@/views/ShopView";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang as Locale);
  return buildMetadata({
    lang: lang as Locale,
    path: "/shop",
    title: t.shop.nav,
    description: t.shop.metaDescription,
    image: requireImage("shop-front").src,
  });
}

export default async function ShopPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return <ShopView lang={lang} />;
}
