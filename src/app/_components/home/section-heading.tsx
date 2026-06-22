import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-nangell-text sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-nangell-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
