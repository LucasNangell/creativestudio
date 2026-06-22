"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/select";
import {
  PORTFOLIO_BUSINESS_GOALS,
} from "@/data/projects/enriched-content";
import { trackEvent } from "@/lib/analytics";
import type { ProjectDetail } from "@/types/projects";

import { ProjectCard } from "./project-card";

type PortfolioFiltersGridProps = {
  projects: ProjectDetail[];
  categories: string[];
  stacks: string[];
};

const DEMO_FILTER_OPTIONS = [
  { label: "Todos", value: "all" },
  { label: "Com demo interativa", value: "with-demo" },
  { label: "Sem demo", value: "without-demo" },
];

export function PortfolioFiltersGrid({
  projects,
  categories,
  stacks,
}: PortfolioFiltersGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stack, setStack] = useState("all");
  const [businessGoal, setBusinessGoal] = useState("all");
  const [demo, setDemo] = useState("all");
  const isFirstRender = useRef(true);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      if (category !== "all" && project.category !== category) return false;
      if (stack !== "all" && !project.stack.includes(stack)) return false;
      if (
        businessGoal !== "all" &&
        !project.businessGoals.includes(businessGoal)
      ) {
        return false;
      }
      if (demo === "with-demo" && !project.hasDemo) return false;
      if (demo === "without-demo" && project.hasDemo) return false;

      if (query) {
        const haystack = [
          project.title,
          project.shortDescription,
          project.category,
          ...project.stack,
          ...project.badges,
          ...project.businessGoals,
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [projects, search, category, stack, businessGoal, demo]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackEvent("filter_portfolio", {
      filterType: "combined",
      filterValue: JSON.stringify({
        search: search.trim(),
        category,
        stack,
        businessGoal,
        demo,
      }),
      value: filteredProjects.length,
    });
  }, [search, category, stack, businessGoal, demo, filteredProjects.length]);

  const categoryOptions = [
    { label: "Todas as categorias", value: "all" },
    ...categories.map((item) => ({ label: item, value: item })),
  ];

  const stackOptions = [
    { label: "Todas as stacks", value: "all" },
    ...stacks.map((item) => ({ label: item, value: item })),
  ];

  const businessGoalOptions = [
    { label: "Todos os objetivos", value: "all" },
    ...PORTFOLIO_BUSINESS_GOALS.map((goal) => ({ label: goal, value: goal })),
  ];

  return (
    <div id="portfolio-grid">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-4">
          <label
            htmlFor="portfolio-search"
            className="mb-1.5 block text-sm font-medium text-nangell-text"
          >
            Buscar projetos
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-nangell-muted"
              aria-hidden
            />
            <input
              id="portfolio-search"
              type="search"
              placeholder="Título, categoria, stack ou objetivo..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-nangell border border-glass-border bg-nangell-surface/80 pr-4 pl-10 text-sm text-nangell-text placeholder:text-nangell-muted/70 transition-colors hover:border-nangell-electric/30 focus-visible:border-nangell-electric focus-visible:outline-none"
            />
          </div>
        </div>

        <Select
          label="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          options={categoryOptions}
        />

        <Select
          label="Stack"
          value={stack}
          onChange={(event) => setStack(event.target.value)}
          options={stackOptions}
        />

        <Select
          label="Objetivo de negócio"
          value={businessGoal}
          onChange={(event) => setBusinessGoal(event.target.value)}
          options={businessGoalOptions}
        />

        <Select
          label="Demo interativa"
          value={demo}
          onChange={(event) => setDemo(event.target.value)}
          options={DEMO_FILTER_OPTIONS}
        />
      </div>

      <p className="mt-6 text-sm text-nangell-muted" aria-live="polite">
        {filteredProjects.length} projeto
        {filteredProjects.length !== 1 ? "s" : ""} encontrado
        {filteredProjects.length !== 1 ? "s" : ""}
      </p>

      {filteredProjects.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="Nenhum projeto encontrado"
          description="Ajuste os filtros ou limpe a busca para ver todos os cases."
          action={
            <button
              type="button"
              className="text-sm text-nangell-cyan hover:underline"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setStack("all");
                setBusinessGoal("all");
                setDemo("all");
              }}
            >
              Limpar filtros
            </button>
          }
        />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
