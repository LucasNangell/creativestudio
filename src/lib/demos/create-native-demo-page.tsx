import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { getDemoPageContentOrThrow } from "@/lib/demos/get-demo-content";
import { createPageMetadata } from "@/lib/page-metadata";

type NativeDemoPageOptions = {
  slug: string;
  keywords: string[];
  renderDemo: () => React.ReactNode;
};

export function createNativeDemoPage({ slug, keywords, renderDemo }: NativeDemoPageOptions) {
  const content = getDemoPageContentOrThrow(slug);

  return {
    metadata: createPageMetadata({
      title: `Demo ${content.title}`,
      description: content.fullDescription,
      path: `/demo/${slug}`,
      keywords,
    }),
    Page: function NativeDemoPage() {
      return (
        <DemoPageFrame
          name={content.title}
          description={content.fullDescription}
          path={`/demo/${slug}`}
          genre="BusinessApplication"
        >
          {renderDemo()}
        </DemoPageFrame>
      );
    },
  };
}
