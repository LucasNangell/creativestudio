import { PostStatus } from "@prisma/client";

import { BLOG_ARTICLE_CONTENT } from "@/data/blog/articles-content";

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

type PostDefinition = Omit<
  FallbackPostRecord,
  "id" | "content" | "status" | "author" | "createdAt" | "updatedAt"
> & { id: string };

const POST_DEFINITIONS: PostDefinition[] = [
  {
    id: "post-1",
    title:
      "Sistema sob medida: quando sua empresa deve parar de adaptar o processo à ferramenta",
    slug: "sistema-sob-medida-quando-empresa-deve-parar-de-adaptar-processo-a-ferramenta",
    excerpt:
      "Nem toda empresa precisa de um sistema personalizado, mas algumas chegam a um ponto em que ferramentas genéricas começam a limitar o crescimento. Entenda os sinais.",
    coverImage: "/assets/mockups/crm-inteligente.webp",
    category: "Sistemas personalizados",
    tags: ["sistemas sob medida", "automação", "produtividade", "gestão", "tecnologia para empresas"],
    seoTitle: "Quando investir em sistema sob medida",
    seoDescription:
      "Veja quando um sistema sob medida passa a ser mais vantajoso do que planilhas e ferramentas prontas, e como identificar se sua empresa chegou a esse momento.",
    publishedAt: new Date("2026-06-02T10:00:00.000Z"),
  },
  {
    id: "post-2",
    title: "Automação de processos: como economizar tempo sem perder o controle da operação",
    slug: "automacao-de-processos-como-economizar-tempo-sem-perder-controle",
    excerpt:
      "Automatizar não é substituir pessoas por robôs. É eliminar tarefas repetitivas, reduzir falhas e liberar a equipe para decisões mais importantes.",
    coverImage: "/assets/mockups/monitoramento-tempo-real.webp",
    category: "Automação",
    tags: ["automação", "processos", "produtividade", "integração", "eficiência operacional"],
    seoTitle: "Automação de processos para empresas",
    seoDescription:
      "Entenda como a automação de processos pode economizar tempo, reduzir erros e melhorar o controle operacional sem tornar a empresa dependente de soluções confusas.",
    publishedAt: new Date("2026-06-05T10:00:00.000Z"),
  },
  {
    id: "post-3",
    title: "Diagnóstico técnico antes do orçamento: o passo que evita projetos caros e mal planejados",
    slug: "diagnostico-tecnico-antes-do-orcamento",
    excerpt:
      "Orçar software sem diagnóstico é como construir sem projeto. Entenda por que essa etapa evita retrabalho, custos inesperados e soluções desalinhadas.",
    coverImage: "/assets/mockups/post-diagnostico.webp",
    category: "Processo",
    tags: ["diagnóstico técnico", "briefing", "orçamento", "desenvolvimento de software", "escopo"],
    seoTitle: "Diagnóstico técnico antes de orçar software",
    seoDescription:
      "Saiba por que o diagnóstico técnico é essencial antes de orçar um sistema, app, automação ou plataforma digital, e como ele reduz riscos no desenvolvimento.",
    publishedAt: new Date("2026-06-10T10:00:00.000Z"),
  },
  {
    id: "post-4",
    title: "Dashboards empresariais: como transformar dados espalhados em decisões rápidas",
    slug: "dashboards-empresariais-como-transformar-dados-em-decisoes-rapidas",
    excerpt:
      "Empresas geram dados todos os dias, mas poucas conseguem usá-los bem. Veja como dashboards ajudam gestores a acompanhar resultados, gargalos e oportunidades.",
    coverImage: "/assets/mockups/dashboard-bi.webp",
    category: "Dashboards",
    tags: ["dashboards", "indicadores", "gestão", "dados", "relatórios", "business intelligence"],
    seoTitle: "Dashboards empresariais para decisões rápidas",
    seoDescription:
      "Entenda como dashboards empresariais centralizam indicadores, melhoram a tomada de decisão e reduzem a dependência de relatórios manuais.",
    publishedAt: new Date("2026-06-08T10:00:00.000Z"),
  },
  {
    id: "post-5",
    title: "IA para pequenas empresas: onde ela realmente ajuda e onde pode virar desperdício",
    slug: "ia-para-pequenas-empresas-onde-ajuda-e-onde-vira-desperdicio",
    excerpt:
      "A IA pode ajudar pequenas empresas a ganhar produtividade, mas nem todo problema precisa de inteligência artificial. Veja onde aplicar com estratégia.",
    coverImage: "/assets/mockups/post-architecture.webp",
    category: "Inteligência Artificial",
    tags: [
      "inteligência artificial",
      "automação com IA",
      "pequenas empresas",
      "produtividade",
      "atendimento",
    ],
    seoTitle: "IA para pequenas empresas: onde usar",
    seoDescription:
      "Entenda como pequenas empresas podem usar inteligência artificial com segurança, evitando modismos e priorizando aplicações que realmente geram resultado.",
    publishedAt: new Date("2026-06-12T10:00:00.000Z"),
  },
  {
    id: "post-6",
    title: "Site profissional não é só aparência: como transformar visitantes em oportunidades reais",
    slug: "site-profissional-nao-e-so-aparencia-como-transformar-visitantes-em-oportunidades",
    excerpt:
      "Um site bonito ajuda, mas não basta. Para gerar oportunidades, ele precisa ter clareza, velocidade, conteúdo convincente e chamadas bem posicionadas.",
    coverImage: "/assets/mockups/site-psicologia-profissional.webp",
    category: "Presença digital",
    tags: ["site profissional", "conversão", "landing page", "presença digital", "desenvolvimento web"],
    seoTitle: "Site profissional que gera oportunidades",
    seoDescription:
      "Entenda por que um site profissional precisa unir design, conteúdo, performance e estratégia de conversão para transformar visitantes em clientes.",
    publishedAt: new Date("2026-06-15T10:00:00.000Z"),
  },
];

function buildPost(definition: PostDefinition): FallbackPostRecord {
  const content = BLOG_ARTICLE_CONTENT[definition.slug];
  if (!content) {
    throw new Error(`Missing article content for slug: ${definition.slug}`);
  }

  return {
    ...definition,
    content,
    author: "Nangell Creative Studio",
    status: PostStatus.PUBLISHED,
    createdAt: definition.publishedAt,
    updatedAt: definition.publishedAt,
  };
}

export const FALLBACK_POSTS: FallbackPostRecord[] = POST_DEFINITIONS.map(buildPost);

export const FALLBACK_POST_SLUGS = FALLBACK_POSTS.map((post) => post.slug);
