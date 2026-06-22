import { IMPORTED_PORTFOLIO_PROJECTS } from "@/data/projects/imported-portfolio-projects";

export type DemoPageContent = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  demoHint?: string;
};

const DEMO_HINTS: Record<string, string> = {
  "gestao-producao-grafica":
    "Use o usuário 123456 e qualquer senha, ou clique em “Entrar na demonstração”. Explore OS, PCP, dashboards e análise técnica.",
  "lar-dos-anjos":
    "Navegue pelo site institucional, campanhas, animais e fluxos de doação — todos os dados são fictícios.",
  "site-psicologia-profissional":
    "Painel admin: usuário demo / senha demo2026. Teste agendamento, blog e FAQ do site clínico.",
  "sharescreen-lan":
    "Simulação do painel host e clients em rede local — WebRTC e gravação são demonstrativos.",
  "vigilia-politica":
    "Acesso automático na demo. Explore War Room, Feed, Central de Alertas, Narrativas, Territórios e Briefing — novos alertas simulados surgem a cada poucos segundos.",
};

const projectsBySlug = Object.fromEntries(
  IMPORTED_PORTFOLIO_PROJECTS.map((project) => [project.slug, project]),
);

export function getDemoPageContent(slug: string): DemoPageContent | null {
  const project = projectsBySlug[slug];
  if (!project) return null;

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription,
    problem: project.problem,
    solution: project.solution,
    features: [...project.features],
    stack: [...project.stack],
    demoHint: DEMO_HINTS[slug],
  };
}

export function getDemoPageContentOrThrow(slug: string): DemoPageContent {
  const content = getDemoPageContent(slug);
  if (!content) {
    throw new Error(`Demo content not found for slug: ${slug}`);
  }
  return content;
}
