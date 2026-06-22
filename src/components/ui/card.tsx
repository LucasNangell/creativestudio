import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-nangell-lg border border-glass-border transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-nangell-surface/80 shadow-glass backdrop-blur-md",
        elevated:
          "bg-nangell-surface shadow-glow-soft hover:border-nangell-electric/30",
        subtle: "bg-white/[0.03] hover:bg-white/[0.05]",
        gradient: "bg-nangell-gradient-subtle border-nangell-electric/20",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5 sm:p-6",
        lg: "p-6 sm:p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({
  className,
  variant,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-heading text-base font-semibold text-nangell-text sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-sm leading-relaxed text-nangell-muted", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex flex-wrap items-center gap-3 border-t border-glass-border px-0 pt-4 pb-4",
        className,
      )}
      {...props}
    />
  );
}

export { cardVariants };
