/**
 * Correções da demo Player de Vídeo (iframe Next export):
 * - Menu lateral: overlay mobile usava lg:hidden enquanto botão usa xl:hidden (1024–1280px quebrado no iframe)
 * - Mídia/thumbnails: paths absolutos /demo-media → prefixo /demos/player-video-marcadores/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoDir = path.join(__dirname, "..", "public", "demos", "player-video-marcadores");
const base = "/demos/player-video-marcadores";

const JS_REPLACEMENTS = [
  [
    '${W?"fixed inset-0 z-50 flex bg-black/50 lg:hidden":"hidden"}',
    '${W?"fixed inset-0 z-50 flex bg-black/50 xl:hidden":"hidden"}',
  ],
  ['"/demo-media/', `"${base}/demo-media/`],
  ["'/demo-media/", `'${base}/demo-media/`],
  ['"/demo-thumbnails/', `"${base}/demo-thumbnails/`],
  ["'/demo-thumbnails/", `'${base}/demo-thumbnails/`],
];

function patchJsFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const before = content;
  for (const [from, to] of JS_REPLACEMENTS) {
    content = content.replaceAll(from, to);
  }
  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function walkJs(dir, stats) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJs(full, stats);
    } else if (entry.name.endsWith(".js") && !entry.name.endsWith(".map")) {
      if (patchJsFile(full)) stats.js += 1;
    }
  }
}

const stats = { js: 0 };
const chunksDir = path.join(demoDir, "_next", "static", "chunks");
if (fs.existsSync(chunksDir)) {
  walkJs(chunksDir, stats);
}

console.log(
  `Player de vídeo: ${stats.js} chunk(s) patchado(s) (menu mobile + paths de mídia)`,
);
