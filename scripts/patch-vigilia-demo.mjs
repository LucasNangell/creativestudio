/**
 * Popula seeds de simulação da Vigília Política (build de produção veio com arrays vazios).
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const demoDir = path.join(root, "public", "demos", "vigilia-politica");
const seedPath = path.join(__dirname, "assets", "vigilia-demo-seed.json");
const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));

const assetsDir = path.join(demoDir, "assets");
const jsFiles = fs.readdirSync(assetsDir).filter((f) => f.startsWith("index-") && f.endsWith(".js"));
if (jsFiles.length === 0) {
  console.error("Vigília Política: bundle JS não encontrado");
  process.exit(1);
}

const jsPath = path.join(assetsDir, jsFiles[0]);
let content = fs.readFileSync(jsPath, "utf8");
const before = content;

content = content.replace("var h1=[]", `var h1=${JSON.stringify(seed.feedSeeds)}`);
content = content.replace("q1=[]", `q1=${JSON.stringify(seed.keywords)}`);
content = content.replace(
  "P1=[],F1=[],I1=[],L1=[]",
  `P1=${JSON.stringify(seed.regions)},F1=${JSON.stringify(seed.opponents)},I1=${JSON.stringify(seed.narratives)},L1=${JSON.stringify(seed.tasks)}`,
);

const s0Needle =
  "function s0(){let e=e0()??Q1,t=Y1()??q1,n=z1()??L1,r=[],i=[],a=[...I1]";
const s0Replacement = `function s0(){let e=e0()??Q1,t=Y1()??q1,n=z1()??L1,r=${JSON.stringify(seed.initialFeedItems)},i=${JSON.stringify(seed.initialAlerts)},a=[...I1]`;
content = content.replace(s0Needle, s0Replacement);

const h1Old =
  "narrativeSummary:`Nenhum dado consolidado ainda. Configure fontes, palavras-chave e territórios para começar a acompanhar o impacto da plataforma.`";
const h1New = `narrativeSummary:${JSON.stringify(seed.valueDelivered.narrativeSummary)}`;
content = content.replace(h1Old, h1New);

content = content.replace(
  "mentionsMonitored:0,relevantAlerts:0,criticalAlerts:0,suggestedAgendas:0,territorialDemands:0,reportsGenerated:0,hoursSavedEstimate:0,narrativesAheadOfPress:0,tasksLogged:0,opponentsMonitored:0",
  `mentionsMonitored:${seed.valueDelivered.mentionsMonitored},relevantAlerts:${seed.valueDelivered.relevantAlerts},criticalAlerts:${seed.valueDelivered.criticalAlerts},suggestedAgendas:${seed.valueDelivered.suggestedAgendas},territorialDemands:${seed.valueDelivered.territorialDemands},reportsGenerated:${seed.valueDelivered.reportsGenerated},hoursSavedEstimate:${seed.valueDelivered.hoursSavedEstimate},narrativesAheadOfPress:${seed.valueDelivered.narrativesAheadOfPress},tasksLogged:${seed.valueDelivered.tasksLogged},opponentsMonitored:${seed.valueDelivered.opponentsMonitored}`,
);

content = content.replace(
  "periodLabel:`Período atual`",
  `periodLabel:${JSON.stringify(seed.valueDelivered.periodLabel)}`,
);

// Simulação ao vivo desde o início (não pausada)
content = content.replace(
  "[i,a]=(0,w.useState)(!0),[o,s]=(0,w.useState)(0)",
  "[i,a]=(0,w.useState)(!1),[o,s]=(0,w.useState)(0)",
);

// Primeiro tick mais rápido na demo
content = content.replace(
  "queueMicrotask(()=>s(9)),c.current=window.setTimeout(()=>f.current(),9e3)",
  "queueMicrotask(()=>s(4)),c.current=window.setTimeout(()=>f.current(),4e3)",
);

// Router com basename para servir em /demos/vigilia-politica/
const routerOld = "function j2(){return(0,N.jsx)(jn,{children:";
const routerNew = 'function j2(){return(0,N.jsx)(jn,{basename:"/demos/vigilia-politica",children:';
if (content.includes(routerOld)) {
  content = content.replace(routerOld, routerNew);
} else if (!content.includes(routerNew)) {
  console.warn("Vigília Política: basename do router não encontrado no bundle");
}

if (content === before) {
  console.warn("Vigília Política: nenhuma substituição aplicada — verifique o bundle");
} else {
  fs.writeFileSync(jsPath, content, "utf8");
  console.log(`Vigília Política: seeds injetados em ${jsFiles[0]}`);
}

// Logo quebrado: bundle referencia /logo.png (404 no portfólio)
const logoSvgAsset = path.join(__dirname, "assets", "vigilia-logo.svg");
const logoSvgDest = path.join(demoDir, "logo.svg");
const logoPngDest = path.join(demoDir, "logo.png");
if (fs.existsSync(logoSvgAsset)) {
  fs.copyFileSync(logoSvgAsset, logoSvgDest);
}
if (fs.existsSync(logoSvgDest)) {
  const pngGen = spawnSync(
    process.execPath,
    [
      "-e",
      "const sharp=require('sharp'); sharp(process.argv[1]).resize(640,160,{fit:'inside'}).png().toFile(process.argv[2]).then(()=>process.exit(0)).catch(()=>process.exit(1));",
      logoSvgDest,
      logoPngDest,
    ],
    { stdio: "pipe", cwd: root },
  );
  if (pngGen.status !== 0) {
    console.warn("Vigília Política: logo.png não gerado — verifique sharp/logo.svg");
  }
}
let jsAfterLogo = fs.readFileSync(jsPath, "utf8");
const logoBefore = jsAfterLogo;
jsAfterLogo = jsAfterLogo.replace("var hh=`/logo.png`", "var hh=`./logo.png`");
jsAfterLogo = jsAfterLogo.replace("var hh=`./logo.svg`", "var hh=`./logo.png`");
if (jsAfterLogo !== logoBefore) {
  fs.writeFileSync(jsPath, jsAfterLogo, "utf8");
  console.log("Vigília Política: caminho do logo corrigido para ./logo.png");
}

const urlStrip = `<script>
(function () {
  document.documentElement.setAttribute("data-portfolio-demo", "vigilia");
  var p = location.pathname;
  if (p.endsWith("/index.html")) {
    history.replaceState(null, "", p.slice(0, -10) + location.search + location.hash);
  }
})();
</script>`;

const bootstrap = `<script>
(function () {
  try {
    localStorage.setItem("vp_authenticated", "true");
    var settings = ${JSON.stringify({ ...seed.defaultSettings, usageProfiles: { digitalComms: true, territorialMonitoring: true, crisisManagement: true, legislativeTracking: true, opponentMonitoring: true, executiveSummary: true }, channels: [{ id: "news", label: "Portais de notícias", enabled: true, availability: "simulated" }, { id: "telegram", label: "Telegram", enabled: true, availability: "simulated" }, { id: "twitter", label: "X / Twitter", enabled: true, availability: "simulated" }, { id: "instagram", label: "Instagram", enabled: true, availability: "simulated" }, { id: "facebook", label: "Facebook", enabled: true, availability: "simulated" }] })};
    localStorage.setItem("vp_mandate_settings_v1", JSON.stringify(settings));
    localStorage.setItem("vp_keywords_v1", JSON.stringify(${JSON.stringify(seed.keywords)}));
    localStorage.setItem("vp_tasks_v1", JSON.stringify(${JSON.stringify(seed.tasks)}));
  } catch (e) {}
})();
</script>`;

const indexPath = path.join(demoDir, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// SPA com basename no bundle — demo-nav-fix causa loop de reload (index.html ↔ path limpo)
html = html.replace(
  /\s*<script src="\/demos\/demo-nav-fix\.js"[^>]*><\/script>/gi,
  "",
);

if (!html.includes('data-portfolio-demo", "vigilia')) {
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${urlStrip}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${urlStrip}`);
  }
}

if (!html.includes("vp_authenticated")) {
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${bootstrap}`);
  } else if (html.includes("<head ")) {
    html = html.replace(/<head[^>]*>/, (match) => `${match}${bootstrap}`);
  }
}

const portfolioFixLink =
  '<link rel="stylesheet" href="/demos/vigilia-portfolio-fix.css" />';
if (!html.includes("vigilia-portfolio-fix.css")) {
  html = html.replace("</head>", `    ${portfolioFixLink}\n  </head>`);
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Vigília Política: bootstrap de demo aplicado ao index.html");

// Sincroniza JSON estáticos enriquecidos
const dataDir = path.join(demoDir, "data");
fs.mkdirSync(dataDir, { recursive: true });

const newsSource = path.join(
  root,
  "portfolio-imports",
  "web",
  "vigilia-politica",
  "vigilia-politica",
  "mock-data",
  "news.json",
);
if (fs.existsSync(newsSource)) {
  let news = JSON.parse(fs.readFileSync(newsSource, "utf8"));
  news = enrichNews(news, seed);
  fs.writeFileSync(path.join(dataDir, "news.json"), `${JSON.stringify(news, null, 2)}\n`, "utf8");
}

for (const file of ["portals.json", "topics-trending.json"]) {
  const src = path.join(
    root,
    "portfolio-imports",
    "web",
    "vigilia-politica",
    "vigilia-politica",
    "mock-data",
    file,
  );
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dataDir, file));
  }
}

function enrichNews(news, seedData) {
  const extra = seedData.feedSeeds.slice(0, 6).map((item, index) => ({
    id: `demo-news-extra-${String(index + 1).padStart(3, "0")}`,
    title: item.title,
    summary: item.content.slice(0, 140),
    content: item.content,
    url: `https://exemplo-demo.local/noticias/extra-${index + 1}`,
    source: item.source,
    publishedAt: new Date(Date.now() - index * 3_600_000).toISOString(),
    collectedAt: new Date(Date.now() - index * 3_500_000).toISOString(),
  }));

  const items = [...(news.items ?? []), ...extra];
  const seen = new Set();
  news.items = items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
  news.generatedAt = new Date().toISOString();
  news.warning =
    "Dados fictícios para demonstração comercial — Nangell Creative Studio. Alertas e KPIs são simulados.";
  return news;
}
