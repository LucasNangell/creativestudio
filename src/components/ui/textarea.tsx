import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Textarea({
  className,
  label,
  error,
  hint,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={textareaId}
          className="mb-1.5 block text-sm font-medium text-nangell-text"
        >
          {label}
        </label>
      ) : null}

      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : hint
              ? `${textareaId}-hint`
              : undefined
        }
        className={cn(
          "w-full resize-y rounded-nangell border border-glass-border bg-nangell-surface/80 px-4 py-3 text-sm text-nangell-text placeholder:text-nangell-muted/70 transition-colors",
          "hover:border-nangell-electric/30 focus-visible:border-nangell-electric focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/50 focus-visible:border-red-500",
          className,
        )}
        {...props}
      />

      {hint && !error ? (
        <p id={`${textareaId}-hint`} className="mt-1.5 text-xs text-nangell-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${textareaId}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
