import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostPageContent } from "@/app/_components/blog/post-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createArticleMetadata } from "@/lib/page-metadata";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/seo/site";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/services/posts-service";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return createArticleMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    keywords: [post.title, post.category, ...post.tags, "blog", "Nangell Creative Studio"],
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    author: post.author,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);
  const canonicalUrl = getSiteUrl(`/blog/${post.slug}`);

  const jsonLd = [
    buildArticleSchema({
      title: post.title,
      description: post.seoDescription,
      slug: post.slug,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      author: post.author,
      category: post.category,
      tags: post.tags,
    }),
    buildBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <JsonLd data={jsonLd} />
      <PostPageContent
        post={post}
        relatedPosts={relatedPosts}
        canonicalUrl={canonicalUrl}
      />
    </main>
  );
}
