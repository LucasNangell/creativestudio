import { TestimonialStatus } from "@prisma/client";
import { z } from "zod";

export const testimonialFormSchema = z.object({
  clientName: z.string().min(2).max(255),
  clientRole: z.string().min(2).max(255),
  company: z.string().min(2).max(255),
  content: z.string().min(10),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  image: z.string().min(1).max(500),
  status: z.nativeEnum(TestimonialStatus),
});

export type TestimonialFormInput = z.infer<typeof testimonialFormSchema>;
