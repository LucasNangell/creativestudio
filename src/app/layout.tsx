import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import { ScrollProgress } from "@/components/global/scroll-progress";
import { SiteChromeGate } from "@/components/global/site-chrome-gate";
import { SiteFooter } from "@/components/global/site-footer";
import { SiteHeader } from "@/components/global/site-header";
import { SkipLink } from "@/components/global/skip-link";
import { WhatsAppFloatingButton } from "@/components/global/whatsapp-floating-button";
import {
  AnalyticsNoScript,
  AnalyticsScripts,
} from "@/components/seo/analytics-scripts";
import { JsonLd } from "@/components/seo/json-ld";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";
import { getAbsoluteAssetUrl, siteConfig } from "@/lib/seo/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: getAbsoluteAssetUrl(siteConfig.ogImage),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [getAbsoluteAssetUrl(siteConfig.ogImage)],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} scrollbar-nangell`}
    >
      <body className="bg-nangell-dark text-nangell-text antialiased">
        <SkipLink />
        <AnalyticsScripts />
        <AnalyticsNoScript />
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
        <SiteChromeGate>
          <ScrollProgress />
        </SiteChromeGate>
        <SiteChromeGate>
          <SiteHeader />
        </SiteChromeGate>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteChromeGate>
          <SiteFooter />
        </SiteChromeGate>
        <SiteChromeGate>
          <WhatsAppFloatingButton />
        </SiteChromeGate>
      </body>
    </html>
  );
}
