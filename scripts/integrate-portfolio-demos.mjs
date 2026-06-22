/**
 * Copia builds de portfolio-imports para public/demos/{slug} e corrige paths absolutos.
 * Uso: node scripts/integrate-portfolio-demos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const importsRoot = path.join(root, "portfolio-imports", "web");

const IFRAME_BUILDS = [
  { slug: "lar-dos-anjos", sourceSubdir: "build/out", rewriteAbsolute: true },
  { slug: "player-video-marcadores", sourceSubdir: "build", rewriteAbsolute: true },
  { slug: "monitor-arquivos", sourceSubdir: "build", rewriteAbsolute: false },
  { slug: "gestao-producao-grafica", sourceSubdir: "build", rewriteAbsolute: false },
  {
    slug: "vigilia-politica",
    importDir: "vigilia-politica/vigilia-politica",
    sourceSubdir: "build",
    rewriteAbsolute: false,
  },
];

const SKIP_FILES = new Set([".htaccess", ".env", ".env.local", ".env.production"]);

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_FILES.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function rewriteFile(filePath, slug) {
  const base = `/demos/${slug}`;
  let content = fs.readFileSync(filePath, "utf8");
  const ext = path.extname(filePath);

  if ([".html", ".js", ".css", ".json", ".txt", ".rsc"].includes(ext)) {
    content = content.replaceAll('"/_next/', `"${base}/_next/`);
    content = content.replaceAll("'/_next/", `'${base}/_next/`);
    content = content.replaceAll("href=\"/", `href="${base}/`);
    content = content.replaceAll("src=\"/", `src="${base}/`);
    content = content.replaceAll('href="/', `href="${base}/`);
    content = content.replaceAll('src="/', `src="${base}/`);
    content = content.replaceAll(`href="${base}/http`, 'href="/http');
    content = content.replaceAll(`src="${base}/http`, 'src="/http');
    content = content.replaceAll(`href="${base}//`, 'href="//');
    content = content.replaceAll(`src="${base}//`, 'src="//');
    content = content.replaceAll(`href="${base}/#`, 'href="#');
    content = content.replaceAll(`href="${base}/demos/`, `href="${base}/`);
    content = content.replaceAll(`src="${base}/demos/`, `src="${base}/`);
  }

  fs.writeFileSync(filePath, content, "utf8");
}

function walkRewrite(dir, slug, rewriteAbsolute) {
  if (!rewriteAbsolute) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkRewrite(full, slug, rewriteAbsolute);
    } else {
      rewriteFile(full, slug);
    }
  }
}

for (const item of IFRAME_BUILDS) {
  const importDir = item.importDir ?? item.slug;
  const src = path.join(importsRoot, importDir, item.sourceSubdir);
  const dest = path.join(root, "public", "demos", item.slug);

  if (!fs.existsSync(path.join(src, "index.html"))) {
    console.error(`SKIP ${item.slug}: index.html não encontrado em ${src}`);
    continue;
  }

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  copyRecursive(src, dest);
  walkRewrite(dest, item.slug, item.rewriteAbsolute);
  console.log(`OK ${item.slug} → public/demos/${item.slug}`);
}

console.log("Integração de builds concluída.");
