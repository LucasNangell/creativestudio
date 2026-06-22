import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({
  className,
  label,
  error,
  hint,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-nangell-text"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        className={cn(
          "h-11 w-full rounded-nangell border border-glass-border bg-nangell-surface/80 px-4 text-sm text-nangell-text placeholder:text-nangell-muted/70 transition-colors",
          "hover:border-nangell-electric/30 focus-visible:border-nangell-electric focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/50 focus-visible:border-red-500",
          className,
        )}
        {...props}
      />

      {hint && !error ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-nangell-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
