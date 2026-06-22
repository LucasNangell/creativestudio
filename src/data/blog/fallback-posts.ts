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
      "## O problema das promessas vazias no software B2B\n\nQuando uma empresa precisa contratar desenvolvimento de software, o maior risco percebido é comprar uma caixa preta — promessas sem prova técnica.\n\n### Por que screenshots não bastam\n\nCapturas estáticas não demonstram fluxos, usabilidade nem inteligência do sistema. O comprador precisa *sentir* o produto.\n\n## A vantagem das demos interativas\n\nDemos simuladas no próprio site permitem que o visitante experimente fluxos reais de CRM, dashboards e automações antes do primeiro contato comercial.\n\n### Show, don't tell na prática\n\nKanban arrastável, filtros dinâmicos e KPIs em tempo real geram confiança imediata na competência do fornecedor.\n\n## Resultado para o negócio\n\nMais leads qualificados, conversas mais objetivas e percepção imediata de competência técnica — com menor ciclo de vendas.",
    coverImage: "/assets/mockups/post-demo.webp",
    category: "Conversão",
    tags: ["demos", "b2b", "conversão", "produto"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-05-10T10:00:00.000Z"),
    createdAt: new Date("2026-05-10T10:00:00.000Z"),
    updatedAt: new Date("2026-05-10T10:00:00.000Z"),
    seoTitle: "Demos interativas convertem mais que screenshots",
    seoDescription:
      "Descubra como demos interativas de software B2B aumentam confiança, qualificam leads e aceleram decisões de compra.",
  },
  {
    id: "post-2",
    title: "Arquitetura moderna para sistemas sob medida em 2026",
    slug: "arquitetura-moderna-sistemas-2026",
    excerpt:
      "Next.js, TypeScript, Prisma e observabilidade: a stack que usamos para escalar produtos digitais.",
    content:
      "## Fundação sólida com TypeScript e Prisma\n\nTypeScript, validação em camadas e ORM tipado reduzem bugs em produção e aceleram a evolução do produto.\n\n### Separação de responsabilidades\n\nFrontend, API routes, serviços e banco de dados com contratos claros facilitam manutenção e deploy seguro.\n\n## Performance e SEO com Next.js\n\nServer Components e renderização híbrida entregam Core Web Vitals excelentes sem sacrificar experiência interativa.\n\n### Indexação e metadados\n\nSitemaps dinâmicos, JSON-LD e meta-descrições otimizadas garantem visibilidade orgânica.\n\n## Operacionalização e observabilidade\n\nLogs estruturados, health checks e deploy previsível em Node.js são parte do produto, não um extra opcional.",
    coverImage: "/assets/mockups/post-architecture.webp",
    category: "Engenharia",
    tags: ["nextjs", "typescript", "prisma", "arquitetura"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-05-22T14:30:00.000Z"),
    createdAt: new Date("2026-05-22T14:30:00.000Z"),
    updatedAt: new Date("2026-05-22T14:30:00.000Z"),
    seoTitle: "Arquitetura moderna para software sob medida",
    seoDescription:
      "Guia de arquitetura moderna para software sob medida: Next.js, TypeScript, Prisma, performance e SEO em 2026.",
  },
  {
    id: "post-3",
    title: "Como estruturar um diagnóstico técnico antes de orçar software",
    slug: "diagnostico-tecnico-antes-do-orcamento",
    excerpt:
      "Briefings bem feitos economizam tempo, reduzem retrabalho e aumentam a assertividade da proposta.",
    content:
      "## Contexto e dor real do negócio\n\nAntes de falar de tecnologia, mapeamos processo atual, gargalos operacionais e impacto financeiro no negócio.\n\n### Mapeamento de stakeholders\n\nEntrevistas com gestores e operadores revelam onde o software gera mais valor imediato.\n\n## Escopo, prioridades e MVP\n\nDefinimos MVP enxuto, integrações críticas e indicadores de sucesso mensuráveis para cada fase.\n\n### Estimativa de prazo realista\n\nMVPs podem levar de 6 a 12 semanas; sistemas completos, de 3 a 6 meses — sempre com marcos claros.\n\n## Próximo passo: proposta fundamentada\n\nCom diagnóstico claro, a proposta deixa de ser chute e vira plano de execução com entregáveis definidos.",
    coverImage: "/assets/mockups/post-diagnostico.webp",
    category: "Processo",
    tags: ["diagnóstico", "briefing", "escopo", "consultoria"],
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    publishedAt: new Date("2026-06-01T09:00:00.000Z"),
    createdAt: new Date("2026-06-01T09:00:00.000Z"),
    updatedAt: new Date("2026-06-01T09:00:00.000Z"),
    seoTitle: "Diagnóstico técnico antes de orçar software",
    seoDescription:
      "Como estruturar diagnóstico técnico e briefing de software: escopo, MVP, prazos e proposta comercial assertiva.",
  },
];

export const FALLBACK_POST_SLUGS = FALLBACK_POSTS.map((post) => post.slug);
