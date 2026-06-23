/** Fallback estático espelhando o seed Prisma, usado quando o banco não está disponível no build. */
export const FALLBACK_SERVICES = [
  {
    id: "fallback-desenvolvimento-web",
    title: "Desenvolvimento Web e SaaS",
    slug: "desenvolvimento-web",
    headline: "Sistemas web sob medida com arquitetura escalável",
    description:
      "Projetamos e desenvolvemos plataformas web, portais corporativos e produtos SaaS com foco em performance, segurança e evolução contínua.",
    problemSolved:
      "Empresas com processos críticos presos em planilhas, sistemas legados ou soluções genéricas que não acompanham o crescimento.",
    deliverables: [
      "Discovery técnico e desenho de arquitetura",
      "Frontend e backend integrados",
      "Painel administrativo",
      "Integrações com APIs e serviços externos",
      "Deploy, monitoramento e documentação",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Prisma", "MySQL", "AWS"],
    targetAudience:
      "Empresas B2B que precisam digitalizar operações, lançar produtos digitais ou substituir sistemas legados.",
    ctaLabel: "Falar com especialista",
    seoTitle: "Desenvolvimento de Sistemas Web e SaaS | Nangell Creative Studio",
    seoDescription:
      "Desenvolvimento de sistemas web, plataformas SaaS e software sob medida com engenharia premium.",
  },
  {
    id: "fallback-apps-mobile",
    title: "Apps Mobile e PWAs",
    slug: "apps-mobile",
    headline: "Aplicativos nativos e progressivos para operação em campo",
    description:
      "Criamos apps mobile e PWAs conectados ao ecossistema da empresa, com experiência fluida e recursos nativos quando necessário.",
    problemSolved:
      "Times de campo, vendas externas ou operações móveis sem ferramentas adequadas para registrar, consultar e agir em tempo real.",
    deliverables: [
      "App iOS/Android ou PWA responsiva",
      "Autenticação e sincronização offline",
      "Integração com backend e notificações",
      "Publicação nas lojas ou distribuição interna",
    ],
    technologies: ["React Native", "Expo", "Next.js", "Firebase", "REST APIs"],
    targetAudience:
      "Negócios com equipes externas, logística, vendas consultivas ou atendimento móvel.",
    ctaLabel: "Solicitar orçamento de app",
    seoTitle: "Desenvolvimento de Apps Mobile e PWA | Nangell Creative Studio",
    seoDescription:
      "Apps mobile, PWAs e soluções híbridas com UX premium e integração completa.",
  },
  {
    id: "fallback-sistemas-desktop",
    title: "Sistemas Desktop",
    slug: "sistemas-desktop",
    headline: "Automação local robusta para operações críticas",
    description:
      "Desenvolvemos sistemas desktop para Windows e integrações locais com ERPs, impressoras, balanças e periféricos industriais.",
    problemSolved:
      "Processos locais dependentes de planilhas manuais, múltiplas telas ou softwares descontinuados.",
    deliverables: [
      "Aplicação desktop customizada",
      "Integração com hardware e ERP",
      "Instalador e atualização controlada",
      "Logs e suporte operacional",
    ],
    technologies: ["Electron", "Tauri", "C#", ".NET", "SQLite", "Windows API"],
    targetAudience:
      "Indústrias, clínicas, varejo e operações que exigem software local confiável.",
    ctaLabel: "Automatizar processos locais",
    seoTitle: "Sistemas Desktop e Automação Local | Nangell Creative Studio",
    seoDescription:
      "Software desktop sob medida para Windows, automações locais e integrações operacionais.",
  },
  {
    id: "fallback-automacoes",
    title: "Automações e Integrações",
    slug: "automacoes",
    headline: "Bots, scrapers e fluxos que eliminam trabalho repetitivo",
    description:
      "Automatizamos rotinas operacionais, integrações entre sistemas e fluxos de dados com monitoramento e alertas.",
    problemSolved:
      "Equipes gastando horas em tarefas repetitivas, retrabalho entre sistemas e falta de integração entre ferramentas.",
    deliverables: [
      "Mapeamento de processos automatizáveis",
      "Scripts, bots e conectores",
      "Orquestração com filas e retries",
      "Dashboard de execução e falhas",
    ],
    technologies: ["Node.js", "Python", "n8n", "Redis", "Webhooks", "REST"],
    targetAudience:
      "Operações com alto volume de tarefas manuais, financeiro, marketing e backoffice.",
    ctaLabel: "Calcular economia operacional",
    seoTitle: "Automações e Integrações de Sistemas | Nangell Creative Studio",
    seoDescription:
      "Automação de processos, integrações entre plataformas e bots sob medida.",
  },
  {
    id: "fallback-dashboards-bi",
    title: "Dashboards e BI",
    slug: "dashboards-bi",
    headline: "Indicadores gerenciais claros para decisão em tempo real",
    description:
      "Construímos painéis executivos e operacionais com KPIs, alertas e visualizações pensadas para gestão e crescimento.",
    problemSolved:
      "Dados espalhados em múltiplas fontes sem visão consolidada para tomada de decisão.",
    deliverables: [
      "Modelagem de indicadores",
      "Dashboards responsivos",
      "Alertas e metas configuráveis",
      "Integração com ERP, CRM e planilhas",
    ],
    technologies: ["Next.js", "Recharts", "Power BI", "PostgreSQL", "ETL", "APIs"],
    targetAudience:
      "Diretores, gestores comerciais e times de operações que precisam enxergar performance.",
    ctaLabel: "Ver dados em tempo real",
    seoTitle: "Dashboards e Business Intelligence | Nangell Creative Studio",
    seoDescription:
      "Painéis gerenciais, BI e indicadores customizados para empresas em crescimento.",
  },
  {
    id: "fallback-sites-landing-pages",
    title: "Sites e Landing Pages",
    slug: "sites-landing-pages",
    headline: "Páginas premium orientadas a conversão e SEO",
    description:
      "Criamos sites institucionais e landing pages de alta performance com tracking, testes A/B e foco comercial.",
    problemSolved:
      "Sites lentos, genéricos ou sem estrutura comercial para captar leads qualificados.",
    deliverables: [
      "Design premium alinhado à marca",
      "Copy e estrutura de conversão",
      "SEO técnico e analytics",
      "Integração com CRM e formulários",
    ],
    technologies: ["Next.js", "Tailwind CSS", "GA4", "GTM", "Vercel", "Schema.org"],
    targetAudience:
      "Empresas que precisam vender, captar leads e transmitir autoridade digital.",
    ctaLabel: "Criar página de alta conversão",
    seoTitle: "Sites e Landing Pages Premium | Nangell Creative Studio",
    seoDescription:
      "Sites institucionais e landing pages de alta conversão com performance e SEO.",
  },
] as const;

export const SERVICE_SLUGS = FALLBACK_SERVICES.map((service) => service.slug);
