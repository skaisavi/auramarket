"use client";

import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function LaunchReadinessChecklist() {
  const { state, dispatch } = useStore();
  const { launchChecklist } = state;

  const complete = launchChecklist.filter((item) => item.complete).length;
  const score = Math.round((complete / launchChecklist.length) * 100);

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Launch readiness checklist</h1>
          <p className="mt-2 text-sm text-muted">Click each item to mark it complete or incomplete.</p>
        </div>
        <p className="text-4xl font-semibold">{score}%</p>
      </div>
      <Progress value={score} className="mt-6" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {launchChecklist.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_CHECKLIST_ITEM", id: item.id })}
            className={cn(
              "rounded-2xl border p-5 text-left transition",
              item.complete
                ? "border-sage-300/60 bg-sage-50 hover:bg-sage-100/60"
                : "border-line bg-white/72 hover:bg-white"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                {item.complete ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" aria-hidden="true" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                )}
                <div>
                  <h2 className="font-semibold">{item.label}</h2>
                  <p className="mt-1 text-sm text-muted">{item.owner}</p>
                </div>
              </div>
              {!item.complete ? <AlertCircle className="h-5 w-5 shrink-0 text-clay-700" aria-hidden="true" /> : null}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
