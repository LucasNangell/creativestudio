"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type ToastType = "success" | "error";

type ToastState = {
  message: string;
  type: ToastType;
} | null;

export function useToast(durationMs = 5000) {
  const [toast, setToast] = useState<ToastState>(null);

  const dismiss = useCallback(() => setToast(null), []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToast({ message, type });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismiss, durationMs);
    return () => clearTimeout(timer);
  }, [toast, dismiss, durationMs]);

  return { toast, showToast, dismiss };
}

type ToastProps = {
  toast: ToastState;
  onDismiss: () => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-[200] flex max-w-sm items-start gap-3 rounded-nangell border px-4 py-3 shadow-glass",
        toast.type === "success" &&
          "border-emerald-500/30 bg-nangell-surface text-emerald-100",
        toast.type === "error" && "border-red-500/30 bg-nangell-surface text-red-100",
      )}
    >
      {toast.type === "success" ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
      )}
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-nangell-muted hover:text-nangell-text"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
