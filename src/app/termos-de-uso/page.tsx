import type { Metadata } from "next";

import { LegalDocument } from "@/app/_components/institutional/legal-document";
import { termosUsoSections, termosUsoSeo } from "@/data/institutional/legal";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: termosUsoSeo.title,
  description: termosUsoSeo.description,
  path: "/termos-de-uso",
  keywords: [...termosUsoSeo.keywords],
});

export default function TermosUsoPage() {
  return (
    <LegalDocument
      title="Termos de Uso"
      lastUpdated="junho de 2026"
      intro="Leia atentamente estes termos antes de utilizar o site, formulários e demonstrações interativas da Nangell Creative Studio."
      sections={termosUsoSections}
    />
  );
}
