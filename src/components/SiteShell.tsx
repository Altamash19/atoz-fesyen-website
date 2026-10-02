import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/whatsapp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppIcon } from "./icons";

/** Header + main + footer + floating WhatsApp button, shared by every page. */
export function SiteShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = getDictionary(lang);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        {t.nav.skip}
      </a>
      <Header lang={lang} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer lang={lang} />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.cta.whatsapp}
        className="fixed right-4 bottom-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-whatsapp-dark lg:hidden"
        data-testid="floating-whatsapp"
      >
        <WhatsAppIcon width={28} height={28} />
      </a>
    </>
  );
}
