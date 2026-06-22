export type ExternalDemoConfig = {
  slug: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  /** Produto em produção — abre em nova aba (iframe bloqueado pelo servidor). */
  externalUrl: string;
  /** Prévia estática hospedada no portfólio (opcional). */
  previewIframeSrc?: string;
  previewMinHeight?: number;
  desktopRecommended?: boolean;
  keywords: string[];
};

export const EXTERNAL_DEMO_CONFIG: Record<string, ExternalDemoConfig> = {
  "encurtou-pro": {
    slug: "encurtou-pro",
    title: "Encurtou.pro — Marketing de Links",
    subtitle:
      "Encurtador inteligente, QR Codes dinâmicos, Bio Pages, analytics de cliques e campanhas UTM — produto em produção.",
    ctaLabel: "Quero uma plataforma de links parecida",
    externalUrl: "https://encurtou.pro",
    previewIframeSrc: "/demos/encurtou-pro/index.html",
    previewMinHeight: 820,
    desktopRecommended: true,
    keywords: [
      "encurtador de links",
      "QR Code dinâmico",
      "bio page",
      "UTM",
      "analytics",
      "marketing digital",
    ],
  },
};

export const EXTERNAL_DEMO_SLUGS = Object.keys(EXTERNAL_DEMO_CONFIG);
