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

const REWRITE_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".txt", ".rsc"]);

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

function rewriteRootPaths(content, base) {
  content = content.replaceAll('"/_next/', `"${base}/_next/`);
  content = content.replaceAll("'/_next/", `'${base}/_next/`);
  content = content.replaceAll('HL["/_next/', `HL["${base}/_next/`);

  const prefixAttr = (attr) => {
    const re = new RegExp(`${attr}="\\/(?!demos\\/|\\/|https?:|#|_next)([^"]*)"`, "g");
    content = content.replace(re, (_, subpath) => {
      const normalized = subpath.replace(/^\/+/, "");
      return `${attr}="${base}/${normalized}"`;
    });
    const reSingle = new RegExp(`${attr}='\\/(?!demos\\/|\\/|https?:|#|_next)([^']*)'`, "g");
    content = content.replace(reSingle, (_, subpath) => {
      const normalized = subpath.replace(/^\/+/, "");
      return `${attr}='${base}/${normalized}'`;
    });
  };

  prefixAttr("href");
  prefixAttr("src");

  content = content.replaceAll(`href="${base}/http`, 'href="http');
  content = content.replaceAll(`src="${base}/http`, 'src="http');
  content = content.replaceAll(`href="${base}//`, 'href="//');
  content = content.replaceAll(`src="${base}//`, 'src="//');
  content = content.replaceAll(`href="${base}/#`, 'href="#');

  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  content = content.replace(new RegExp(`${escaped}${escaped}`, "g"), base);
  content = content.replaceAll(`${base}/demos/`, `${base}/`);

  return content;
}

function rewriteFile(filePath, slug) {
  const base = `/demos/${slug}`;
  const ext = path.extname(filePath);
  if (!REWRITE_EXTENSIONS.has(ext)) return;

  let content = fs.readFileSync(filePath, "utf8");
  content = rewriteRootPaths(content, base);
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

function patchGestaoHtml(dest) {
  const indexPath = path.join(dest, "index.html");
  if (!fs.existsSync(indexPath)) return;

  let html = fs.readFileSync(indexPath, "utf8");
  html = html.replace(/<link rel="manifest"[^>]*>/i, "");
  html = html.replace(
    "<head>",
    `<head>
    <script>
      (function () {
        var p = location.pathname;
        if (p.endsWith("/index.html")) {
          history.replaceState(null, "", p.slice(0, -10) + location.search + location.hash);
        }
        if ("serviceWorker" in navigator) {
          var noop = function () {
            return Promise.resolve({ unregister: function () { return Promise.resolve(true); } });
          };
          navigator.serviceWorker.register = noop;
          navigator.serviceWorker.getRegistrations().then(function (regs) {
            regs.forEach(function (r) { r.unregister(); });
          });
        }
        try { localStorage.setItem("sagra-pwa-update-dismissed", "1"); } catch (e) {}
      })();
    </script>`,
  );
  fs.writeFileSync(indexPath, html, "utf8");
}

function patchGestaoJs(dest) {
  const assetsDir = path.join(dest, "assets");
  if (!fs.existsSync(assetsDir)) return;

  const brokenG6 =
    'function G6({children:e}){const t=Mn(),n=xg({select:s=>s.location.pathname});return b.useEffect(()=>{if(n.includes("/papelaria")){const s=Hd();(!s.osId||!s.osAno)&&Ap({nr_os:5485,ano:2026,produto:"Ct Visita"})}if(n.includes("/analise")&&!n.includes("?")){const s=new URLSearchParams(window.location.search);(!s.get("ano")||!s.get("id"))&&t({to:"/analise",search:{ano:"2026",id:"4521"},replace:!0})}},[t,n]),e}';
  const fixedG6 = "function G6({children:e}){return e}";

  for (const file of fs.readdirSync(assetsDir)) {
    if (!file.endsWith(".js") || !file.startsWith("index-")) continue;
    const filePath = path.join(assetsDir, file);
    let content = fs.readFileSync(filePath, "utf8");
    const before = content;
    content = content.replace(brokenG6, fixedG6);
    content = content.replace(
      "r.jsx(G6,{children:r.jsx(CI,{router:xle})})",
      "r.jsx(CI,{router:xle})",
    );
    if (content !== before) {
      fs.writeFileSync(filePath, content, "utf8");
    }
  }
}

function patchLarDosAnjosHtml(dest) {
  const swDisable = `<script>
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
        let html = fs.readFileSync(full, "utf8");
        if (html.includes("navigator.serviceWorker.register = noop")) continue;
        if (!html.includes("<head")) continue;
        html = html.replace("<head>", `<head>${swDisable}`);
        html = html.replace(/<link rel="manifest"[^>]*>/gi, "");
        fs.writeFileSync(full, html, "utf8");
      }
    }
  }

  walkHtml(dest);
}

function patchVigiliaJs(dest) {
  const assetsDir = path.join(dest, "assets");
  if (!fs.existsSync(assetsDir)) return;

  for (const file of fs.readdirSync(assetsDir)) {
    if (!file.endsWith(".js")) continue;
    const filePath = path.join(assetsDir, file);
    let content = fs.readFileSync(filePath, "utf8");
    const before = content;
    content = content.replace(
      "Ambiente de inteligência • monitoramento simulado em tempo real",
      "",
    );
    if (content !== before) {
      fs.writeFileSync(filePath, content, "utf8");
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

  if (item.slug === "lar-dos-anjos") {
    patchLarDosAnjosHtml(dest);
  }
  if (item.slug === "gestao-producao-grafica") {
    patchGestaoHtml(dest);
    patchGestaoJs(dest);
  }
  if (item.slug === "vigilia-politica") {
    patchVigiliaJs(dest);
  }

  console.log(`OK ${item.slug} → public/demos/${item.slug}`);
}

console.log("Integração de builds concluída.");
