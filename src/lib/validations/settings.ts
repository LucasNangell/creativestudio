import { z } from "zod";

export const siteSettingsFormSchema = z.object({
  site_name: z.string().min(1).max(255),
  site_tagline: z.string().min(1).max(500),
  contact_email: z.string().email().max(255),
  contact_phone: z.string().min(5).max(50),
  whatsapp_number: z.string().min(10).max(20),
  address: z.string().min(2).max(500),
  social_linkedin: z.string().url().max(500).or(z.literal("")),
  social_instagram: z.string().url().max(500).or(z.literal("")),
  social_github: z.string().url().max(500).or(z.literal("")),
  default_seo_title: z.string().min(2).max(255),
  default_seo_description: z.string().min(10).max(500),
  maintenance_mode: z.enum(["true", "false"]),
});

export type SiteSettingsFormInput = z.infer<typeof siteSettingsFormSchema>;

export const SITE_SETTING_KEYS = [
  "site_name",
  "site_tagline",
  "contact_email",
  "contact_phone",
  "whatsapp_number",
  "address",
  "social_linkedin",
  "social_instagram",
  "social_github",
  "default_seo_title",
  "default_seo_description",
  "maintenance_mode",
] as const;
