// Pre-launch sanity checks for the catalogue and business details.
// Run with: npm run check:data   (no dependencies needed)
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = readFileSync(join(root, "src/data/catalog.ts"), "utf8");
const siteCfg = readFileSync(join(root, "src/config/site.ts"), "utf8");

const errors = [];
const warnings = [];

const collectionIds = [...catalog.matchAll(/^\s+id: "([a-z0-9-]+)",\n\s+category:/gm)].map((m) => m[1]);
const products = [...catalog.matchAll(/\{ slug: "([^"]+)", collection: "([^"]+)"(.*)\},?$/gm)].map((m) => ({
  slug: m[1],
  collection: m[2],
  rest: m[3],
}));

if (!products.length) errors.push("No products found — did the catalog format change?");

const seen = new Set();
for (const p of products) {
  if (seen.has(p.slug)) errors.push(`Duplicate slug: ${p.slug}`);
  seen.add(p.slug);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`Slug not URL-safe: ${p.slug}`);
  if (!collectionIds.includes(p.collection)) errors.push(`${p.slug}: unknown collection "${p.collection}"`);
  for (const img of p.rest.matchAll(/"(\/products\/[^"]+)"/g)) {
    if (!existsSync(join(root, "public", img[1]))) errors.push(`${p.slug}: image not found public${img[1]}`);
  }
  if (!/images:/.test(p.rest)) warnings.push(`${p.slug}: no photo yet`);
}

const todos = [...siteCfg.matchAll(/^\s+(\w+):[^\n]*TODO/gm)].map((m) => m[1]);
if (/whatsapp: "60000000000"/.test(siteCfg)) todos.push("whatsapp");
if (todos.length) errors.push(`src/config/site.ts still has placeholders: ${[...new Set(todos)].join(", ")}`);

console.log(`Products: ${products.length}, collections: ${collectionIds.length}`);
if (warnings.length) console.log(`\n⚠ ${warnings.length} products without photos (placeholder art will show).`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} problem(s):\n - ` + errors.join("\n - "));
  process.exit(1);
}
console.log("\n✔ Catalogue and business details look ready for launch.");
