import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-nangell font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-nangell-gradient text-nangell-dark shadow-glow-soft hover:opacity-90 hover:shadow-glow",
        secondary:
          "bg-nangell-surface text-nangell-text border border-glass-border hover:border-nangell-electric/40 hover:bg-nangell-surface/80",
        ghost:
          "text-nangell-text hover:bg-white/5 hover:text-nangell-cyan",
        outline:
          "border border-glass-border bg-transparent text-nangell-text hover:border-nangell-cyan/50 hover:bg-nangell-gradient-subtle",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
