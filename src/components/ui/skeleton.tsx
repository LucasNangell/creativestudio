import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "text" | "circular" | "rectangular";
};

export function Skeleton({
  className,
  variant = "rectangular",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse bg-white/10 motion-reduce:animate-none",
        variant === "text" && "h-4 w-full rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-nangell",
        className,
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-nangell-lg border border-glass-border bg-nangell-surface/80 p-5",
        className,
      )}
    >
      <Skeleton className="h-5 w-1/3" variant="text" />
      <Skeleton className="mt-3 h-4 w-full" variant="text" />
      <Skeleton className="mt-2 h-4 w-4/5" variant="text" />
      <Skeleton className="mt-4 h-24 w-full" />
    </div>
  );
}
