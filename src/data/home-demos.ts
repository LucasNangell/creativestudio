import { FALLBACK_PROJECTS } from "@/data/projects/fallback-projects";

export type HomeDemo = {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  coverImage: string;
  demoHref: string;
  caseHref: string;
  isFeatured: boolean;
};

/** Demos da home derivadas do portfólio — mesma ordem, títulos e rotas dos cases. */
export const homeDemos: HomeDemo[] = [...FALLBACK_PROJECTS]
  .filter((project) => project.demoRoute)
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((project) => ({
    id: project.slug,
    title: project.title,
    description: project.shortDescription,
    category: project.category,
    stack: [...project.stack],
    coverImage: project.coverImage,
    demoHref: project.demoRoute!,
    caseHref: `/cases/${project.slug}`,
    isFeatured: project.isFeatured,
  }));
