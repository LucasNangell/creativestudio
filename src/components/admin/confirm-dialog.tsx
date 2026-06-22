"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" size="sm" onClick={onConfirm} disabled={loading}>
          {loading ? "Processando..." : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
