import { PostStatus } from "@prisma/client";

export type FallbackPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const FALLBACK_POSTS: FallbackPostRecord[] = [
  {
    id: "post-1",
    title: "Por que demonstrar software em ação converte mais que screenshots",
    slug: "demonstrar-software-em-acao",
    excerpt:
      "Show, don't tell: como demos interativas reduzem objeções e aceleram decisões em projetos B2B.",
    content:
      "## O problema das promessas vazias\n\nQuando uma empresa precisa contratar desenvolvimento de software, o maior risco percebido é comprar uma caixa preta.\n\n## A vantagem das demos interativas\n\nDemos simuladas no próprio site permitem que o visitante experimente fluxos reais antes do primeiro contato comercial.\n\n## Resultado para o negócio\n\nMais leads qualificados, conversas mais objetivas e percepção imediata de competência técnica.",
    coverImage: "/assets/mockups/post-demo.png",
    category: "Conversão",
    tags: ["demos", "b2b", "conversão", "produto"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-05-10T10:00:00.000Z"),
    createdAt: new Date("2026-05-10T10:00:00.000Z"),
    updatedAt: new Date("2026-05-10T10:00:00.000Z"),
    seoTitle: "Demos interativas convertem mais que screenshots",
    seoDescription:
      "Entenda por que demonstrações interativas aumentam confiança e conversão em projetos de software.",
  },
  {
    id: "post-2",
    title: "Arquitetura moderna para sistemas sob medida em 2026",
    slug: "arquitetura-moderna-sistemas-2026",
    excerpt:
      "Next.js, TypeScript, Prisma e observabilidade: a stack que usamos para escalar produtos digitais.",
    content:
      "## Fundação sólida\n\nTypeScript, validação em camadas e ORM tipado reduzem bugs e aceleram evolução.\n\n## Performance e SEO\n\nServer Components e renderização híbrida entregam velocidade sem sacrificar experiência.\n\n## Operacionalização\n\nLogs, métricas e deploy previsível são parte do produto, não um extra.",
    coverImage: "/assets/mockups/post-architecture.png",
    category: "Engenharia",
    tags: ["nextjs", "typescript", "prisma", "arquitetura"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-05-22T14:30:00.000Z"),
    createdAt: new Date("2026-05-22T14:30:00.000Z"),
    updatedAt: new Date("2026-05-22T14:30:00.000Z"),
    seoTitle: "Arquitetura moderna para software sob medida",
    seoDescription:
      "Como estruturamos sistemas sob medida com Next.js, TypeScript e Prisma em 2026.",
  },
  {
    id: "post-3",
    title: "Como estruturar um diagnóstico técnico antes de orçar software",
    slug: "diagnostico-tecnico-antes-do-orcamento",
    excerpt:
      "Briefings bem feitos economizam tempo, reduzem retrabalho e aumentam a assertividade da proposta.",
    content:
      "## Contexto e dor real\n\nAntes de falar de tecnologia, mapeamos processo, gargalos e impacto no negócio.\n\n## Escopo e prioridades\n\nDefinimos MVP, integrações críticas e indicadores de sucesso.\n\n## Próximo passo\n\nCom diagnóstico claro, a proposta deixa de ser chute e vira plano de execução.",
    coverImage: "/assets/mockups/post-diagnostico.png",
    category: "Processo",
    tags: ["diagnóstico", "briefing", "escopo", "consultoria"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-06-01T09:00:00.000Z"),
    createdAt: new Date("2026-06-01T09:00:00.000Z"),
    updatedAt: new Date("2026-06-01T09:00:00.000Z"),
    seoTitle: "Diagnóstico técnico antes de orçar software",
    seoDescription:
      "Guia prático para estruturar diagnóstico técnico e briefing antes de contratar desenvolvimento.",
  },
];

export const FALLBACK_POST_SLUGS = FALLBACK_POSTS.map((post) => post.slug);
