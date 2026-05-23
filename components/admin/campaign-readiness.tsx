"use client";

import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { useStore } from "@/lib/store";

export function CampaignReadiness() {
  const { state } = useStore();
  const campaign = state.campaigns[0];
  const checklist = state.launchChecklist;

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Campaign readiness</h2>
          <p className="mt-1 text-sm text-muted">{campaign.title} launch workspace</p>
        </div>
        <StatusPill status={campaign.status} />
      </div>
      <div className="mt-6 rounded-xl bg-sage-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-sage-700">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          Launches {campaign.launchDate}
        </div>
        <p className="mt-3 text-2xl font-semibold">{campaign.readiness}% ready</p>
        <Progress value={campaign.readiness} className="mt-4 bg-white/80" />
      </div>
      <div className="mt-5 space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white/70 p-3">
            <span className="flex items-center gap-3 text-sm font-medium">
              {item.complete ? (
                <CheckCircle2 className="h-4 w-4 text-sage-700" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4 text-muted" aria-hidden="true" />
              )}
              {item.label}
            </span>
            <span className="text-xs text-muted">{item.owner}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
