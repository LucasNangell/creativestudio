import {
  DemoType,
  PostStatus,
  PrismaClient,
  ProjectStatus,
  ServiceStatus,
  TestimonialStatus,
  UserRole,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@nangell.com.br";
const ADMIN_PASSWORD = "NangellAdmin@2026";

async function seedUsers() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: "Administrador Nangell",
      passwordHash,
      role: UserRole.ADMIN,
    },
    create: {
      name: "Administrador Nangell",
      email: ADMIN_EMAIL,
      passwordHash,
      role: UserRole.ADMIN,
    },
  });
}

async function seedServices() {
  const services = [
    {
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
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { ...service, status: ServiceStatus.ACTIVE },
      create: { ...service, status: ServiceStatus.ACTIVE },
    });
  }
}

async function seedProjects() {
  const projects = [
    {
      title: "CRM Inteligente Comercial",
      slug: "crm-inteligente",
      category: "CRM",
      shortDescription:
        "Funil comercial com Kanban, automações e acompanhamento de oportunidades em tempo real.",
      fullDescription:
        "Plataforma comercial completa para equipes de vendas B2B, com funil visual, histórico de interações e indicadores de conversão.",
      problem:
        "A equipe comercial perdia leads por falta de visibilidade do funil e follow-ups inconsistentes.",
      solution:
        "Implementamos um CRM com Kanban drag-and-drop, timeline de contatos e alertas de follow-up automatizados.",
      features: ["Funil Kanban", "Timeline de contatos", "Simulador WhatsApp", "Dashboard comercial"],
      stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind CSS"],
      coverImage: "/assets/mockups/crm-inteligente.png",
      gallery: ["/assets/mockups/crm-inteligente.png"],
      metrics: [
        { label: "Conversão", value: "+38%", description: "Após padronização do funil" },
        { label: "Tempo de resposta", value: "-52%", description: "Com alertas automáticos" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/crm-inteligente",
      isFeatured: true,
      sortOrder: 1,
      seoTitle: "Case CRM Inteligente | Nangell Creative Studio",
      seoDescription: "Estudo de caso de CRM com funil Kanban e automações comerciais.",
    },
    {
      title: "Dashboard BI Financeiro",
      slug: "dashboard-bi",
      category: "Business Intelligence",
      shortDescription:
        "Painel executivo com KPIs financeiros, filtros temporais e alertas inteligentes.",
      fullDescription:
        "Dashboard gerencial integrado a múltiplas fontes de dados para acompanhamento de receita, margem e metas.",
      problem:
        "Relatórios financeiros demoravam dias para consolidar e não refletiam a operação em tempo real.",
      solution:
        "Centralizamos indicadores em um painel responsivo com filtros dinâmicos e alertas configuráveis.",
      features: ["Gráficos interativos", "Filtros temporais", "Alertas de meta", "Exportação executiva"],
      stack: ["Next.js", "Recharts", "Node.js", "PostgreSQL", "Redis"],
      coverImage: "/assets/mockups/dashboard-bi.png",
      gallery: ["/assets/mockups/dashboard-bi.png"],
      metrics: [
        { label: "Tempo de reporte", value: "-70%", description: "Consolidação automatizada" },
        { label: "Visibilidade", value: "100%", description: "KPIs críticos monitorados" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/dashboard-bi",
      isFeatured: true,
      sortOrder: 2,
      seoTitle: "Case Dashboard BI | Nangell Creative Studio",
      seoDescription: "Painel BI financeiro com KPIs e alertas em tempo real.",
    },
    {
      title: "Gestão de Ordens de Serviço",
      slug: "gestao-os",
      category: "Operações",
      shortDescription:
        "Controle de fila, status e timeline de ordens de serviço para times de campo.",
      fullDescription:
        "Sistema operacional para registrar, priorizar e acompanhar ordens de serviço com histórico completo.",
      problem:
        "Ordens de serviço eram controladas por WhatsApp e planilhas, gerando atrasos e retrabalho.",
      solution:
        "Criamos fluxo digital com fila priorizada, mudança de status e timeline auditável por OS.",
      features: ["Fila de OS", "Timeline de andamento", "Priorização", "Painel operacional"],
      stack: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
      coverImage: "/assets/mockups/gestao-os.png",
      gallery: ["/assets/mockups/gestao-os.png"],
      metrics: [
        { label: "SLA cumprido", value: "+44%", description: "Com fila priorizada" },
        { label: "Retrabalho", value: "-31%", description: "Histórico centralizado" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/gestao-os",
      isFeatured: true,
      sortOrder: 3,
      seoTitle: "Case Gestão de OS | Nangell Creative Studio",
      seoDescription: "Sistema de ordens de serviço com fila e timeline operacional.",
    },
    {
      title: "Plataforma Educacional LMS",
      slug: "plataforma-educacional",
      category: "EdTech",
      shortDescription:
        "Ambiente do aluno com módulos, player de vídeo, progresso e quizzes interativos.",
      fullDescription:
        "LMS completo para cursos online com trilhas de aprendizado, avaliações e acompanhamento de progresso.",
      problem:
        "Conteúdos educacionais estavam dispersos sem trilha clara nem mensuração de engajamento.",
      solution:
        "Entregamos área do aluno com progresso dinâmico, quizzes e dashboard de performance.",
      features: ["Dashboard do aluno", "Player de vídeo", "Quiz interativo", "Progresso por módulo"],
      stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Mux"],
      coverImage: "/assets/mockups/plataforma-educacional.png",
      gallery: ["/assets/mockups/plataforma-educacional.png"],
      metrics: [
        { label: "Conclusão de módulos", value: "+29%", description: "Com trilhas gamificadas" },
        { label: "Engajamento", value: "+41%", description: "Quizzes e feedback imediato" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/plataforma-educacional",
      isFeatured: true,
      sortOrder: 4,
      seoTitle: "Case Plataforma Educacional | Nangell Creative Studio",
      seoDescription: "LMS com área do aluno, quizzes e progresso dinâmico.",
    },
    {
      title: "Encurtador de Links e QR Code",
      slug: "link-qr",
      category: "SaaS",
      shortDescription:
        "Ferramenta de links encurtados, UTMs e geração de QR codes para campanhas.",
      fullDescription:
        "Micro-SaaS para marketing e operações com rastreamento de cliques, UTMs e QR codes dinâmicos.",
      problem:
        "Campanhas usavam links longos sem rastreabilidade consistente entre canais offline e online.",
      solution:
        "Desenvolvemos plataforma de encurtamento com UTMs, QR codes e analytics por campanha.",
      features: ["Encurtador de URL", "UTM builder", "QR Code generator", "Analytics de cliques"],
      stack: ["Next.js", "Node.js", "Redis", "PostgreSQL"],
      coverImage: "/assets/mockups/link-qr.png",
      gallery: ["/assets/mockups/link-qr.png"],
      metrics: [
        { label: "Rastreabilidade", value: "100%", description: "Campanhas com UTM padronizada" },
        { label: "Setup de campanha", value: "-60%", description: "Fluxo simplificado" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/link-qr",
      isFeatured: true,
      sortOrder: 5,
      seoTitle: "Case Encurtador e QR Code | Nangell Creative Studio",
      seoDescription: "SaaS de links encurtados, UTMs e QR codes para campanhas.",
    },
    {
      title: "Monitoramento em Tempo Real",
      slug: "monitoramento-tempo-real",
      category: "Observabilidade",
      shortDescription:
        "Feed crítico de logs e eventos com alertas visuais e sonoros configuráveis.",
      fullDescription:
        "Console de monitoramento para acompanhar eventos críticos, filas e incidentes operacionais.",
      problem:
        "Incidentes eram detectados tarde por falta de centralização de eventos críticos.",
      solution:
        "Implementamos stream simulado de logs com alertas, pausa de fila e severidade por evento.",
      features: ["Stream de eventos", "Alertas visuais/sonoros", "Filtros por severidade", "Pausar fila"],
      stack: ["Next.js", "WebSockets", "Node.js", "Redis", "Docker"],
      coverImage: "/assets/mockups/monitoramento-tempo-real.png",
      gallery: ["/assets/mockups/monitoramento-tempo-real.png"],
      metrics: [
        { label: "Detecção de incidentes", value: "-48%", description: "Alertas em tempo real" },
        { label: "Tempo de resposta", value: "-35%", description: "Centralização de eventos" },
      ],
      demoType: DemoType.NATIVE,
      demoRoute: "/demo/monitoramento-tempo-real",
      isFeatured: true,
      sortOrder: 6,
      seoTitle: "Case Monitoramento em Tempo Real | Nangell Creative Studio",
      seoDescription: "Console de monitoramento com feed de logs e alertas críticos.",
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...project, status: ProjectStatus.PUBLISHED },
      create: { ...project, status: ProjectStatus.PUBLISHED },
    });
  }
}

async function seedTestimonials() {
  const testimonials = [
    {
      clientName: "Mariana Costa",
      clientRole: "Diretora Comercial",
      company: "Atlas Indústria",
      content:
        "A Nangell transformou nosso funil comercial. Hoje enxergamos cada etapa e ganhamos previsibilidade nas vendas B2B.",
      rating: 5,
      image: "/assets/mockups/avatar-1.png",
    },
    {
      clientName: "Rafael Mendes",
      clientRole: "CEO",
      company: "Grupo Horizonte",
      content:
        "O dashboard entregue pela equipe virou nossa principal ferramenta de reunião executiva. Claro, rápido e confiável.",
      rating: 5,
      image: "/assets/mockups/avatar-2.png",
    },
    {
      clientName: "Camila Duarte",
      clientRole: "Head de Operações",
      company: "ServiPro",
      content:
        "Com a gestão de OS digital, reduzimos atrasos e eliminamos retrabalho entre campo e backoffice.",
      rating: 5,
      image: "/assets/mockups/avatar-3.png",
    },
    {
      clientName: "Lucas Ferreira",
      clientRole: "Fundador",
      company: "EduLab",
      content:
        "A plataforma educacional elevou nossa taxa de conclusão e deu uma experiência premium aos alunos.",
      rating: 5,
      image: "/assets/mockups/avatar-4.png",
    },
  ];

  await prisma.testimonial.deleteMany();

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: {
        ...testimonial,
        status: TestimonialStatus.APPROVED,
      },
    });
  }
}

async function seedPosts() {
  const posts = [
    {
      title: "Por que demonstrar software em ação converte mais que screenshots",
      slug: "demonstrar-software-em-acao",
      excerpt:
        "Show, don't tell: como demos interativas reduzem objeções e aceleram decisões em projetos B2B.",
      content:
        "## O problema das promessas vazias\n\nQuando uma empresa precisa contratar desenvolvimento de software, o maior risco percebido é comprar uma caixa preta.\n\n## A vantagem das demos interativas\n\nDemos simuladas no próprio site permitem que o visitante experimente fluxos reais antes do primeiro contato comercial.\n\n## Resultado para o negócio\n\nMais leads qualificados, conversas mais objetivas e percepção imediata de competência técnica.",
      coverImage: "/assets/mockups/post-demo.png",
      category: "Conversão",
      tags: ["demos", "b2b", "conversão", "produto"],
      author: "Nangell Creative Studio",
      publishedAt: new Date("2026-05-10T10:00:00.000Z"),
      seoTitle: "Demos interativas convertem mais que screenshots",
      seoDescription:
        "Entenda por que demonstrações interativas aumentam confiança e conversão em projetos de software.",
    },
    {
      title: "Arquitetura moderna para sistemas sob medida em 2026",
      slug: "arquitetura-moderna-sistemas-2026",
      excerpt:
        "Next.js, TypeScript, Prisma e observabilidade: a stack que usamos para escalar produtos digitais.",
      content:
        "## Fundação sólida\n\nTypeScript, validação em camadas e ORM tipado reduzem bugs e aceleram evolução.\n\n## Performance e SEO\n\nServer Components e renderização híbrida entregam velocidade sem sacrificar experiência.\n\n## Operacionalização\n\nLogs, métricas e deploy previsível são parte do produto, não um extra.",
      coverImage: "/assets/mockups/post-architecture.png",
      category: "Engenharia",
      tags: ["nextjs", "typescript", "prisma", "arquitetura"],
      author: "Nangell Creative Studio",
      publishedAt: new Date("2026-05-22T14:30:00.000Z"),
      seoTitle: "Arquitetura moderna para software sob medida",
      seoDescription:
        "Como estruturamos sistemas sob medida com Next.js, TypeScript e Prisma em 2026.",
    },
    {
      title: "Como estruturar um diagnóstico técnico antes de orçar software",
      slug: "diagnostico-tecnico-antes-do-orcamento",
      excerpt:
        "Briefings bem feitos economizam tempo, reduzem retrabalho e aumentam a assertividade da proposta.",
      content:
        "## Contexto e dor real\n\nAntes de falar de tecnologia, mapeamos processo, gargalos e impacto no negócio.\n\n## Escopo e prioridades\n\nDefinimos MVP, integrações críticas e indicadores de sucesso.\n\n## Próximo passo\n\nCom diagnóstico claro, a proposta deixa de ser chute e vira plano de execução.",
      coverImage: "/assets/mockups/post-diagnostico.png",
      category: "Processo",
      tags: ["diagnóstico", "briefing", "escopo", "consultoria"],
      author: "Nangell Creative Studio",
      publishedAt: new Date("2026-06-01T09:00:00.000Z"),
      seoTitle: "Diagnóstico técnico antes de orçar software",
      seoDescription:
        "Guia prático para estruturar diagnóstico técnico e briefing antes de contratar desenvolvimento.",
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { ...post, status: PostStatus.PUBLISHED },
      create: { ...post, status: PostStatus.PUBLISHED },
    });
  }
}

async function seedSiteSettings() {
  const settings = [
    { key: "site_name", value: "Nangell Creative Studio" },
    { key: "site_tagline", value: "Engenharia criativa para software sob medida" },
    { key: "contact_email", value: "contato@nangell.com.br" },
    { key: "contact_phone", value: "+55 61 98201-5585" },
    { key: "whatsapp_number", value: "5561982015585" },
    {
      key: "address",
      value: "Brasília, DF — Atendimento remoto e presencial sob demanda",
    },
    { key: "social_linkedin", value: "https://linkedin.com/company/nangell" },
    { key: "social_instagram", value: "https://instagram.com/nangell" },
    { key: "social_github", value: "https://github.com/nangell" },
    { key: "maintenance_mode", value: "false" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
}

async function main() {
  console.log("Seeding database...");

  await seedUsers();
  console.log("✓ Users");

  await seedServices();
  console.log("✓ Services");

  await seedProjects();
  console.log("✓ Projects");

  await seedTestimonials();
  console.log("✓ Testimonials");

  await seedPosts();
  console.log("✓ Posts");

  await seedSiteSettings();
  console.log("✓ Site settings");

  console.log("\nSeed completed successfully.");
  console.log(`Admin login: ${ADMIN_EMAIL}`);
  console.log(`Admin password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
