export type {
  AnalyticsEvent,
  DemoInteraction,
  DemoSession,
  Lead,
  Post,
  Project,
  Service,
  SiteSetting,
  Testimonial,
  User,
} from "@prisma/client";

export {
  DemoType,
  LeadStatus,
  PostStatus,
  ProjectStatus,
  ServiceStatus,
  TestimonialStatus,
  UserRole,
} from "@prisma/client";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ProjectMetrics = {
  label: string;
  value: string;
  description?: string;
};

export type SiteSettingKey =
  | "site_name"
  | "site_tagline"
  | "contact_email"
  | "contact_phone"
  | "whatsapp_number"
  | "address"
  | "social_linkedin"
  | "social_instagram"
  | "social_github"
  | "maintenance_mode";
