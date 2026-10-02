import Link from "next/link";
import { GarmentArt } from "@/components/GarmentArt";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function NotFoundView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <div className="container-page flex flex-col items-center py-20 text-center md:py-28">
      <GarmentArt silhouette="robe" className="h-32 text-brand-100" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-brand-900">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-muted">{t.notFound.text}</p>
      <Link href={`/${lang}/products/`} className="btn btn-primary mt-8">
        {t.notFound.back}
      </Link>
    </div>
  );
}
