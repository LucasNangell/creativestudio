export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2?.[1]) {
      const text = h2[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3?.[1]) {
      const text = h3[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  return headings;
}

export function slugifyHeadingText(text: string): string {
  return slugifyHeading(text);
}
