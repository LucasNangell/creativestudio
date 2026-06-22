"use client";

import { Input } from "@/components/ui/input";

type JsonListFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function JsonListField({
  label,
  hint = "Um item por linha",
  value,
  onChange,
  placeholder,
  disabled,
}: JsonListFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-nangell-text">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full rounded-nangell border border-glass-border bg-nangell-surface/80 px-4 py-3 font-mono text-xs text-nangell-text placeholder:text-nangell-muted/70 focus-visible:border-nangell-electric focus-visible:outline-none disabled:opacity-50"
      />
      {hint ? <p className="mt-1.5 text-xs text-nangell-muted">{hint}</p> : null}
    </div>
  );
}
