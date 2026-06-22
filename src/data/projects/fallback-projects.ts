import { DemoType } from "@prisma/client";

export const PROJECT_SLUGS = [
  "crm-inteligente",
  "dashboard-bi",
  "gestao-os",
  "plataforma-educacional",
  "link-qr",
  "monitoramento-tempo-real",
] as const;

type FallbackProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  coverImage: string;
  gallery: string[];
  metrics: Array<{ label: string; value: string; description?: string }>;
  demoType: DemoType;
  demoRoute: string | null;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export const FALLBACK_PROJECTS: FallbackProjectRecord[] = [
  {
    id: "fallback-crm-inteligente",
    title: "CRM Inteligente Comercial",
    slug: "crm-inteligente",
    category: "CRM",
    shortDescription:
      "Funil comercial com Kanban, automações e acompanhamento de oportunidades em tempo real.",
    fullDescription:
      "Plataforma comercial completa para equipes de vendas B2B, com funil visual, histórico de interações e indicadores de conversão.",
    problem:
      "A equipe comercial perdia leads por falta de visibilidade do funil e follow-ups inconsistentes.",
    solution:
      "Implementamos um CRM com Kanban drag-and-drop, timeline de contatos e alertas de follow-up automatizados.",
    features: [
      "Funil Kanban",
      "Timeline de contatos",
      "Simulador WhatsApp",
      "Dashboard comercial",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind CSS"],
    coverImage: "/assets/mockups/crm-inteligente.webp",
    gallery: ["/assets/mockups/crm-inteligente.webp"],
    metrics: [
      { label: "Conversão", value: "+38%", description: "Após padronização do funil" },
      { label: "Tempo de resposta", value: "-52%", description: "Com alertas automáticos" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/crm-inteligente",
    isFeatured: true,
    sortOrder: 1,
    seoTitle: "Case CRM Inteligente | Nangell Creative Studio",
    seoDescription: "Estudo de caso de CRM com funil Kanban e automações comerciais.",
  },
  {
    id: "fallback-dashboard-bi",
    title: "Dashboard BI Financeiro",
    slug: "dashboard-bi",
    category: "Business Intelligence",
    shortDescription:
      "Painel executivo com KPIs financeiros, filtros temporais e alertas inteligentes.",
    fullDescription:
      "Dashboard gerencial integrado a múltiplas fontes de dados para acompanhamento de receita, margem e metas.",
    problem:
      "Relatórios financeiros demoravam dias para consolidar e não refletiam a operação em tempo real.",
    solution:
      "Centralizamos indicadores em um painel responsivo com filtros dinâmicos e alertas configuráveis.",
    features: [
      "Gráficos interativos",
      "Filtros temporais",
      "Alertas de meta",
      "Exportação executiva",
    ],
    stack: ["Next.js", "Recharts", "Node.js", "PostgreSQL", "Redis"],
    coverImage: "/assets/mockups/dashboard-bi.webp",
    gallery: ["/assets/mockups/dashboard-bi.webp"],
    metrics: [
      { label: "Tempo de reporte", value: "-70%", description: "Consolidação automatizada" },
      { label: "Visibilidade", value: "100%", description: "KPIs críticos monitorados" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/dashboard-bi",
    isFeatured: true,
    sortOrder: 2,
    seoTitle: "Case Dashboard BI | Nangell Creative Studio",
    seoDescription: "Painel BI financeiro com KPIs e alertas em tempo real.",
  },
  {
    id: "fallback-gestao-os",
    title: "Gestão de Ordens de Serviço",
    slug: "gestao-os",
    category: "Operações",
    shortDescription:
      "Controle de fila, status e timeline de ordens de serviço para times de campo.",
    fullDescription:
      "Sistema operacional para registrar, priorizar e acompanhar ordens de serviço com histórico completo.",
    problem:
      "Ordens de serviço eram controladas por WhatsApp e planilhas, gerando atrasos e retrabalho.",
    solution:
      "Criamos fluxo digital com fila priorizada, mudança de status e timeline auditável por OS.",
    features: ["Fila de OS", "Timeline de andamento", "Priorização", "Painel operacional"],
    stack: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
    coverImage: "/assets/mockups/gestao-os.webp",
    gallery: ["/assets/mockups/gestao-os.webp"],
    metrics: [
      { label: "SLA cumprido", value: "+44%", description: "Com fila priorizada" },
      { label: "Retrabalho", value: "-31%", description: "Histórico centralizado" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/gestao-os",
    isFeatured: true,
    sortOrder: 3,
    seoTitle: "Case Gestão de OS | Nangell Creative Studio",
    seoDescription: "Sistema de ordens de serviço com fila e timeline operacional.",
  },
  {
    id: "fallback-plataforma-educacional",
    title: "Plataforma Educacional LMS",
    slug: "plataforma-educacional",
    category: "EdTech",
    shortDescription:
      "Ambiente do aluno com módulos, player de vídeo, progresso e quizzes interativos.",
    fullDescription:
      "LMS completo para cursos online com trilhas de aprendizado, avaliações e acompanhamento de progresso.",
    problem:
      "Conteúdos educacionais estavam dispersos sem trilha clara nem mensuração de engajamento.",
    solution:
      "Entregamos área do aluno com progresso dinâmico, quizzes e dashboard de performance.",
    features: [
      "Dashboard do aluno",
      "Player de vídeo",
      "Quiz interativo",
      "Progresso por módulo",
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Mux"],
    coverImage: "/assets/mockups/plataforma-educacional.webp",
    gallery: ["/assets/mockups/plataforma-educacional.webp"],
    metrics: [
      { label: "Conclusão de módulos", value: "+29%", description: "Com trilhas gamificadas" },
      { label: "Engajamento", value: "+41%", description: "Quizzes e feedback imediato" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/plataforma-educacional",
    isFeatured: true,
    sortOrder: 4,
    seoTitle: "Case Plataforma Educacional | Nangell Creative Studio",
    seoDescription: "LMS com área do aluno, quizzes e progresso dinâmico.",
  },
  {
    id: "fallback-link-qr",
    title: "Encurtador de Links e QR Code",
    slug: "link-qr",
    category: "SaaS",
    shortDescription:
      "Ferramenta de links encurtados, UTMs e geração de QR codes para campanhas.",
    fullDescription:
      "Micro-SaaS para marketing e operações com rastreamento de cliques, UTMs e QR codes dinâmicos.",
    problem:
      "Campanhas usavam links longos sem rastreabilidade consistente entre canais offline e online.",
    solution:
      "Desenvolvemos plataforma de encurtamento com UTMs, QR codes e analytics por campanha.",
    features: [
      "Encurtador de URL",
      "UTM builder",
      "QR Code generator",
      "Analytics de cliques",
    ],
    stack: ["Next.js", "Node.js", "Redis", "PostgreSQL"],
    coverImage: "/assets/mockups/link-qr.webp",
    gallery: ["/assets/mockups/link-qr.webp"],
    metrics: [
      { label: "Rastreabilidade", value: "100%", description: "Campanhas com UTM padronizada" },
      { label: "Setup de campanha", value: "-60%", description: "Fluxo simplificado" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/link-qr",
    isFeatured: true,
    sortOrder: 5,
    seoTitle: "Case Encurtador e QR Code | Nangell Creative Studio",
    seoDescription: "SaaS de links encurtados, UTMs e QR codes para campanhas.",
  },
  {
    id: "fallback-monitoramento-tempo-real",
    title: "Monitoramento em Tempo Real",
    slug: "monitoramento-tempo-real",
    category: "Observabilidade",
    shortDescription:
      "Feed crítico de logs e eventos com alertas visuais e sonoros configuráveis.",
    fullDescription:
      "Console de monitoramento para acompanhar eventos críticos, filas e incidentes operacionais.",
    problem:
      "Incidentes eram detectados tarde por falta de centralização de eventos críticos.",
    solution:
      "Implementamos stream simulado de logs com alertas, pausa de fila e severidade por evento.",
    features: [
      "Stream de eventos",
      "Alertas visuais/sonoros",
      "Filtros por severidade",
      "Pausar fila",
    ],
    stack: ["Next.js", "WebSockets", "Node.js", "Redis", "Docker"],
    coverImage: "/assets/mockups/monitoramento-tempo-real.webp",
    gallery: ["/assets/mockups/monitoramento-tempo-real.webp"],
    metrics: [
      { label: "Detecção de incidentes", value: "-48%", description: "Alertas em tempo real" },
      { label: "Tempo de resposta", value: "-35%", description: "Centralização de eventos" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/monitoramento-tempo-real",
    isFeatured: true,
    sortOrder: 6,
    seoTitle: "Case Monitoramento em Tempo Real | Nangell Creative Studio",
    seoDescription: "Console de monitoramento com feed de logs e alertas críticos.",
  },
];
