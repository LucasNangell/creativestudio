import { brandAssets } from "@/data/brand-assets";
import { homeSeo } from "@/data/home";

export const siteConfig = {
  name: "Nangell Creative Studio",
  legalName: "Nangell Creative Studio",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://nangellcreativestudio.online",
  description: homeSeo.description,
  keywords: [...homeSeo.keywords],
  locale: "pt_BR",
  defaultTitle:
    "Nangell Creative Studio | Desenvolvimento de Softwares Sob Medida",
  titleTemplate: "%s | Nangell Creative Studio",
  ogImage: brandAssets.logoHorizontalDark,
  email: "contato@nangell.com.br",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5561982015585",
  sameAs: [
    "https://www.linkedin.com/company/nangell-creative-studio",
    "https://instagram.com/nangellcreativestudio",
  ],
} as const;

export function getSiteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getAbsoluteAssetUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return getSiteUrl(path);
}
