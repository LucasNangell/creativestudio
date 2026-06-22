export type LinkDevice = "mobile" | "desktop" | "tablet";

export type LinkSource = "direct" | "email" | "social" | "ads";

export type ShortLinkRecord = {
  id: string;
  originalUrl: string;
  slug: string;
  shortUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  clicks: number;
  createdAt: string;
  clicksByDevice: Record<LinkDevice, number>;
  clicksBySource: Record<LinkSource, number>;
};

export const LINK_QR_STORAGE_KEY = "nangell-demo-link-qr-history";

export function generateShortUrl(slug: string): string {
  return `https://nangell.link/${slug}`;
}

export function simulateClickStats(): Pick<
  ShortLinkRecord,
  "clicks" | "clicksByDevice" | "clicksBySource"
> {
  const clicks = Math.floor(Math.random() * 400) + 50;
  return {
    clicks,
    clicksByDevice: {
      mobile: Math.floor(clicks * 0.58),
      desktop: Math.floor(clicks * 0.32),
      tablet: Math.floor(clicks * 0.1),
    },
    clicksBySource: {
      direct: Math.floor(clicks * 0.25),
      email: Math.floor(clicks * 0.2),
      social: Math.floor(clicks * 0.35),
      ads: Math.floor(clicks * 0.2),
    },
  };
}
