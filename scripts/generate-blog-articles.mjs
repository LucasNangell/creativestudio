import fs from "node:fs";

const md = fs.readFileSync("conteudo_sobre_blog_nangell_creative_studio.md", "utf8");

function extractArticle(startMarker, endMarker) {
  const start = md.indexOf(startMarker);
  if (start === -1) throw new Error(`start not found: ${startMarker}`);
  const end = md.indexOf(endMarker, start + startMarker.length);
  let body = md.slice(start, end === -1 ? md.length : end).trim();
  const lines = body.split("\n");
  if (lines[0]?.startsWith("# ")) lines.shift();

  const ctaIdx = lines.findIndex((line) => line.trim() === "## CTA");
  if (ctaIdx !== -1) {
    const ctaText = lines
      .slice(ctaIdx + 1)
      .join("\n")
      .replace(/```txt\n?/g, "")
      .replace(/```/g, "")
      .trim();
    lines.splice(ctaIdx);
    if (ctaText) {
      lines.push("", ctaText);
    }
  }

  return lines.join("\n").trim().replace(/\n---\s*$/, "");
}

const articles = {
  "sistema-sob-medida-quando-empresa-deve-parar-de-adaptar-processo-a-ferramenta":
    extractArticle(
      "# Sistema sob medida: quando sua empresa deve parar de adaptar o processo à ferramenta",
      "# Artigo 2",
    ),
  "automacao-de-processos-como-economizar-tempo-sem-perder-controle": extractArticle(
    "# Automação de processos: como economizar tempo sem perder o controle da operação",
    "# Artigo 3",
  ),
  "diagnostico-tecnico-antes-do-orcamento": extractArticle(
    "# Diagnóstico técnico antes do orçamento: o passo que evita projetos caros e mal planejados",
    "# Artigo 4",
  ),
  "dashboards-empresariais-como-transformar-dados-em-decisoes-rapidas": extractArticle(
    "# Dashboards empresariais: como transformar dados espalhados em decisões rápidas",
    "# Artigo 5",
  ),
  "ia-para-pequenas-empresas-onde-ajuda-e-onde-vira-desperdicio": extractArticle(
    "# IA para pequenas empresas: onde ela realmente ajuda e onde pode virar desperdício",
    "# Artigo 6",
  ),
  "site-profissional-nao-e-so-aparencia-como-transformar-visitantes-em-oportunidades":
    extractArticle(
      "# Site profissional não é só aparência: como transformar visitantes em oportunidades reais",
      "# 6. Sugestão de ordem",
    ),
};

const out = `export const BLOG_ARTICLE_CONTENT: Record<string, string> = ${JSON.stringify(articles, null, 2)};\n`;
fs.writeFileSync("src/data/blog/articles-content.ts", out);
console.log(`Written ${Object.keys(articles).length} articles`);
