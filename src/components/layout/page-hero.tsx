import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "default" | "compact";
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  align = "left",
  size = "default",
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isCenter ? "text-center" : "text-left",
        className,
      )}
    >
      <ParallaxLayer
        speed={0.12}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-nangell-radial" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-nangell-violet/10 blur-3xl" />
      </ParallaxLayer>

      <div
        className={cn(
          "relative",
          isCenter && "mx-auto flex max-w-3xl flex-col items-center",
        )}
      >
        {eyebrow ? (
          <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            "font-heading font-bold tracking-tight text-nangell-text",
            size === "compact"
              ? "text-2xl sm:text-3xl lg:text-4xl"
              : "text-3xl sm:text-4xl lg:text-5xl",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-nangell-muted sm:text-lg",
              isCenter && "max-w-2xl",
            )}
          >
            {description}
          </p>
        ) : null}

        {children ? (
          <div
            className={cn(
              "mt-8 flex flex-col gap-3 sm:flex-row",
              isCenter && "sm:justify-center",
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
