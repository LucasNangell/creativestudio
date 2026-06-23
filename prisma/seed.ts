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

import { IMPORTED_PORTFOLIO_PROJECTS } from "../src/data/projects/imported-portfolio-projects";
import { FALLBACK_POSTS } from "../src/data/blog/fallback-posts";

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
  const allowedSlugs = IMPORTED_PORTFOLIO_PROJECTS.map((project) => project.slug);

  await prisma.project.deleteMany({
    where: { slug: { notIn: allowedSlugs } },
  });

  const projects = IMPORTED_PORTFOLIO_PROJECTS.map((project) => {
    const { id: _seedId, ...rest } = project;
    void _seedId;
    return rest;
  });

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
  for (const post of FALLBACK_POSTS) {
    const { id: _id, createdAt, updatedAt, status, ...data } = post;
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        ...data,
        status: PostStatus.PUBLISHED,
        updatedAt: new Date(),
      },
      create: {
        ...data,
        status: PostStatus.PUBLISHED,
        createdAt,
        updatedAt,
      },
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
      value: "Brasília, DF, Atendimento remoto e presencial sob demanda",
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
