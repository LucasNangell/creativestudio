/**
 * Sincroniza logos/Logo.png para public/assets/brand/ antes do build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "logos", "Logo.png");
const brandDir = path.join(root, "public", "assets", "brand");

if (!fs.existsSync(source)) {
  console.warn("sync-brand-assets: logos/Logo.png não encontrado — mantendo assets atuais");
  process.exit(0);
}

fs.mkdirSync(brandDir, { recursive: true });

for (const name of ["logo.png", "logo.webp"]) {
  const dest = path.join(brandDir, name);
  if (name.endsWith(".webp") && !fs.existsSync(dest)) continue;
  if (name.endsWith(".webp")) continue;
  fs.copyFileSync(source, dest);
  console.log(`sync-brand-assets: ${source} → ${dest}`);
}
