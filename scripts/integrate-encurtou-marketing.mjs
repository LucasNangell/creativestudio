/**
 * Copia o painel Encurtou (index.html + assets) para public/demos/encurtou-pro/.
 * Fonte: portfolio-imports/web/encurtou-pro/dashboard/
 * Uso: node scripts/integrate-encurtou-marketing.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "portfolio-imports", "web", "encurtou-pro", "dashboard");
const destDir = path.join(root, "public", "demos", "encurtou-pro");

const DASHBOARD_FILES = [
  "index.html",
  "style.css",
  "script.js",
  "favicon.svg",
  "bio_builder_shared.css",
  "bio_icon_picker.js",
  "bio_builder_layer.js",
];

function patchIndexHtml(content) {
  return content
    .replace(/<!-- Google tag \(gtag\.js\)[\s\S]*?<\/script>\s*/g, "")
    .replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*"><\/script>\s*/g, "");
}

function copyDashboard() {
  if (!fs.existsSync(sourceDir)) {
    console.warn(
      "portfolio-imports/web/encurtou-pro/dashboard não encontrado — pulando integração Encurtou.",
    );
    return;
  }

  fs.mkdirSync(destDir, { recursive: true });

  for (const name of fs.readdirSync(destDir)) {
    const target = path.join(destDir, name);
    if (fs.statSync(target).isFile()) fs.unlinkSync(target);
  }

  for (const file of DASHBOARD_FILES) {
    const src = path.join(sourceDir, file);
    if (!fs.existsSync(src)) {
      console.warn(`  aviso: ${file} ausente na fonte`);
      continue;
    }
    let content = fs.readFileSync(src, "utf8");
    if (file === "index.html") content = patchIndexHtml(content);
    fs.writeFileSync(path.join(destDir, file), content, "utf8");
  }

  console.log(`Encurtou dashboard → public/demos/encurtou-pro/ (${DASHBOARD_FILES.length} arquivos)`);
}

copyDashboard();
