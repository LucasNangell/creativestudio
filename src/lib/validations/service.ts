import { ServiceStatus } from "@prisma/client";
import { z } from "zod";

const jsonArray = z
  .union([z.array(z.string()), z.string()])
  .transform((val) => (Array.isArray(val) ? val : val.split("\n").map((s) => s.trim()).filter(Boolean)));

export const serviceFormSchema = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  headline: z.string().min(2).max(255),
  description: z.string().min(10),
  problemSolved: z.string().min(10),
  deliverables: jsonArray,
  technologies: jsonArray,
  targetAudience: z.string().min(10),
  ctaLabel: z.string().min(2).max(100),
  seoTitle: z.string().min(2).max(255),
  seoDescription: z.string().min(10).max(500),
  status: z.nativeEnum(ServiceStatus),
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;
