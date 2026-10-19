import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Eye,
  Layout,
  ListChecks,
  MessageSquare,
  Rocket,
  Search,
  Shield,
  TestTube2,
  TrendingUp,
  Zap,
} from "lucide-react";

export const sobreSeo = {
  title: "Sobre a Nangell Creative Studio",
  description:
    "Estúdio dirigido por João Lucas Nangell. Sistemas, automações e sites com diagnóstico antes do orçamento e acompanhamento direto do fundador.",
  keywords: [
    "Nangell Creative Studio",
    "João Lucas Nangell",
    "sistemas personalizados",
    "automação",
    "software sob medida",
    "tecnologia para empresas",
  ],
} as const;

export const sobreHero = {
  eyebrow: "Sobre",
  title: "Estúdio de software com acompanhamento direto do fundador",
  description:
    "A Nangell Creative Studio desenvolve sistemas web, desktop e mobile, automações, dashboards e sites a partir do processo real da empresa, não de um pacote genérico.",
  primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Ver soluções", href: "/solucoes" },
  card: {
    title: "Como trabalhamos",
    description:
      "Diagnóstico, escopo, protótipo, desenvolvimento, testes e evolução. Sem intermediários desnecessários.",
    highlights: [
      "Diagnóstico antes do orçamento",
      "Escopo em fases",
      "Contato direto com o fundador",
      "Documentação na entrega",
    ],
  },
} as const;

export const sobreHistoria = {
  title: "Por que a Nangell existe",
  paragraphs: [
    "A Nangell foi fundada por João Lucas Nangell para empresas que ainda operam com planilhas, controles manuais e ferramentas que não acompanham o fluxo real do negócio.",
    "O trabalho começa pelo problema operacional: o que gera retrabalho, onde a informação se perde e qual sistema resolve isso com o menor risco possível.",
  ],
  milestones: [
    {
      year: "Problema",
      label:
        "Operações dependentes de planilhas, mensagens e sistemas desconectados.",
    },
    {
      year: "Fundação",
      label:
        "João Lucas Nangell cria a Nangell Creative Studio para entregar software alinhado ao processo do cliente.",
    },
    {
      year: "Método",
      label:
        "Diagnóstico, mapeamento, prototipação, desenvolvimento e evolução contínua.",
    },
    {
      year: "Hoje",
      label:
        "Parceira técnica para organizar processos, automatizar rotinas e publicar sistemas em produção.",
    },
  ],
} as const;

export type SobreProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const sobreProcesso = {
  title: "Como cada projeto é conduzido",
  description:
    "Seis etapas com entregáveis definidos. O detalhamento completo está na página Processo.",
  steps: [
    {
      step: "01",
      title: "Diagnóstico",
      description:
        "Cenário atual, gargalos, ferramentas e objetivo principal.",
      icon: Search,
    },
    {
      step: "02",
      title: "Escopo",
      description:
        "O que entra agora, o que fica para fases seguintes e o caminho técnico.",
      icon: ListChecks,
    },
    {
      step: "03",
      title: "Protótipo",
      description:
        "Telas e fluxos validados antes do código de produção.",
      icon: Layout,
    },
    {
      step: "04",
      title: "Desenvolvimento",
      description:
        "Entregas parciais, revisão e padrões definidos.",
      icon: Code2,
    },
    {
      step: "05",
      title: "Testes",
      description:
        "Homologação, ajustes de usabilidade e preparação para uso real.",
      icon: TestTube2,
    },
    {
      step: "06",
      title: "Evolução",
      description:
        "Publicação, suporte e novas funcionalidades conforme o uso.",
      icon: Rocket,
    },
  ] satisfies SobreProcessStep[],
} as const;

export const sobreFundador = {
  title: "Estrutura enxuta e responsabilidade direta",
  paragraphs: [
    "A Nangell é conduzida por João Lucas Nangell: diagnóstico, planejamento, desenvolvimento e acompanhamento ficam com quem entrega o projeto.",
    "Isso reduz camadas de comunicação e deixa claro quem responde pelo resultado técnico.",
  ],
  quote:
    "Você fala com quem vai planejar e construir a solução.",
  member: {
    name: "João Lucas Nangell",
    role: "Fundador",
    description:
      "Responsável pelo diagnóstico, planejamento, desenvolvimento e evolução das soluções.",
    /** Sem foto pessoal publicada: usamos iniciais no UI, não o ícone da marca. */
    avatar: null as string | null,
    skills: [
      "Desenvolvimento web",
      "Sistemas personalizados",
      "Automações",
      "Dashboards",
      "Integrações",
      "UX",
    ],
  },
} as const;

export type SobreValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const sobreValores = {
  title: "O que guia cada projeto",
  valores: [
    {
      icon: Eye,
      title: "Clareza",
      description:
        "Decisões técnicas explicadas de forma objetiva.",
    },
    {
      icon: Zap,
      title: "Eficiência",
      description:
        "Prioridade para o que reduz retrabalho e gera impacto operacional.",
    },
    {
      icon: Shield,
      title: "Responsabilidade técnica",
      description:
        "Segurança, organização e manutenção entram no planejamento.",
    },
    {
      icon: TrendingUp,
      title: "Evolução em fases",
      description:
        "Começar pelo essencial e crescer com o uso real do sistema.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação direta",
      description:
        "Canal aberto com quem desenvolve, sem intermediários desnecessários.",
    },
  ] satisfies SobreValue[],
} as const;

export const sobrePublico = {
  title: "Para quem é",
  idealFor: [
    "Empresas que ainda dependem de planilhas e controles manuais.",
    "Operações com tarefas repetitivas que podem ser automatizadas.",
    "Gestores que precisam de indicadores claros.",
    "Negócios que querem um sistema próprio, começando por uma fase segura.",
  ],
  notYetFor: [
    "Ainda não há problema concreto a resolver.",
    "Não há disponibilidade para o diagnóstico inicial.",
    "A expectativa é um sistema complexo sem escopo definido.",
  ],
} as const;

export const sobreCta = {
  title: "Quer mapear o próximo sistema da sua operação?",
  description:
    "Descreva o cenário no diagnóstico. Você recebe um caminho técnico objetivo, sem compromisso de contratação.",
  primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Conhecer o processo", href: "/processo" },
} as const;
