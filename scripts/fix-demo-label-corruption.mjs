import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicDemosDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "demos");

const FIXES = [
  ["Modo simulaçãostração", "Modo simulação"],
  ["Modo simulaçãonstração", "Modo simulação"],
  ["simulaçãostração", "simulação"],
  ["simulaçãonstração", "simulação"],
  [" da demo", " da demonstração"],
  ["Reiniciar demo", "Reiniciar simulação"],
  ["dados iniciais da demo", "dados iniciais da simulação"],
  ["João Demo", "João Exemplo"],
  ["Cidade Demo", "Cidade Exemplo"],
  [" Costa Demo", " Costa Exemplo"],
  [" Almeida Demo", " Almeida Exemplo"],
  ["Redação Demo", "Redação Exemplo"],
  ["DOU Demo", "DOU Simulado"],
  ["Perfil Demo Educação", "Perfil Simulado Educação"],
  ["Centro Demo", "Centro Exemplo"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(html|js|json)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

let n = 0;
for (const file of walk(publicDemosDir)) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;
  for (const [from, to] of FIXES) content = content.split(from).join(to);
  if (content !== before) {
    fs.writeFileSync(file, content, "utf8");
    n++;
  }
}
console.log(`Fixed ${n} files.`);
