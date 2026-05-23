"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-pearl p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-clay-50 text-clay-700">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-white hover:text-ink"
            aria-label="Close confirmation modal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <h2 id="confirm-title" className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="button" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
