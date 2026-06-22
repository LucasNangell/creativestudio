import { DemoType } from "@prisma/client";

/** Cases integrados a partir de portfolio-imports/ — mesclados em FALLBACK_PROJECTS. */
export const IMPORTED_PORTFOLIO_PROJECTS = [
  {
    id: "fallback-lar-dos-anjos",
    title: "Plataforma de Doações para Abrigos",
    slug: "lar-dos-anjos",
    category: "ONG / Terceiro Setor",
    shortDescription:
      "Doações Pix e recorrentes, transparência, campanhas, adoção de animais e área do doador com carteirinha digital.",
    fullDescription:
      "Plataforma completa para abrigos e ONGs: site institucional, arrecadação, portal de transparência, campanhas, mural de apoiadores e área exclusiva do doador — com painel administrativo no sistema completo.",
    problem:
      "Abrigos perdiam doadores por falta de transparência, processos manuais de Pix e assinaturas, e informações dispersas sobre animais e campanhas.",
    solution:
      "Centralizamos arrecadação, comunicação e gestão em uma experiência moderna com fluxos de doação, transparência pública e engajamento recorrente do doador.",
    features: [
      "Doação Pix e assinaturas mensais",
      "Portal de transparência",
      "Campanhas com meta",
      "Galeria de animais",
      "Área do doador e carteirinha",
    ],
    stack: ["Next.js", "NestJS", "Prisma", "MySQL", "Redis", "Tailwind CSS"],
    coverImage: "/assets/mockups/lar-dos-anjos.webp",
    gallery: ["/assets/mockups/lar-dos-anjos.webp"],
    metrics: [
      { label: "Doadores recorrentes", value: "+45%", description: "Com planos mensais visíveis" },
      { label: "Confiança pública", value: "Alta", description: "Transparência em tempo real" },
    ],
    demoType: DemoType.IFRAME,
    demoRoute: "/demo/lar-dos-anjos",
    isFeatured: true,
    sortOrder: 7,
    seoTitle: "Case Plataforma de Doações | Nangell Creative Studio",
    seoDescription:
      "Plataforma para abrigos com doações, transparência e área do doador — demonstração interativa com dados fictícios.",
  },
  {
    id: "fallback-player-video-marcadores",
    title: "Player de Vídeo Corporativo com Marcadores",
    slug: "player-video-marcadores",
    category: "Mídia Interna",
    shortDescription:
      "Biblioteca de vídeos corporativos com player avançado, marcadores, grupos, pastas e busca inteligente.",
    fullDescription:
      "Sistema para treinamentos e comunicação interna com biblioteca organizada por pastas, marcadores navegáveis no player, grupos drag-and-drop e busca em vídeos e marcadores.",
    problem:
      "Vídeos de treinamento ficavam espalhados em pastas de rede sem busca, marcadores ou organização por tema.",
    solution:
      "Entregamos biblioteca centralizada com player Video.js, marcadores com seek, grupos reordenáveis e tema claro/escuro.",
    features: [
      "Biblioteca por pastas",
      "Marcadores com seek",
      "Grupos drag-and-drop",
      "Busca avançada",
      "Tema claro e escuro",
    ],
    stack: ["Next.js", "React", "TypeScript", "Video.js", "Tailwind CSS"],
    coverImage: "/assets/mockups/player-video-marcadores.webp",
    gallery: ["/assets/mockups/player-video-marcadores.webp"],
    metrics: [
      { label: "Tempo para achar conteúdo", value: "-60%", description: "Busca e marcadores" },
      { label: "Onboarding", value: "+35%", description: "Treinamentos organizados" },
    ],
    demoType: DemoType.IFRAME,
    demoRoute: "/demo/player-video-marcadores",
    isFeatured: true,
    sortOrder: 8,
    seoTitle: "Case Player de Vídeo com Marcadores | Nangell Creative Studio",
    seoDescription:
      "Biblioteca corporativa de vídeos com marcadores e busca — demonstração interativa.",
  },
  {
    id: "fallback-monitor-arquivos",
    title: "HT Monitor — Automação de Arquivos PDF",
    slug: "monitor-arquivos",
    category: "Automação Industrial",
    shortDescription:
      "Automatize renomeação e movimentação de PDFs com painel web em tempo real para pré-impressão.",
    fullDescription:
      "Sistema de monitoramento de pastas com renomeação automática, regras de movimentação origem→destino, histórico de operações e log centralizado de erros.",
    problem:
      "Operadores renomeavam e moviam PDFs manualmente entre servidores, gerando retrabalho, erros e falta de rastreabilidade.",
    solution:
      "Painel web unificado com monitoramento de pastas, padrões de renomeação configuráveis e movimentações automatizadas com histórico.",
    features: [
      "Dashboard em tempo real",
      "Renomeação por padrões",
      "Movimentação automatizada",
      "Histórico de operações",
      "Log de erros",
    ],
    stack: ["JavaScript", "Python", "FastAPI", "MySQL", "Watchdog"],
    coverImage: "/assets/mockups/monitor-arquivos.webp",
    gallery: ["/assets/mockups/monitor-arquivos.webp"],
    metrics: [
      { label: "Retrabalho manual", value: "-70%", description: "Fluxos automatizados" },
      { label: "Rastreabilidade", value: "100%", description: "Histórico completo" },
    ],
    demoType: DemoType.IFRAME,
    demoRoute: "/demo/monitor-arquivos",
    isFeatured: false,
    sortOrder: 9,
    seoTitle: "Case HT Monitor — Automação PDF | Nangell Creative Studio",
    seoDescription:
      "Automação de renomeação e movimentação de PDFs com painel web simulado.",
  },
  {
    id: "fallback-gestao-producao-grafica",
    title: "Gestão de Produção Gráfica",
    slug: "gestao-producao-grafica",
    category: "Operações",
    shortDescription:
      "Ordens de serviço, kanban PCP, dashboards por setor e análise técnica de arquivos para gráficas.",
    fullDescription:
      "Plataforma completa para indústria gráfica: busca avançada de OS, fila PCP com drag-and-drop, dashboards em tela cheia, análise de PDFs e módulo de papelaria com mockups 3D.",
    problem:
      "Produção gráfica dependia de planilhas e sistemas legados sem visibilidade unificada da fila e gargalos por setor.",
    solution:
      "Sistema web integrado com kanban PCP, dashboards operacionais, análise técnica de arquivos e portal do cliente.",
    features: [
      "Busca avançada de OS",
      "Kanban PCP",
      "Dashboards por setor",
      "Análise de PDF",
      "Mockups 3D papelaria",
    ],
    stack: ["React", "Vite", "FastAPI", "Python", "MySQL", "Chart.js"],
    coverImage: "/assets/mockups/gestao-producao-grafica.webp",
    gallery: ["/assets/mockups/gestao-producao-grafica.webp"],
    metrics: [
      { label: "Visibilidade da fila", value: "100%", description: "PCP em tempo real" },
      { label: "SLA de produção", value: "+28%", description: "Priorização visual" },
    ],
    demoType: DemoType.IFRAME,
    demoRoute: "/demo/gestao-producao-grafica",
    isFeatured: true,
    sortOrder: 10,
    seoTitle: "Case Gestão de Produção Gráfica | Nangell Creative Studio",
    seoDescription:
      "Sistema para gráficas com OS, PCP e dashboards — demonstração interativa simulada.",
  },
  {
    id: "fallback-sharescreen-lan",
    title: "ShareScreen LAN",
    slug: "sharescreen-lan",
    category: "Comunicação em Tempo Real",
    shortDescription:
      "Compartilhamento de tela em rede local para até 10 computadores, sem nuvem, com baixa latência.",
    fullDescription:
      "Infraestrutura WebRTC com mediasoup SFU para transmitir a tela de um computador para vários clients na mesma LAN, com painel host centralizado e controles de pausa/gravação.",
    problem:
      "Salas de reunião e treinamentos precisavam exibir telas de múltiplos PCs sem depender de internet ou ferramentas em nuvem caras.",
    solution:
      "Servidor local com painel host, seleção de fonte em um clique e distribuição de vídeo Full HD na rede interna.",
    features: [
      "Painel host centralizado",
      "Até 10 clients LAN",
      "WebRTC SFU",
      "Pausa e gravação",
      "Log de eventos",
    ],
    stack: ["Node.js", "Express", "mediasoup", "WebRTC", "WebSocket"],
    coverImage: "/assets/mockups/sharescreen-lan.webp",
    gallery: ["/assets/mockups/sharescreen-lan.webp"],
    metrics: [
      { label: "Latência na LAN", value: "<100ms", description: "Sem transcodificação" },
      { label: "Dependência de nuvem", value: "Zero", description: "100% local" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/sharescreen-lan",
    isFeatured: false,
    sortOrder: 11,
    seoTitle: "Case ShareScreen LAN | Nangell Creative Studio",
    seoDescription:
      "Compartilhamento de tela em rede local com WebRTC — simulação da interface.",
  },
  {
    id: "fallback-site-psicologia-profissional",
    title: "Site Profissional para Psicóloga",
    slug: "site-psicologia-profissional",
    category: "Sites Institucionais",
    shortDescription:
      "Site com agendamento online, blog, SEO e painel admin para profissionais de saúde mental.",
    fullDescription:
      "Presença digital completa para psicólogas: site institucional acolhedor, calendário de agendamento, blog com SEO, painel administrativo e conformidade LGPD.",
    problem:
      "Profissionais de saúde mental dependiam de WhatsApp e planilhas para agendamentos, sem site profissional ou blog integrado.",
    solution:
      "Site responsivo com agendamento visual, gestão de status, CRUD de artigos e design system alinhado à área clínica.",
    features: [
      "Agendamento online",
      "Blog com SEO",
      "Painel administrativo",
      "FAQ acessível",
      "Conformidade LGPD",
    ],
    stack: ["PHP", "HTML5", "CSS3", "JavaScript", "Apache"],
    coverImage: "/assets/mockups/site-psicologia-profissional.webp",
    gallery: ["/assets/mockups/site-psicologia-profissional.webp"],
    metrics: [
      { label: "Agendamentos online", value: "+50%", description: "Canal dedicado 24/7" },
      { label: "Imagem profissional", value: "Alta", description: "Site e conteúdo integrados" },
    ],
    demoType: DemoType.NATIVE,
    demoRoute: "/demo/site-psicologia-profissional",
    isFeatured: false,
    sortOrder: 12,
    seoTitle: "Case Site para Psicóloga | Nangell Creative Studio",
    seoDescription:
      "Site profissional com agendamento e blog — demonstração interativa com dados fictícios.",
  },
  {
    id: "fallback-vigilia-politica",
    title: "Vigília Política — Inteligência Política",
    slug: "vigilia-politica",
    category: "Inteligência Política / GovTech",
    shortDescription:
      "Central de inteligência com alertas, feed multicanal, narrativas e briefings estratégicos em tempo real simulado.",
    fullDescription:
      "War Room digital para mandatos e assessorias políticas: KPIs, feed de notícias fictícias, alertas críticos, providências, monitoramento de adversários e briefings executivos prontos para compartilhar.",
    problem:
      "Equipes políticas recebiam informação fragmentada de dezenas de fontes, com atraso na resposta e decisões tomadas sem contexto unificado.",
    solution:
      "Centralizamos monitoramento, alertas e briefings em um painel único com simulação ao vivo e filtros por risco, canal e sentimento.",
    features: [
      "War Room com KPIs ao vivo",
      "Feed multicanal filtrável",
      "Alertas críticos e providências",
      "Briefing executivo automatizado",
      "Monitoramento de narrativas",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Recharts"],
    coverImage: "/assets/mockups/vigilia-politica.webp",
    gallery: ["/assets/mockups/vigilia-politica.webp"],
    metrics: [
      { label: "Tempo de resposta", value: "-60%", description: "Alertas centralizados" },
      { label: "Visibilidade", value: "360°", description: "Feed e narrativas unificados" },
    ],
    demoType: DemoType.IFRAME,
    demoRoute: "/demo/vigilia-politica",
    isFeatured: true,
    sortOrder: 13,
    seoTitle: "Case Vigília Política | Nangell Creative Studio",
    seoDescription:
      "Central de inteligência política com War Room e alertas — demonstração interativa com dados fictícios.",
  },
  {
    id: "fallback-encurtou-pro",
    title: "Encurtou.pro — Plataforma de Marketing de Links",
    slug: "encurtou-pro",
    category: "Marketing Digital / SaaS",
    shortDescription:
      "Encurtador inteligente, QR Codes dinâmicos, Bio Pages, analytics de cliques, campanhas UTM, A/B testing e assinaturas — produto SaaS em produção.",
    fullDescription:
      "O Encurtou.pro é uma plataforma completa de marketing de links desenvolvida para campanhas, mandatos e equipes de marketing que precisam medir o que acontece depois do clique. Em um único painel, o usuário cria links curtos personalizados, gera QR Codes dinâmicos com logo e cores da marca, monta Bio Pages (microsites de link na bio), organiza ativos em pastas e tags, e acompanha analytics detalhados — origem, dispositivo, localização, horário e funil de conversão. O sistema suporta campanhas com parâmetros UTM, testes A/B de destino com pesos configuráveis, regras de vigência de links, deep linking mobile, preview social para compartilhamento e pixels de retargeting. A camada de redirecionamento registra cada clique, anexa identificador para atribuição de conversão e pode operar via edge Cloudflare para baixa latência em alto volume. Há módulo de equipes, programa de afiliados, checkout de assinatura integrado ao Asaas com webhooks, entitlements por plano (freemium a avançado) e painel administrativo. Publicado em produção em encurtou.pro.",
    problem:
      "Times de marketing e gabinetes dependiam de encurtadores gratuitos que expiram links, não rastreiam conversões, não permitem QR dinâmico nem bio pages integradas — gerando perda de verba em material impresso, analytics fragmentados e zero visibilidade do ROI por canal.",
    solution:
      "Construímos um SaaS all-in-one com dashboard unificado, redirecionamento inteligente, QR editável sem reimpressão, tracker de conversão no site do cliente, billing automatizado e infraestrutura edge para escala — transformando links e QR Codes em sensores mensuráveis de campanha.",
    features: [
      "Encurtamento com slug e subdomínio customizados",
      "QR Codes dinâmicos com personalização visual",
      "Bio Pages com templates e formulários de captura",
      "Analytics: origem, dispositivo, geo e funil",
      "Campanhas UTM e testes A/B de destino",
      "Tracker de conversão pós-clique",
      "Assinaturas Asaas e programa de afiliados",
      "Edge Cloudflare para resolve e cliques",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Cloudflare Workers", "Asaas", "Chart.js"],
    coverImage: "/assets/mockups/encurtou-pro.webp",
    gallery: ["/assets/mockups/encurtou-pro.webp"],
    metrics: [
      { label: "Módulos integrados", value: "10+", description: "Links, QR, bio, analytics, billing" },
      { label: "Medição", value: "Clique → conversão", description: "Atribuição ponta a ponta" },
    ],
    demoType: DemoType.EXTERNAL,
    demoRoute: "/demo/encurtou-pro",
    isFeatured: true,
    sortOrder: 14,
    seoTitle: "Case Encurtou.pro — Marketing de Links | Nangell Creative Studio",
    seoDescription:
      "Plataforma SaaS de encurtamento, QR dinâmico, bio pages e analytics — demonstração no ambiente de produção.",
  },
] as const;

export const IMPORTED_PROJECT_SLUGS = IMPORTED_PORTFOLIO_PROJECTS.map((p) => p.slug);
