import type { PostStatus } from "@prisma/client";

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
};

export type BlogPostDetail = BlogPostListItem & {
  content: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
};

export type BlogFilterOptions = {
  categories: string[];
  tags: string[];
};
