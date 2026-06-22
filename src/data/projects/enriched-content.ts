import type { ArchitectureLayer } from "@/types/projects";

export type ProjectEnrichedContent = {
  badges: string[];
  businessGoals: string[];
  architecture: ArchitectureLayer[];
};

export const PORTFOLIO_BUSINESS_GOALS = [
  "Vender mais",
  "Automatizar processos",
  "Controlar operação",
  "Reduzir custos",
  "Visualizar dados",
  "Criar produto digital",
  "Melhorar atendimento",
  "Captar leads",
] as const;

export const PORTFOLIO_FILTER_CATEGORIES = [
  "Todos",
  "CRM",
  "Business Intelligence",
  "Operações",
  "EdTech",
  "SaaS",
  "Observabilidade",
  "ONG / Terceiro Setor",
  "Mídia Interna",
  "Automação Industrial",
  "Sites Institucionais",
  "Comunicação em Tempo Real",
] as const;

export const portfolioPageContent = {
  seo: {
    title: "Portfólio e Cases | Nangell Creative Studio",
    description:
      "Explore cases de CRM, BI, operações, EdTech, SaaS e monitoramento com demos interativas. Prova técnica e comercial de software sob medida.",
    keywords: [
      "portfólio software",
      "cases B2B",
      "estudos de caso",
      "demos interativas",
      "Nangell Creative Studio",
      "software sob medida",
    ],
  },
  hero: {
    eyebrow: "Portfólio",
    title: "Cases que provam competência antes do primeiro contato",
    description:
      "Não mostramos apenas prints. Cada projeto combina estudo de caso comercial, métricas de resultado e demo interativa para você experimentar como um sistema real funciona.",
    primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
    secondaryCta: { label: "Ver demos em ação", href: "#portfolio-grid" },
  },
  showDontTell: {
    title: "Show, don't tell",
    description:
      "O diferencial da Nangell é colocar o visitante dentro do software. Filtre por stack, objetivo de negócio ou categoria e abra a demo no mesmo domínio — sem cadastro, sem agendar reunião para ver valor.",
    highlights: [
      "Demos nativas no navegador com dados fictícios",
      "Cases com problema, solução e métricas",
      "Stack e arquitetura documentada em cada estudo",
    ],
  },
  cta: {
    title: "Quer um sistema parecido com um desses cases?",
    description:
      "Transformamos desafios operacionais em software que escala. Diagnóstico inicial sem compromisso.",
    primaryCta: { label: "Quero algo parecido", href: "/diagnostico" },
    whatsappCta: { label: "Falar no WhatsApp" },
  },
} as const;

export const PROJECT_ENRICHED_CONTENT: Record<string, ProjectEnrichedContent> = {
  "crm-inteligente": {
    badges: ["Demo interativa", "Kanban", "B2B"],
    businessGoals: ["Vender mais", "Melhorar atendimento"],
    architecture: [
      {
        name: "Frontend",
        description:
          "Next.js com App Router, componentes de funil Kanban e timeline de contatos em tempo real.",
      },
      {
        name: "Backend & API",
        description:
          "API REST com validação de leads, histórico de interações e regras de follow-up automatizadas.",
      },
      {
        name: "Dados",
        description:
          "MySQL com Prisma ORM, modelagem de oportunidades, contatos e estágios do funil.",
      },
      {
        name: "Integrações",
        description:
          "Simulador WhatsApp, webhooks para CRM externo e exportação de relatórios comerciais.",
      },
    ],
  },
  "dashboard-bi": {
    badges: ["Demo interativa", "KPIs", "Executivo"],
    businessGoals: ["Visualizar dados", "Controlar operação"],
    architecture: [
      {
        name: "Camada de visualização",
        description:
          "Dashboard responsivo com gráficos Recharts, filtros temporais e alertas visuais de meta.",
      },
      {
        name: "Agregação de dados",
        description:
          "Pipeline ETL leve consolidando receita, margem e metas de múltiplas fontes operacionais.",
      },
      {
        name: "Backend analítico",
        description:
          "Node.js com cache Redis para consultas frequentes e endpoints de KPIs pré-calculados.",
      },
      {
        name: "Persistência",
        description:
          "PostgreSQL com views materializadas para relatórios executivos e histórico de indicadores.",
      },
    ],
  },
  "gestao-os": {
    badges: ["Demo interativa", "Operações", "Campo"],
    businessGoals: ["Controlar operação", "Automatizar processos"],
    architecture: [
      {
        name: "Interface operacional",
        description:
          "Fila priorizada de ordens de serviço com mudança de status e timeline auditável por OS.",
      },
      {
        name: "Orquestração",
        description:
          "Regras de SLA, priorização automática e notificações para equipes de campo.",
      },
      {
        name: "API & persistência",
        description:
          "Next.js API routes com Prisma e MySQL para histórico completo de cada ordem.",
      },
      {
        name: "Mobile-ready",
        description:
          "Layout responsivo otimizado para técnicos em campo com PWA instalável.",
      },
    ],
  },
  "plataforma-educacional": {
    badges: ["Demo interativa", "EdTech", "LMS"],
    businessGoals: ["Criar produto digital"],
    architecture: [
      {
        name: "Área do aluno",
        description:
          "Dashboard com progresso por módulo, player de vídeo e trilhas de aprendizado gamificadas.",
      },
      {
        name: "Avaliações",
        description:
          "Quiz interativo com feedback imediato e registro de desempenho por tentativa.",
      },
      {
        name: "Backend educacional",
        description:
          "Node.js com gestão de cursos, matrículas e métricas de engajamento.",
      },
      {
        name: "Mídia",
        description:
          "Integração com provedor de vídeo (Mux) e CDN para entrega otimizada de conteúdo.",
      },
    ],
  },
  "link-qr": {
    badges: ["Demo interativa", "SaaS", "Marketing"],
    businessGoals: ["Captar leads", "Criar produto digital"],
    architecture: [
      {
        name: "Encurtador & UTM",
        description:
          "Geração de links rastreáveis com parâmetros UTM padronizados por campanha.",
      },
      {
        name: "QR Code",
        description:
          "Gerador dinâmico de QR codes vinculado a links encurtados com analytics.",
      },
      {
        name: "Analytics",
        description:
          "Contagem de cliques, origem por canal e relatórios de campanha em tempo real.",
      },
      {
        name: "Infra",
        description:
          "Redis para contadores de alta frequência e PostgreSQL para histórico de campanhas.",
      },
    ],
  },
  "monitoramento-tempo-real": {
    badges: ["Demo interativa", "Observabilidade", "Alertas"],
    businessGoals: ["Controlar operação", "Reduzir custos"],
    architecture: [
      {
        name: "Stream de eventos",
        description:
          "Feed simulado de logs com severidade, filtros e controle de pausa da fila.",
      },
      {
        name: "Alertas",
        description:
          "Notificações visuais e sonoras configuráveis por tipo de incidente crítico.",
      },
      {
        name: "Backend de eventos",
        description:
          "WebSockets com Node.js para entrega em tempo real de eventos operacionais.",
      },
      {
        name: "Deploy",
        description:
          "Containerização Docker com Redis para buffer de eventos e escalabilidade horizontal.",
      },
    ],
  },
  "lar-dos-anjos": {
    badges: ["Demo iframe", "ONG", "Doações"],
    businessGoals: ["Captar leads", "Melhorar atendimento"],
    architecture: [
      { name: "Frontend público", description: "Next.js com site institucional, campanhas e área do doador." },
      { name: "Pagamentos", description: "Integração Asaas para Pix, cartão e assinaturas (sistema real)." },
      { name: "Backend", description: "NestJS com Prisma e MySQL para doações, animais e transparência." },
      { name: "Admin", description: "Painel financeiro e gestão de conteúdo (case complementar)." },
    ],
  },
  "player-video-marcadores": {
    badges: ["Demo iframe", "Vídeo", "Corporativo"],
    businessGoals: ["Automatizar processos", "Criar produto digital"],
    architecture: [
      { name: "Biblioteca", description: "Organização por pastas, grupos e marcadores navegáveis." },
      { name: "Player", description: "Video.js com seek por marcador e metadados editáveis." },
      { name: "Backend", description: "FastAPI com SQLite para metadados e biblioteca de mídia." },
      { name: "Deploy", description: "Rede interna com arquivos de vídeo locais." },
    ],
  },
  "monitor-arquivos": {
    badges: ["Demo iframe", "Automação", "PDF"],
    businessGoals: ["Automatizar processos", "Reduzir custos"],
    architecture: [
      { name: "Monitor", description: "Watchdog Python monitorando pastas de entrada." },
      { name: "Painel web", description: "SPA vanilla com dashboard e configuração de regras." },
      { name: "API", description: "FastAPI com sincronização MySQL e histórico de operações." },
      { name: "Desktop", description: "Agente Tkinter/PyInstaller para operação local." },
    ],
  },
  "gestao-producao-grafica": {
    badges: ["Demo iframe", "Gráfica", "PCP"],
    businessGoals: ["Controlar operação", "Automatizar processos"],
    architecture: [
      { name: "Frontend", description: "React + Vite com kanban PCP e dashboards por setor." },
      { name: "Backend", description: "FastAPI integrado a MySQL legado da operação gráfica." },
      { name: "Análise", description: "Pré-análise automática de PDFs e biblioteca de problemas." },
      { name: "Integrações", description: "E-mail, portal do cliente e mockups 3D de papelaria." },
    ],
  },
  "sharescreen-lan": {
    badges: ["Demo nativa", "WebRTC", "LAN"],
    businessGoals: ["Controlar operação", "Reduzir custos"],
    architecture: [
      { name: "SFU", description: "mediasoup encaminhando vídeo sem transcodificação na LAN." },
      { name: "Signaling", description: "WebSocket para negociação WebRTC entre host e clients." },
      { name: "Painel host", description: "Seleção de fonte, pausa, gravação e log de eventos." },
      { name: "Deploy", description: "Node.js local com nginx e certificados TLS internos." },
    ],
  },
  "site-psicologia-profissional": {
    badges: ["Demo nativa", "Saúde", "Agendamento"],
    businessGoals: ["Captar leads", "Melhorar atendimento"],
    architecture: [
      { name: "Site institucional", description: "PHP responsivo com design system acolhedor." },
      { name: "Agendamento", description: "Calendário interativo com validação e anti-spam." },
      { name: "Blog", description: "CRUD de artigos com SEO, Schema.org e sitemap." },
      { name: "Admin", description: "Painel com gestão de agendamentos e publicações." },
    ],
  },
  "vigilia-politica": {
    badges: ["Demo iframe", "GovTech", "Inteligência"],
    businessGoals: ["Controlar operação", "Automatizar processos"],
    architecture: [
      { name: "War Room", description: "Dashboard com KPIs, simulação ao vivo e gráficos estratégicos." },
      { name: "Feed", description: "Consolidação multicanal com filtros por risco e sentimento." },
      { name: "Alertas", description: "Detecção de crises com fluxo de providências e responsáveis." },
      { name: "Demo", description: "SPA React com dados fictícios e autenticação simulada via localStorage." },
    ],
  },
};
