/**
 * Offline preview build (no `next` package required).
 *
 * Bundles the real route files with esbuild, swaps next/* for small shims,
 * server-renders every route to static HTML, compiles Tailwind v4, and emits
 * a client bundle that hydrates each page so interactive parts can be tested.
 *
 * This is a verification harness, NOT the production build — production is `next build`.
 * Usage: NODE_PATH=<dir with react, react-dom, esbuild, tailwindcss> node tests/build-preview.mjs
 */
import { createRequire } from "node:module";
import { copyFileSync, cpSync, mkdirSync, symlinkSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modulesDir = process.env.NODE_PATH ?? "/opt/npm-tools/node_modules";
const require = createRequire(join(modulesDir, "_"));
const esbuild = require("esbuild");
const out = join(root, "tests/out");
const site = join(out, "site");
rmSync(out, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
// Let the ESM server bundle resolve react/react-dom from the same install as this script.
symlinkSync(modulesDir, join(out, "node_modules"), "dir");

const shims = join(root, "tests/shims");
const common = {
  bundle: true,
  jsx: "automatic",
  nodePaths: [modulesDir],
  alias: {
    "@": join(root, "src"),
    "next/link": join(shims, "next-link.tsx"),
    "next/image": join(shims, "next-image.tsx"),
    "next/navigation": join(shims, "next-navigation.ts"),
    "next/font/google": join(shims, "next-font.ts"),
  },
  loader: { ".css": "empty" },
  logLevel: "error",
  define: { "process.env.NEXT_PUBLIC_SITE_URL": "undefined", "process.env.NEXT_PUBLIC_BASE_PATH": "undefined" },
};

// 1. Bundles
await esbuild.build({
  ...common,
  entryPoints: [join(root, "tests/server-entry.tsx")],
  outfile: join(out, "server.mjs"),
  platform: "node",
  format: "esm",
  packages: "external",
});
await esbuild.build({
  ...common,
  entryPoints: [join(root, "tests/client-entry.tsx")],
  outfile: join(site, "_assets/app.js"),
  platform: "browser",
  format: "esm",
  minify: true,
  define: { ...common.define, "process.env.NODE_ENV": '"production"' },
});

// 2. Tailwind: collect class candidates from source, compile globals.css
const tw = require("tailwindcss");
const twDir = dirname(require.resolve("tailwindcss/package.json"));
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(f)) files.push(p);
  }
};
walk(join(root, "src"));
const candidates = new Set();
for (const f of files) for (const m of readFileSync(f, "utf8").matchAll(/[^\s"'`{}<>()=,;]+/g)) candidates.add(m[0]);
const compiler = await tw.compile(readFileSync(join(root, "src/app/globals.css"), "utf8"), {
  base: join(root, "src/app"),
  loadStylesheet: async (id, base) => {
    const file = id === "tailwindcss" ? join(twDir, "index.css") : resolve(base, id);
    return { path: file, base: dirname(file), content: readFileSync(file, "utf8") };
  },
});
// Shim fonts: Next would self-host Inter + Playfair Display; locally use installed stand-ins.
const fontVars = `.font-var-body{--font-body:"Inter"}.font-var-heading{--font-heading:"Playfair Display","Caladea"}`;
writeFileSync(join(site, "_assets/app.css"), compiler.build([...candidates]) + fontVars);

// 3. Render every route
const React = require("react");
const { renderToString } = require("react-dom/server");
const server = await import(pathToFileURL(join(out, "server.mjs")).href);
const { routes, Layout, NotFound, layoutMeta } = server;

const productParams = routes.product.generateStaticParams();
const pages = [];
for (const { lang } of server.langParams()) {
  pages.push({ path: `/${lang}`, route: "home", params: { lang } });
  pages.push({ path: `/${lang}/products`, route: "products", params: { lang } });
  pages.push({ path: `/${lang}/wholesale`, route: "wholesale", params: { lang } });
  pages.push({ path: `/${lang}/about`, route: "about", params: { lang } });
  pages.push({ path: `/${lang}/contact`, route: "contact", params: { lang } });
  pages.push({ path: `/${lang}/notfound`, route: "notfound", params: { lang } });
}
for (const p of routes.category.generateStaticParams()) pages.push({ path: `/${p.lang}/category/${p.category}`, route: "category", params: p });
for (const p of productParams) pages.push({ path: `/${p.lang}/products/${p.slug}`, route: "product", params: p });

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const report = [];

for (const pg of pages) {
  globalThis.__PATHNAME__ = pg.path + "/";
  const params = Promise.resolve(pg.params);
  const mod = routes[pg.route];
  let page;
  let meta = {};
  if (pg.route === "notFound") {
    page = React.createElement(NotFound);
  } else {
    meta = { ...(await layoutMeta({ params })), ...(mod.generateMetadata ? await mod.generateMetadata({ params }) : {}) };
    page = await mod.default({ params });
  }
  const tree = await Layout({ children: page, params: Promise.resolve({ lang: pg.params.lang }) });
  const html = renderToString(tree);

  const base = (await layoutMeta({ params })).title;
  const title =
    typeof meta.title === "object" && meta.title?.absolute ? meta.title.absolute
    : typeof meta.title === "string" ? base.template.replace("%s", meta.title)
    : base?.default ?? "";
  const head = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${esc(title)}</title>`,
    meta.description ? `<meta name="description" content="${esc(meta.description)}">` : "",
    meta.alternates?.canonical ? `<link rel="canonical" href="${esc(meta.alternates.canonical)}">` : "",
    ...Object.entries(meta.alternates?.languages ?? {}).map(([k, v]) => `<link rel="alternate" hreflang="${k}" href="${esc(v)}">`),
    `<link rel="stylesheet" href="/_assets/app.css">`,
    `<script>window.__ROUTE__=${JSON.stringify({ route: pg.route, params: pg.params })};window.__ERRORS__=[];</script>`,
    `<script type="module" src="/_assets/app.js"></script>`,
  ].join("");
  const doc = "<!DOCTYPE html>" + html.replace(/^(<html[^>]*>)/, `$1<head>${head}</head>`);
  const file = join(site, pg.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, doc);
  report.push({ path: pg.path, title, bytes: doc.length });
}

// Verify that unknown slugs / categories really 404 (notFound() is thrown)
for (const [route, params] of [["product", { lang: "en", slug: "does-not-exist" }], ["category", { lang: "en", category: "shoes" }]]) {
  try {
    await routes[route].default({ params: Promise.resolve(params) });
    throw new Error(`${route} did not 404 for ${JSON.stringify(params)}`);
  } catch (e) {
    if (e.digest !== "NEXT_NOT_FOUND") throw e;
  }
}

// public/ assets + 404 pages (mirrors scripts/postbuild.mjs)
cpSync(join(root, "public"), site, { recursive: true });
for (const l of ["en", "ms"]) copyFileSync(join(site, l, "notfound", "index.html"), join(site, `404-${l}.html`));

// sitemap + robots
const sm = server.sitemap();
writeFileSync(join(site, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sm.map((u) => `<url><loc>${u.url}</loc></url>`).join("")}</urlset>`);
const rb = server.robots();
writeFileSync(join(site, "robots.txt"), `User-Agent: *\nAllow: /\nSitemap: ${rb.sitemap}\n`);
writeFileSync(join(out, "routes.json"), JSON.stringify(report, null, 2));
console.log(`Rendered ${report.length} pages, sitemap ${sm.length} URLs, css ${statSync(join(site, "_assets/app.css")).size} B, js ${statSync(join(site, "_assets/app.js")).size} B`);
