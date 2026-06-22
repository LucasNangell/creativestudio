import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDemosDir = path.join(__dirname, "..", "public", "demos");

const REPLACEMENTS = [
  ["Refúgio Esperança Demo", "Refúgio Esperança — Demonstração"],
  ["Deputado Demo", "Deputado Exemplo"],
  ["Deputado Silva Demo", "Deputado Silva Exemplo"],
  ["PD Demo", "PD Exemplo"],
  ["Assessor Demo", "Assessor Exemplo"],
  ["João Demo", "João Exemplo"],
  ["Carlos Demo", "Carlos Exemplo"],
  ["Pedro Demo", "Pedro Exemplo"],
  ["Loja Demo Center", "Loja Exemplo Center"],
  ["Frente — Demo", "Frente — Simulação"],
  ["Verso — Demo", "Verso — Simulação"],
  ['partido:"Demo"', 'partido:"Exemplo"'],
  ["Cliente Demo", "Cliente Exemplo"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      walk(full, files);
    } else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

let changedFiles = 0;
for (const file of walk(publicDemosDir)) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;
  for (const [from, to] of REPLACEMENTS) {
    content = content.split(from).join(to);
  }
  if (content !== before) {
    fs.writeFileSync(file, content, "utf8");
    changedFiles++;
    console.log("Updated", path.relative(publicDemosDir, file));
  }
}

console.log(`Demo label sweep: ${changedFiles} file(s) updated.`);
