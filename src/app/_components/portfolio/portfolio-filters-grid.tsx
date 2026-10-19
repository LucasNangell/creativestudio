"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { PORTFOLIO_FILTER_CATEGORIES } from "@/data/projects/enriched-content";
import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/projects";

import { ProjectCard } from "./project-card";

type PortfolioFiltersGridProps = {
  projects: ProjectDetail[];
};

type FilterCategory = (typeof PORTFOLIO_FILTER_CATEGORIES)[number];

export function PortfolioFiltersGrid({ projects }: PortfolioFiltersGridProps) {
  const [active, setActive] = useState<FilterCategory>("Todos");

  const filtered = useMemo(() => {
    if (active === "Todos") return projects;
    return projects.filter((project) => project.category === active);
  }, [active, projects]);

  const availableCategories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return PORTFOLIO_FILTER_CATEGORIES.filter(
      (cat) => cat === "Todos" || present.has(cat),
    );
  }, [projects]);

  return (
    <div id="portfolio-grid">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar cases por categoria"
      >
        {availableCategories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-nangell border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric",
                isActive
                  ? "border-nangell-cyan/50 bg-nangell-cyan/10 text-nangell-cyan"
                  : "border-glass-border bg-nangell-surface/60 text-nangell-muted hover:border-nangell-cyan/30 hover:text-nangell-text",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Nenhum case nesta categoria"
            description="Selecione outra categoria ou veja todos os projetos."
            action={
              <button
                type="button"
                onClick={() => setActive("Todos")}
                className="text-sm font-medium text-nangell-cyan hover:text-nangell-blue"
              >
                Ver todos os cases
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
