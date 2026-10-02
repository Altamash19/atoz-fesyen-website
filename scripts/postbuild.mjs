// Runs after `next build` (static export) to finish the /out folder for static hosting:
//  - /index.html   → sends visitors to /ms/ or /en/ based on their browser language
//  - /404.html     → the branded not-found page (GitHub Pages / Netlify serve it automatically)
//  - /.nojekyll    → stops GitHub Pages from hiding the /_next folder
//  - /CNAME        → custom domain for GitHub Pages, when CUSTOM_DOMAIN is set
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (!existsSync(out)) throw new Error("out/ not found — run `next build` first");

writeFileSync(
  join(out, "index.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>A TO Z Fesyen Baru</title><meta name="robots" content="noindex">
<link rel="canonical" href="${base}/en/"><meta http-equiv="refresh" content="0; url=${base}/en/">
<script>try{var l=(navigator.languages||[navigator.language||""]).join(",").toLowerCase();location.replace("${base}/"+(/(^|,)(ms|id)/.test(l)?"ms":"en")+"/");}catch(e){location.replace("${base}/en/")}</script>
</head><body style="font-family:system-ui;background:#faf7f0;color:#1b2420;padding:2rem"><a href="${base}/en/">A TO Z Fesyen Baru — English</a> · <a href="${base}/ms/">Bahasa Melayu</a></body></html>\n`,
);
copyFileSync(join(out, "en", "notfound", "index.html"), join(out, "404.html"));
writeFileSync(join(out, ".nojekyll"), "");
if (process.env.CUSTOM_DOMAIN) writeFileSync(join(out, "CNAME"), process.env.CUSTOM_DOMAIN.trim() + "\n");
console.log(`postbuild: index.html, 404.html, .nojekyll${process.env.CUSTOM_DOMAIN ? ", CNAME" : ""} written (base path "${base}")`);
