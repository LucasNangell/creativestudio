import type { ArchitectureLayer } from "@/types/projects";

export type ProjectEnrichedContent = {
  badges: string[];
  businessGoals: string[];
  architecture: ArchitectureLayer[];
};

export const PORTFOLIO_BUSINESS_GOALS = [
  "Automatizar processos",
  "Captar leads",
  "Controlar operação",
  "Criar produto digital",
  "Melhorar atendimento",
  "Reduzir custos",
] as const;

export const PORTFOLIO_FILTER_CATEGORIES = [
  "Todos",
  "ONG / Terceiro Setor",
  "Mídia Interna",
  "Automação Industrial",
  "Operações",
  "Comunicação em Tempo Real",
  "Sites Institucionais",
  "Inteligência Política / GovTech",
] as const;

export const portfolioPageContent = {
  seo: {
    title: "Portfólio e Cases | Nangell Creative Studio",
    description:
      "Sistemas reais desenvolvidos pela Nangell: doações, produção gráfica, vídeo corporativo, automação PDF, sharescreen LAN, site clínico e inteligência política — com demos interativas.",
    keywords: [
      "portfólio software",
      "cases reais",
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
    title: "Mostre, não conte",
    description:
      "O diferencial da Nangell é colocar o visitante dentro do software. Filtre por stack, objetivo de negócio ou categoria e abra a demo no mesmo domínio — sem cadastro, sem agendar reunião para ver valor.",
    highlights: [
      "Demos nativas no navegador com dados fictícios",
      "Cases com problema, solução e métricas",
      "Stack e arquitetura documentada em cada estudo",
    ],
  },
  filters: {
    title: "Filtrar e explorar cases",
    description:
      "Sete projetos reais do portfólio — doações, vídeo corporativo, automação PDF, produção gráfica, sharescreen LAN, site clínico e inteligência política. Combine filtros por categoria, stack ou objetivo de negócio.",
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
