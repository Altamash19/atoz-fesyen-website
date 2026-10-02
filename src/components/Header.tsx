"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const pathname = usePathname() ?? `/${lang}/`;
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}/products/`, label: t.nav.products },
    { href: `/${lang}/wholesale/`, label: t.nav.wholesale },
    { href: `/${lang}/about/`, label: t.nav.about },
    { href: `/${lang}/contact/`, label: t.nav.contact },
  ];

  const norm = (s: string) => s.replace(/\/+$/, "");
  const isActive = (href: string) => {
    const h = norm(href);
    const p = norm(pathname);
    return p === h || p.startsWith(`${h}/`) || (h.endsWith("/products") && p.startsWith(`/${lang}/category`));
  };

  // Close the mobile menu on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href={`/${lang}/`} className="shrink-0" aria-label="A TO Z Fesyen Baru — home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition hover:bg-sand ${
                    isActive(l.href) ? "text-brand-700" : "text-ink/80"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} className="hidden sm:flex" />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hidden !min-h-10 !px-4 !py-2 text-sm lg:inline-flex"
          >
            <WhatsAppIcon width={18} height={18} />
            {t.cta.whatsapp}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed panel and collapse it to the header's height. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-cream md:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="flex flex-col">
            {[{ href: `/${lang}/`, label: t.nav.home }, ...links].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={norm(pathname) === norm(l.href) || (l.href !== `/${lang}/` && isActive(l.href)) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 font-display text-2xl text-ink aria-[current=page]:text-brand-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
              <WhatsAppIcon /> {t.cta.whatsapp}
            </a>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{t.nav.language}</span>
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
