import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClockIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireImage } from "@/lib/images";
import { whatsappLink } from "@/lib/whatsapp";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="mt-0.5 text-ink">{children}</div>
      </div>
    </li>
  );
}

export function ContactView({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const a = site.address;
  const photo = requireImage("contact-rack");
  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: t.nav.home, href: `/${lang}/` }, { label: t.nav.contact }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-4xl font-semibold text-brand-900 md:text-5xl">{t.contact.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.contact.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> {t.cta.whatsapp}
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <PinIcon width={18} height={18} /> {t.contact.directions}
            </a>
          </div>
          <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-sand lg:block">
            <Image src={photo.src} alt="" fill sizes="600px" className="object-cover" />
          </div>
        </div>

        <ul className="divide-y divide-line self-start rounded-[1.5rem] border border-line bg-white px-6">
          <Row icon={<PinIcon />} label={t.contact.address}>
            <address className="not-italic">
              {site.legalName} ({site.registrationNo})
              <br />
              {a.unit}, {a.building}
              <br />
              {a.street}, {a.postcode} {a.city}
            </address>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline">
              {t.contact.directions} →
            </a>
          </Row>
          <Row icon={<ClockIcon />} label={t.contact.hours}>
            {site.hours[lang]}
            <br />
            <Link href={`/${lang}/shop/`} className="mt-1 inline-block text-sm font-semibold text-brand-700 hover:underline">
              {t.shop.nav} →
            </Link>
          </Row>
          <Row icon={<WhatsAppIcon />} label={t.contact.whatsapp}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand-700 hover:underline">
              {site.whatsappDisplay}
            </a>
          </Row>
          <Row icon={<PhoneIcon />} label={t.contact.contactPerson}>
            <span className="font-medium">{site.contactPerson.name}</span>
            <br />
            <a href={`tel:+${site.contactPerson.phone}`} className="hover:text-brand-700 hover:underline">
              {site.contactPerson.display}
            </a>
            {" · "}
            <a href={whatsappLink(undefined, site.contactPerson.phone)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-700 hover:underline">
              WhatsApp
            </a>
          </Row>
          <Row icon={<MailIcon />} label={t.contact.email}>
            <a href={`mailto:${site.email}`} className="font-medium break-all hover:text-brand-700 hover:underline">
              {site.email}
            </a>
          </Row>
          <Row icon={<GlobeIcon />} label={t.contact.follow}>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">Instagram @atozfesyen.my</a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">Facebook /atozfesyenbaru</a>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">TikTok @alwanexclusive</a>
            </span>
          </Row>
        </ul>
      </div>
    </div>
  );
}
