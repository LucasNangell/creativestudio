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
  headline: "Software web, desktop e mobile",
  headlineAccent: "para a operação da sua empresa.",
  subheadline:
    "Sistemas, automações, dashboards, SaaS e sites com engenharia clara, interface profissional e diagnóstico antes do orçamento.",
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
      "Plataformas web, portais e produtos SaaS com painel administrativo, autenticação e integrações por API.",
    benefits: [
      "Arquitetura modular",
      "Integrações com APIs",
      "Painel admin e multi-tenant",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/desenvolvimento-web" },
  },
  {
    id: "mobile-pwa",
    icon: Smartphone,
    title: "Apps Mobile e PWA",
    description:
      "Aplicativos e PWAs conectados ao restante do ecossistema, com sincronização e uso em campo.",
    benefits: [
      "Offline quando necessário",
      "Notificações e sincronização",
      "Publicação em lojas ou PWA",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/apps-mobile" },
  },
  {
    id: "desktop",
    icon: Monitor,
    title: "Sistemas Desktop",
    description:
      "Software local para Windows com integração a ERPs, periféricos e operações que não podem depender só da nuvem.",
    benefits: [
      "Integração com hardware local",
      "Instalador e atualização controlada",
      "Operação offline ou híbrida",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/sistemas-desktop" },
  },
  {
    id: "automations",
    icon: Bot,
    title: "Automações",
    description:
      "Bots, scrapers e fluxos que eliminam trabalho repetitivo, com monitoramento e alertas.",
    benefits: [
      "Integração entre sistemas",
      "Filas, retries e orquestração",
      "Estimativa de horas economizadas",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/automacoes" },
  },
  {
    id: "dashboards-bi",
    icon: BarChart3,
    title: "Dashboards e BI",
    description:
      "Painéis com indicadores, alertas e visualizações para acompanhamento operacional e gerencial.",
    benefits: [
      "Indicadores customizados",
      "Alertas e metas",
      "Integração com ERP e CRM",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/dashboards-bi" },
  },
  {
    id: "sites-landing",
    icon: Rocket,
    title: "Sites e Landing Pages",
    description:
      "Sites e páginas de conversão com SEO técnico, tracking e estrutura comercial clara.",
    benefits: [
      "Estrutura e copy comercial",
      "Core Web Vitals e SEO técnico",
      "GA4, GTM e Schema.org",
    ],
    cta: { label: "Solicitar diagnóstico", href: "/solucoes/sites-landing-pages" },
  },
];

export type { HomeDemo } from "@/data/home-demos";
export { homeDemos } from "@/data/home-demos";

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
      "Levantamos processo, gargalos e objetivos em uma conversa objetiva.",
  },
  {
    step: 2,
    title: "Mapeamento",
    description:
      "Documentamos fluxos, integrações e requisitos antes de orçar o desenvolvimento.",
  },
  {
    step: 3,
    title: "Prototipação",
    description:
      "Validamos telas e jornadas antes de escrever código de produção.",
  },
  {
    step: 4,
    title: "Desenvolvimento",
    description:
      "Entregas parciais, revisão de código e padrões técnicos definidos.",
  },
  {
    step: 5,
    title: "Testes e deploy",
    description:
      "Homologação, publicação e monitoramento após o lançamento.",
  },
  {
    step: 6,
    title: "Evolução",
    description:
      "Suporte, ajustes e roadmap alinhado ao uso real do sistema.",
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
    title: "Feito para o seu processo",
    description:
      "O software segue a operação da empresa. Sem forçar o negócio a caber em um template.",
  },
  {
    id: "design",
    icon: Palette,
    title: "Interface profissional",
    description:
      "Layout dark tech, tipografia legível e hierarquia visual pensada para uso diário.",
  },
  {
    id: "architecture",
    icon: Layers,
    title: "Arquitetura preparada para crescer",
    description:
      "Base modular para novos usuários, dados e módulos sem reescrever tudo.",
  },
  {
    id: "metrics",
    icon: LineChart,
    title: "Medição de uso e conversão",
    description:
      "Eventos, GA4 e GTM quando fizer sentido, para acompanhar o que realmente é usado.",
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "Automações e IA com propósito",
    description:
      "Automação e IA entram onde há tarefa repetitiva ou volume que justifica.",
  },
  {
    id: "support",
    icon: FileText,
    title: "Documentação e suporte direto",
    description:
      "Entrega com documentação, treinamento e canal direto com quem desenvolveu.",
  },
];

export const homeFinalCta = {
  title: "Tem um processo manual ou um sistema que não acompanha a operação?",
  description:
    "Descreva o cenário no diagnóstico. Você recebe um mapeamento objetivo, sem compromisso de contratação.",
  primaryCta: {
    label: "Solicitar diagnóstico",
    href: "/diagnostico",
  },
  whatsappCta: { label: "Falar no WhatsApp" },
} as const;

export const homeSeo = {
  title: "Nangell Creative Studio | Software web, desktop e mobile",
  description:
    "Desenvolvimento de sistemas web, desktop e mobile, automações, dashboards, SaaS e sites. Diagnóstico antes do orçamento.",
  keywords: [
    "desenvolvimento de software",
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
