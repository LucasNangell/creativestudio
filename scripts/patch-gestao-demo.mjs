import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoDir = path.join(__dirname, "..", "public", "demos", "gestao-producao-grafica");
const assetsDir = path.join(demoDir, "assets");

const brokenG6 =
  'function G6({children:e}){const t=Mn(),n=xg({select:s=>s.location.pathname});return b.useEffect(()=>{if(n.includes("/papelaria")){const s=Hd();(!s.osId||!s.osAno)&&Ap({nr_os:5485,ano:2026,produto:"Ct Visita"})}if(n.includes("/analise")&&!n.includes("?")){const s=new URLSearchParams(window.location.search);(!s.get("ano")||!s.get("id"))&&t({to:"/analise",search:{ano:"2026",id:"4521"},replace:!0})}},[t,n]),e}';
const fixedG6 = "function G6({children:e}){return e}";

const AUTH_UI_OLD =
  'children:"Usuário:"})," demo \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," demo"';
const AUTH_UI_NEW =
  'children:"Usuário:"})," 123456  \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," qualquer senha"';

const AUTO_LOGIN_OLD = 'N=async()=>{i(),await t("demo","demo")';
const AUTO_LOGIN_NEW = 'N=async()=>{i(),await t("123456","demo")';

const BASEPATH_OLD = 'const gle="./".replace(/\\/$/,"")';
const BASEPATH_NEW = 'const gle="/demos/gestao-producao-grafica"';

const COLUMN_SIZE_PATCHES = [
  ['accessorKey:"setor",header:"Setor",size:58', 'accessorKey:"setor",header:"Setor",size:132'],
  [
    'accessorKey:"prioridade",header:"Prioridade",size:104',
    'accessorKey:"prioridade",header:"Prioridade",size:160',
  ],
  [
    'accessorKey:"situacao",header:"Situação",size:102',
    'accessorKey:"situacao",header:"Situação",size:140',
  ],
  [
    'accessorKey:"produto",header:"Produto",size:118',
    'accessorKey:"produto",header:"Produto",size:148',
  ],
  [
    'accessorKey:"data_entrega",header:"Data",size:76',
    'accessorKey:"data_entrega",header:"Data",size:92',
  ],
  ['accessorKey:"ano",header:"Ano",size:48', 'accessorKey:"ano",header:"Ano",size:56'],
];

const SW_BOOT = `<script>
(function () {
  document.documentElement.setAttribute("data-portfolio-demo", "gestao");
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
</script>`;

const HEAD_ASSETS = `<link rel="stylesheet" href="/demos/gestao-portfolio-fix.css" />
<script src="/demos/demo-nav-fix.js" data-base="/demos/gestao-producao-grafica"></script>`;

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
  content = content.replaceAll("ponto:1001", "ponto:123456");
  content = content.replace(AUTH_UI_OLD, AUTH_UI_NEW);
  content = content.replace(AUTO_LOGIN_OLD, AUTO_LOGIN_NEW);
  content = content.replace(BASEPATH_OLD, BASEPATH_NEW);

  for (const [from, to] of COLUMN_SIZE_PATCHES) {
    content = content.replace(from, to);
  }

  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Patched ${file}`);
  }
}

const indexPath = path.join(demoDir, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/<link rel="manifest"[^>]*>/gi, "");

if (!html.includes("data-portfolio-demo")) {
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${SW_BOOT}${HEAD_ASSETS}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${SW_BOOT}${HEAD_ASSETS}`);
  }
} else if (!html.includes("gestao-portfolio-fix.css")) {
  html = html.replace("<head>", `<head>${HEAD_ASSETS}`);
}

if (html.includes('demo-nav-fix.js') && html.includes("gestao-portfolio-fix.css") === false) {
  html = html.replace(
    '<script src="/demos/demo-nav-fix.js"',
    `<link rel="stylesheet" href="/demos/gestao-portfolio-fix.css" />\n    <script src="/demos/demo-nav-fix.js"`,
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Gestão gráfica: credenciais, colunas, layout e navegação atualizados");
