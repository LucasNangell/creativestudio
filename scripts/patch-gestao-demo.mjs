import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(
  __dirname,
  "..",
  "public",
  "demos",
  "gestao-producao-grafica",
  "assets",
);

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
  if (content === before) {
    console.error(`No changes applied to ${file}`);
    process.exit(1);
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Patched ${file}`);
}

const indexPath = path.join(
  __dirname,
  "..",
  "public",
  "demos",
  "gestao-producao-grafica",
  "index.html",
);
let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes('p.endsWith("/index.html")')) {
  html = html.replace(
    `(function () {
        if ("serviceWorker" in navigator) {`,
    `(function () {
        var p = location.pathname;
        if (p.endsWith("/index.html")) {
          history.replaceState(null, "", p.slice(0, -10) + location.search + location.hash);
        }
        if ("serviceWorker" in navigator) {`,
  );
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Patched index.html");
}
