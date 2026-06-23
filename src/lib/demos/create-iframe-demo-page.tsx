import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { IframePortfolioDemo } from "@/components/demos/iframe-portfolio-demo";
import { IFRAME_DEMO_CONFIG } from "@/data/demos/iframe-demos";
import { createPageMetadata } from "@/lib/page-metadata";

type Props = { slug: keyof typeof IFRAME_DEMO_CONFIG };

export function createIframeDemoPage(slug: keyof typeof IFRAME_DEMO_CONFIG) {
  const config = IFRAME_DEMO_CONFIG[slug];

  return {
    metadata: createPageMetadata({
      title: `Demonstração, ${config.title}`,
      description: config.subtitle,
      path: `/demo/${slug}`,
      keywords: config.keywords,
    }),
    Page: function IframeDemoPage() {
      return (
        <DemoPageFrame
          name={config.title}
          description={config.subtitle}
          path={`/demo/${slug}`}
          genre="BusinessApplication"
        >
          <IframePortfolioDemo config={config} />
        </DemoPageFrame>
      );
    },
  };
}

export type IframeDemoSlug = Props["slug"];
