import { DEMO_PAGE_CONTENT } from "@/data/demos/demo-page-content";

export type DemoPageContent = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  demoHint?: string;
};

export function getDemoPageContent(slug: string): DemoPageContent | null {
  return DEMO_PAGE_CONTENT[slug] ?? null;
}

export function getDemoPageContentOrThrow(slug: string): DemoPageContent {
  const content = getDemoPageContent(slug);
  if (!content) {
    throw new Error(`Conteúdo da demonstração não encontrado para slug: ${slug}`);
  }
  return content;
}
