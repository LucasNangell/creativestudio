import {
  BarChart3,
  Bot,
  Globe,
  Monitor,
  Rocket,
  Smartphone,
} from "lucide-react";

import type { ServiceEnrichedContent } from "@/types/services";

export const SERVICE_ENRICHED_CONTENT: Record<string, ServiceEnrichedContent> = {
  "desenvolvimento-web": {
    sortOrder: 1,
    icon: Globe,
    focusAreas: ["SaaS", "Portais", "CRMs", "ERPs", "Dashboards", "Áreas logadas", "APIs"],
    features: [
      "Multi-tenant e gestão de assinaturas",
      "Painéis administrativos com permissões granulares",
      "APIs REST/GraphQL documentadas",
      "Integrações com ERPs, gateways e serviços externos",
      "Autenticação SSO e áreas logadas seguras",
      "Relatórios exportáveis e auditoria de ações",
    ],
    differentials: [
      {
        title: "Arquitetura preparada para escala",
        description:
          "Modularidade desde o MVP — sem refatoração traumática quando o produto cresce.",
      },
      {
        title: "Demos interativas no site",
        description:
          "Mostramos CRM, BI e SaaS funcionando antes da contratação — show, don't tell.",
      },
      {
        title: "Engenharia + estratégia comercial",
        description:
          "Cada fluxo de tela conversa com funil, retenção e métricas de negócio.",
      },
      {
        title: "Documentação e handoff técnico",
        description:
          "Entrega com README, diagramas e padrões para evolução interna ou terceiros.",
      },
    ],
    faq: [
      {
        question: "Vocês desenvolvem SaaS do zero ou migram sistemas legados?",
        answer:
          "Ambos. Construímos MVPs e plataformas completas, além de modernizar sistemas legados com migração gradual de dados e usuários.",
      },
      {
        question: "Qual stack vocês recomendam para sistemas web B2B?",
        answer:
          "Next.js, TypeScript, Prisma e MySQL/PostgreSQL para a maioria dos casos — com arquitetura ajustada ao volume, integrações e roadmap.",
      },
      {
        question: "O painel administrativo está incluso?",
        answer:
          "Sim. Entregamos área admin com gestão de usuários, permissões, configurações e relatórios conforme o escopo acordado.",
      },
      {
        question: "Como funciona a integração com APIs de terceiros?",
        answer:
          "Mapeamos contratos, autenticação, retries e logs. Implementamos webhooks, filas e monitoramento para integrações críticas.",
      },
    ],
    relatedProjectSlugs: ["lar-dos-anjos", "site-psicologia-profissional", "player-video-marcadores"],
  },
  "apps-mobile": {
    sortOrder: 2,
    icon: Smartphone,
    focusAreas: [
      "Mobile-first",
      "PWA instalável",
      "App de campo",
      "Área do cliente",
      "Notificações futuras",
    ],
    features: [
      "PWA instalável com ícone na home screen",
      "Modo offline com sincronização em background",
      "Captura de fotos, GPS e assinatura digital",
      "Push notifications (roadmap configurável)",
      "Área do cliente com histórico e tickets",
      "Integração com backend e CRM existente",
    ],
    differentials: [
      {
        title: "Mobile-first de verdade",
        description:
          "Fluxos pensados para polegar, campo e conexão instável — não apenas site responsivo.",
      },
      {
        title: "PWA ou nativo — decisão técnica honesta",
        description:
          "Recomendamos a abordagem certa para loja, distribuição interna e recursos nativos.",
      },
      {
        title: "Sincronização confiável",
        description:
          "Filas locais, conflitos resolvidos e feedback claro quando offline.",
      },
      {
        title: "Design premium consistente",
        description:
          "Mesma identidade visual do ecossistema web da empresa, com UX otimizada para mobile.",
      },
    ],
    faq: [
      {
        question: "PWA ou app nativo — qual escolher?",
        answer:
          "PWA quando distribuição rápida, custo menor e recursos nativos limitados bastam. Nativo quando câmera, GPS avançado ou lojas são requisito central.",
      },
      {
        question: "Funciona offline em campo?",
        answer:
          "Sim. Projetamos cache local, fila de sincronização e indicadores visuais de status de conexão.",
      },
      {
        question: "Vocês publicam nas lojas Apple e Google?",
        answer:
          "Sim, quando optamos por React Native/Expo ou build nativo. PWAs podem ser distribuídas via link ou política interna.",
      },
      {
        question: "Notificações push estão disponíveis?",
        answer:
          "Implementamos push via Firebase ou serviços equivalentes, com opt-in LGPD e segmentação por perfil.",
      },
    ],
    relatedProjectSlugs: ["gestao-producao-grafica", "monitor-arquivos"],
  },
  "sistemas-desktop": {
    sortOrder: 3,
    icon: Monitor,
    focusAreas: [
      "Windows",
      "Rotinas locais",
      "Automação de arquivos",
      "Integração com planilhas",
      "Bancos legados",
    ],
    features: [
      "Instalador Windows com atualização controlada",
      "Leitura e escrita em planilhas Excel/CSV",
      "Integração com impressoras, balanças e periféricos",
      "Conexão com bancos legados e ODBC",
      "Automação de pastas e arquivos locais",
      "Logs locais e backup de operações críticas",
    ],
    differentials: [
      {
        title: "Robustez operacional",
        description:
          "Software pensado para turnos longos, quedas de rede e hardware heterogêneo.",
      },
      {
        title: "Integração profunda com Windows",
        description:
          "APIs locais, serviços em background e permissões configuradas corretamente.",
      },
      {
        title: "Transição suave de planilhas",
        description:
          "Importamos rotinas manuais para telas guiadas sem paralisar a operação.",
      },
      {
        title: "Suporte e evolução contínua",
        description:
          "Canal direto para ajustes locais, hotfixes e novas integrações.",
      },
    ],
    faq: [
      {
        question: "Vocês desenvolvem apenas para Windows?",
        answer:
          "Foco principal em Windows por demanda operacional B2B. Avaliamos macOS/Linux caso a integração exija.",
      },
      {
        question: "Conseguem integrar com ERP legado?",
        answer:
          "Sim. Trabalhamos com ODBC, arquivos de exportação, APIs expostas e automação de interface quando necessário.",
      },
      {
        question: "Como funciona a instalação em múltiplas máquinas?",
        answer:
          "Geramos instalador assinado, scripts de deploy em lote e documentação para TI interna.",
      },
      {
        question: "Substituem planilhas Excel complexas?",
        answer:
          "Sim. Migramos fórmulas críticas para regras de negócio testáveis com validação e auditoria.",
      },
    ],
    relatedProjectSlugs: ["gestao-producao-grafica"],
  },
  automacoes: {
    sortOrder: 4,
    icon: Bot,
    focusAreas: [
      "Python",
      "Scripts",
      "Robôs",
      "APIs",
      "Relatórios automáticos",
      "Redução de tarefas manuais",
    ],
    features: [
      "Robôs de extração e ingestão de dados",
      "Integração entre CRM, ERP, e-mail e planilhas",
      "Relatórios agendados com envio automático",
      "Webhooks, filas e retries inteligentes",
      "Monitoramento de falhas e alertas",
      "Dashboard de execuções e economia gerada",
    ],
    differentials: [
      {
        title: "ROI mensurável",
        description:
          "Calculamos horas economizadas e traduzimos em payback antes de implementar.",
      },
      {
        title: "Orquestração resiliente",
        description:
          "Filas, retries, dead-letter e logs — automação que não quebra silenciosamente.",
      },
      {
        title: "Python + Node sob medida",
        description:
          "Escolhemos a stack certa para scraping, ETL, APIs ou fluxos híbridos.",
      },
      {
        title: "Documentação de fluxos",
        description:
          "Diagramas e runbooks para operação e auditoria interna.",
      },
    ],
    faq: [
      {
        question: "Quais processos costumam ser automatizados primeiro?",
        answer:
          "Conciliações financeiras, exportações entre sistemas, follow-ups comerciais, geração de relatórios e sincronização de estoque.",
      },
      {
        question: "Automação substitui integração nativa entre sistemas?",
        answer:
          "Em muitos casos, sim — como ponte rápida. Quando volume e criticidade exigem, evoluímos para APIs dedicadas.",
      },
      {
        question: "Como garantem que o robô não falhe silenciosamente?",
        answer:
          "Alertas por e-mail/Slack, dashboard de execuções, logs centralizados e política de retry configurável.",
      },
      {
        question: "Vocês mantêm automações após o go-live?",
        answer:
          "Sim. Oferecemos planos de evolução e monitoramento para ajustes quando sistemas externos mudam.",
      },
    ],
    relatedProjectSlugs: ["sharescreen-lan", "monitor-arquivos"],
  },
  "dashboards-bi": {
    sortOrder: 5,
    icon: BarChart3,
    focusAreas: [
      "Indicadores",
      "Painéis executivos",
      "Data storytelling",
      "Alertas",
      "Decisões baseadas em dados",
    ],
    features: [
      "KPIs financeiros, comerciais e operacionais",
      "Filtros temporais e comparativos (YoY, MoM)",
      "Alertas de meta e desvio automático",
      "Drill-down por região, produto ou equipe",
      "Exportação executiva PDF/Excel",
      "Integração ETL com múltiplas fontes",
    ],
    differentials: [
      {
        title: "Data storytelling",
        description:
          "Narrativa visual que diretores entendem em segundos — não apenas gráficos soltos.",
      },
      {
        title: "Demo BI interativa",
        description:
          "Visitantes experimentam filtros e alertas no nosso demo antes de contratar.",
      },
      {
        title: "Modelagem de indicadores",
        description:
          "Definimos métricas com stakeholders antes de construir telas.",
      },
      {
        title: "Mobile-ready",
        description:
          "Painéis responsivos para gestores que decidem fora do escritório.",
      },
    ],
    faq: [
      {
        question: "Vocês integram com Power BI ou constroem painéis custom?",
        answer:
          "Ambos. Power BI quando o cliente já usa o ecossistema Microsoft; custom com Next.js/Recharts para UX premium e integrações específicas.",
      },
      {
        question: "De onde vêm os dados dos dashboards?",
        answer:
          "ERPs, CRMs, planilhas, APIs e bancos relacionais. Implementamos ETL, views materializadas ou pipelines conforme volume.",
      },
      {
        question: "Alertas automáticos estão inclusos?",
        answer:
          "Sim. Configuramos thresholds, notificações por e-mail/Slack e histórico de alertas disparados.",
      },
      {
        question: "Qual o prazo para um painel executivo MVP?",
        answer:
          "Entre 3 e 6 semanas após discovery, dependendo de fontes de dados e complexidade de indicadores.",
      },
    ],
    relatedProjectSlugs: ["vigilia-politica", "gestao-producao-grafica"],
  },
  "sites-landing-pages": {
    sortOrder: 6,
    icon: Rocket,
    focusAreas: [
      "Sites premium",
      "Landing pages",
      "SEO",
      "GTM",
      "Pixel",
      "Conversão",
    ],
    features: [
      "Copy e estrutura orientada a conversão",
      "SEO técnico com metadata e Schema.org",
      "Integração GA4, GTM e Meta Pixel",
      "Formulários com validação e LGPD",
      "Performance Lighthouse 90+",
      "Testes A/B e heatmaps (roadmap)",
    ],
    differentials: [
      {
        title: "Site como case técnico",
        description:
          "O próprio site Nangell prova performance, SEO e design premium.",
      },
      {
        title: "Conversão antes de estética vazia",
        description:
          "Cada seção tem objetivo comercial — hero, prova, objeção, CTA.",
      },
      {
        title: "Tracking configurado",
        description:
          "Eventos de lead, scroll e clique mapeados para campanhas pagas.",
      },
      {
        title: "Stack moderna e escalável",
        description:
          "Next.js + Tailwind para evolução rápida sem refazer do zero.",
      },
    ],
    faq: [
      {
        question: "Landing page ou site institucional completo?",
        answer:
          "Entregamos campanhas focadas em conversão e sites multi-página com blog, cases e SEO programático.",
      },
      {
        question: "Vocês configuram GTM e Pixel?",
        answer:
          "Sim. Implementamos container GTM, GA4, Meta Pixel e eventos de conversão alinhados ao funil.",
      },
      {
        question: "Qual performance posso esperar?",
        answer:
          "Meta Lighthouse Performance 90+ em mobile, com imagens otimizadas, fontes e Core Web Vitals monitorados.",
      },
      {
        question: "O site integra com CRM para leads?",
        answer:
          "Sim. Conectamos formulários a CRM, e-mail, webhooks ou banco próprio com notificação instantânea.",
      },
    ],
    relatedProjectSlugs: ["player-video-marcadores"],
  },
};

export const solucoesPageContent = {
  hero: {
    eyebrow: "Soluções",
    title: "Software sob medida para cada momento do seu negócio",
    description:
      "Da automação pontual ao SaaS completo — escolha a solução certa, compare abordagens e veja demos reais antes de investir.",
  },
  momentFit: {
    title: "Qual solução combina com seu momento?",
    description:
      "Identifique onde você está hoje e encontre o caminho mais eficiente para digitalizar sua operação.",
    scenarios: [
      {
        id: "growth",
        title: "Crescimento acelerado",
        signal: "Planilhas não dão conta do volume",
        recommendation: "Desenvolvimento Web ou SaaS",
        href: "/solucoes/desenvolvimento-web",
      },
      {
        id: "field",
        title: "Operação em campo",
        signal: "Equipe externa sem ferramenta móvel",
        recommendation: "Apps Mobile e PWA",
        href: "/solucoes/apps-mobile",
      },
      {
        id: "local",
        title: "Processos locais críticos",
        signal: "Dependência de Windows e periféricos",
        recommendation: "Sistemas Desktop",
        href: "/solucoes/sistemas-desktop",
      },
      {
        id: "manual",
        title: "Tarefas manuais repetitivas",
        signal: "Horas perdidas em copy-paste entre sistemas",
        recommendation: "Automações",
        href: "/solucoes/automacoes",
      },
      {
        id: "visibility",
        title: "Falta de visibilidade gerencial",
        signal: "Decisões no escuro, dados espalhados",
        recommendation: "Dashboards e BI",
        href: "/solucoes/dashboards-bi",
      },
      {
        id: "leads",
        title: "Captação e autoridade digital",
        signal: "Site não converte ou não ranqueia",
        recommendation: "Sites e Landing Pages",
        href: "/solucoes/sites-landing-pages",
      },
    ],
  },
  comparison: {
    title: "Template genérico vs. software sob medida",
    description:
      "Entenda quando uma plataforma pronta resolve — e quando customização gera vantagem competitiva real.",
    template: {
      label: "Template / SaaS genérico",
      items: [
        "Setup rápido para casos simples",
        "Custo inicial menor",
        "Funcionalidades padronizadas",
        "Limitações de fluxo e integração",
        "Dependência do fornecedor",
        "Dificuldade de diferenciação",
      ],
    },
    custom: {
      label: "Sob medida Nangell",
      items: [
        "Fluxos alinhados ao seu processo",
        "Integrações profundas (ERP, CRM, APIs)",
        "Escalabilidade sem trocar de plataforma",
        "UX premium e demos interativas",
        "Propriedade do código e roadmap",
        "ROI mensurável e evolução contínua",
      ],
    },
  },
  painCards: {
    title: "Sinais de que é hora de investir",
    items: [
      {
        pain: "Mais de 10h/semana em tarefas repetitivas",
        solution: "Automações",
        href: "/solucoes/automacoes",
      },
      {
        pain: "Dados críticos presos em planilhas",
        solution: "Desenvolvimento Web",
        href: "/solucoes/desenvolvimento-web",
      },
      {
        pain: "Equipe de campo sem app dedicado",
        solution: "Apps Mobile",
        href: "/solucoes/apps-mobile",
      },
      {
        pain: "Gestores sem painel consolidado",
        solution: "Dashboards e BI",
        href: "/solucoes/dashboards-bi",
      },
    ],
  },
  cta: {
    title: "Não sabe por onde começar?",
    description:
      "Nosso diagnóstico gratuito mapeia gargalos, estima ROI e indica a solução ideal — sem compromisso.",
    primaryLabel: "Solicitar diagnóstico gratuito",
    primaryHref: "/diagnostico",
    secondaryLabel: "Falar no WhatsApp",
  },
  seo: {
    title: "Soluções de Software Sob Medida | Nangell Creative Studio",
    description:
      "Sistemas web, mobile, desktop, automações, dashboards BI e landing pages premium. Conheça nossas soluções e veja demos interativas.",
    keywords: [
      "soluções de software",
      "desenvolvimento sob medida",
      "SaaS",
      "automação",
      "dashboards",
      "landing pages",
      "Nangell Creative Studio",
    ],
  },
} as const;
