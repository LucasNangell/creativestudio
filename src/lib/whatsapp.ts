export const WHATSAPP_NUMBER = "5561982015585";

export type WhatsAppContext = {
  name?: string;
  company?: string;
  source?: "diagnostico" | "contato" | "obrigado" | "demo" | "geral";
  projectType?: string;
};

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? defaultWhatsAppMessage());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function defaultWhatsAppMessage(): string {
  return "Olá! Vim pelo site da Nangell Creative Studio e gostaria de conversar sobre um projeto.";
}

export function buildContextualWhatsAppMessage(context: WhatsAppContext = {}): string {
  const { name, company, source = "geral", projectType } = context;
  const greeting = name ? `Olá! Meu nome é ${name}.` : "Olá!";

  switch (source) {
    case "diagnostico":
      return [
        greeting,
        company ? `Represento a ${company}.` : null,
        "Acabei de enviar o formulário de diagnóstico no site da Nangell Creative Studio.",
        projectType ? `Tipo de projeto: ${projectType}.` : null,
        "Gostaria de acelerar a conversa sobre próximos passos.",
      ]
        .filter(Boolean)
        .join(" ");

    case "contato":
      return [
        greeting,
        company ? `Empresa: ${company}.` : null,
        "Enviei uma mensagem pelo formulário de contato e gostaria de continuar a conversa.",
      ]
        .filter(Boolean)
        .join(" ");

    case "obrigado":
      return [
        greeting,
        company ? `Da empresa ${company}.` : null,
        "Acabei de enviar meu briefing pelo site e gostaria de falar com a equipe.",
      ]
        .filter(Boolean)
        .join(" ");

    case "demo":
      return [
        greeting,
        "Experimentei uma demonstração interativa no site da Nangell e quero um sistema parecido.",
      ].join(" ");

    default:
      return defaultWhatsAppMessage();
  }
}

export function buildContextualWhatsAppUrl(context: WhatsAppContext = {}): string {
  return buildWhatsAppUrl(buildContextualWhatsAppMessage(context));
}
