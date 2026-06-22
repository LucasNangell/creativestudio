import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Code2,
  Eye,
  Heart,
  Layers,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";

export const sobreSeo = {
  title: "Sobre a Nangell Creative Studio",
  description:
    "Conheça a história, manifesto, missão e valores da Nangell Creative Studio — estúdio de engenharia criativa especializado em software sob medida para empresas que querem crescer com tecnologia.",
  keywords: [
    "Nangell Creative Studio",
    "software house",
    "desenvolvimento sob medida",
    "engenharia de software",
    "cultura técnica",
  ],
} as const;

export const sobreHero = {
  eyebrow: "Quem somos",
  title: "Engenharia criativa com visão de negócio",
  description:
    "A Nangell Creative Studio nasceu da convicção de que software de verdade não é commodity — é infraestrutura estratégica que libera tempo, reduz custos e acelera crescimento.",
} as const;

export const sobreHistoria = {
  title: "Nossa história",
  paragraphs: [
    "A Nangell Creative Studio surgiu quando percebemos um padrão recorrente no mercado: empresas com processos sólidos presas a planilhas, sistemas legados ou ferramentas genéricas que não conversavam entre si.",
    "Fundada por profissionais com experiência em desenvolvimento full stack, produto digital e operação de negócios, o estúdio foi estruturado para unir engenharia rigorosa com sensibilidade comercial — cada projeto começa pelo impacto no negócio, não pela stack.",
    "Hoje atendemos empresas de médio e grande porte que precisam de sistemas web, mobile, desktop, automações, dashboards e SaaS construídos sob medida, com o próprio site da Nangell como prova viva da nossa capacidade técnica e de design.",
  ],
  milestones: [
    { year: "Origem", label: "Identificação da lacuna entre código e resultado de negócio" },
    { year: "Fundação", label: "Nascimento da Nangell como estúdio de engenharia criativa" },
    { year: "Evolução", label: "Portfólio com demos interativas e metodologia em 6 etapas" },
    { year: "Hoje", label: "Parceiro técnico de empresas que transformam operação em software" },
  ],
} as const;

export const sobreManifesto = {
  title: "Manifesto da marca",
  quote:
    "Acreditamos que software bem construído é silencioso — funciona, escala e libera pessoas para fazer o que importa.",
  principles: [
    "Código limpo não é luxo; é responsabilidade com quem vai manter o sistema amanhã.",
    "Design não é enfeite — é a interface entre a complexidade técnica e a decisão do usuário.",
    "Entrega parcial e transparente supera promessa grandiosa sem visibilidade.",
    "Segurança, performance e acessibilidade entram no escopo desde o primeiro commit.",
  ],
} as const;

export type SobreValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const sobreMissao = {
  title: "Missão",
  description:
    "Transformar desafios operacionais e oportunidades de negócio em software sob medida — seguro, performático e evolutivo — que gere resultado mensurável para nossos clientes.",
} as const;

export const sobreVisao = {
  title: "Visão",
  description:
    "Ser referência em engenharia criativa no Brasil, reconhecida por entregar sistemas que provam competência técnica antes mesmo da primeira reunião comercial.",
} as const;

export const sobreValores: SobreValue[] = [
  {
    icon: Target,
    title: "Foco em resultado",
    description:
      "Cada entrega é avaliada pelo impacto no processo, na receita ou na eficiência — não pela quantidade de features.",
  },
  {
    icon: Shield,
    title: "Integridade técnica",
    description:
      "Padrões de código, testes, documentação e segurança fazem parte do produto, não são itens opcionais.",
  },
  {
    icon: Users,
    title: "Parceria transparente",
    description:
      "Comunicação clara, cronogramas realistas e visibilidade total do andamento em cada sprint.",
  },
  {
    icon: Heart,
    title: "Cuidado com o usuário final",
    description:
      "UX pensada para quem opera o sistema todos os dias — operadores, gestores e clientes finais.",
  },
];

export const sobreDiferenciaisTecnicos: SobreValue[] = [
  {
    icon: Code2,
    title: "Stack moderna e comprovada",
    description:
      "Next.js, TypeScript, React, Node.js, Python, Prisma e MySQL — escolhidas por maturidade, performance e ecossistema.",
  },
  {
    icon: Layers,
    title: "Arquitetura modular",
    description:
      "Separação clara entre frontend, backend, serviços e integrações para evoluir sem reescrever do zero.",
  },
  {
    icon: Zap,
    title: "Performance como requisito",
    description:
      "Core Web Vitals, lazy loading, otimização de queries e deploy com monitoramento desde o lançamento.",
  },
  {
    icon: Brain,
    title: "Automação e IA aplicada",
    description:
      "Bots, fluxos inteligentes e integrações com modelos de IA quando fazem sentido operacional e financeiro.",
  },
  {
    icon: Eye,
    title: "Show, don't tell",
    description:
      "Demos interativas no próprio site para que o cliente experimente usabilidade e inteligência antes de contratar.",
  },
  {
    icon: Shield,
    title: "Segurança em camadas",
    description:
      "Validação server-side, sanitização, rate limiting, LGPD e boas práticas OWASP em formulários e APIs.",
  },
];

export const sobreNaoSomosCodificadores = {
  title: "Não somos apenas codificadores",
  description:
    "Desenvolver software vai além de escrever código. Atuamos como parceiros de engenharia que entendem processo, operação e estratégia.",
  points: [
    {
      title: "Diagnóstico de negócio",
      description:
        "Mapeamos gargalos, custos ocultos e oportunidades antes de definir escopo técnico.",
    },
    {
      title: "Produto, não só projeto",
      description:
        "Pensamos em evolução, métricas de uso e roadmap — software que cresce com a empresa.",
    },
    {
      title: "Comunicação executiva",
      description:
        "Relatórios e entregas em linguagem acessível para gestores, não apenas para desenvolvedores.",
    },
    {
      title: "Transferência de conhecimento",
      description:
        "Documentação, treinamento e handoff para que sua equipe opere e evolua com autonomia.",
    },
  ],
} as const;

export const sobreStackVisual = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Prisma",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "Framer Motion",
  "APIs REST",
  "WebSockets",
  "GA4 / GTM",
  "LGPD",
] as const;

export const sobreCta = {
  title: "Pronto para conhecer como podemos ajudar sua operação?",
  description:
    "Agende um diagnóstico inicial sem compromisso. Entendemos seu cenário e indicamos o caminho técnico mais eficiente.",
  primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Ver nosso processo", href: "/processo" },
} as const;
