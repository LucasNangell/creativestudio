/**
 * Rebrands Encurtou → LinkNeo in demo dashboard sources and public preview.
 * Run: node scripts/rebrand-linkneo-demo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TARGETS = [
  path.join(root, "portfolio-imports", "web", "encurtou-pro", "dashboard"),
  path.join(root, "public", "demos", "linkneo-pro"),
];

const TEXT_EXT = new Set([".html", ".js", ".css", ".svg", ".json", ".txt", ".md"]);

/** Order matters: longer / more specific first. */
const REPLACEMENTS = [
  ["https://encurtou.pro", "https://linkneo.pro"],
  ["http://encurtou.pro", "https://linkneo.pro"],
  ["Link Encurtou.pro", "LinkNeo.pro"],
  ["Encurtou.pro", "LinkNeo.pro"],
  ["encurtou.pro", "linkneo.pro"],
  ["window.Encurtou", "window.LinkNeo"],
  ["Encurtou.track", "LinkNeo.track"],
  ["Encurtou Dashboard", "LinkNeo Dashboard"],
  ["Tracking Interno (Encurtou)", "Tracking Interno (LinkNeo)"],
  ["o Encurtou adiciona", "o LinkNeo adiciona"],
  ["Encurtou icon", "LinkNeo icon"],
  ["qrcode-encurtou", "qrcode-linkneo"],
  [".encurtou.pro", ".linkneo.pro"],
  ["subdomain: 'encurtou'", "subdomain: 'linkneo'"],
  ['subdomain: "encurtou"', 'subdomain: "linkneo"'],
  [">encurtou</text>", ">linkneo</text>"],
  ["Encurtou", "LinkNeo"],
  ["encurtou", "linkneo"],
];

function rebrandContent(content) {
  let out = content;
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`skip missing: ${dir}`);
    return 0;
  }
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walk(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    const before = fs.readFileSync(full, "utf8");
    const after = rebrandContent(before);
    if (after !== before) {
      fs.writeFileSync(full, after, "utf8");
      count += 1;
      console.log(`patched ${path.relative(root, full)}`);
    }
  }
  return count;
}

let total = 0;
for (const dir of TARGETS) total += walk(dir);
console.log(`Done. ${total} file(s) updated.`);
