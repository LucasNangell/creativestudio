/**
 * Converte PNGs em scripts/.screenshots-raw/{slug}.png para public/assets/mockups/{slug}.webp
 * Uso: node scripts/sync-mockups-from-raw.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawDir = path.join(root, "scripts", ".screenshots-raw");
const mockupsDir = path.join(root, "public", "assets", "mockups");

const SLUGS = [
  "lar-dos-anjos",
  "player-video-marcadores",
  "monitor-arquivos",
  "gestao-producao-grafica",
  "sharescreen-lan",
  "site-psicologia-profissional",
  "vigilia-politica",
  "encurtou-pro",
];

async function main() {
  fs.mkdirSync(mockupsDir, { recursive: true });

  for (const slug of SLUGS) {
    const pngPath = path.join(rawDir, `${slug}.png`);
    if (!fs.existsSync(pngPath)) {
      console.warn(`SKIP ${slug}: ${pngPath} não encontrado`);
      continue;
    }

    const webpPath = path.join(mockupsDir, `${slug}.webp`);
    await sharp(pngPath)
      .resize(1280, 720, { fit: "cover", position: "top" })
      .webp({ quality: 88, effort: 6 })
      .toFile(webpPath);

    const sizeKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`OK ${slug}.webp (${sizeKb} KB)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
