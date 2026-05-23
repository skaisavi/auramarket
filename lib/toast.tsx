"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useReducer, type ReactNode } from "react";
import { cn } from "./utils";

type ToastTone = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  tone: ToastTone;
};

type Action = { type: "ADD"; toast: Toast } | { type: "REMOVE"; id: string };

function reducer(state: Toast[], action: Action): Toast[] {
  switch (action.type) {
    case "ADD": return [...state, action.toast];
    case "REMOVE": return state.filter((t) => t.id !== action.id);
    default: return state;
  }
}

type ToastCtx = {
  toast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const toast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "ADD", toast: { id, message, tone } });
    setTimeout(() => dispatch({ type: "REMOVE", id }), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse gap-2"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dispatch({ type: "REMOVE", id: t.id })} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const toneConfig: Record<ToastTone, { icon: React.ReactNode; classes: string }> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4 shrink-0 text-sage-700" aria-hidden="true" />,
    classes: "border-sage-300/60 bg-sage-50 text-sage-900"
  },
  error: {
    icon: <XCircle className="h-4 w-4 shrink-0 text-clay-700" aria-hidden="true" />,
    classes: "border-clay-200 bg-clay-50 text-clay-900"
  },
  info: {
    icon: <Info className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />,
    classes: "border-line bg-white text-ink"
  }
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const { icon, classes } = toneConfig[toast.tone];
  return (
    <div
      role="status"
      className={cn(
        "animate-toast-in flex w-80 items-center gap-3 rounded-2xl border px-4 py-3 shadow-soft",
        classes
      )}
    >
      {icon}
      <p className="flex-1 text-sm font-semibold">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full opacity-50 transition hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
