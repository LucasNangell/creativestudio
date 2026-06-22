import { PostStatus } from "@prisma/client";
import { z } from "zod";

const tagsArray = z
  .union([z.array(z.string()), z.string()])
  .transform((val) => (Array.isArray(val) ? val : val.split(",").map((s) => s.trim()).filter(Boolean)));

export const postFormSchema = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  excerpt: z.string().min(10).max(2000),
  content: z.string().min(10),
  coverImage: z.string().min(1).max(500),
  category: z.string().min(2).max(100),
  tags: tagsArray,
  author: z.string().min(2).max(255),
  status: z.nativeEnum(PostStatus),
  seoTitle: z.string().min(2).max(255),
  seoDescription: z.string().min(10).max(500),
  publishedAt: z.string().optional().nullable(),
});

export type PostFormInput = z.infer<typeof postFormSchema>;
