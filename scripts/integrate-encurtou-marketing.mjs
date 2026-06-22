/**
 * Copia a landing comercial do Encurtou para public/demos/encurtou-pro/ (HTML estático).
 * Fonte: portfolio-imports/web/encurtou-pro/marketing/
 * Uso: node scripts/integrate-encurtou-marketing.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "portfolio-imports", "web", "encurtou-pro", "marketing");
const destDir = path.join(root, "public", "demos", "encurtou-pro");

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    console.warn(
      "portfolio-imports/web/encurtou-pro/marketing não encontrado — pulando integração Encurtou.",
    );
    return;
  }

  copyRecursive(sourceDir, destDir);
  const count = fs.readdirSync(sourceDir).length;
  console.log(`Encurtou marketing → public/demos/encurtou-pro/ (${count} entradas)`);
}

main();
