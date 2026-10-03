import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllProducts } from "@/lib/catalog";
import { requireImage } from "@/lib/images";

export function AboutView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const rack = requireImage("about-rack");
  const portrait = requireImage("altamash");

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}/` }, { label: t.nav.about }]} />

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h1 className="text-4xl leading-tight font-semibold text-brand-900 md:text-5xl">{t.about.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-ink">{t.about.intro}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.about.story}</p>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              { v: String(site.foundedYear), l: t.about.founded },
              { v: String(getAllProducts().filter((p) => p.code).length), l: t.about.stats.designs },
              { v: "S–5XL", l: t.about.stats.sizes },
            ].map((s) => (
              <div key={s.l} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted">{s.l}</dt>
                <dd className="font-display text-3xl font-semibold text-brand-800">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/5] max-h-[38rem] w-full overflow-hidden rounded-[1.75rem] bg-sand">
            <Image src={rack.src} alt={lang === "ms" ? "Jubah dan kurta di rak kedai" : "Jubbah and kurta on the shop rail"} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </div>

      <blockquote className="mt-14 border-l-4 border-gold pl-6 md:mt-20">
        <p className="font-display text-2xl leading-snug text-brand-900 md:text-3xl">“{t.about.quote}”</p>
        <footer className="mt-3 text-sm text-muted">— {site.legalName}, {site.registrationNo}</footer>
      </blockquote>

      <section className="mt-16" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-3xl font-semibold text-brand-900">{t.about.valuesTitle}</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {t.about.values.map((v) => (
            <li key={v.title} className="rounded-card border border-line bg-white p-6">
              <h3 className="text-xl font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-sand md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" aria-labelledby="nextgen-heading">
        <div className="relative aspect-[3/4] md:h-full">
          <Image src={portrait.src} alt={t.about.nextGenName} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="p-6 pt-0 md:p-10">
          <p className="eyebrow">{t.about.nextGenTitle}</p>
          <h2 id="nextgen-heading" className="mt-2 text-2xl font-semibold text-brand-900 md:text-3xl">{t.about.nextGenName}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t.about.nextGenText}</p>
          <p className="mt-5 border-l-2 border-gold pl-4 font-display text-lg text-ink italic">“{t.about.nextGenQuote}”</p>
          <Link href={`/${lang}/contact/`} className="btn btn-primary mt-6">
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
