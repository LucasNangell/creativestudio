export const processoSeo = {
  title: "Nosso Processo de Desenvolvimento",
  description:
    "Metodologia em 6 etapas da Nangell Creative Studio: diagnóstico, requisitos, prototipação, desenvolvimento incremental, testes e evolução contínua — com entregáveis claros em cada fase.",
  keywords: [
    "processo de desenvolvimento de software",
    "metodologia ágil",
    "engenharia de software",
    "entregáveis",
    "Nangell Creative Studio",
  ],
} as const;

export const processoHero = {
  eyebrow: "Metodologia",
  title: "Do diagnóstico à evolução contínua",
  description:
    "Um processo transparente em 6 etapas, desenhado para reduzir riscos, alinhar expectativas e entregar software que funciona no mundo real — não apenas em apresentações.",
} as const;

export type ProcessoEtapa = {
  step: number;
  title: string;
  description: string;
  duration: string;
  caseSlug?: string;
  blogSlug?: string;
  deliverables: string[];
  clientReceives: string[];
  successCriteria: string[];
};

export const processoEtapas: ProcessoEtapa[] = [
  {
    step: 1,
    title: "Diagnóstico",
    duration: "1 a 2 semanas",
    blogSlug: "diagnostico-tecnico-antes-do-orcamento",
    description:
      "Conversa estratégica para entender seu processo atual, dores operacionais, objetivos de negócio e restrições técnicas ou orçamentárias.",
    deliverables: [
      "Relatório de diagnóstico com mapa de dores e oportunidades",
      "Indicação de escopo inicial (MVP vs. solução completa)",
      "Estimativa preliminar de prazo e investimento",
    ],
    clientReceives: [
      "Visão clara do que pode ser resolvido com software",
      "Priorização de funcionalidades por impacto",
      "Canal direto para tirar dúvidas antes de contratar",
    ],
    successCriteria: [
      "Problema de negócio documentado e validado",
      "Expectativas de prazo e budget alinhadas",
      "Decisão informada sobre seguir ou não para a próxima fase",
    ],
  },
  {
    step: 2,
    title: "Levantamento de requisitos",
    duration: "2 a 3 semanas",
    description:
      "Documentação detalhada de fluxos, integrações, perfis de usuário, regras de negócio e requisitos não funcionais (performance, segurança, LGPD).",
    deliverables: [
      "Documento de requisitos funcionais e técnicos",
      "Mapa de integrações e dependências externas",
      "Matriz de permissões e papéis de usuário",
      "Cronograma macro com marcos de entrega",
    ],
    clientReceives: [
      "Especificação que serve de contrato técnico",
      "Visibilidade de escopo incluído e fora de escopo",
      "Base para estimativa refinada e proposta comercial",
    ],
    successCriteria: [
      "Requisitos aprovados por stakeholders-chave",
      "Integrações e APIs mapeadas",
      "Riscos técnicos identificados e mitigados no plano",
    ],
  },
  {
    step: 3,
    title: "Prototipação",
    duration: "2 a 4 semanas",
    blogSlug: "demonstrar-software-em-acao",
    description:
      "Validação visual e funcional de telas, jornadas críticas e arquitetura de informação antes do desenvolvimento em produção.",
    deliverables: [
      "Wireframes ou protótipo navegável (Figma ou similar)",
      "Fluxos de usuário das jornadas principais",
      "Definição de design system e componentes base",
    ],
    clientReceives: [
      "Experiência visual concreta do produto final",
      "Oportunidade de ajustar UX antes de codificar",
      "Redução drástica de retrabalho em desenvolvimento",
    ],
    successCriteria: [
      "Protótipo aprovado pelos decisores",
      "Jornadas críticas validadas com usuários ou operadores",
      "Stack e arquitetura confirmadas",
    ],
  },
  {
    step: 4,
    title: "Desenvolvimento incremental",
    duration: "4 a 16 semanas",
    caseSlug: "crm-inteligente",
    description:
      "Engenharia iterativa com entregas parciais funcionais, code review, padrões de qualidade e comunicação semanal de progresso.",
    deliverables: [
      "Sprints com funcionalidades entregues e testáveis",
      "Repositório com histórico de commits e documentação",
      "Ambiente de homologação para validação contínua",
    ],
    clientReceives: [
      "Demonstrações periódicas do software em construção",
      "Canal de feedback e ajustes durante o desenvolvimento",
      "Transparência total sobre andamento e bloqueios",
    ],
    successCriteria: [
      "Funcionalidades core operacionais em homologação",
      "Cobertura de testes nas áreas críticas",
      "Performance e segurança dentro dos parâmetros acordados",
    ],
  },
  {
    step: 5,
    title: "Testes, segurança e performance",
    duration: "2 a 3 semanas",
    blogSlug: "arquitetura-moderna-sistemas-2026",
    description:
      "Homologação rigorosa com testes funcionais, de carga, segurança (OWASP), acessibilidade e otimização de Core Web Vitals.",
    deliverables: [
      "Relatório de testes e checklist de homologação",
      "Auditoria de segurança e correções aplicadas",
      "Benchmark de performance (Lighthouse, queries, APIs)",
    ],
    clientReceives: [
      "Software validado em cenários reais de uso",
      "Confiança para deploy em produção",
      "Documentação de testes e critérios de aceite",
    ],
    successCriteria: [
      "Zero bugs críticos em homologação",
      "Lighthouse Performance ≥ 90 em páginas públicas",
      "Conformidade LGPD nos fluxos de dados pessoais",
    ],
  },
  {
    step: 6,
    title: "Deploy, treinamento e evolução",
    duration: "1 a 2 semanas",
    caseSlug: "dashboard-bi",
    description:
      "Publicação em produção, treinamento da equipe, monitoramento pós-lançamento e roadmap de melhorias contínuas.",
    deliverables: [
      "Deploy em ambiente de produção com CI/CD",
      "Manual de operação e documentação técnica",
      "Sessão de treinamento para usuários e administradores",
      "Plano de suporte e evolução (SLA acordado)",
    ],
    clientReceives: [
      "Sistema no ar e operacional",
      "Equipe capacitada para uso diário",
      "Canal de suporte e evolução contínua",
    ],
    successCriteria: [
      "Deploy concluído sem downtime crítico",
      "Usuários treinados e autônomos nas operações básicas",
      "Métricas de uso e feedback coletados para roadmap",
    ],
  },
];

export type ProcessoFaq = {
  question: string;
  answer: string;
};

export const processoFaq: ProcessoFaq[] = [
  {
    question: "Quanto tempo leva um projeto típico?",
    answer:
      "Depende da complexidade. MVPs enxutos podem levar de 6 a 12 semanas; sistemas completos com integrações, 3 a 6 meses. O diagnóstico inicial define um cronograma realista antes de qualquer compromisso.",
  },
  {
    question: "Preciso ter requisitos prontos antes de começar?",
    answer:
      "Não. A etapa de levantamento de requisitos existe exatamente para estruturar o escopo junto com você. Quanto mais contexto você trouxer no diagnóstico, mais rápido avançamos.",
  },
  {
    question: "Como acompanho o andamento do desenvolvimento?",
    answer:
      "Entregas parciais em ambiente de homologação, reuniões de alinhamento periódicas e canal direto (WhatsApp/e-mail) para dúvidas. Você vê o software funcionando antes do deploy final.",
  },
  {
    question: "E se precisarmos mudar o escopo no meio do projeto?",
    answer:
      "Mudanças são naturais. Avaliamos impacto em prazo e investimento, documentamos o ajuste e replanejamos antes de executar — sempre com sua aprovação explícita.",
  },
  {
    question: "Vocês oferecem suporte após o lançamento?",
    answer:
      "Sim. Incluímos treinamento, documentação e um período de suporte pós-deploy. Planos de evolução contínua e SLA são definidos conforme a criticidade do sistema.",
  },
  {
    question: "Trabalham com equipes internas de TI do cliente?",
    answer:
      "Sim. Podemos integrar com times internos, fornecer documentação técnica detalhada e realizar handoff para manutenção própria, ou assumir evolução contínua como parceiro.",
  },
];

export const processoCta = {
  title: "Quer ver essa metodologia aplicada ao seu projeto?",
  description:
    "Agende um diagnóstico inicial gratuito. Em uma conversa estratégica, mapeamos seu cenário e indicamos o caminho mais eficiente.",
  primaryCta: { label: "Agendar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Falar no WhatsApp", href: "whatsapp" },
} as const;
