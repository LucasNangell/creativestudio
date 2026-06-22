import { getAbsoluteAssetUrl, getSiteUrl, siteConfig } from "@/lib/seo/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  publishedAt: string | null;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
};

type SoftwareApplicationSchemaInput = {
  title: string;
  description: string;
  category: string;
  demoRoute?: string | null;
};

type CreativeWorkSchemaInput = {
  name: string;
  description: string;
  path: string;
  genre?: string;
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: getAbsoluteAssetUrl(siteConfig.ogImage),
    email: siteConfig.email,
    sameAs: siteConfig.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${siteConfig.whatsapp}`,
      availableLanguage: ["Portuguese"],
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const url = getSiteUrl(`/blog/${input.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: getAbsoluteAssetUrl(input.coverImage),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    author: {
      "@type": "Organization",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteAssetUrl(siteConfig.ogImage),
      },
    },
    mainEntityOfPage: url,
    url,
    keywords: input.tags.join(", "),
    articleSection: input.category,
  };
}

export function buildSoftwareApplicationSchema(input: SoftwareApplicationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.title,
    description: input.description,
    applicationCategory: input.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    ...(input.demoRoute
      ? { url: getSiteUrl(input.demoRoute) }
      : {}),
  };
}

export function buildCreativeWorkSchema(input: CreativeWorkSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: getSiteUrl(input.path),
    inLanguage: "pt-BR",
    creator: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    ...(input.genre ? { genre: input.genre } : {}),
  };
}
