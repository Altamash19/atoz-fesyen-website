import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GarmentArt } from "@/components/GarmentArt";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function AboutView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}` }, { label: t.nav.about }]} />

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{t.about.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-ink">{t.about.intro}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.about.story}</p>
        </div>
        <aside className="pattern-geo relative overflow-hidden rounded-[1.75rem] p-8 text-white lg:col-span-5">
          <GarmentArt silhouette="melayu" className="absolute -right-6 -bottom-4 h-56 text-white/10" />
          <p className="eyebrow !text-gold-soft">{t.about.founded}</p>
          <p className="mt-2 font-display text-6xl font-semibold">{site.foundedYear}</p>
          <p className="mt-4 text-sm text-white/75">{site.legalName}</p>
          <p className="text-sm text-white/60">{site.registrationNo}</p>
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-3xl font-semibold text-brand-900">
          {t.about.valuesTitle}
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {t.about.values.map((v) => (
            <li key={v.title} className="rounded-card border border-line bg-white p-6">
              <h3 className="text-xl font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-[1.5rem] bg-sand p-8 md:p-10" aria-labelledby="careers-heading">
        <h2 id="careers-heading" className="text-2xl font-semibold text-brand-900">
          {t.about.careersTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{t.about.careersText}</p>
        <Link href={`/${lang}/contact`} className="btn btn-primary mt-5">
          {t.nav.contact}
        </Link>
      </section>
    </div>
  );
}
