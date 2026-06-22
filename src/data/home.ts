import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Code2,
  FileText,
  Globe,
  Layers,
  LineChart,
  Monitor,
  Palette,
  Rocket,
  Smartphone,
  Sparkles,
} from "lucide-react";

export const homeHero = {
  headline: "Sistemas sob medida que transformam operação em crescimento.",
  subheadline:
    "Desenvolvemos softwares web, desktop e mobile, automações, dashboards, SaaS e sites profissionais com design premium, performance e estratégia de negócio.",
  primaryCta: { label: "Ver sistemas em ação", href: "#demos" },
  secondaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  whatsappCta: { label: "Falar no WhatsApp" },
} as const;

export const homeTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "FastAPI",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "APIs",
  "IA",
  "Dashboards",
  "SaaS",
  "CRM",
  "Automação",
  "Mobile",
  "Desktop",
] as const;

export type HomeService = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  cta: { label: string; href: string };
};

export const homeServices: HomeService[] = [
  {
    id: "web-saas",
    icon: Globe,
    title: "Sistemas Web e SaaS",
    description:
      "Plataformas web, portais corporativos e produtos SaaS com arquitetura escalável e painel administrativo completo.",
    benefits: [
      "Arquitetura modular e segura",
      "Integrações com APIs externas",
      "Painel admin e multi-tenant",
    ],
    cta: { label: "Explorar solução", href: "/solucoes/desenvolvimento-web" },
  },
  {
    id: "mobile-pwa",
    icon: Smartphone,
    title: "Apps Mobile e PWA",
    description:
      "Aplicativos nativos e PWAs conectados ao ecossistema da empresa, com experiência fluida em campo.",
    benefits: [
      "Offline-first quando necessário",
      "Notificações e sincronização",
      "Publicação em lojas ou PWA",
    ],
    cta: { label: "Ver possibilidades", href: "/solucoes/apps-mobile" },
  },
  {
    id: "desktop",
    icon: Monitor,
    title: "Sistemas Desktop",
    description:
      "Software local robusto para Windows com integração a ERPs, periféricos e operações críticas.",
    benefits: [
      "Integração com hardware local",
      "Instalador e atualização controlada",
      "Alta confiabilidade operacional",
    ],
    cta: { label: "Automatizar local", href: "/solucoes/sistemas-desktop" },
  },
  {
    id: "automations",
    icon: Bot,
    title: "Automações Inteligentes",
    description:
      "Bots, scrapers e fluxos que eliminam trabalho repetitivo com monitoramento e alertas.",
    benefits: [
      "Integração entre sistemas",
      "Filas, retries e orquestração",
      "ROI mensurável em horas salvas",
    ],
    cta: { label: "Calcular economia", href: "/solucoes/automacoes" },
  },
  {
    id: "dashboards-bi",
    icon: BarChart3,
    title: "Dashboards e BI",
    description:
      "Painéis gerenciais com KPIs, alertas e visualizações pensadas para decisão em tempo real.",
    benefits: [
      "Indicadores customizados",
      "Alertas e metas configuráveis",
      "Integração com ERP e CRM",
    ],
    cta: { label: "Ver em ação", href: "/solucoes/dashboards-bi" },
  },
  {
    id: "sites-landing",
    icon: Rocket,
    title: "Sites e Landing Pages",
    description:
      "Páginas premium orientadas a conversão, SEO técnico e tracking para captar leads qualificados.",
    benefits: [
      "Copy e estrutura comercial",
      "Performance Lighthouse 90+",
      "GA4, GTM e Schema.org",
    ],
    cta: { label: "Criar landing", href: "/solucoes/sites-landing-pages" },
  },
];

export type HomeDemo = {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  demoHref: string;
  caseHref: string;
};

export const homeDemos: HomeDemo[] = [
  {
    id: "crm-inteligente",
    title: "CRM Inteligente",
    description:
      "Funil comercial com Kanban, timeline de contatos e simulador WhatsApp para equipes de vendas B2B.",
    category: "CRM",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL"],
    demoHref: "/demo/crm-inteligente",
    caseHref: "/cases/crm-inteligente",
  },
  {
    id: "dashboard-bi",
    title: "Dashboard BI",
    description:
      "Painel executivo com KPIs financeiros, filtros temporais e alertas inteligentes de meta.",
    category: "Business Intelligence",
    stack: ["Next.js", "Recharts", "Node.js", "PostgreSQL"],
    demoHref: "/demo/dashboard-bi",
    caseHref: "/cases/dashboard-bi",
  },
  {
    id: "gestao-os",
    title: "Gestão de OS",
    description:
      "Controle de fila, status e timeline de ordens de serviço para times de campo e operações.",
    category: "Operações",
    stack: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
    demoHref: "/demo/gestao-os",
    caseHref: "/cases/gestao-os",
  },
  {
    id: "plataforma-educacional",
    title: "Plataforma Educacional",
    description:
      "Ambiente do aluno com módulos, player de vídeo, progresso dinâmico e quizzes interativos.",
    category: "EdTech",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL"],
    demoHref: "/demo/plataforma-educacional",
    caseHref: "/cases/plataforma-educacional",
  },
  {
    id: "link-qr",
    title: "Link + QR Code",
    description:
      "Encurtador de links com UTMs, geração de QR codes e analytics de campanhas em tempo real.",
    category: "SaaS",
    stack: ["Next.js", "Node.js", "Redis", "PostgreSQL"],
    demoHref: "/demo/link-qr",
    caseHref: "/cases/link-qr",
  },
  {
    id: "monitoramento-tempo-real",
    title: "Monitoramento em Tempo Real",
    description:
      "Feed crítico de logs e eventos com alertas visuais, severidade por evento e controle de fila.",
    category: "Observabilidade",
    stack: ["Next.js", "WebSockets", "Node.js", "Docker"],
    demoHref: "/demo/monitoramento-tempo-real",
    caseHref: "/cases/monitoramento-tempo-real",
  },
];

export type HomeProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const homeProcessSteps: HomeProcessStep[] = [
  {
    step: 1,
    title: "Diagnóstico",
    description:
      "Entendemos seu processo, gargalos e objetivos de negócio em uma conversa estratégica.",
  },
  {
    step: 2,
    title: "Mapeamento",
    description:
      "Documentamos fluxos, integrações e requisitos técnicos com clareza para evitar surpresas.",
  },
  {
    step: 3,
    title: "Prototipação",
    description:
      "Validamos telas, jornadas e arquitetura antes de escrever código em produção.",
  },
  {
    step: 4,
    title: "Desenvolvimento",
    description:
      "Engenharia iterativa com entregas parciais, code review e padrões de qualidade.",
  },
  {
    step: 5,
    title: "Testes e deploy",
    description:
      "Homologação rigorosa, deploy seguro e monitoramento pós-lançamento.",
  },
  {
    step: 6,
    title: "Evolução",
    description:
      "Suporte contínuo, métricas de uso e roadmap de melhorias alinhado ao crescimento.",
  },
];

export type HomeDifferential = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const homeDifferentials: HomeDifferential[] = [
  {
    id: "custom",
    icon: Code2,
    title: "Desenvolvimento sob medida",
    description:
      "Cada linha de código serve ao seu processo — sem templates genéricos ou limitações de plataforma.",
  },
  {
    id: "design",
    icon: Palette,
    title: "Design premium",
    description:
      "Interfaces dark tech com UX pensada para conversão, legibilidade e credibilidade corporativa.",
  },
  {
    id: "architecture",
    icon: Layers,
    title: "Arquitetura escalável",
    description:
      "Base técnica preparada para crescer em usuários, dados e funcionalidades sem retrabalho.",
  },
  {
    id: "metrics",
    icon: LineChart,
    title: "Rastreamento e métricas",
    description:
      "GA4, GTM e eventos customizados para medir conversão, demos e ROI de cada investimento.",
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "Automações e IA",
    description:
      "Bots, fluxos inteligentes e integrações com IA para acelerar operações repetitivas.",
  },
  {
    id: "support",
    icon: FileText,
    title: "Documentação e suporte",
    description:
      "Entrega com documentação técnica, treinamento e canal direto para evolução contínua.",
  },
];

export const homeFinalCta = {
  title: "Tem uma ideia, processo manual ou sistema travando seu crescimento?",
  description:
    "Transformamos desafios operacionais em software que escala com sua empresa. Diagnóstico inicial sem compromisso.",
  primaryCta: {
    label: "Quero transformar isso em software",
    href: "/diagnostico",
  },
  whatsappCta: { label: "Falar no WhatsApp" },
} as const;

export const homeSeo = {
  title: "Nangell Creative Studio | Sistemas Sob Medida que Transformam Operação",
  description:
    "Desenvolvemos softwares web, desktop e mobile, automações, dashboards, SaaS e sites profissionais com design premium, performance e estratégia de negócio.",
  keywords: [
    "desenvolvimento de software sob medida",
    "sistemas web",
    "SaaS",
    "aplicativos mobile",
    "automação de processos",
    "dashboards BI",
    "software house",
    "Nangell Creative Studio",
    "Next.js",
    "TypeScript",
  ],
} as const;
