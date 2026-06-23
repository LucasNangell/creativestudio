import type { Metadata } from "next";

import { LegalDocument } from "@/app/_components/institutional/legal-document";
import {
  politicaPrivacidadeSections,
  politicaPrivacidadeSeo,
} from "@/data/institutional/legal";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: politicaPrivacidadeSeo.title,
  description: politicaPrivacidadeSeo.description,
  path: "/politica-de-privacidade",
  keywords: [...politicaPrivacidadeSeo.keywords],
});

export default function PoliticaPrivacidadePage() {
  return (
    <LegalDocument
      title="Política de Privacidade"
      lastUpdated="junho de 2026"
      intro="Esta política descreve como a Nangell Creative Studio trata dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018)."
      sections={politicaPrivacidadeSections}
    />
  );
}
