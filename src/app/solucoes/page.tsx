import type { Metadata } from "next";

import { SolutionsPageContent } from "@/app/_components/solutions/solutions-page-content";
import { solucoesPageContent } from "@/data/services/enriched-content";
import { createPageMetadata } from "@/lib/page-metadata";
import { getActiveServices } from "@/services/services-service";

export const metadata: Metadata = createPageMetadata({
  title: solucoesPageContent.seo.title,
  description: solucoesPageContent.seo.description,
  path: "/solucoes",
  keywords: [...solucoesPageContent.seo.keywords],
});

export default async function SolucoesPage() {
  const services = await getActiveServices();

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <SolutionsPageContent services={services} />
    </main>
  );
}
