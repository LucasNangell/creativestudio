/**
 * Desabilita Service Worker no build estático do Lar dos Anjos (evita 502/404 em iframe).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(__dirname, "..", "public", "demos", "lar-dos-anjos");

const SW_DISABLE = `<script>
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

function walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full);
    } else if (entry.name.endsWith(".html")) {
      patchHtml(full);
    }
  }
}

function patchHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (html.includes("navigator.serviceWorker.register = noop")) return;

  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${SW_DISABLE}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${SW_DISABLE}`);
  } else {
    return;
  }

  html = html.replace(/<link rel="manifest"[^>]*>/gi, "");
  fs.writeFileSync(filePath, html, "utf8");
}

if (!fs.existsSync(dest)) {
  console.error("Lar dos Anjos demo não encontrado em public/demos/lar-dos-anjos");
  process.exit(1);
}

walkHtml(dest);
console.log("Lar dos Anjos: Service Worker desabilitado em HTMLs");
