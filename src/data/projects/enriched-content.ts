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
  "Marketing Digital / SaaS",
] as const;

export const portfolioPageContent = {
  seo: {
    title: "Portfólio e Cases | Nangell Creative Studio",
    description:
      "Sistemas reais desenvolvidos pela Nangell: doações, produção gráfica, vídeo corporativo, automação PDF, sharescreen LAN, site clínico, inteligência política e marketing de links — com demonstrações interativas.",
    keywords: [
      "portfólio software",
      "cases reais",
      "demonstrações interativas",
      "Nangell Creative Studio",
      "software sob medida",
    ],
  },
  hero: {
    eyebrow: "Portfólio",
    title: "Cases que provam competência antes do primeiro contato",
    description:
      "Não mostramos apenas prints. Cada projeto combina estudo de caso comercial, métricas de resultado e demonstração interativa para você experimentar como um sistema real funciona.",
    primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
    secondaryCta: { label: "Ver demonstrações em ação", href: "#portfolio-grid" },
  },
  showDontTell: {
    title: "Mostre, não conte",
    description:
      "O diferencial da Nangell é colocar o visitante dentro do software. Explore os cases e abra a demonstração no mesmo domínio — sem cadastro, sem agendar reunião para ver valor.",
    highlights: [
      "Demonstrações nativas no navegador com dados fictícios",
      "Cases com problema, solução e métricas",
      "Stack e arquitetura documentada em cada estudo",
    ],
  },
  filters: {
    title: "Explorar cases",
    description:
      "Oito projetos reais do portfólio — doações, vídeo corporativo, automação PDF, produção gráfica, sharescreen LAN, site clínico, inteligência política e Encurtou.pro. Abra cada case e teste a demonstração.",
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
    badges: ["Demonstração iframe", "ONG", "Doações"],
    businessGoals: ["Captar leads", "Melhorar atendimento"],
    architecture: [
      { name: "Frontend público", description: "Next.js com site institucional, campanhas e área do doador." },
      { name: "Pagamentos", description: "Integração Asaas para Pix, cartão e assinaturas (sistema real)." },
      { name: "Backend", description: "NestJS com Prisma e MySQL para doações, animais e transparência." },
      { name: "Admin", description: "Painel financeiro e gestão de conteúdo (case complementar)." },
    ],
  },
  "player-video-marcadores": {
    badges: ["Demonstração iframe", "Vídeo", "Corporativo"],
    businessGoals: ["Automatizar processos", "Criar produto digital"],
    architecture: [
      { name: "Biblioteca", description: "Organização por pastas, grupos e marcadores navegáveis." },
      { name: "Player", description: "Video.js com seek por marcador e metadados editáveis." },
      { name: "Backend", description: "FastAPI com SQLite para metadados e biblioteca de mídia." },
      { name: "Deploy", description: "Rede interna com arquivos de vídeo locais." },
    ],
  },
  "monitor-arquivos": {
    badges: ["Demonstração iframe", "Automação", "PDF"],
    businessGoals: ["Automatizar processos", "Reduzir custos"],
    architecture: [
      { name: "Monitor", description: "Watchdog Python monitorando pastas de entrada." },
      { name: "Painel web", description: "SPA vanilla com dashboard e configuração de regras." },
      { name: "API", description: "FastAPI com sincronização MySQL e histórico de operações." },
      { name: "Desktop", description: "Agente Tkinter/PyInstaller para operação local." },
    ],
  },
  "gestao-producao-grafica": {
    badges: ["Demonstração iframe", "Gráfica", "PCP"],
    businessGoals: ["Controlar operação", "Automatizar processos"],
    architecture: [
      { name: "Frontend", description: "React + Vite com kanban PCP e dashboards por setor." },
      { name: "Backend", description: "FastAPI integrado a MySQL legado da operação gráfica." },
      { name: "Análise", description: "Pré-análise automática de PDFs e biblioteca de problemas." },
      { name: "Integrações", description: "E-mail, portal do cliente e mockups 3D de papelaria." },
    ],
  },
  "sharescreen-lan": {
    badges: ["Demonstração nativa", "WebRTC", "LAN"],
    businessGoals: ["Controlar operação", "Reduzir custos"],
    architecture: [
      { name: "SFU", description: "mediasoup encaminhando vídeo sem transcodificação na LAN." },
      { name: "Signaling", description: "WebSocket para negociação WebRTC entre host e clients." },
      { name: "Painel host", description: "Seleção de fonte, pausa, gravação e log de eventos." },
      { name: "Deploy", description: "Node.js local com nginx e certificados TLS internos." },
    ],
  },
  "site-psicologia-profissional": {
    badges: ["Demonstração nativa", "Saúde", "Agendamento"],
    businessGoals: ["Captar leads", "Melhorar atendimento"],
    architecture: [
      { name: "Site institucional", description: "PHP responsivo com design system acolhedor." },
      { name: "Agendamento", description: "Calendário interativo com validação e anti-spam." },
      { name: "Blog", description: "CRUD de artigos com SEO, Schema.org e sitemap." },
      { name: "Admin", description: "Painel com gestão de agendamentos e publicações." },
    ],
  },
  "vigilia-politica": {
    badges: ["Demonstração iframe", "GovTech", "Inteligência"],
    businessGoals: ["Controlar operação", "Automatizar processos"],
    architecture: [
      { name: "War Room", description: "Dashboard com KPIs, simulação ao vivo e gráficos estratégicos." },
      { name: "Feed", description: "Consolidação multicanal com filtros por risco e sentimento." },
      { name: "Alertas", description: "Detecção de crises com fluxo de providências e responsáveis." },
      { name: "Demonstração", description: "SPA React com dados fictícios e autenticação simulada via localStorage." },
    ],
  },
  "encurtou-pro": {
    badges: ["Demonstração externa", "SaaS", "Marketing de links"],
    businessGoals: ["Captar leads", "Controlar operação", "Criar produto digital"],
    architecture: [
      {
        name: "Dashboard SPA",
        description:
          "Interface única em HTML/JS com módulos de links, QR, analytics, campanhas, bio pages, equipe, conta e admin.",
      },
      {
        name: "API PHP + MySQL",
        description:
          "Backend monolítico com auth, CRUD de links/QRs/bios, analytics, billing, afiliados e permissões por plano.",
      },
      {
        name: "Redirecionamento",
        description:
          "redirect.php resolve slugs, aplica regras A/B, vigência, deep link e registra cliques com identificador de atribuição.",
      },
      {
        name: "Edge Cloudflare",
        description:
          "Workers para resolve/click/invalidate com cache e fila assíncrona — latência baixa em picos de campanha.",
      },
      {
        name: "Monetização",
        description:
          "Checkout Asaas, webhooks, entitlements por plano, Founder Edition e programa de afiliados com comissionamento.",
      },
      {
        name: "Conversão",
        description:
          "tracker.js no site do cliente + track.php correlacionam eventos pós-clique ao link de origem.",
      },
    ],
  },
};
