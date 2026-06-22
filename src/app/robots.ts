import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/adm/", "/api/"],
      },
    ],
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
    host: siteConfig.url.replace(/\/$/, ""),
  };
}
