export const diagnosticoSeo = {
  title: "Diagnóstico gratuito",
  description:
    "Conte seu desafio em um briefing guiado. A Nangell Creative Studio analisa escopo, prazo e investimento para indicar o melhor caminho técnico.",
  keywords: [
    "diagnóstico software",
    "briefing projeto",
    "orçamento sistema",
    "Nangell Creative Studio",
  ],
} as const;

export const diagnosticoHero = {
  eyebrow: "Diagnóstico estratégico",
  title: "Vamos entender seu projeto em 6 passos",
  description:
    "Leva cerca de 3 minutos. Suas respostas ajudam nossa equipe a preparar uma conversa objetiva, sem compromisso.",
} as const;

export const DIAGNOSTIC_DRAFT_STORAGE_KEY = "nangell-diagnostico-draft";
export const LEAD_SUCCESS_STORAGE_KEY = "nangell-lead-success";
export const LEAD_API_ENDPOINT = "/api/leads";

export const diagnosticoSteps = [
  { id: 1, title: "Identificação", description: "Quem você é e onde atua" },
  { id: 2, title: "Tipo de projeto", description: "O que você precisa construir" },
  { id: 3, title: "Desafio", description: "Problema e contexto" },
  { id: 4, title: "Momento", description: "Urgência e prazo" },
  { id: 5, title: "Investimento", description: "Faixa de budget" },
  { id: 6, title: "Finalização", description: "Contato e consentimento" },
] as const;
