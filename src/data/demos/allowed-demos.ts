import { IFRAME_DEMO_SLUGS } from "./iframe-demos";
import { IMPORTED_PORTFOLIO_PROJECTS } from "../projects/imported-portfolio-projects";

/** Slugs de projetos/demos reais integrados do portfolio-imports. */
export const ALLOWED_PORTFOLIO_SLUGS = IMPORTED_PORTFOLIO_PROJECTS.map((p) => p.slug);

export const ALLOWED_DEMO_SLUGS = [
  ...IFRAME_DEMO_SLUGS,
  "sharescreen-lan",
  "site-psicologia-profissional",
] as const;

/** Demos legadas removidas — redirecionam para /portfolio. */
export const LEGACY_DEMO_SLUGS = [
  "crm-inteligente",
  "dashboard-bi",
  "gestao-os",
  "plataforma-educacional",
  "link-qr",
  "monitoramento-tempo-real",
] as const;
