import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <Section className="pt-8 sm:pt-12">
        <Container>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-4 h-10 w-2/3" />
          <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
