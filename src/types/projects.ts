import type { DemoType } from "@prisma/client";

export type ProjectMetric = {
  label: string;
  value: string;
  description?: string;
};

export type ArchitectureLayer = {
  name: string;
  description: string;
};

export type ProjectListItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  stack: string[];
  badges: string[];
  businessGoals: string[];
  primaryMetric: ProjectMetric | null;
  hasDemo: boolean;
  demoRoute: string | null;
  demoType: DemoType;
  coverImage: string;
  isFeatured: boolean;
  sortOrder: number;
};

export type ProjectDetail = ProjectListItem & {
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  gallery: string[];
  metrics: ProjectMetric[];
  architecture: ArchitectureLayer[];
  seoTitle: string;
  seoDescription: string;
};

export type PortfolioFilters = {
  category: string;
  stack: string;
  businessGoal: string;
  demo: string;
  search: string;
};
