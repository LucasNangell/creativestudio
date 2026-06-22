/**
 * One-time asset optimizer: compress brand PNGs to WebP and generate mockup placeholders.
 * Run: node scripts/optimize-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public", "assets", "brand");
const mockupsDir = path.join(root, "public", "assets", "mockups");

const MOCKUP_SPECS = [
  { name: "crm-inteligente", label: "CRM Inteligente", colors: ["#05070d", "#00c2fc", "#6139fa"] },
  { name: "dashboard-bi", label: "Dashboard BI", colors: ["#0b0f1a", "#058ff7", "#3061fa"] },
  { name: "gestao-os", label: "Gestão de OS", colors: ["#05070d", "#6139fa", "#00c2fc"] },
  { name: "plataforma-educacional", label: "Plataforma Educacional", colors: ["#0b0f1a", "#00c2fc", "#058ff7"] },
  { name: "link-qr", label: "Link & QR", colors: ["#05070d", "#3061fa", "#00c2fc"] },
  { name: "monitoramento-tempo-real", label: "Monitoramento", colors: ["#0b0f1a", "#6139fa", "#058ff7"] },
  { name: "post-demo", label: "Demo Interativa", colors: ["#05070d", "#00c2fc", "#6139fa"] },
  { name: "post-architecture", label: "Arquitetura", colors: ["#0b0f1a", "#3061fa", "#058ff7"] },
  { name: "post-diagnostico", label: "Diagnóstico", colors: ["#05070d", "#058ff7", "#00c2fc"] },
  { name: "lar-dos-anjos", label: "Lar dos Anjos", colors: ["#0b0f1a", "#2AA98C", "#6139fa"] },
  { name: "player-video-marcadores", label: "Player Vídeo", colors: ["#0b0f1a", "#6366f1", "#00c2fc"] },
  { name: "monitor-arquivos", label: "HT Monitor", colors: ["#05070d", "#3061fa", "#058ff7"] },
  { name: "gestao-producao-grafica", label: "Produção Gráfica", colors: ["#121214", "#6139fa", "#00c2fc"] },
  { name: "sharescreen-lan", label: "ShareScreen LAN", colors: ["#05070d", "#00c2fc", "#3061fa"] },
  { name: "site-psicologia-profissional", label: "Site Psicologia", colors: ["#0b0f1a", "#8b5cf6", "#2dd4bf"] },
  { name: "vigilia-politica", label: "Vigília Política", colors: ["#0b0f1a", "#dc2626", "#6139fa"] },
];

async function optimizeBrandAssets() {
  const files = fs.readdirSync(brandDir).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    const input = path.join(brandDir, file);
    const output = path.join(brandDir, file.replace(".png", ".webp"));
    await sharp(input)
      .webp({ quality: 82, effort: 6 })
      .toFile(output);
    const origSize = fs.statSync(input).size;
    const newSize = fs.statSync(output).size;
    console.log(`Brand: ${file} → ${path.basename(output)} (${(origSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB)`);
  }
}

function buildMockupSvg(label, colors) {
  const [bg, c1, c2] = colors;
  const escaped = label.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="0.25"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="640" height="360" fill="${bg}"/>
  <circle cx="120" cy="80" r="90" fill="${c1}" opacity="0.2" filter="url(#blur)"/>
  <circle cx="520" cy="280" r="110" fill="${c2}" opacity="0.18" filter="url(#blur)"/>
  <rect x="40" y="40" width="560" height="280" rx="12" fill="url(#g)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <rect x="56" y="56" width="120" height="8" rx="4" fill="${c1}" opacity="0.7"/>
  <rect x="56" y="76" width="80" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
  <rect x="56" y="110" width="528" height="1" fill="rgba(255,255,255,0.06)"/>
  <rect x="56" y="130" width="160" height="100" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)"/>
  <rect x="232" y="130" width="160" height="100" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)"/>
  <rect x="408" y="130" width="176" height="100" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)"/>
  <rect x="56" y="250" width="528" height="50" rx="8" fill="rgba(0,194,252,0.08)" stroke="rgba(0,194,252,0.15)"/>
  <text x="320" y="280" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#94a3b8">${escaped}</text>
  <text x="320" y="340" text-anchor="middle" font-family="monospace" font-size="10" fill="#64748b" letter-spacing="2">NANGELL CREATIVE STUDIO</text>
</svg>`;
}

async function generateMockups() {
  fs.mkdirSync(mockupsDir, { recursive: true });
  for (const spec of MOCKUP_SPECS) {
    const svg = buildMockupSvg(spec.label, spec.colors);
    const output = path.join(mockupsDir, `${spec.name}.webp`);
    await sharp(Buffer.from(svg))
      .resize(640, 360)
      .webp({ quality: 80 })
      .toFile(output);
    const size = fs.statSync(output).size;
    console.log(`Mockup: ${spec.name}.webp (${(size / 1024).toFixed(1)}KB)`);
  }
}

await optimizeBrandAssets();
await generateMockups();
console.log("Done.");
