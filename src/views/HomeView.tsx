import Link from "next/link";
import { GarmentArt } from "@/components/GarmentArt";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Silhouette } from "@/data/catalog";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories, countByCategory, getAllProducts, getFeaturedProducts } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";

const categoryArt: Record<string, { silhouette: Silhouette; tint: string }> = {
  men: { silhouette: "robe", tint: "bg-brand-50 text-brand-700" },
  women: { silhouette: "kurung", tint: "bg-[#f7ece9] text-[#8c4a3c]" },
  kids: { silhouette: "kurta", tint: "bg-[#eef1f8] text-[#3e5487]" },
  accessories: { silhouette: "sampin", tint: "bg-gold-soft text-gold" },
};

export function HomeView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const featured = getFeaturedProducts().slice(0, 8);
  const counts = countByCategory();
  const years = new Date().getFullYear() - site.foundedYear;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1 className="mt-4 text-[2.4rem] leading-[1.08] font-semibold text-brand-900 sm:text-5xl lg:text-[3.6rem]">
              {t.home.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.home.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}/products`} className="btn btn-primary">
                {t.cta.browse} <ArrowRightIcon width={18} height={18} />
              </Link>
              <Link href={`/${lang}/wholesale`} className="btn btn-outline">
                {t.cta.quote}
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { v: `${getAllProducts().length}+`, l: t.home.stats.styles },
                { v: String(categories.length), l: t.home.stats.categories },
                { v: `${years}+`, l: t.home.stats.years },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-3xl font-semibold text-brand-800">{s.v}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual collage — swap for a real photo shoot later */}
          <div className="relative hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="pattern-geo relative aspect-[4/5] overflow-hidden rounded-[2rem] text-gold-soft">
              <GarmentArt silhouette="robe" className="absolute inset-x-0 top-[7%] mx-auto h-[66%] opacity-90" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/10 p-5 text-white backdrop-blur">
                <p className="font-display text-xl">Jubbah · Kurta · Baju Melayu</p>
                <p className="mt-1 text-sm text-white/70">Baju Kurung · Kids · Sampin</p>
              </div>
            </div>
            <div className="absolute top-10 -left-8 grid h-28 w-28 place-items-center rounded-3xl border border-line bg-white text-[#8c4a3c] shadow-xl shadow-brand-900/10">
              <GarmentArt silhouette="kurung" className="h-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16 md:py-20" aria-labelledby="cat-heading">
        <h2 id="cat-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">
          {t.home.categoriesTitle}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${lang}/category/${c.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/10"
              >
                <div className={`grid aspect-[5/4] place-items-center ${categoryArt[c.id].tint}`}>
                  <GarmentArt silhouette={categoryArt[c.id].silhouette} className="h-3/4 transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="flex items-center justify-between font-display text-xl font-semibold text-ink">
                    {c.name[lang]}
                    <span className="font-sans text-xs font-medium text-muted">{counts[c.id]}</span>
                  </h3>
                  <p className="mt-1 hidden text-sm leading-relaxed text-muted sm:block">{c.blurb[lang]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured */}
      <section className="border-y border-line bg-sand/60 py-16 md:py-20" aria-labelledby="featured-heading">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="featured-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">
                {t.home.featuredTitle}
              </h2>
              <p className="mt-2 text-muted">{t.home.featuredSubtitle}</p>
            </div>
            <Link href={`/${lang}/products`} className="text-sm font-semibold text-brand-700 hover:underline">
              {t.cta.viewAll} →
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard item={p} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-16 md:py-20" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">
          {t.home.whyTitle}
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.why.map((w, i) => (
            <li key={w.title} className="rounded-card border border-line bg-white p-6">
              <span className="font-display text-sm font-semibold text-gold">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How wholesale works */}
      <section className="container-page" aria-labelledby="steps-heading">
        <div className="pattern-geo overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-10 md:py-16">
          <h2 id="steps-heading" className="text-3xl font-semibold md:text-4xl">
            {t.home.stepsTitle}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {t.home.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-display text-lg font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl">{t.home.ctaTitle}</p>
              <p className="mt-1 text-white/75">{t.home.ctaText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon /> {t.cta.whatsapp}
              </a>
              <Link href={`/${lang}/wholesale`} className="btn btn-light">
                {t.cta.quote}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
