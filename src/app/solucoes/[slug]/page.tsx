import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePageContent } from "@/app/_components/solutions/service-page-content";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  getRelatedProjectsForService,
  getServiceBySlug,
  getServiceSlugs,
} from "@/services/services-service";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/solucoes/${service.slug}`,
    keywords: [
      service.title,
      ...service.focusAreas,
      "Nangell Creative Studio",
      "software sob medida",
    ],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = await getRelatedProjectsForService(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    provider: {
      "@type": "Organization",
      name: "Nangell Creative Studio",
      url: "https://nangell.com.br",
    },
    areaServed: "BR",
    serviceType: service.title,
  };

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageContent service={service} relatedProjects={relatedProjects} />
    </main>
  );
}
