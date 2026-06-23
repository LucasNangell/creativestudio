import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { ExternalPortfolioDemo } from "@/components/demos/external-portfolio-demo";
import { EXTERNAL_DEMO_CONFIG } from "@/data/demos/external-demos";
import { createPageMetadata } from "@/lib/page-metadata";

type Props = { slug: keyof typeof EXTERNAL_DEMO_CONFIG };

export function createExternalDemoPage(slug: keyof typeof EXTERNAL_DEMO_CONFIG) {
  const config = EXTERNAL_DEMO_CONFIG[slug];

  return {
    metadata: createPageMetadata({
      title: `Demonstração, ${config.title}`,
      description: config.subtitle,
      path: `/demo/${slug}`,
      keywords: config.keywords,
    }),
    Page: function ExternalDemoPage() {
      return (
        <DemoPageFrame
          name={config.title}
          description={config.subtitle}
          path={`/demo/${slug}`}
          genre="BusinessApplication"
        >
          <ExternalPortfolioDemo config={config} />
        </DemoPageFrame>
      );
    },
  };
}

export type ExternalDemoSlug = Props["slug"];
