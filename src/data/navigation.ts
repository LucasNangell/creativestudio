import {
  buildContextualWhatsAppUrl,
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";

export type NavLink = {
  label: string;
  href: string;
};

export const mainNavLinks: NavLink[] = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Processo", href: "/processo" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export const footerNavLinks: NavLink[] = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Processo", href: "/processo" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Contato", href: "/contato" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export const siteContact = {
  email: "contato@nangell.com.br",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? WHATSAPP_NUMBER,
  whatsappMessage: defaultWhatsAppMessage(),
} as const;

export { buildWhatsAppUrl, buildContextualWhatsAppUrl };
