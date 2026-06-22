import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  className,
  label,
  error,
  hint,
  options,
  placeholder,
  id,
  ...props
}: SelectProps) {
  const selectId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-nangell-text"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error
              ? `${selectId}-error`
              : hint
                ? `${selectId}-hint`
                : undefined
          }
          className={cn(
            "h-11 w-full appearance-none rounded-nangell border border-glass-border bg-nangell-surface/80 px-4 pr-10 text-sm text-nangell-text transition-colors",
            "hover:border-nangell-electric/30 focus-visible:border-nangell-electric focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus-visible:border-red-500",
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-nangell-muted"
          aria-hidden
        />
      </div>

      {hint && !error ? (
        <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-nangell-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${selectId}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
