import type { Metadata } from "next";

import { ObrigadoPageContent } from "@/app/_components/institutional/obrigado-page-content";
import { obrigadoSeo } from "@/data/institutional/contato";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: obrigadoSeo.title,
  description: obrigadoSeo.description,
  path: "/obrigado",
});

export default function ObrigadoPage() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <ObrigadoPageContent />
    </main>
  );
}
