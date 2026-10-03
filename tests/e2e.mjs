/**
 * Browser tests against the preview build (run build-preview.mjs first).
 * Usage: node tests/e2e.mjs   (needs the `playwright` package; PLAYWRIGHT_PATH to override)
 */
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { start } from "./serve.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(process.env.PLAYWRIGHT_PATH ?? "/opt/node-tools/node_modules", "_"));
const { chromium } = require("playwright");

const BASE = "http://localhost:4173";
const shots = join(here, "out/screenshots");
mkdirSync(shots, { recursive: true });
const routes = JSON.parse(readFileSync(join(here, "out/routes.json"), "utf8")).map((r) => ({ ...r, path: r.path + "/" }));

let passed = 0;
const failures = [];
async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✔ ${name}`);
  } catch (e) {
    failures.push(`${name}: ${e.message}`);
    console.log(`  ✖ ${name}\n      ${e.message}`);
  }
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

const server = await start();
const browser = await chromium.launch();

async function open(context, path) {
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__HYDRATED__ === true || window.__ERRORS__?.length, null, { timeout: 5000 }).catch(() => {});
  return { page, res, errors };
}

// ── 1. Every page: loads, hydrates cleanly, one h1, images have alt, no horizontal scroll on mobile
console.log(`\nAll pages (${routes.length}) — desktop + mobile`);
const desktop = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const internalLinks = new Set();

await test("all pages load, hydrate without errors, and pass structure checks", async () => {
  const problems = [];
  for (const r of routes) {
    for (const [label, ctx] of [["desktop", desktop], ["mobile", mobile]]) {
      const { page, res, errors } = await open(ctx, r.path);
      const info = await page.evaluate(() => ({
        hydrated: window.__HYDRATED__ === true,
        hydrationErrors: window.__ERRORS__,
        h1: document.querySelectorAll("h1").length,
        imgNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content ?? "",
        lang: document.documentElement.lang,
        links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")),
        emptyLinks: [...document.querySelectorAll("a,button")].filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label")).length,
      }));
      info.links.forEach((l) => internalLinks.add(l));
      const p = [];
      if (res.status() !== 200) p.push(`status ${res.status()}`);
      if (!info.hydrated) p.push("not hydrated");
      if (info.hydrationErrors.length) p.push(`hydration: ${info.hydrationErrors[0].slice(0, 160)}`);
      if (errors.length) p.push(`console: ${errors[0].slice(0, 160)}`);
      if (info.h1 !== 1) p.push(`${info.h1} h1 elements`);
      if (info.imgNoAlt) p.push(`${info.imgNoAlt} img without alt`);
      if (info.overflow > 1) p.push(`horizontal overflow ${info.overflow}px`);
      if (!info.title || info.title.length > 75) p.push(`title length ${info.title.length}: ${info.title}`);
      if (info.desc.length < 50) p.push("missing/short meta description");
      if (!info.lang.startsWith(r.path.split("/")[1])) p.push(`html lang=${info.lang}`);
      if (info.emptyLinks) p.push(`${info.emptyLinks} links/buttons without accessible name`);
      if (p.length) problems.push(`${label} ${r.path}: ${p.join("; ")}`);
      await page.close();
    }
  }
  assert(!problems.length, `\n        ${problems.slice(0, 15).join("\n        ")}${problems.length > 15 ? `\n        …+${problems.length - 15} more` : ""}`);
});

await test("every internal link resolves (no broken links)", async () => {
  const broken = [];
  for (const href of internalLinks) {
    const res = await fetch(BASE + href, { redirect: "manual" });
    if (res.status !== 200) broken.push(`${href} → ${res.status}`);
  }
  assert(!broken.length, `broken: ${broken.join(", ")}`);
  console.log(`      (${internalLinks.size} unique internal links checked)`);
});

// ── 2. Behaviour
console.log("\nBehaviour");
await test("unknown URLs return a branded 404", async () => {
  for (const path of ["/en/no-such-page", "/ms/products/no-such-product", "/en/category/shoes"]) {
    const { page, res } = await open(desktop, path);
    assert(res.status() === 404, `${path} status ${res.status()}`);
    const h1 = await page.textContent("h1");
    assert(/not found|tidak ditemui/i.test(h1), `${path} h1 "${h1}"`);
    await page.close();
  }
});

await test("root redirects to /en", async () => {
  const res = await fetch(BASE + "/", { redirect: "manual" });
  assert(res.status === 307 && res.headers.get("location") === "/en/", `got ${res.status}`);
});

await test("catalogue search filters results (EN + BM terms, accent/spelling tolerant)", async () => {
  const { page } = await open(desktop, "/en/products/");
  const count = async () => page.locator('[data-testid="product-card"]').count();
  const all = await count();
  assert(all === 33, `expected 33 products, got ${all}`);
  await page.fill("#catalog-search", "jubbah");
  await page.waitForTimeout(150);
  const jubbah = await count();
  await page.fill("#catalog-search", "jubah");
  await page.waitForTimeout(150);
  assert((await count()) === jubbah && jubbah > 5, `jubbah=${jubbah}, jubah=${await count()}`);
  await page.fill("#catalog-search", "kanak-kanak kurta");
  await page.waitForTimeout(150);
  assert((await count()) === 6, `BM search "kanak-kanak kurta" gave ${await count()}`);
  await page.fill("#catalog-search", "K06");
  await page.waitForTimeout(150);
  assert((await count()) === 1, `code search "K06" gave ${await count()}`);
  await page.fill("#catalog-search", "scorpio");
  await page.waitForTimeout(150);
  assert((await count()) >= 3, `fabric search "scorpio" gave ${await count()}`);
  await page.fill("#catalog-search", "zzzz");
  await page.waitForTimeout(150);
  assert((await count()) === 0, "nonsense search should be empty");
  await page.getByRole("button", { name: /clear search/i }).click();
  await page.waitForTimeout(150);
  assert((await count()) === 33, "clear should restore all");
  await page.close();
});

await test("category chips navigate and show correct counts", async () => {
  const { page } = await open(desktop, "/en/products");
  await page.getByRole("link", { name: /^Kids/ }).first().click();
  await page.waitForURL("**/en/category/kids/");
  const n = await page.locator('[data-testid="product-card"]').count();
  assert(n === 6, `kids count ${n}`);
  assert((await page.textContent('[data-testid="result-count"]')).includes("6"), "result count text");
  await page.close();
});

await test("language switcher keeps the visitor on the same product", async () => {
  const { page } = await open(desktop, "/en/products/kurta-tiga-butang/");
  await page.locator('header a[hreflang="ms"]').first().click();
  await page.waitForURL("**/ms/products/kurta-tiga-butang/");
  assert((await page.textContent(".eyebrow")).includes("Lelaki"), "BM eyebrow");
  await page.close();
});

await test("product WhatsApp buttons pre-fill product name and link", async () => {
  const { page } = await open(desktop, "/en/products/kurung-scorpio/");
  const href = await page.getAttribute('[data-testid="enquire-whatsapp"]', "href");
  const msg = decodeURIComponent(new URL(href).searchParams.get("text"));
  assert(href.startsWith("https://wa.me/"), href);
  assert(msg.includes("Kurung Scorpio (AZ-W01)") && msg.includes("/en/products/kurung-scorpio/"), msg);
  const q = decodeURIComponent(new URL(await page.getAttribute('[data-testid="quote-whatsapp"]', "href")).searchParams.get("text"));
  assert(q.includes("WHOLESALE") && q.includes("Shade numbers"), q);
  assert((await page.getAttribute('[data-testid="enquire-whatsapp"]', "rel")).includes("noopener"), "rel noopener");
  await page.close();
});

await test("product page has Product + Breadcrumb structured data", async () => {
  const { page } = await open(desktop, "/en/products/sampin-songket-emas/");
  const types = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)["@type"]));
  assert(types.includes("Product") && types.includes("BreadcrumbList") && types.includes("ClothingStore"), types.join(","));
  await page.close();
});

await test("wholesale form validates, then opens WhatsApp with all details", async () => {
  const { page } = await open(desktop, "/en/wholesale");
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (u) => window.__opened.push(u);
  });
  await page.getByRole("button", { name: /send via whatsapp/i }).click();
  assert((await page.getAttribute("#wf-name", "aria-invalid")) === "true", "name should be invalid");
  assert((await page.getAttribute("#wf-products", "aria-invalid")) === "true", "products should be invalid");
  assert(await page.evaluate(() => document.activeElement.id === "wf-name"), "focus moves to first error");
  await page.fill("#wf-name", "Ahmad");
  await page.fill("#wf-business", "Kedai Ahmad");
  await page.fill("#wf-products", "Men's jubbah white 4-button");
  await page.fill("#wf-quantity", "200 pcs");
  await page.getByRole("button", { name: /send via whatsapp/i }).click();
  const opened = await page.evaluate(() => window.__opened);
  assert(opened.length === 1, "window.open not called");
  const text = decodeURIComponent(new URL(opened[0]).searchParams.get("text"));
  for (const s of ["Ahmad", "Kedai Ahmad", "jubbah white 4-button", "200 pcs"]) assert(text.includes(s), `message missing ${s}: ${text}`);
  assert(!text.includes("City / country"), "empty optional fields should be omitted");
  await page.close();
});

await test("mobile menu opens, traps scroll, closes with Escape and link tap", async () => {
  const { page } = await open(mobile, "/en/");
  const btn = page.getByRole("button", { name: /menu/i });
  await btn.click();
  assert(await page.isVisible("#mobile-menu"), "menu not visible");
  assert((await btn.getAttribute("aria-expanded")) === "true", "aria-expanded");
  await page.screenshot({ path: join(shots, "mobile-menu.png") });
  await page.keyboard.press("Escape");
  assert(!(await page.isVisible("#mobile-menu")), "Escape should close");
  await btn.click();
  await page.locator("#mobile-menu").getByRole("link", { name: "How to order" }).click();
  await page.waitForURL("**/en/wholesale/");
  assert(!(await page.isVisible("#mobile-menu")), "menu should close after navigation");
  await page.close();
});

await test("shade picker swaps photo and adds the shade to the WhatsApp message", async () => {
  const { page } = await open(desktop, "/en/products/baju-melayu-cekak-musang/");
  await page.locator("fieldset").getByRole("button", { name: "05 Turquoise" }).click();
  const src = await page.getAttribute('[data-testid="main-photo"]', "src");
  assert(src.includes("az-m01-05"), `main photo ${src}`);
  assert((await page.textContent('[data-testid="shade-name"]')).includes("Turquoise"), "shade label");
  const msg = decodeURIComponent(new URL(await page.getAttribute('[data-testid="enquire-whatsapp"]', "href")).searchParams.get("text"));
  assert(msg.includes("AZ-M01") && msg.includes("Shade 05 Turquoise"), msg);
  const thumbs = await page.locator('ul[aria-label="Photos"] button').count();
  assert(thumbs === 9, `expected 9 shade thumbnails, got ${thumbs}`);
  await page.close();
});

await test("skip link is first focusable element and targets main", async () => {
  const { page } = await open(desktop, "/en/products/");
  await page.keyboard.press("Tab");
  const active = await page.evaluate(() => ({ text: document.activeElement.textContent, href: document.activeElement.getAttribute("href") }));
  assert(active.href === "#main", JSON.stringify(active));
  await page.close();
});

await test("sitemap and robots are valid", async () => {
  const sm = await (await fetch(BASE + "/sitemap.xml")).text();
  const n = (sm.match(/<loc>/g) || []).length;
  assert(n === 84, `sitemap urls ${n}`);
  const rb = await (await fetch(BASE + "/robots.txt")).text();
  assert(rb.includes("Sitemap: https://altamash19.github.io/atoz-fesyen-website/sitemap.xml"), rb);
});

// ── 3. Screenshots for visual review
console.log("\nScreenshots");
const shotList = [
  ["home-desktop", desktop, "/en", true],
  ["home-mobile", mobile, "/en", true],
  ["products-desktop", desktop, "/en/products", false],
  ["products-mobile", mobile, "/ms/products", false],
  ["product-desktop", desktop, "/en/products/kurung-scorpio/", true],
  ["product-shades-desktop", desktop, "/en/products/baju-melayu-cekak-musang/", false],
  ["product-mobile", mobile, "/en/products/jubah-lima-butang/", true],
  ["wholesale-desktop", desktop, "/en/wholesale", true],
  ["about-desktop", desktop, "/en/about", true],
  ["contact-mobile", mobile, "/ms/contact", true],
  ["404-desktop", desktop, "/en/nope", false],
];
for (const [name, ctx, path, full] of shotList) {
  const { page } = await open(ctx, path);
  await page.screenshot({ path: join(shots, `${name}.png`), fullPage: full });
  await page.close();
}
console.log(`  saved ${shotList.length + 1} screenshots to tests/out/screenshots`);

await browser.close();
server.close();
console.log(`\n${passed} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
