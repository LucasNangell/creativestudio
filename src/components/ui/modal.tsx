"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

import { useFocusTrap } from "@/hooks/use-focus-trap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(open, panelRef);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }

    if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-4 backdrop:bg-nangell-dark/80 backdrop:backdrop-blur-sm",
        "open:flex open:items-center open:justify-center",
        className,
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "relative w-full rounded-nangell-xl border border-glass-border bg-nangell-surface p-6 shadow-glass",
          sizeClasses[size],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="font-heading text-lg font-semibold text-nangell-text"
            >
              {title}
            </h2>
            {description ? (
              <p
                id={descriptionId}
                className="mt-1 text-sm text-nangell-muted"
              >
                {description}
              </p>
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Fechar modal"
            onClick={onClose}
            className="h-8 w-8 shrink-0 p-0"
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </dialog>
  );
}
