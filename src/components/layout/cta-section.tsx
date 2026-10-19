import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient";
};

export function CtaSection({
  title,
  description,
  children,
  className,
  variant = "default",
}: CtaSectionProps) {
  return (
    <Section className={className}>
      <Container>
        <div
          className={cn(
            "relative overflow-hidden rounded-nangell-xl border border-glass-border p-8 sm:p-12",
            variant === "gradient"
              ? "bg-nangell-gradient-subtle shadow-glow-soft"
              : "bg-nangell-surface/80 shadow-glass backdrop-blur-md",
          )}
        >
          {variant === "gradient" ? (
            <ParallaxLayer
              speed={0.18}
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-nangell-cyan/10 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-nangell-violet/10 blur-3xl" />
            </ParallaxLayer>
          ) : null}

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-nangell-text sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base leading-relaxed text-nangell-muted">
                {description}
              </p>
            ) : null}
            {children ? (
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
