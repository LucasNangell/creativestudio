import type { Metadata } from "next";

import { SobrePageContent } from "@/app/_components/institutional/sobre-page-content";
import { sobreSeo } from "@/data/institutional/sobre";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: sobreSeo.title,
  description: sobreSeo.description,
  path: "/sobre",
  keywords: [...sobreSeo.keywords],
});

export default function SobrePage() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <SobrePageContent />
    </main>
  );
}
