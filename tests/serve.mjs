// Minimal static server for the preview: /path -> /path/index.html, "/" -> /en, unknown -> branded 404.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "out/site");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".xml": "application/xml", ".txt": "text/plain", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

export function start(port = 4173) {
  const server = createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname).replace(/\/+$/, "") || "/";
    if (p === "/") { res.writeHead(307, { Location: "/en" }); return res.end(); }
    let file = join(dir, p);
    if (!file.startsWith(dir)) { res.writeHead(400); return res.end(); }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) {
      const lang = p.startsWith("/ms") ? "ms" : "en";
      res.writeHead(404, { "Content-Type": types[".html"] });
      return res.end(readFileSync(join(dir, `404-${lang}.html`)));
    }
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) start().then(() => console.log("http://localhost:4173"));
