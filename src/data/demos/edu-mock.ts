export type EduQuizOption = {
  id: string;
  text: string;
  correct: boolean;
};

export type EduQuizQuestion = {
  id: string;
  question: string;
  options: EduQuizOption[];
};

export type EduModule = {
  id: string;
  title: string;
  duration: string;
  progress: number;
  locked?: boolean;
};

export const EDU_COURSE = {
  title: "Product Design para SaaS B2B",
  instructor: "Prof. Helena Martins",
  totalProgress: 62,
  modules: [
    { id: "m1", title: "Fundamentos de UX Research", duration: "45 min", progress: 100 },
    { id: "m2", title: "Arquitetura de Informação", duration: "38 min", progress: 100 },
    { id: "m3", title: "Design Systems Escaláveis", duration: "52 min", progress: 75 },
    { id: "m4", title: "Prototipação e Handoff", duration: "41 min", progress: 30 },
    { id: "m5", title: "Métricas de Produto", duration: "35 min", progress: 0, locked: true },
  ] satisfies EduModule[],
  materials: [
    "Checklist de discovery.pdf",
    "Template de user journey.fig",
    "Guia de componentes, referência",
    "Planilha de priorização RICE.xlsx",
  ],
};

export const EDU_QUIZ: EduQuizQuestion[] = [
  {
    id: "q1",
    question: "Qual métrica mede melhor a retenção inicial em um SaaS B2B?",
    options: [
      { id: "a", text: "Taxa de bounce da landing page", correct: false },
      { id: "b", text: "Ativação nos primeiros 7 dias", correct: true },
      { id: "c", text: "Número de páginas do site", correct: false },
      { id: "d", text: "Seguidores em redes sociais", correct: false },
    ],
  },
  {
    id: "q2",
    question: "O que caracteriza um Design System maduro?",
    options: [
      { id: "a", text: "Apenas uma biblioteca de ícones", correct: false },
      { id: "b", text: "Documentação, tokens e componentes versionados", correct: true },
      { id: "c", text: "Mockups estáticos sem código", correct: false },
      { id: "d", text: "Paleta de cores escolhida pelo CEO", correct: false },
    ],
  },
  {
    id: "q3",
    question: "Na priorização RICE, o 'C' representa:",
    options: [
      { id: "a", text: "Custo de desenvolvimento", correct: false },
      { id: "b", text: "Confiança (Confidence)", correct: true },
      { id: "c", text: "Conversão de marketing", correct: false },
      { id: "d", text: "Crescimento de churn", correct: false },
    ],
  },
];

export const EDU_MINDMAP_NODES = [
  "Discovery contínuo",
  "Jobs to be Done",
  "Personas operacionais",
  "Design tokens",
  "Componentes reutilizáveis",
  "Handoff dev-ready",
  "North Star Metric",
  "Cohort analysis",
];
