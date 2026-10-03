import { hydrateRoot } from "react-dom/client";
import { createElement, type ReactNode } from "react";
import Layout from "@/app/[lang]/layout";
import NotFound from "@/app/[lang]/not-found";
import * as home from "@/app/[lang]/page";
import * as products from "@/app/[lang]/products/page";
import * as product from "@/app/[lang]/products/[slug]/page";
import * as category from "@/app/[lang]/category/[category]/page";
import * as wholesale from "@/app/[lang]/wholesale/page";
import * as about from "@/app/[lang]/about/page";
import * as contact from "@/app/[lang]/contact/page";
import * as notfound from "@/app/[lang]/notfound/page";
import * as shop from "@/app/[lang]/shop/page";

const routes: Record<string, { default: (p: { params: Promise<Record<string, string>> }) => Promise<ReactNode> }> = {
  home, products, product, category, wholesale, about, contact, notfound, shop,
};

declare global { interface Window { __ROUTE__: { route: string; params: Record<string, string> }; __HYDRATED__?: boolean; __ERRORS__: string[] } }

(async () => {
  const { route, params } = window.__ROUTE__;
  const p = Promise.resolve(params);
  const page = route === "notFound" ? createElement(NotFound) : await routes[route].default({ params: p });
  const tree = await Layout({ children: page, params: Promise.resolve({ lang: params.lang }) });
  hydrateRoot(document, tree as ReactNode, {
    onRecoverableError: (e) => { window.__ERRORS__.push(String((e as Error)?.message ?? e)); },
  });
  window.__HYDRATED__ = true;
})().catch((e) => window.__ERRORS__.push(String(e?.stack ?? e)));
