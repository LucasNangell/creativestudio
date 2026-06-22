import type { Metadata } from "next";

import { PortfolioPageContent } from "@/app/_components/portfolio/portfolio-page-content";
import { portfolioPageContent } from "@/data/projects/enriched-content";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  collectFilterOptions,
  getPublishedProjects,
} from "@/services/projects-service";

export const metadata: Metadata = createPageMetadata({
  title: portfolioPageContent.seo.title,
  description: portfolioPageContent.seo.description,
  path: "/portfolio",
  keywords: [...portfolioPageContent.seo.keywords],
});

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  const { categories, stacks } = collectFilterOptions(projects);

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <PortfolioPageContent
        projects={projects}
        categories={categories}
        stacks={stacks}
      />
    </main>
  );
}
