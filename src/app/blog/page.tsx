import type { Metadata } from "next";

import { BlogPageContent } from "@/app/_components/blog/blog-page-content";
import { blogPageContent } from "@/data/blog/enriched-content";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  collectBlogFilterOptions,
  getFeaturedPost,
  getPublishedPosts,
} from "@/services/posts-service";

export const metadata: Metadata = createPageMetadata({
  title: blogPageContent.seo.title,
  description: blogPageContent.seo.description,
  path: "/blog",
  keywords: [...blogPageContent.seo.keywords],
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const filters = collectBlogFilterOptions(posts);
  const featured = getFeaturedPost(posts, blogPageContent.featuredSlug);

  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <BlogPageContent posts={posts} filters={filters} featured={featured} />
    </main>
  );
}
