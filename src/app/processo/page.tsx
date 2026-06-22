import type { Metadata } from "next";

import { ProcessoPageContent } from "@/app/_components/institutional/processo-page-content";
import { processoSeo } from "@/data/institutional/processo";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: processoSeo.title,
  description: processoSeo.description,
  path: "/processo",
  keywords: [...processoSeo.keywords],
});

export default function ProcessoPage() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <ProcessoPageContent />
    </main>
  );
}
