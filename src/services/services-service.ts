import { ProjectStatus } from "@prisma/client";

import { FALLBACK_SERVICES, SERVICE_SLUGS } from "@/data/services/fallback-services";
import { SERVICE_ENRICHED_CONTENT } from "@/data/services/enriched-content";
import { homeDemos } from "@/data/home";
import prisma from "@/lib/prisma";
import type {
  RelatedProjectCard,
  ServiceDetail,
  ServiceListItem,
} from "@/types/services";

type DbServiceRecord = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  problemSolved: string;
  deliverables: unknown;
  technologies: unknown;
  targetAudience: string;
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
};

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function mergeService(record: DbServiceRecord): ServiceDetail | null {
  const enriched = SERVICE_ENRICHED_CONTENT[record.slug];
  if (!enriched) return null;

  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    headline: record.headline,
    description: record.description,
    problemSolved: record.problemSolved,
    deliverables: parseStringArray(record.deliverables),
    technologies: parseStringArray(record.technologies),
    targetAudience: record.targetAudience,
    ctaLabel: record.ctaLabel,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    icon: enriched.icon,
    focusAreas: enriched.focusAreas,
    features: enriched.features,
    differentials: enriched.differentials,
    faq: enriched.faq,
    relatedProjectSlugs: enriched.relatedProjectSlugs,
  };
}

function sortServices(services: ServiceDetail[]): ServiceDetail[] {
  return [...services].sort((a, b) => {
    const orderA = SERVICE_ENRICHED_CONTENT[a.slug]?.sortOrder ?? 99;
    const orderB = SERVICE_ENRICHED_CONTENT[b.slug]?.sortOrder ?? 99;
    return orderA - orderB;
  });
}

async function fetchServicesFromDb(): Promise<DbServiceRecord[] | null> {
  try {
    const services = await prisma.service.findMany({
      where: { status: "ACTIVE" },
    });
    return services;
  } catch {
    return null;
  }
}

function getFallbackServices(): ServiceDetail[] {
  return sortServices(
    FALLBACK_SERVICES.map((record) => mergeService(record)).filter(
      (service): service is ServiceDetail => service !== null,
    ),
  );
}

export async function getActiveServices(): Promise<ServiceDetail[]> {
  const dbServices = await fetchServicesFromDb();

  if (!dbServices || dbServices.length === 0) {
    return getFallbackServices();
  }

  const merged = dbServices
    .map((record) => mergeService(record))
    .filter((service): service is ServiceDetail => service !== null);

  return sortServices(merged.length > 0 ? merged : getFallbackServices());
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    const record = await prisma.service.findFirst({
      where: { slug, status: "ACTIVE" },
    });

    if (record) {
      return mergeService(record);
    }
  } catch {
    // fallback abaixo
  }

  const fallback = FALLBACK_SERVICES.find((service) => service.slug === slug);
  return fallback ? mergeService(fallback) : null;
}

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const services = await prisma.service.findMany({
      where: { status: "ACTIVE" },
      select: { slug: true },
    });

    if (services.length > 0) {
      return services.map((service) => service.slug);
    }
  } catch {
    // fallback abaixo
  }

  return [...SERVICE_SLUGS];
}

export function toServiceListItem(service: ServiceDetail): ServiceListItem {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    headline: service.headline,
    description: service.description,
    ctaLabel: service.ctaLabel,
    icon: service.icon,
    focusAreas: service.focusAreas,
  };
}

const FALLBACK_PROJECTS: RelatedProjectCard[] = homeDemos.map((demo) => ({
  slug: demo.id,
  title: demo.title,
  shortDescription: demo.description,
  category: demo.category,
  coverImage: `/assets/mockups/${demo.id}.png`,
  demoRoute: demo.demoHref,
  caseHref: demo.caseHref,
}));

export async function getRelatedProjectsForService(
  slug: string,
): Promise<RelatedProjectCard[]> {
  const enriched = SERVICE_ENRICHED_CONTENT[slug];
  if (!enriched) return [];

  const slugs = enriched.relatedProjectSlugs;

  try {
    const projects = await prisma.project.findMany({
      where: {
        slug: { in: slugs },
        status: ProjectStatus.PUBLISHED,
      },
      select: {
        slug: true,
        title: true,
        shortDescription: true,
        category: true,
        coverImage: true,
        demoRoute: true,
      },
    });

    if (projects.length > 0) {
      return slugs
        .map((projectSlug) => {
          const project = projects.find((item) => item.slug === projectSlug);
          if (!project) return null;
          return {
            slug: project.slug,
            title: project.title,
            shortDescription: project.shortDescription,
            category: project.category,
            coverImage: project.coverImage,
            demoRoute: project.demoRoute,
            caseHref: `/cases/${project.slug}`,
          };
        })
        .filter((project): project is RelatedProjectCard => project !== null);
    }
  } catch {
    // fallback abaixo
  }

  return FALLBACK_PROJECTS.filter((project) => slugs.includes(project.slug));
}
