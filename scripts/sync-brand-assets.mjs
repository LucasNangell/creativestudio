/**
 * Sincroniza logos/Logo.png e logos/Icon.png para public/assets/brand/ antes do build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public", "assets", "brand");

fs.mkdirSync(brandDir, { recursive: true });

const logoSource = path.join(root, "logos", "Logo.png");
const iconSource = path.join(root, "logos", "Icon.png");

if (fs.existsSync(logoSource)) {
  const logoDest = path.join(brandDir, "logo.png");
  fs.copyFileSync(logoSource, logoDest);
  console.log(`sync-brand-assets: ${logoSource} → ${logoDest}`);
} else {
  console.warn("sync-brand-assets: logos/Logo.png não encontrado — mantendo logo atual");
}

if (fs.existsSync(iconSource)) {
  const iconDest = path.join(brandDir, "icon.png");
  fs.copyFileSync(iconSource, iconDest);
  console.log(`sync-brand-assets: ${iconSource} → ${iconDest} (favicon)`);
} else {
  console.warn("sync-brand-assets: logos/Icon.png não encontrado — mantendo ícone atual");
}
