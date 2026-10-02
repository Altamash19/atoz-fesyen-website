# A TO Z Fesyen Baru — Website

Bilingual (English / Bahasa Melayu) wholesale catalogue for **A TO Z Fesyen Baru Sdn. Bhd.**
Built with **Next.js (App Router) + React + Tailwind CSS v4**, deployed on **Vercel**.

**Business goal:** turn website visitors into WhatsApp enquiries and wholesale quote requests.
There is no cart or checkout. Wholesale pricing depends on quantity, so every product leads to a pre-filled WhatsApp chat.

## What's included

| Page | URL | Purpose |
|---|---|---|
| Home | `/en`, `/ms` | Hero, categories, best-sellers, why us, how wholesale works |
| Catalogue | `/en/products` | All 42 products, live search (EN + BM terms), category filter |
| Category | `/en/category/{men,women,kids,accessories}` | SEO-friendly category pages |
| Product | `/en/products/{slug}` | Details, "Enquire on WhatsApp" + "Request wholesale quote" (both pre-filled) |
| Wholesale | `/en/wholesale` | Quote form → opens WhatsApp with the buyer's details |
| About / Contact | `/en/about`, `/en/contact` | Company story, contact details, hours, map link |
| 404 | any unknown URL | Branded "not found" page |

The site also has a `sitemap.xml`, `robots.txt`, hreflang alternates, canonical URLs, Open Graph tags, and schema.org data (ClothingStore, Product, BreadcrumbList).
It sends security headers, includes a skip link, focus styles and labelled controls, and is mobile-first.

## Project structure

```
src/
  app/[lang]/…        Next.js routes (thin: read params → render a view)
  views/              Page layouts (HomeView, ProductView, …)
  components/         Reusable UI (Header, ProductCard, CatalogBrowser, WholesaleForm, …)
  data/catalog.ts     ← THE PRODUCT LIST (edit this to add/rename products or photos)
  config/site.ts      ← BUSINESS DETAILS (WhatsApp, address, email, SSM no.)
  i18n/               Language config + all EN/BM text
  lib/                Catalogue helpers, WhatsApp link builder, SEO metadata
scripts/check-data.mjs  Pre-launch checks (placeholders, duplicate slugs, missing images)
tests/                  Offline render + browser test harness (see "Testing")
```

## Before launch: checklist

1. **Fill in `src/config/site.ts`**: WhatsApp number, phone, email, address, Google Maps link and SSM number.
   Until you do, `npm run check:data` fails on purpose.
2. **Add product photos** to `public/products/` and reference them in `src/data/catalog.ts`:
   ```ts
   { slug: "baju-kurung-modern", …, images: ["/products/baju-kurung-modern-1.jpg", "/products/baju-kurung-modern-2.jpg"] },
   ```
   Use a 4:5 portrait ratio, at least 1200×1500px, JPG or WebP. Next.js resizes them automatically.
   Products without photos show a tidy line-art placeholder.
3. Confirm the product names in `catalog.ts` (see "Open questions" below).
4. Run `npm run check:data`. It should print ✔.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /en
npm run build      # production build (must pass before deploying)
npm run typecheck
```

## Deploy to Vercel (free tier is enough)

1. Push this folder to a GitHub repo, e.g. `atoz-fesyen-website`.
2. Go to vercel.com → **Add New → Project** → import the repo. Vercel detects Next.js, so you can keep the defaults.
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL=https://atozfesyen.com`.
4. Deploy, then go to **Settings → Domains** and add `atozfesyen.com` and `www.atozfesyen.com`.
   At your domain registrar, point DNS to Vercel as the dashboard instructs.
   This replaces the current site, so do it only when you're ready.
5. Submit `https://atozfesyen.com/sitemap.xml` in Google Search Console.

## Editing content

- **Add a product:** add a line to `products` in `src/data/catalog.ts`. The slug must be unique, lowercase and hyphenated.
- **Add a collection or category:** add it to `collections` or `categories` in the same file.
- **Change wording:** all text lives in `src/i18n/dictionaries.ts`, with the English and Malay versions next to each other.
- Prices and stock quantities are **intentionally not stored** in the site code, because it is public.

## Testing

`npm run build` is the production check. There is also a dependency-free harness used during development.
It renders every route from the real source files, hydrates them in Chromium, and runs browser tests:

```bash
NODE_PATH=<node_modules with react, react-dom, esbuild, tailwindcss> node tests/build-preview.mjs
node tests/e2e.mjs     # needs the `playwright` package
```

It covers 104 pages × desktop + mobile:

- every page has a clean hydration, exactly one `h1`, alt text, no horizontal scroll, a title and a meta description
- no broken internal links, and 404 handling works
- search, category filters and the language switcher work
- the WhatsApp messages are pre-filled correctly
- wholesale form validation works
- the mobile menu works, and the skip link works
- the sitemap and robots.txt are valid
- screenshots are saved to `tests/out/screenshots`

## Open questions for the business

- Some style names come straight from the stock list and need confirming: "Zoom", "Luppi", "Titch button", "Yamen", "Marhaba", "Bombay".
  Are these fabric names, supplier names or cut names? Better descriptions help customers and SEO.
- Is "Trousers" for men only, or unisex?
- Which products should be marked as best-sellers (`featured`) and as new (`isNew`)?

## Roadmap (next phases)

- **Analytics:** add Vercel Analytics or GA4 and track WhatsApp clicks per product. This shows which styles get the most demand.
- **Inventory link:** once the inventory system exists, generate `catalog.ts` from it, or switch to PostgreSQL with an admin page.
- **CRM:** log WhatsApp leads, such as with WhatsApp Business labels, then move them into the CRM.
