/**
 * Desabilita Service Worker, corrige API demo.local e paths absolutos no Lar dos Anjos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(__dirname, "..", "public", "demos", "lar-dos-anjos");
const base = "/demos/lar-dos-anjos";

const SW_DISABLE = `<script src="/demos/demo-nav-fix.js" data-base="${base}"></script><script>
(function () {
  if ("serviceWorker" in navigator) {
    var noop = function () {
      return Promise.resolve({ unregister: function () { return Promise.resolve(true); } });
    };
    navigator.serviceWorker.register = noop;
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    });
  }
})();
</script>`;

const JS_EXTENSIONS = new Set([".js", ".html"]);

function toIndexHtmlPath(pathname) {
  if (!pathname || pathname.endsWith(".html") || pathname.includes("/_next/")) {
    return pathname;
  }
  const clean = pathname.replace(/\/$/, "") || base;
  return `${clean}/index.html`;
}

function rewriteJsContent(content) {
  content = content.replaceAll("http://demo.local/api/v1", "");
  content = content.replaceAll("https://demo.local/api/v1", "");

  content = content.replace(/href:(["'])\/(["'])/g, (_, q) => `href:${q}${base}/index.html${q}`);
  content = content.replace(
    /href:(["'])\/(?!demos\/|_next\/|http|#)([^"']*)\1/g,
    (_, q, sub) => {
      const segment = sub.replace(/\/$/, "");
      return `href:${q}${toIndexHtmlPath(`${base}/${segment}`)}${q}`;
    },
  );

  const baseEsc = base.replace(/\//g, "\\/");
  content = content.replace(
    new RegExp(`href=(["'])(${baseEsc}(?:\\/[^"'#?]+)+)\\/?\\1`, "g"),
    (match, quote, demoPath) => {
      if (demoPath.endsWith(".html")) return match;
      return `href=${quote}${toIndexHtmlPath(demoPath)}${quote}`;
    },
  );

  content = content.replace(
    new RegExp(`href:(["'])(${baseEsc}(?:\\/[^"']+)?)\\/?\\1`, "g"),
    (match, quote, demoPath) => {
      if (demoPath.endsWith(".html")) return match;
      return `href:${quote}${toIndexHtmlPath(demoPath)}${quote}`;
    },
  );

  return content;
}

function patchFile(filePath) {
  const ext = path.extname(filePath);
  if (!JS_EXTENSIONS.has(ext)) return false;

  const before = fs.readFileSync(filePath, "utf8");
  let content = before;

  if (ext === ".html") {
    if (!content.includes("demo-nav-fix.js")) {
      if (content.includes("<head>")) {
        content = content.replace("<head>", `<head>${SW_DISABLE}`);
      } else if (content.includes("<head ")) {
        content = content.replace(/<head[^>]*>/, (match) => `${match}${SW_DISABLE}`);
      }
    }
    content = content.replace(/<link rel="manifest"[^>]*>/gi, "");
  }

  content = rewriteJsContent(content);

  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function walk(dir, stats) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, stats);
    } else if (patchFile(full)) {
      stats.patched += 1;
    }
  }
}

if (!fs.existsSync(dest)) {
  console.error("Lar dos Anjos demo não encontrado em public/demos/lar-dos-anjos");
  process.exit(1);
}

const stats = { patched: 0 };
walk(dest, stats);
console.log(`Lar dos Anjos: ${stats.patched} arquivo(s) patchados (API, hrefs, SW)`);
