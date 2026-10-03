import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories, countByCategory, getAllProducts, getBestsellers } from "@/lib/catalog";
import { requireImage } from "@/lib/images";
import { whatsappLink } from "@/lib/whatsapp";

export function HomeView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const bestsellers = getBestsellers();
  const counts = countByCategory();
  const years = new Date().getFullYear() - site.foundedYear;
  const designs = getAllProducts().filter((p) => p.code).length;
  const hero = requireImage("az-m01-model-01");
  const heroB = requireImage("az-m01-model-06");
  const heroC = requireImage("az-w04-model");
  const heroD = requireImage("az-m01-model-03");
  const shopPhoto = requireImage("shop-front");
  const fabric = requireImage("fabric-colour-card");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1 className="mt-4 text-[2.35rem] leading-[1.08] font-semibold text-brand-900 sm:text-5xl lg:text-[3.4rem]">{t.home.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.home.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}/products/`} className="btn btn-primary">
                {t.cta.browse} <ArrowRightIcon width={18} height={18} />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <WhatsAppIcon width={18} height={18} /> {t.cta.whatsapp}
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { v: String(designs), l: t.home.stats.designs },
                { v: "S–5XL", l: t.home.stats.sizes },
                { v: `${years}+`, l: t.home.stats.years },
              ].map((s) => (
                <div key={s.l} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-muted">{s.l}</dt>
                  <dd className="font-display text-3xl font-semibold text-brand-800">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Photo collage — studio shoot */}
          <div className="relative lg:col-span-6" aria-hidden="true">
            <div className="grid grid-cols-6 gap-3">
              <div className="relative col-span-6 aspect-[968/698] overflow-hidden rounded-[1.75rem] bg-sand shadow-xl shadow-brand-900/10">
                <Image src={hero.src} alt="" fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-800 backdrop-blur">
                  Baju Melayu Cekak Musang · AZ-M01
                </span>
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-sand">
                <Image src={heroB.src} alt="" fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover" style={{ objectPosition: "66% 50%" }} />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-sand">
                <Image src={heroC.src} alt="" fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover object-top" />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-sand">
                <Image src={heroD.src} alt="" fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover" style={{ objectPosition: "60% 50%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranges */}
      <section className="container-page py-14 md:py-20" aria-labelledby="cat-heading">
        <h2 id="cat-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">{t.home.categoriesTitle}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => {
            const img = requireImage(c.cover);
            return (
              <li key={c.id}>
                <Link
                  href={`/${lang}/category/${c.id}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/10"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#efebe3]">
                    <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-top transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="flex items-center justify-between gap-2 font-display text-xl font-semibold text-ink">
                      {c.name[lang]}
                      <span className="font-sans text-xs font-medium text-muted">{counts[c.id]}</span>
                    </h3>
                    <p className="mt-1 hidden text-sm leading-relaxed text-muted sm:block">{c.blurb[lang]}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Start here — best-sellers */}
      <section className="border-y border-line bg-sand/60 py-14 md:py-20" aria-labelledby="start-heading">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{lang === "ms" ? "Paling laris" : "Best-sellers"}</p>
              <h2 id="start-heading" className="mt-2 text-3xl font-semibold text-brand-900 md:text-4xl">{t.home.startTitle}</h2>
              <p className="mt-2 text-muted">{t.home.startSubtitle}</p>
            </div>
            <Link href={`/${lang}/products/`} className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
              {t.cta.viewAll} →
            </Link>
          </div>
          <ol className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {bestsellers.map((p) => (
              <li key={p.slug}>
                <ProductCard item={p} lang={lang} note={p.bestsellerNote?.[lang]} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-14 md:py-20" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-3xl font-semibold text-brand-900 md:text-4xl">{t.home.whyTitle}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.why.map((w, i) => (
            <li key={w.title} className="rounded-card border border-line bg-white p-6">
              <span className="font-display text-sm font-semibold text-gold">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
            </li>
          ))}
        </ul>

        {/* Fabric first */}
        <div className="mt-10 grid items-center gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-white md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-80">
            <Image src={fabric.src} alt={lang === "ms" ? "Kad warna fabrik" : "Fabric colour card"} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="p-6 pt-0 md:p-10">
            <h3 className="text-2xl font-semibold text-brand-900 md:text-3xl">{t.home.fabricsTitle}</h3>
            <p className="mt-3 leading-relaxed text-muted">{t.home.fabricsText}</p>
            <Link href={`/${lang}/category/fabrics/`} className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:underline">
              {t.home.fabricsLink} →
            </Link>
          </div>
        </div>
      </section>

      {/* Visit the shop teaser */}
      <section className="container-page pb-14 md:pb-20" aria-labelledby="shop-teaser-heading">
        <Link
          href={`/${lang}/shop/`}
          className="group grid overflow-hidden rounded-[2rem] border border-line bg-white transition hover:shadow-xl hover:shadow-brand-900/10 md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[26rem]">
            <Image src={shopPhoto.src} alt={t.shop.alts["shop-front"]} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: "50% 35%" }} />
            <span className="absolute top-4 left-4 grid h-20 w-20 -rotate-12 place-items-center rounded-full bg-gold text-center font-display leading-tight text-white shadow-lg" aria-hidden="true">
              <span>
                <span className="block font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase">Lot</span>
                <span className="block text-2xl font-semibold">20</span>
              </span>
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="eyebrow">{t.shop.eyebrow}</p>
            <h2 id="shop-teaser-heading" className="mt-2 text-3xl font-semibold text-brand-900 md:text-4xl">
              {t.shop.title} <span className="font-normal text-gold italic">{t.shop.titleAccent}</span>
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{site.hours[lang]}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 group-hover:underline">
              {t.shop.nav} <ArrowRightIcon width={18} height={18} />
            </span>
          </div>
        </Link>
      </section>

      {/* Raya planner */}
      <section className="container-page" aria-labelledby="raya-heading">
        <div className="pattern-geo overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-10 md:py-16">
          <div className="max-w-2xl">
            <h2 id="raya-heading" className="text-3xl font-semibold md:text-4xl">{t.home.rayaTitle}</h2>
            <p className="mt-3 text-white/75">{t.home.rayaText}</p>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {t.home.rayaSteps.map((s) => (
              <li key={s.title} className="border-t border-white/20 pt-4">
                <p className="text-xs font-bold tracking-[0.14em] text-gold-soft uppercase">{s.when}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 rounded-2xl bg-white/10 p-4 text-sm text-white/90">{t.home.kidsNote}</p>
          <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl">{t.home.ctaTitle}</p>
              <p className="mt-1 text-white/75">{t.home.ctaText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon /> {t.cta.whatsapp}
              </a>
              <Link href={`/${lang}/wholesale/`} className="btn btn-light">
                {t.nav.wholesale}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
