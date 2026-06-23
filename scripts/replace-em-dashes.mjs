/**
 * Substitui travessões (— e –) por vírgulas, espaço ou "a" (intervalos numéricos).
 * Uso: node scripts/replace-em-dashes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TARGETS = [
  path.join(root, "src"),
  path.join(root, "prisma", "seed.ts"),
  path.join(root, "public", "demos", "monitor-arquivos", "index.html"),
  path.join(root, "public", "demos", "vigilia-politica", "data", "news.json"),
  path.join(root, "public", "demos", "vigilia-politica", "index.html"),
];

const SKIP_DIRS = new Set(["node_modules", ".next"]);
const EXTENSIONS = new Set([".ts", ".tsx", ".html", ".json"]);

function replaceDashes(text) {
  let out = text;

  // Intervalos numéricos: 2–3 → 2 a 3
  out = out.replace(/(\d)–(\d)/g, "$1 a $2");

  // Placeholder isolado em strings
  out = out.replace(/"—"/g, '"-"');
  out = out.replace(/'—'/g, "'-'");

  // Travessão com espaços → vírgula
  out = out.replace(/ — /g, ", ");
  out = out.replace(/ – /g, ", ");

  // Travessões restantes (sem espaço) → vírgula + espaço
  out = out.replace(/—/g, ", ");
  out = out.replace(/–/g, ", ");

  // Limpeza de vírgulas duplicadas ou ", ,"
  out = out.replace(/, ,/g, ", ");
  out = out.replace(/,,+/g, ",");

  return out;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  if (fs.statSync(dir).isFile()) {
    if (EXTENSIONS.has(path.extname(dir))) files.push(dir);
    return files;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    walk(path.join(dir, entry.name), files);
  }
  return files;
}

function collectFiles() {
  const files = new Set();
  for (const target of TARGETS) {
    if (!fs.existsSync(target)) continue;
    if (fs.statSync(target).isDirectory()) {
      for (const file of walk(target)) files.add(file);
    } else {
      files.add(target);
    }
  }
  return [...files].filter((file) => !file.endsWith(".test.ts"));
}

let changed = 0;

for (const file of collectFiles()) {
  const original = fs.readFileSync(file, "utf8");
  if (!original.includes("—") && !original.includes("–")) continue;

  const updated = replaceDashes(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changed += 1;
    console.log(`OK ${path.relative(root, file)}`);
  }
}

console.log(`\n${changed} arquivo(s) atualizado(s).`);
