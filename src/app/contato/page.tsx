import type { Metadata } from "next";

import { ContatoPageContent } from "@/app/_components/institutional/contato-page-content";
import { contatoSeo } from "@/data/institutional/contato";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: contatoSeo.title,
  description: contatoSeo.description,
  path: "/contato",
  keywords: [...contatoSeo.keywords],
});

export default function ContatoPage() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <ContatoPageContent />
    </main>
  );
}
