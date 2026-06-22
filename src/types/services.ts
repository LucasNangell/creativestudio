import type { LucideIcon } from "lucide-react";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceDifferential = {
  title: string;
  description: string;
};

export type ServiceEnrichedContent = {
  sortOrder: number;
  icon: LucideIcon;
  focusAreas: string[];
  features: string[];
  differentials: ServiceDifferential[];
  faq: ServiceFaqItem[];
  relatedProjectSlugs: string[];
};

export type ServiceDetail = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  problemSolved: string;
  deliverables: string[];
  technologies: string[];
  targetAudience: string;
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
  icon: LucideIcon;
  focusAreas: string[];
  features: string[];
  differentials: ServiceDifferential[];
  faq: ServiceFaqItem[];
  relatedProjectSlugs: string[];
};

export type RelatedProjectCard = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  coverImage: string;
  demoRoute: string | null;
  caseHref: string;
};

export type ServiceListItem = Pick<
  ServiceDetail,
  | "id"
  | "slug"
  | "title"
  | "headline"
  | "description"
  | "ctaLabel"
  | "icon"
  | "focusAreas"
>;
