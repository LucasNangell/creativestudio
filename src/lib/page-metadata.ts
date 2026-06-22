import type { Metadata } from "next";

import { getAbsoluteAssetUrl, siteConfig } from "@/lib/seo/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

type ArticleMetadataOptions = PageMetadataOptions & {
  coverImage?: string;
  publishedAt?: string | null;
  author?: string;
  tags?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const image = getAbsoluteAssetUrl(ogImage ?? siteConfig.ogImage);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : [...siteConfig.keywords],
    openGraph: {
      title,
      description,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createArticleMetadata({
  title,
  description,
  path,
  keywords = [],
  coverImage,
  publishedAt,
  author,
  tags = [],
}: ArticleMetadataOptions): Metadata {
  const base = createPageMetadata({
    title,
    description,
    path,
    keywords,
    ogImage: coverImage,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title,
      description,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      publishedTime: publishedAt ?? undefined,
      authors: author ? [author] : undefined,
      tags,
      images: coverImage
        ? [{ url: getAbsoluteAssetUrl(coverImage), alt: title }]
        : base.openGraph?.images,
    },
    twitter: {
      card: coverImage ? "summary_large_image" : "summary",
      title,
      description,
      images: coverImage ? [getAbsoluteAssetUrl(coverImage)] : undefined,
    },
  };
}
