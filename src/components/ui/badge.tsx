import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default:
          "border-glass-border bg-nangell-surface/80 text-nangell-cyan",
        outline: "border-nangell-electric/40 bg-transparent text-nangell-blue",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-400",
        muted: "border-glass-border bg-white/5 text-nangell-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { badgeVariants };
