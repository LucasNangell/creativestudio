import { cn } from "@/lib/utils";

const sizeClasses = {
  prose: "max-w-2xl",
  heading: "max-w-3xl",
  narrow: "max-w-4xl",
  page: "max-w-7xl",
} as const;

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
  /** Content width scale: prose (2xl), heading (3xl), narrow (4xl), page (7xl). Default: page. */
  size?: keyof typeof sizeClasses;
};

export function Container({
  children,
  className,
  as: Component = "div",
  size = "page",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
