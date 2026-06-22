/**
 * Falha o build se assets críticos das demos não existirem (evita deploy incompleto na Hostinger).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const REQUIRED = [
  "public/demos/lar-dos-anjos/index.html",
  "public/demos/gestao-producao-grafica/index.html",
  "public/demos/gestao-portfolio-fix.css",
  "public/demos/player-video-marcadores/index.html",
  "public/demos/monitor-arquivos/index.html",
  "public/demos/vigilia-politica/index.html",
  "public/demos/encurtou-pro/index.html",
];

const missing = REQUIRED.filter((rel) => !fs.existsSync(path.join(root, rel)));

if (missing.length > 0) {
  console.error("Assets de demo ausentes — execute: node scripts/integrate-portfolio-demos.mjs");
  for (const file of missing) console.error(`  - ${file}`);
  process.exit(1);
}

console.log(`Demo assets OK (${REQUIRED.length} entradas verificadas)`);
