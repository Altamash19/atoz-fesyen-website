// Imports the REAL route files so the preview exercises the same code Next.js runs.
export { default as Layout, generateMetadata as layoutMeta, generateStaticParams as langParams } from "@/app/[lang]/layout";
import * as home from "@/app/[lang]/page";
import * as products from "@/app/[lang]/products/page";
import * as product from "@/app/[lang]/products/[slug]/page";
import * as category from "@/app/[lang]/category/[category]/page";
import * as wholesale from "@/app/[lang]/wholesale/page";
import * as about from "@/app/[lang]/about/page";
import * as contact from "@/app/[lang]/contact/page";
import * as notfound from "@/app/[lang]/notfound/page";
import * as shop from "@/app/[lang]/shop/page";
export { default as NotFound } from "@/app/[lang]/not-found";
export { default as sitemap } from "@/app/sitemap";
export { default as robots } from "@/app/robots";
export const routes = { home, products, product, category, wholesale, about, contact, notfound, shop };
