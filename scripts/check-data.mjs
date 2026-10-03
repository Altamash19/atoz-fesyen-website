// Pre-launch sanity checks for the catalogue (runs in CI before every deploy).
// Usage: npm run check:data   (no dependencies needed)
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = readFileSync(join(root, "src/data/catalog.ts"), "utf8");
const manifest = readFileSync(join(root, "src/data/image-manifest.ts"), "utf8");
const siteCfg = readFileSync(join(root, "src/config/site.ts"), "utf8");

const errors = [];
const imageKeys = new Set([...manifest.matchAll(/^\s+"([^"]+)": \{ src:/gm)].map((m) => m[1]));
const collectionIds = [...catalog.matchAll(/^\s+id: "([a-z0-9-]+)",\n\s+category:/gm)].map((m) => m[1]);
const productsSrc = catalog.slice(catalog.indexOf("export const products"));
const blocks = productsSrc.split(/\n  \{\n/).slice(1);

const slugs = new Set();
const codes = new Set();
for (const b of blocks) {
  const slug = b.match(/slug: "([^"]+)"/)?.[1];
  if (!slug) continue;
  const code = b.match(/code: "([^"]+)"/)?.[1];
  const collection = b.match(/collection: "([^"]+)"/)?.[1];
  if (slugs.has(slug)) errors.push(`Duplicate slug: ${slug}`);
  slugs.add(slug);
  if (code) {
    if (codes.has(code)) errors.push(`Duplicate design code: ${code}`);
    codes.add(code);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push(`Slug not URL-safe: ${slug}`);
  if (!collectionIds.includes(collection)) errors.push(`${slug}: unknown collection "${collection}"`);
  const imgs = [...(b.match(/images: \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const shadeImgs = [...b.matchAll(/image: "([^"]+)"/g)].map((m) => m[1]);
  for (const k of [...imgs, ...shadeImgs]) if (!imageKeys.has(k)) errors.push(`${slug}: image "${k}" missing — add it to public/products and run npm run images`);
  if (!imgs.length && !shadeImgs.length) errors.push(`${slug}: no photo`);
}
for (const k of ["az-m01-model-01", "az-m01-model-03", "az-m01-model-06", "az-w04-model", "shop-front", "fabric-colour-card", "about-rack", "altamash", "contact-rack"])
  if (!imageKeys.has(k)) errors.push(`Site image "${k}" missing from public/images`);

if (/TODO/.test(siteCfg)) errors.push("src/config/site.ts still contains TODO placeholders");

console.log(`Products: ${slugs.size} (${codes.size} with design codes), collections: ${collectionIds.length}, images: ${imageKeys.size}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} problem(s):\n - ` + errors.join("\n - "));
  process.exit(1);
}
console.log("✔ Catalogue looks good.");
