import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoDir = path.join(__dirname, "..", "public", "demos", "gestao-producao-grafica");
const assetsDir = path.join(demoDir, "assets");

const demoBootstrapG6 =
  'function G6({children:e}){const t=Mn(),n=xg({select:s=>s.location.pathname});return b.useEffect(()=>{if(n.includes("/papelaria")){const s=Hd();(!s.osId||!s.osAno)&&Ap({nr_os:5485,ano:2026,produto:"Ct Visita"})}if(n.includes("/analise")){const s=new URLSearchParams(window.location.search);(!s.get("ano")||!s.get("id"))&&t({to:"/analise",search:{ano:"2026",id:"4521"},replace:!0})}},[t,n]),e}';
const noopG6 = "function G6({children:e}){return e}";

const AUTH_UI_REPLACEMENTS = [
  [
    'children:"Usuário:"})," demo \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," demo"',
    'children:"Usuário:"})," 1234 \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," 1234"',
  ],
  [
    'children:"Usuário:"})," 123456   \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," qualquer senha"',
    'children:"Usuário:"})," 1234 \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," 1234"',
  ],
  [
    'children:"Usuário:"})," 123456  \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," qualquer senha"',
    'children:"Usuário:"})," 1234 \u00a0|\u00a0 ",r.jsx("strong",{children:"Senha:"})," 1234"',
  ],
];

const AUTO_LOGIN_REPLACEMENTS = [
  ['N=async()=>{i(),await t("demo","demo")', 'N=async()=>{i(),await t("1234","1234")'],
  ['await t("123456","demo")', 'await t("1234","1234")'],
  ['await t("demo","demo")', 'await t("1234","1234")'],
];

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
  if (p.indexOf("/analise") !== -1 && !location.search) {
    location.replace(p + "?ano=2026&id=4521" + location.hash);
    return;
  }
  if (p.indexOf("/papelaria") !== -1) {
    try {
      if (!sessionStorage.getItem("sagra_current_os_id") || !sessionStorage.getItem("sagra_current_os_ano")) {
        sessionStorage.setItem("sagra_current_os_id", "5485");
        sessionStorage.setItem("sagra_current_os_ano", "2026");
        sessionStorage.setItem("sagra_target_product", "Ct Visita");
      }
    } catch (e) {}
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

const HEAD_ASSETS = `<link rel="stylesheet" href="/demos/gestao-portfolio-fix.css" />`;

const EMAIL_MOCK_ANCHOR =
  ':n.startsWith("/email")||n.startsWith("/reports")||n.startsWith("/cotas-graf")';
const EMAIL_MOCK_HANDLERS =
  ':n==="/email/config"&&i==="GET"?Ye({configured:!0,refresh_interval_sec:30,ews_url:"https://exchange.demo.local/EWS/Exchange.asmx",verify_ssl:!1,monitored_targets:[{mailbox:"operacao.demo@empresa-demo.com",folders:[{id:"inbox",name:"Caixa de Entrada",parent:"Inbox"}]}]}):n==="/email/inbox"&&i==="GET"?Ye([{id:"demo-mail-1",sender:"Empresa Alpha Ltda",email:"contato@empresa-alpha.demo",subject:"OS 4521/2026 — Aprovação de prova",preview:"Segue a prova do folder institucional para aprovação...",date:"2026-06-22T09:15:00",read:!1,folder:"Caixa de Entrada",account:"sepim.demo@empresa-demo.com",hasAttachment:!0,real_id:"demo-entry-001",body:"<p>Prezados, segue a prova do folder institucional (OS 4521/2026) para aprovação.</p>",inline_images:[],attachments:[{name:"prova_folder_v2.pdf",index:1}]},{id:"demo-mail-2",sender:"Cliente Demonstração",email:"cliente.demo@empresa-demo.com",subject:"OS 4518/2026 — Cartão de visita",preview:"Poderiam confirmar o recebimento dos arquivos atualizados?",date:"2026-06-21T16:40:00",read:!0,folder:"Caixa de Entrada",account:"sepim.demo@empresa-demo.com",hasAttachment:!1,real_id:"demo-entry-002",body:"<p>Bom dia! Confirmam o recebimento dos arquivos do cartão de visita?</p>",inline_images:[],attachments:[]}]):n.startsWith("/email/pendencias")&&i==="GET"?Ye([{os:4521,ano:2026,situacao:"Aguardando aprovação",setor:"SEFOC",data:"2026-06-21T14:30:00",produto:"Folder"},{os:4518,ano:2026,situacao:"Em Execução",setor:"SEFOC",data:"2026-06-20T11:00:00",produto:"Cartão de Visita"}]):n.startsWith("/email")||n.startsWith("/reports")||n.startsWith("/cotas-graf")';

for (const file of fs.readdirSync(assetsDir)) {
  if (!file.endsWith(".js") || !file.startsWith("index-")) continue;
  const filePath = path.join(assetsDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  const before = content;

  content = content.replace(demoBootstrapG6, noopG6);
  content = content.replace(
    "r.jsx(G6,{children:r.jsx(CI,{router:xle})})",
    "r.jsx(CI,{router:xle})",
  );
  if (content.includes(EMAIL_MOCK_ANCHOR) && !content.includes('demo-mail-1')) {
    content = content.replace(EMAIL_MOCK_ANCHOR, EMAIL_MOCK_HANDLERS);
  }
  content = content.replaceAll("ponto:1001", "ponto:1234");
  content = content.replaceAll("ponto:123456", "ponto:1234");

  for (const [from, to] of AUTH_UI_REPLACEMENTS) {
    content = content.replace(from, to);
  }
  for (const [from, to] of AUTO_LOGIN_REPLACEMENTS) {
    content = content.replace(from, to);
  }
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
html = html.replace(
  /\s*<script src="\/demos\/demo-nav-fix\.js"[^>]*><\/script>/gi,
  "",
);

const analiseBootSnippet = 'if (p.indexOf("/analise") !== -1 && !location.search)';
if (!html.includes(analiseBootSnippet)) {
  html = html.replace(
    /if \(p\.endsWith\("\/index\.html"\)\) \{\s*\n\s*history\.replaceState\(null, "", p\.slice\(0, -10\) \+ location\.search \+ location\.hash\);\s*\n\s*\}/,
    `if (p.endsWith("/index.html")) {
    history.replaceState(null, "", p.slice(0, -10) + location.search + location.hash);
  }
  if (p.indexOf("/analise") !== -1 && !location.search) {
    location.replace(p + "?ano=2026&id=4521" + location.hash);
    return;
  }`,
  );
}

if (!html.includes("data-portfolio-demo")) {
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${SW_BOOT}${HEAD_ASSETS}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${SW_BOOT}${HEAD_ASSETS}`);
  }
} else if (!html.includes("gestao-portfolio-fix.css")) {
  html = html.replace("<head>", `<head>${HEAD_ASSETS}`);
}

if (!html.includes("sagra_current_os_id")) {
  html = html.replace(
    /if \(p\.indexOf\("\/analise"\) !== -1 && !location\.search\) \{[\s\S]*?return;\s*\}/,
    `if (p.indexOf("/analise") !== -1 && !location.search) {
    location.replace(p + "?ano=2026&id=4521" + location.hash);
    return;
  }
  if (p.indexOf("/papelaria") !== -1) {
    try {
      if (!sessionStorage.getItem("sagra_current_os_id") || !sessionStorage.getItem("sagra_current_os_ano")) {
        sessionStorage.setItem("sagra_current_os_id", "5485");
        sessionStorage.setItem("sagra_current_os_ano", "2026");
        sessionStorage.setItem("sagra_target_product", "Ct Visita");
      }
    } catch (e) {}
  }`,
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Gestão gráfica: credenciais, colunas, layout e navegação atualizados");
