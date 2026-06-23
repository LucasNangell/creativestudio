import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardList,
  Code2,
  Eye,
  Layout,
  LineChart,
  ListChecks,
  MessageSquare,
  Puzzle,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  TestTube2,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

export const sobreSeo = {
  title: "Sobre a Nangell Creative Studio",
  description:
    "Conheça a Nangell Creative Studio, empresa fundada por João Lucas Nangell para tornar sistemas personalizados, automações e soluções digitais mais acessíveis para empresas que querem ganhar eficiência, economizar tempo e crescer com tecnologia.",
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
  eyebrow: "Sobre a Nangell Creative Studio",
  title:
    "Tecnologia sob medida para empresas que querem ganhar tempo, reduzir custos e crescer com mais controle",
  description:
    "A Nangell Creative Studio nasceu para tornar sistemas personalizados, automações e soluções digitais mais acessíveis para empresas de todos os tamanhos, da microempresa que precisa organizar sua rotina até operações maiores que buscam eficiência, integração e escala.",
  complement:
    "Aqui, tecnologia não é tratada como luxo nem como algo distante da realidade do negócio. Cada projeto é pensado para resolver problemas concretos, simplificar processos, economizar horas de trabalho e transformar tarefas repetitivas em fluxos mais inteligentes.",
  primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Ver soluções", href: "/solucoes" },
  card: {
    title: "Software com visão de negócio",
    description:
      "Sistemas web, automações, dashboards, integrações e plataformas personalizadas criadas para melhorar a operação real da sua empresa, sem estruturas infladas, sem soluções genéricas e sem custos desnecessários.",
    highlights: [
      "Diagnóstico antes do orçamento",
      "Desenvolvimento sob medida",
      "Foco em economia de tempo",
      "Atendimento direto com o fundador",
      "Soluções pensadas para evoluir",
    ],
  },
} as const;

export const sobreHistoria = {
  title: "Por que a Nangell foi criada",
  paragraphs: [
    "A Nangell Creative Studio foi fundada por João Lucas Nangell com um objetivo claro: popularizar o acesso a sistemas personalizados e mostrar que tecnologia de alto impacto não precisa estar restrita a grandes empresas ou projetos com orçamentos inacessíveis.",
    "Muitas empresas ainda dependem de planilhas, controles manuais, mensagens soltas, retrabalho e sistemas genéricos que não acompanham a forma como a operação realmente funciona. O resultado é perda de tempo, falhas de comunicação, dificuldade para enxergar dados importantes e decisões tomadas sem informação suficiente.",
    "A Nangell nasceu para mudar esse cenário. A proposta é criar sistemas, automações e soluções digitais que se adaptem ao processo do cliente, e não o contrário. Em vez de empurrar ferramentas prontas e limitadas, o trabalho começa pelo entendimento do negócio, dos gargalos e das oportunidades de ganho.",
    "O objetivo é simples: entregar tecnologia personalizada, profissional e eficiente, com investimento mais inteligente do que modelos tradicionais de desenvolvimento, sem abrir mão de qualidade, segurança, organização e experiência do usuário.",
  ],
  milestones: [
    {
      year: "Percepção do problema",
      label:
        "Empresas de diferentes portes perdem produtividade todos os dias por dependerem de processos manuais, ferramentas desconectadas e sistemas que não foram feitos para a realidade delas.",
    },
    {
      year: "Fundação",
      label:
        "João Lucas Nangell funda a Nangell Creative Studio com a missão de aproximar empresas da tecnologia sob medida, tornando sistemas personalizados mais acessíveis, claros e aplicáveis.",
    },
    {
      year: "Método",
      label:
        "A empresa passa a trabalhar com diagnóstico, planejamento, prototipação, desenvolvimento e evolução contínua, sempre conectando tecnologia ao resultado esperado pelo cliente.",
    },
    {
      year: "Hoje",
      label:
        "A Nangell atua como parceira técnica para empresas que desejam organizar processos, automatizar rotinas, criar dashboards, desenvolver sistemas e transformar ideias em soluções digitais reais.",
    },
  ],
} as const;

export type SobreProblemCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const sobreProblemas = {
  title: "Sua empresa não precisa se adaptar a ferramentas limitadas",
  paragraphs: [
    "O crescimento de uma empresa costuma revelar gargalos que antes pareciam pequenos: controles paralelos, retrabalho, falta de integração entre setores, dificuldade para acompanhar indicadores, dependência de tarefas manuais e perda de informações importantes.",
    "Quando isso acontece, é comum tentar resolver tudo com mais planilhas, mais mensagens, mais conferências e mais ferramentas prontas. Mas, muitas vezes, o verdadeiro ganho está em construir uma solução que acompanhe a lógica da operação.",
  ],
  cards: [
    {
      icon: ClipboardList,
      title: "Processos manuais",
      description:
        "Tarefas repetitivas consomem tempo da equipe e aumentam o risco de falhas. Automatizar esses fluxos libera pessoas para atividades mais estratégicas.",
    },
    {
      icon: Puzzle,
      title: "Dados espalhados",
      description:
        "Quando cada informação está em um lugar, a gestão perde velocidade. Sistemas personalizados centralizam dados e tornam decisões mais claras.",
    },
    {
      icon: Target,
      title: "Ferramentas genéricas",
      description:
        "Softwares prontos podem ajudar no início, mas nem sempre acompanham processos específicos. A solução sob medida nasce a partir da realidade do negócio.",
    },
    {
      icon: BarChart3,
      title: "Falta de visibilidade",
      description:
        "Dashboards e relatórios transformam dados operacionais em indicadores visuais, facilitando o acompanhamento de resultados, pendências e oportunidades.",
    },
  ] satisfies SobreProblemCard[],
} as const;

export const sobreProposito = {
  title: "Tecnologia acessível, útil e feita para gerar resultado",
  paragraphs: [
    "O propósito da Nangell é democratizar o acesso a soluções digitais personalizadas. Isso significa criar tecnologia que faça sentido para a realidade financeira, operacional e estratégica de cada cliente.",
    "Nem toda empresa precisa começar com um sistema enorme. Muitas vezes, o melhor caminho é iniciar com uma solução objetiva, resolver o problema mais urgente, validar o ganho e evoluir aos poucos. Essa abordagem reduz riscos, evita desperdício e permite que o investimento acompanhe o crescimento do negócio.",
    "A Nangell acredita que um bom sistema não é aquele que impressiona apenas pela aparência ou pela quantidade de funcionalidades. Um bom sistema é aquele que funciona bem, é fácil de usar, melhora a rotina da equipe e entrega valor mensurável.",
  ],
  quote:
    "Tecnologia eficiente não complica a operação. Ela remove obstáculos, organiza processos e cria espaço para a empresa crescer.",
} as const;

export type SobreProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const sobreProcesso = {
  title: "Um processo claro para transformar necessidade em solução",
  description:
    "Cada projeto é conduzido com método, comunicação direta e foco no que realmente gera valor para o cliente.",
  steps: [
    {
      step: "01",
      title: "Diagnóstico",
      description:
        "Entendemos o cenário atual, os processos envolvidos, os gargalos, as ferramentas utilizadas e o objetivo principal da solução.",
      icon: Search,
    },
    {
      step: "02",
      title: "Definição do escopo",
      description:
        "Organizamos o que será desenvolvido, quais funcionalidades são essenciais, quais podem ficar para fases futuras e qual será o melhor caminho técnico.",
      icon: ListChecks,
    },
    {
      step: "03",
      title: "Protótipo e experiência do usuário",
      description:
        "Antes de construir, estruturamos telas, fluxos e jornadas para garantir que a solução seja simples, intuitiva e adequada à rotina de quem vai usar.",
      icon: Layout,
    },
    {
      step: "04",
      title: "Desenvolvimento",
      description:
        "Criamos o sistema com tecnologias modernas, arquitetura organizada, boas práticas de segurança e atenção à performance.",
      icon: Code2,
    },
    {
      step: "05",
      title: "Testes e ajustes",
      description:
        "Validamos funcionalidades, corrigimos inconsistências, ajustamos detalhes de usabilidade e preparamos a solução para uso real.",
      icon: TestTube2,
    },
    {
      step: "06",
      title: "Entrega e evolução",
      description:
        "Após a entrega, o sistema pode continuar evoluindo com novas funcionalidades, melhorias e integrações conforme a necessidade do negócio.",
      icon: Rocket,
    },
  ] satisfies SobreProcessStep[],
} as const;

export const sobreFundador = {
  title: "Estrutura enxuta, acompanhamento próximo e responsabilidade direta",
  paragraphs: [
    "A Nangell Creative Studio é conduzida diretamente por João Lucas Nangell, fundador da empresa e responsável por transformar cada necessidade do cliente em uma solução digital planejada, desenvolvida e acompanhada de perto.",
    "Essa estrutura enxuta é uma escolha estratégica. Em vez de processos engessados, camadas desnecessárias e comunicação fragmentada, o cliente tem contato direto com quem entende o projeto, toma decisões técnicas e acompanha a entrega do início ao fim.",
    "Na prática, isso significa mais clareza, mais velocidade na comunicação e mais responsabilidade sobre o resultado. Cada projeto é selecionado e planejado com escopo compatível, garantindo atenção real aos detalhes e compromisso com a qualidade.",
    "O foco não está em parecer grande. Está em entregar bem, com transparência, proximidade e soluções que realmente funcionem para o negócio do cliente.",
  ],
  quote:
    "Você não fala com uma estrutura distante. Você fala diretamente com quem vai entender, planejar e construir a solução.",
  member: {
    name: "João Lucas Nangell",
    role: "Fundador da Nangell Creative Studio",
    description:
      "Responsável pelo diagnóstico, planejamento, desenvolvimento e evolução das soluções digitais criadas pela Nangell.",
    avatar: "/assets/brand/icon.png",
    skills: [
      "Desenvolvimento web",
      "Sistemas personalizados",
      "Automações",
      "Dashboards",
      "Integrações",
      "Experiência do usuário",
      "Estratégia digital",
    ],
  },
} as const;

export type SobreValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const sobreMissaoVisao = {
  title: "O que guia cada projeto",
  missao: {
    title: "Missão",
    description:
      "Criar sistemas personalizados, automações e soluções digitais que tornem empresas mais eficientes, organizadas e preparadas para crescer, com tecnologia acessível, segura e orientada a resultado.",
  },
  visao: {
    title: "Visão",
    description:
      "Ser reconhecida como uma empresa que aproxima negócios de todos os portes da tecnologia sob medida, entregando soluções profissionais, úteis e financeiramente viáveis.",
  },
  posicionamento: {
    title: "Posicionamento",
    description:
      "A Nangell Creative Studio une desenvolvimento, estratégia e visão operacional para criar soluções digitais que resolvem problemas reais, sem exageros, sem complexidade desnecessária e sem promessas vazias.",
  },
  valores: [
    {
      icon: Eye,
      title: "Clareza",
      description:
        "Explicamos decisões técnicas de forma objetiva, para que o cliente entenda o que está sendo feito e por quê.",
    },
    {
      icon: Zap,
      title: "Eficiência",
      description:
        "Priorizamos soluções que economizam tempo, reduzem retrabalho e geram impacto direto na operação.",
    },
    {
      icon: Shield,
      title: "Responsabilidade técnica",
      description:
        "Cuidamos da estrutura, segurança, organização e manutenção do sistema desde o planejamento.",
    },
    {
      icon: TrendingUp,
      title: "Evolução contínua",
      description:
        "Criamos soluções que podem crescer em fases, acompanhando a maturidade e as necessidades do negócio.",
    },
  ] satisfies SobreValue[],
} as const;

export const sobreDiferenciais = {
  title: "Por que escolher a Nangell",
  description:
    "A diferença está em unir tecnologia, visão de negócio e uma estrutura de entrega mais direta e eficiente.",
  items: [
    {
      icon: Search,
      title: "Diagnóstico antes da proposta",
      description:
        "Antes de falar em preço ou tecnologia, entendemos o problema. Isso evita orçamentos genéricos e aumenta a chance de entregar exatamente o que a empresa precisa.",
    },
    {
      icon: Sparkles,
      title: "Soluções sob medida",
      description:
        "Cada sistema é pensado a partir da realidade do cliente, considerando fluxo de trabalho, equipe, volume de dados, objetivos e possibilidades de evolução.",
    },
    {
      icon: Wallet,
      title: "Investimento mais inteligente",
      description:
        "A estrutura enxuta permite reduzir custos sem transformar qualidade em item opcional. O foco é entregar o necessário com eficiência, organização e possibilidade de crescimento.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação direta",
      description:
        "O cliente acompanha o projeto com clareza, sem depender de intermediários desnecessários ou explicações confusas.",
    },
    {
      icon: Layout,
      title: "Design funcional",
      description:
        "As telas são pensadas para facilitar a rotina do usuário, reduzir dúvidas e tornar o sistema agradável de usar no dia a dia.",
    },
    {
      icon: LineChart,
      title: "Tecnologia com propósito",
      description:
        "Não usamos tecnologia apenas por tendência. Cada ferramenta, integração ou automação precisa fazer sentido para o resultado esperado.",
    },
  ] satisfies SobreValue[],
} as const;

export const sobrePublico = {
  title: "A Nangell é ideal para empresas que querem evoluir com tecnologia, mas sem complicação",
  idealFor: [
    "Empresas que usam muitas planilhas e querem centralizar informações.",
    "Negócios que dependem de tarefas repetitivas e querem automatizar processos.",
    "Gestores que precisam acompanhar indicadores com mais clareza.",
    "Empresas que querem criar um sistema próprio, mas começar de forma segura e gradual.",
    "Operações que já usam ferramentas prontas, mas sentem limitações no dia a dia.",
    "Profissionais que querem transformar uma ideia em produto digital.",
  ],
  notYetFor: [
    "A empresa ainda não sabe qual problema deseja resolver.",
    "Não há disponibilidade para participar do diagnóstico inicial.",
    "A expectativa é criar um sistema complexo sem planejamento.",
    "O objetivo é apenas ter “um app” ou “um site” sem conexão com resultado.",
  ],
  complement:
    "Quando existe clareza sobre o problema, mesmo que a solução ainda não esteja definida, o projeto tem muito mais chance de gerar retorno. Por isso, a primeira etapa é sempre entender a realidade do negócio antes de propor qualquer desenvolvimento.",
} as const;

export const sobreCta = {
  title: "Vamos descobrir como a tecnologia pode melhorar sua operação?",
  description:
    "Solicite um diagnóstico inicial e conte o que sua empresa precisa organizar, automatizar ou transformar em sistema. A partir disso, indicamos o caminho mais eficiente para começar com segurança, clareza e investimento adequado.",
  primaryCta: { label: "Solicitar diagnóstico", href: "/diagnostico" },
  secondaryCta: { label: "Conhecer o processo", href: "/processo" },
} as const;
