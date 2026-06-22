import { DemoType } from "@prisma/client";

import { IMPORTED_PORTFOLIO_PROJECTS } from "@/data/projects/imported-portfolio-projects";

export const PROJECT_SLUGS = IMPORTED_PORTFOLIO_PROJECTS.map((p) => p.slug);

type FallbackProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: readonly string[];
  stack: readonly string[];
  coverImage: string;
  gallery: readonly string[];
  metrics: ReadonlyArray<{ label: string; value: string; description?: string }>;
  demoType: DemoType;
  demoRoute: string | null;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export const FALLBACK_PROJECTS: FallbackProjectRecord[] = [...IMPORTED_PORTFOLIO_PROJECTS];
