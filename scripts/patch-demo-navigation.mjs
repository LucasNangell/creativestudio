/**
 * Injeta correção de navegação em demos iframe (paths absolutos /foo → /demos/{slug}/foo).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demosRoot = path.join(__dirname, "..", "public", "demos");

/** SPAs com React Router (basename no bundle) — não usar demo-nav-fix */
const SPA_TARGETS = new Set(["vigilia-politica", "gestao-producao-grafica"]);

const TARGETS = [
  "lar-dos-anjos",
  "player-video-marcadores",
  "monitor-arquivos",
  "vigilia-politica",
  "gestao-producao-grafica",
];

const NAV_TAG = (base) =>
  `<script src="/demos/demo-nav-fix.js" data-base="${base}"></script>`;

function injectNavScript(htmlPath, base) {
  let html = fs.readFileSync(htmlPath, "utf8");
  if (html.includes("demo-nav-fix.js")) return false;

  const tag = NAV_TAG(base);
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${tag}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${tag}`);
  } else {
    return false;
  }

  fs.writeFileSync(htmlPath, html, "utf8");
  return true;
}

function walkHtml(dir, base, stats) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full, base, stats);
    } else if (entry.name.endsWith(".html")) {
      if (injectNavScript(full, base)) stats.patched += 1;
    }
  }
}

for (const slug of TARGETS) {
  const demoDir = path.join(demosRoot, slug);
  if (!fs.existsSync(demoDir)) {
    console.warn(`SKIP ${slug}: pasta não encontrada`);
    continue;
  }

  if (SPA_TARGETS.has(slug)) {
    console.log(`SKIP ${slug}: SPA com router — demo-nav-fix omitido`);
    continue;
  }

  const base = `/demos/${slug}`;
  const stats = { patched: 0 };
  walkHtml(demoDir, base, stats);
  console.log(`OK ${slug}: ${stats.patched} HTML(s) com nav-fix`);
}

console.log("Navegação de demos patchada.");
