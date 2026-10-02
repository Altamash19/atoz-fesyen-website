import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WholesaleForm } from "@/components/WholesaleForm";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/whatsapp";

export function WholesaleView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}/` }, { label: t.nav.wholesale }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{t.wholesale.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.wholesale.subtitle}</p>

          <h2 className="mt-10 font-sans text-sm font-semibold tracking-wider text-gold uppercase">{t.wholesale.termsTitle}</h2>
          <dl className="mt-4 divide-y divide-line rounded-card border border-line bg-white" data-testid="terms">
            {t.wholesale.terms.map((row) => (
              <div key={row.k} className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink">{row.k}</dt>
                <dd className="text-sm leading-relaxed text-muted">{row.v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 font-sans text-sm font-semibold tracking-wider text-gold uppercase">{t.wholesale.whoTitle}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.wholesale.who.map((w) => (
              <li key={w} className="flex items-center gap-3 text-ink">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <CheckIcon width={16} height={16} />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        <section className="lg:col-span-6" aria-labelledby="form-heading">
          <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-24">
            <h2 id="form-heading" className="text-2xl font-semibold text-brand-900 md:text-3xl">
              {t.wholesale.formTitle}
            </h2>
            <div className="mt-6">
              <WholesaleForm lang={lang} />
            </div>
            <a
              href={whatsappLink(t.wholesale.messageHeader)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-5 text-sm font-semibold text-whatsapp-dark hover:underline"
            >
              <WhatsAppIcon width={18} height={18} /> {t.cta.whatsapp}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
