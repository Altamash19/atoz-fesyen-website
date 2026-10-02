import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { NotFoundView } from "@/views/NotFoundView";

// Static hosts serve /404.html for unknown URLs; scripts/postbuild.mjs copies this page there.
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(lang as Locale).notFound.title, robots: { index: false } };
}

export default async function NotFoundPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  return <NotFoundView lang={lang} />;
}
