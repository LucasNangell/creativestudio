export type IframeDemoConfig = {
  slug: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  iframeSrc: string;
  minHeight: number;
  minWidth?: number;
  wideViewer?: boolean;
  desktopRecommended?: boolean;
  keywords: string[];
};

export const IFRAME_DEMO_CONFIG: Record<string, IframeDemoConfig> = {
  "lar-dos-anjos": {
    slug: "lar-dos-anjos",
    title: "Lar dos Anjos — Plataforma de Doações",
    subtitle:
      "Site institucional, doações, transparência, campanhas e área do doador — demonstração com dados fictícios.",
    ctaLabel: "Quero uma plataforma parecida",
    iframeSrc: "/demos/lar-dos-anjos/index.html",
    minHeight: 820,
    desktopRecommended: true,
    keywords: ["doações", "ONG", "abrigo de animais", "Pix", "transparência"],
  },
  "player-video-marcadores": {
    slug: "player-video-marcadores",
    title: "Player de Vídeo com Marcadores",
    subtitle:
      "Biblioteca corporativa de vídeos com player avançado, marcadores, grupos e busca — versão demonstrativa.",
    ctaLabel: "Quero um player para minha empresa",
    iframeSrc:
      "/demos/player-video-marcadores/video/index.html?id=demo-vid-001",
    minHeight: 720,
    minWidth: 1280,
    wideViewer: true,
    desktopRecommended: true,
    keywords: ["player de vídeo", "marcadores", "treinamento", "biblioteca"],
  },
  "monitor-arquivos": {
    slug: "monitor-arquivos",
    title: "HT Monitor — Automação de PDFs",
    subtitle:
      "Painel web para monitorar pastas, renomear e mover arquivos PDF em fluxos de pré-impressão simulados.",
    ctaLabel: "Quero automatizar meus arquivos",
    iframeSrc: "/demos/monitor-arquivos/index.html",
    minHeight: 760,
    keywords: ["automação", "PDF", "pré-impressão", "monitoramento"],
  },
  "gestao-producao-grafica": {
    slug: "gestao-producao-grafica",
    title: "Gestão de Produção Gráfica",
    subtitle:
      "Ordens de serviço, kanban PCP, dashboards e análise técnica — demonstração operacional simulada.",
    ctaLabel: "Quero organizar minha produção",
    iframeSrc: "/demos/gestao-producao-grafica/index.html",
    minHeight: 920,
    minWidth: 1520,
    wideViewer: true,
    desktopRecommended: true,
    keywords: ["gráfica", "ordens de serviço", "PCP", "produção"],
  },
  "vigilia-politica": {
    slug: "vigilia-politica",
    title: "Vigília Política — Inteligência Política",
    subtitle:
      "War Room com alertas, feed multicanal e briefings estratégicos — demonstração com dados fictícios.",
    ctaLabel: "Quero uma central de inteligência",
    iframeSrc: "/demos/vigilia-politica/index.html",
    minHeight: 720,
    minWidth: 1280,
    desktopRecommended: true,
    keywords: ["inteligência política", "monitoramento", "alertas", "GovTech"],
  },
};

export const IFRAME_DEMO_SLUGS = Object.keys(IFRAME_DEMO_CONFIG);
