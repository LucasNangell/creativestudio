"use client";

import { ProjectCard } from "./project-card";
import type { ProjectDetail } from "@/types/projects";

type PortfolioFiltersGridProps = {
  projects: ProjectDetail[];
};

export function PortfolioFiltersGrid({ projects }: PortfolioFiltersGridProps) {
  return (
    <div id="portfolio-grid">
      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
