export const contatoSeo = {
  title: "Contato",
  description:
    "Entre em contato com a Nangell Creative Studio. Formulário, e-mail e WhatsApp para solicitar orçamento, diagnóstico ou tirar dúvidas sobre desenvolvimento de software sob medida.",
  keywords: [
    "contato Nangell",
    "orçamento software",
    "WhatsApp",
    "desenvolvimento sob medida",
  ],
} as const;

export const contatoHero = {
  eyebrow: "Contato",
  title: "Vamos conversar sobre seu projeto",
  description:
    "Conte sua ideia, processo ou desafio operacional. Respondemos em até 1 dia útil com orientação clara sobre próximos passos.",
} as const;

export const contatoInfo = {
  email: "contato@nangell.com.br",
  emailLabel: "E-mail comercial",
  whatsappLabel: "WhatsApp",
  whatsappHint: "Resposta mais rápida em horário comercial",
  horario: "Segunda a sexta, 9h às 18h (horário de Brasília)",
} as const;

/** Endpoint de captação de leads (diagnóstico e contato). */
export const CONTACT_LEAD_ENDPOINT = "/api/leads" as const;

export const obrigadoSeo = {
  title: "Mensagem recebida",
  description:
    "Obrigado pelo contato com a Nangell Creative Studio. Sua mensagem foi recebida e nossa equipe retornará em breve.",
} as const;

export const obrigadoContent = {
  title: "Recebemos seu briefing!",
  description:
    "Obrigado por confiar na Nangell Creative Studio. Nossa equipe analisará suas respostas e retornará em até 1 dia útil com orientação personalizada.",
  diagnosticTitle: "Diagnóstico enviado com sucesso!",
  diagnosticDescription:
    "Seu briefing foi registrado. Em breve entraremos em contato com próximos passos, escopo preliminar e sugestão de caminho técnico.",
  contactTitle: "Mensagem recebida!",
  contactDescription:
    "Obrigado pelo contato. Nossa equipe revisará sua mensagem e responderá pelo canal que você preferir.",
  nextSteps: [
    {
      step: 1,
      title: "Análise da solicitação",
      description: "Nossa equipe revisa seu briefing e identifica a melhor abordagem técnica.",
    },
    {
      step: 2,
      title: "Retorno personalizado",
      description: "Entramos em contato por e-mail ou WhatsApp com orientação e próximos passos.",
    },
    {
      step: 3,
      title: "Diagnóstico estratégico",
      description: "Se fizer sentido, agendamos uma conversa para mapear escopo, prazo e investimento.",
    },
  ],
  portfolioCta: { label: "Ver portfólio", href: "/portfolio" },
  demosCta: { label: "Experimentar demos", href: "/#demos" },
  diagnosticoCta: { label: "Enviar outro diagnóstico", href: "/diagnostico" },
  whatsappMessage:
    "Olá! Acabei de enviar meu briefing pelo site da Nangell Creative Studio e gostaria de acelerar a conversa.",
} as const;
