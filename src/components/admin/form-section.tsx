import { cn } from "@/lib/utils";

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("glass-card space-y-4 p-5 sm:p-6", className)}>
      <div>
        <h2 className="font-heading text-lg font-semibold text-nangell-text">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-nangell-muted">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
