import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CasePageContent } from "@/app/_components/portfolio/case-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
} from "@/lib/seo/schema";
import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/services/projects-service";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return createPageMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/cases/${project.slug}`,
    keywords: [
      project.title,
      project.category,
      ...project.stack,
      "case de software",
      "Nangell Creative Studio",
    ],
    ogImage: project.coverImage,
  });
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(slug);

  const jsonLd = [
    buildSoftwareApplicationSchema({
      title: project.title,
      description: project.seoDescription,
      category: project.category,
      demoRoute: project.hasDemo ? project.demoRoute : null,
    }),
    buildBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Portfólio", path: "/portfolio" },
      { name: project.title, path: `/cases/${project.slug}` },
    ]),
  ];

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <JsonLd data={jsonLd} />
      <CasePageContent project={project} relatedProjects={relatedProjects} />
    </main>
  );
}
