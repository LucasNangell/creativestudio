import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <Section className="pt-8 sm:pt-12">
        <Container className="max-w-4xl">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-6 h-12 w-full" />
          <Skeleton className="mt-4 h-6 w-3/4" />
          <Skeleton className="mt-8 h-56 w-full" />
        </Container>
      </Section>
      <Section>
        <Container className="max-w-3xl space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </Container>
      </Section>
    </main>
  );
}
