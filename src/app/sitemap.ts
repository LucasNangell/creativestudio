import type { MetadataRoute } from "next";

import { homeDemos } from "@/data/home";
import { getSiteUrl } from "@/lib/seo/site";
import { getPostSlugs } from "@/services/posts-service";
import { getProjectSlugs } from "@/services/projects-service";
import { getServiceSlugs } from "@/services/services-service";

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: SitemapEntry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/solucoes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
  { path: "/processo", changeFrequency: "monthly", priority: 0.7 },
  { path: "/diagnostico", changeFrequency: "monthly", priority: 0.85 },
  { path: "/contato", changeFrequency: "monthly", priority: 0.75 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.3 },
  { path: "/termos-de-uso", changeFrequency: "yearly", priority: 0.3 },
];

function toSitemapItem(entry: SitemapEntry): MetadataRoute.Sitemap[number] {
  return {
    url: getSiteUrl(entry.path),
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, projectSlugs, postSlugs] = await Promise.all([
    getServiceSlugs(),
    getProjectSlugs(),
    getPostSlugs(),
  ]);

  const staticEntries = STATIC_ROUTES.map(toSitemapItem);

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: getSiteUrl(`/solucoes/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: getSiteUrl(`/cases/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const postEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: getSiteUrl(`/blog/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const demoEntries: MetadataRoute.Sitemap = homeDemos.map((demo) => ({
    url: getSiteUrl(demo.demoHref),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...caseEntries,
    ...postEntries,
    ...demoEntries,
  ];
}
