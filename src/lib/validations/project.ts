import { DemoType, ProjectStatus } from "@prisma/client";
import { z } from "zod";

const jsonArray = z
  .union([z.array(z.string()), z.string()])
  .transform((val) => (Array.isArray(val) ? val : val.split("\n").map((s) => s.trim()).filter(Boolean)));

export const projectFormSchema = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  category: z.string().min(2).max(100),
  shortDescription: z.string().min(10).max(2000),
  fullDescription: z.string().min(10),
  problem: z.string().min(10),
  solution: z.string().min(10),
  features: jsonArray,
  stack: jsonArray,
  coverImage: z.string().min(1).max(500),
  gallery: jsonArray,
  metrics: z.union([z.record(z.string(), z.unknown()), z.string()]).optional(),
  demoType: z.nativeEnum(DemoType),
  demoRoute: z.string().max(255).optional().nullable(),
  isFeatured: z.boolean().default(false),
  status: z.nativeEnum(ProjectStatus),
  seoTitle: z.string().min(2).max(255),
  seoDescription: z.string().min(10).max(500),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;
