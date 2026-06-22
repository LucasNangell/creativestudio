import type { DemoPageContent } from "@/lib/demos/get-demo-content";

/**
 * Conteúdo das páginas de demonstração — sem dependência de @prisma/client
 * (evita bundling do Prisma no client ao carregar demos nativas).
 */
export const DEMO_PAGE_CONTENT: Record<string, DemoPageContent> = {
  "lar-dos-anjos": {
    slug: "lar-dos-anjos",
    title: "Plataforma de Doações para Abrigos",
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
    demoHint:
      "Navegue pelo site institucional, campanhas, animais e fluxos de doação — todos os dados são fictícios.",
  },
  "player-video-marcadores": {
    slug: "player-video-marcadores",
    title: "Player de Vídeo Corporativo com Marcadores",
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
    demoHint:
      "A demonstração abre direto no player com marcadores. Clique em um marcador para ir ao trecho, use “Adicionar marcador” no tempo atual e teste os grupos na barra lateral.",
  },
  "monitor-arquivos": {
    slug: "monitor-arquivos",
    title: "HT Monitor — Automação de Arquivos PDF",
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
  },
  "gestao-producao-grafica": {
    slug: "gestao-producao-grafica",
    title: "Gestão de Produção Gráfica",
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
    demoHint:
      "Use o usuário 1234 e senha 1234, ou clique em “Entrar na demonstração”. Explore OS, PCP, e-mail, dashboards e análise técnica.",
  },
  "sharescreen-lan": {
    slug: "sharescreen-lan",
    title: "ShareScreen LAN",
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
    demoHint:
      "Comece pelo Painel Host: selecione uma fonte, teste pausar/gravar e veja o log ao vivo. Depois abra a Tela Client para simular um participante na rede.",
  },
  "site-psicologia-profissional": {
    slug: "site-psicologia-profissional",
    title: "Site Profissional para Psicóloga",
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
    demoHint:
      "Painel admin: usuário de demonstração / senha demo2026. Teste agendamento, blog e FAQ do site clínico.",
  },
  "vigilia-politica": {
    slug: "vigilia-politica",
    title: "Vigília Política — Inteligência Política",
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
    demoHint:
      "Acesso automático na simulação. Explore War Room, Feed, Central de Alertas, Narrativas, Territórios e Briefing — novos alertas simulados surgem a cada poucos segundos.",
  },
  "encurtou-pro": {
    slug: "encurtou-pro",
    title: "Encurtou.pro — Plataforma de Marketing de Links",
    category: "Marketing Digital / SaaS",
    shortDescription:
      "Encurtador inteligente, QR Codes dinâmicos, Bio Pages, analytics de cliques, campanhas UTM, A/B testing e assinaturas — produto SaaS em produção.",
    fullDescription:
      "O Encurtou.pro centraliza encurtamento, QR dinâmico, bio pages, analytics, campanhas UTM, testes A/B, equipes, afiliados e assinaturas em um painel único. Cada clique é registrado e pode ser correlacionado a conversões no site do cliente via tracker embutido. A infraestrutura edge Cloudflare garante redirecionamento rápido mesmo em campanhas de alto volume.",
    problem:
      "Encurtadores gratuitos expiram links, não medem conversão e impedem QR dinâmico — desperdiçando material impresso e ocultando ROI por canal.",
    solution:
      "SaaS completo com redirecionamento inteligente, QR editável, bio pages, analytics unificado, billing Asaas e edge para escala.",
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
    demoHint:
      "Explore a prévia do painel (Início, links, QR, analytics com dados demo). Para cadastro, login e recursos completos, clique em “Abrir Encurtou.pro”.",
  },
};
