import { DemoType, ProjectStatus } from "@prisma/client";

import {
  PROJECT_ENRICHED_CONTENT,
} from "@/data/projects/enriched-content";
import {
  FALLBACK_PROJECTS,
  PROJECT_SLUGS,
} from "@/data/projects/fallback-projects";
import prisma from "@/lib/prisma";
import type {
  ArchitectureLayer,
  ProjectDetail,
  ProjectListItem,
  ProjectMetric,
} from "@/types/projects";

type DbProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: unknown;
  stack: unknown;
  coverImage: string;
  gallery: unknown;
  metrics: unknown;
  demoType: DemoType;
  demoRoute: string | null;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function parseMetrics(value: unknown): ProjectMetric[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is ProjectMetric =>
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "value" in item &&
        typeof (item as ProjectMetric).label === "string" &&
        typeof (item as ProjectMetric).value === "string",
    )
    .map((metric) => ({
      label: metric.label,
      value: metric.value,
      description:
        typeof metric.description === "string" ? metric.description : undefined,
    }));
}

function getEnriched(slug: string) {
  return PROJECT_ENRICHED_CONTENT[slug] ?? {
    badges: [],
    businessGoals: [],
    architecture: [] as ArchitectureLayer[],
  };
}

function hasInteractiveDemo(record: DbProjectRecord): boolean {
  return (
    record.demoType !== DemoType.NONE &&
    typeof record.demoRoute === "string" &&
    record.demoRoute.length > 0
  );
}

function mergeProject(record: DbProjectRecord): ProjectDetail {
  const enriched = getEnriched(record.slug);
  const metrics = parseMetrics(record.metrics);
  const stack = parseStringArray(record.stack);
  const gallery = parseStringArray(record.gallery);
  const features = parseStringArray(record.features);
  const hasDemo = hasInteractiveDemo(record);

  const base: ProjectListItem = {
    id: record.id,
    slug: record.slug,
    title: record.title,
    category: record.category,
    shortDescription: record.shortDescription,
    stack,
    badges: hasDemo
      ? enriched.badges.includes("Demo interativa")
        ? enriched.badges
        : ["Demo interativa", ...enriched.badges]
      : enriched.badges,
    businessGoals: enriched.businessGoals,
    primaryMetric: metrics[0] ?? null,
    hasDemo,
    demoRoute: record.demoRoute,
    demoType: record.demoType,
    coverImage: record.coverImage,
    isFeatured: record.isFeatured,
    sortOrder: record.sortOrder,
  };

  return {
    ...base,
    fullDescription: record.fullDescription,
    problem: record.problem,
    solution: record.solution,
    features,
    gallery: gallery.length > 0 ? gallery : [record.coverImage],
    metrics,
    architecture: enriched.architecture,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  };
}

function sortProjects<T extends { sortOrder: number }>(projects: T[]): T[] {
  return [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
}

const ALLOWED_PROJECT_SLUGS = new Set<string>(PROJECT_SLUGS);

function filterAllowedProjects<T extends { slug: string }>(projects: T[]): T[] {
  return projects.filter((project) => ALLOWED_PROJECT_SLUGS.has(project.slug));
}

async function fetchPublishedFromDb(): Promise<DbProjectRecord[] | null> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: ProjectStatus.PUBLISHED },
      orderBy: { sortOrder: "asc" },
    });
    return projects;
  } catch {
    return null;
  }
}

function getFallbackProjects(): ProjectDetail[] {
  return sortProjects(FALLBACK_PROJECTS.map((record) => mergeProject(record)));
}

export async function getPublishedProjects(): Promise<ProjectDetail[]> {
  const dbProjects = await fetchPublishedFromDb();

  if (!dbProjects || dbProjects.length === 0) {
    return getFallbackProjects();
  }

  const allowed = filterAllowedProjects(dbProjects);
  if (allowed.length === 0) {
    return getFallbackProjects();
  }

  return sortProjects(allowed.map((record) => mergeProject(record)));
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  try {
    const record = await prisma.project.findFirst({
      where: { slug, status: ProjectStatus.PUBLISHED },
    });

    if (record && ALLOWED_PROJECT_SLUGS.has(record.slug)) {
      return mergeProject(record);
    }
  } catch {
    // fallback abaixo
  }

  const fallback = FALLBACK_PROJECTS.find((project) => project.slug === slug);
  return fallback ? mergeProject(fallback) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: ProjectStatus.PUBLISHED },
      select: { slug: true },
      orderBy: { sortOrder: "asc" },
    });

    const allowed = filterAllowedProjects(projects);
    if (allowed.length > 0) {
      return allowed.map((project) => project.slug);
    }
  } catch {
    // fallback abaixo
  }

  return [...PROJECT_SLUGS];
}

export async function getRelatedProjects(
  slug: string,
  limit = 3,
): Promise<ProjectListItem[]> {
  const current = await getProjectBySlug(slug);
  if (!current) return [];

  const all = await getPublishedProjects();
  const others = all.filter((project) => project.slug !== slug);

  const scored = others.map((project) => {
    let score = 0;
    if (project.category === current.category) score += 3;
    const sharedGoals = project.businessGoals.filter((goal) =>
      current.businessGoals.includes(goal),
    );
    score += sharedGoals.length * 2;
    if (project.isFeatured) score += 1;
    return { project, score };
  });

  scored.sort((a, b) => b.score - a.score || a.project.sortOrder - b.project.sortOrder);

  return scored.slice(0, limit).map(({ project }) => project);
}

export function collectFilterOptions(projects: ProjectDetail[]) {
  const categories = new Set<string>();
  const stacks = new Set<string>();

  for (const project of projects) {
    categories.add(project.category);
    for (const tech of project.stack) {
      stacks.add(tech);
    }
  }

  return {
    categories: Array.from(categories).sort(),
    stacks: Array.from(stacks).sort(),
  };
}
