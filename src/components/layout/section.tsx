import { cn } from "@/lib/utils";

const spacingClasses = {
  hero: "pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24",
  default: "py-12 sm:py-16 lg:py-20",
  compact: "py-4 sm:py-6",
} as const;

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Vertical padding: hero | default | compact. Default: default. */
  spacing?: keyof typeof spacingClasses;
};

export function Section({
  children,
  className,
  id,
  spacing = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      {children}
    </section>
  );
}
