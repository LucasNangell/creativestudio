import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

type DemoLoadingSkeletonProps = {
  title?: string;
};

export function DemoLoadingSkeleton({ title = "Demonstração" }: DemoLoadingSkeletonProps) {
  return (
    <div className="pb-16 pt-8" role="status" aria-live="polite" aria-busy="true">
      <Container>
        <span className="sr-only">Carregando demonstração {title}…</span>
        <Skeleton className="mb-4 h-4 w-48" />
        <Skeleton className="h-10 w-full max-w-xl" />
        <Skeleton className="mt-2 h-5 w-2/3" />
        <Skeleton className="mt-8 h-[420px] w-full rounded-nangell-lg" />
      </Container>
    </div>
  );
}
