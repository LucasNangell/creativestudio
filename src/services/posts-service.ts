import { PostStatus } from "@prisma/client";

import {
  FALLBACK_POSTS,
  FALLBACK_POST_SLUGS,
  type FallbackPostRecord,
} from "@/data/blog/fallback-posts";
import prisma from "@/lib/prisma";
import type { BlogFilterOptions, BlogPostDetail, BlogPostListItem } from "@/types/blog";

type DbPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: unknown;
  author: string;
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function parseTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapListItem(record: DbPostRecord): BlogPostListItem {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    coverImage: record.coverImage,
    category: record.category,
    tags: parseTags(record.tags),
    author: record.author,
    publishedAt: record.publishedAt?.toISOString() ?? null,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  };
}

function mapDetail(record: DbPostRecord): BlogPostDetail {
  return {
    ...mapListItem(record),
    content: record.content,
    status: record.status,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

function fallbackToDbRecord(post: FallbackPostRecord): DbPostRecord {
  return { ...post };
}

async function fetchPublishedFromDb(): Promise<DbPostRecord[]> {
  return prisma.post.findMany({
    where: { status: PostStatus.PUBLISHED },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedPosts(): Promise<BlogPostListItem[]> {
  try {
    const records = await fetchPublishedFromDb();
    if (records.length === 0) {
      return FALLBACK_POSTS.map(fallbackToDbRecord).map(mapListItem);
    }
    return records.map(mapListItem);
  } catch {
    return FALLBACK_POSTS.map(fallbackToDbRecord).map(mapListItem);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const record = await prisma.post.findFirst({
      where: { slug, status: PostStatus.PUBLISHED },
    });

    if (record) return mapDetail(record);

    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    return fallback ? mapDetail(fallbackToDbRecord(fallback)) : null;
  } catch {
    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    return fallback ? mapDetail(fallbackToDbRecord(fallback)) : null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const slugs = await prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: { slug: true },
      orderBy: { publishedAt: "desc" },
    });
    if (slugs.length === 0) return FALLBACK_POST_SLUGS;
    return slugs.map((item) => item.slug);
  } catch {
    return FALLBACK_POST_SLUGS;
  }
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPostListItem[]> {
  const posts = await getPublishedPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.filter((p) => p.slug !== slug).slice(0, limit);

  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      score += post.tags.filter((tag) => current.tags.includes(tag)).length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score || (b.post.publishedAt ?? "").localeCompare(a.post.publishedAt ?? ""));

  return scored.slice(0, limit).map((item) => item.post);
}

export function collectBlogFilterOptions(posts: BlogPostListItem[]): BlogFilterOptions {
  const categories = [...new Set(posts.map((p) => p.category))].sort();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  return { categories, tags };
}

export function getFeaturedPost(posts: BlogPostListItem[]): BlogPostListItem | null {
  if (posts.length === 0) return null;
  return [...posts].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  )[0] ?? null;
}
