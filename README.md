# A TO Z Fesyen Baru — Website

Bilingual (English / Bahasa Melayu) wholesale catalogue for **A TO Z Fesyen Baru Sdn. Bhd.**
Built with **Next.js (App Router, static export) + React + Tailwind CSS v4**, deployed on **GitHub Pages**.

**Business goal:** turn website visitors into WhatsApp enquiries and wholesale quote requests.
There is no cart or checkout. Wholesale pricing depends on quantity, so every product leads to a pre-filled WhatsApp chat.

## What's included

| Page | URL | Purpose |
|---|---|---|
| Home | `/en`, `/ms` | Hero, categories, best-sellers, why us, how wholesale works |
| Catalogue | `/en/products/` | All 33 designs (AZ-K01 … AZ-W05 + sampin & fabric), search by name, code or fabric |
| Category | `/en/category/{men,women,kids,fabrics}/` | SEO-friendly range pages |
| Product | `/en/products/{slug}/` | Photos, shade picker, design code, fabric, sizes; WhatsApp enquiry pre-filled with code + shade |
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

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm run build      # static site → /out (also writes index.html, 404.html)
npm run typecheck
npm run check:data # catalogue sanity checks (also runs in CI)
```

## Deployment — GitHub Pages (free)

Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

### Custom domain

The live address is **https://altamash19.github.io/atoz-fesyen-website/** until a domain is connected.
atozfesyen.com is controlled by the previous developer. To use any domain you control (e.g. a new `.com.my`):

1. At the domain registrar, set DNS:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `altamash19.github.io`
2. GitHub → **Settings → Pages → Custom domain** → enter the domain → Save, then tick **Enforce HTTPS**.
3. **Settings → Secrets and variables → Actions → Variables** → add `CUSTOM_DOMAIN` = your domain, then re-run the workflow.
   Links, the sitemap and canonical URLs switch to the new domain automatically.

The site is a static export, so it also deploys unchanged to Vercel or Netlify if you ever switch.

## Photos

Product photos are extracted from the full-resolution *Katalog Pemborong 2026* PDF (300 ppi, ~600–1400 px).
For sharper product pages, replace files in `public/products/` with the original photos (same file names, 4:5 portrait,
≥1200 px, WebP or JPG), then run `npm run images`.

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

- AZ-M02 (Teluk Belanga) fabric isn't stated in the catalogue — add it to `src/data/catalog.ts` when confirmed.
- Sizes: men S–4XL, ladies S–3XL, kids 4–16 years, kaftan free size.

## Roadmap (next phases)

- **Analytics:** add Vercel Analytics or GA4 and track WhatsApp clicks per product. This shows which styles get the most demand.
- **Inventory link:** once the inventory system exists, generate `catalog.ts` from it, or switch to PostgreSQL with an admin page.
- **CRM:** log WhatsApp leads, such as with WhatsApp Business labels, then move them into the CRM.
