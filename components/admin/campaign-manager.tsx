"use client";

import { AlertCircle, CalendarDays, CheckCircle2, Circle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { updateCampaignStatus } from "@/lib/actions/campaigns";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";

export function CampaignManager() {
  const { state, dispatch } = useStore();
  const { campaigns } = state;
  const { toast } = useToast();

  const [selectedSlug, setSelectedSlug] = useState(campaigns[0].slug);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selected = campaigns.find((c) => c.slug === selectedSlug) ?? campaigns[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-4">
        {campaigns.map((campaign) => (
          <button
            key={campaign.slug}
            type="button"
            onClick={() => setSelectedSlug(campaign.slug)}
            className="w-full rounded-2xl border border-line bg-white/76 p-5 text-left shadow-inset transition hover:bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted">{campaign.market}</p>
                <h2 className="mt-1 text-xl font-semibold">{campaign.title}</h2>
              </div>
              <StatusPill status={campaign.status} />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Progress value={campaign.readiness} />
              <span className="text-sm font-semibold">{campaign.readiness}%</span>
            </div>
          </button>
        ))}
      </section>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{selected.title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{selected.heroCopy}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <StatusPill status={selected.status} />
            {selected.status !== "Live" && (
              <Button type="button" onClick={() => setConfirmOpen(true)}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Publish
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-sage-50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Launch date: {selected.launchDate}
          </div>
          <p className="mt-4 text-4xl font-semibold">{selected.readiness}%</p>
          <Progress value={selected.readiness} className="mt-4 bg-white/80" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-line bg-white/72 p-5">
            <h2 className="font-semibold">Focus products</h2>
            <div className="mt-4 space-y-3">
              {selected.focusProducts.map((product) => (
                <p key={product} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-sage-700" aria-hidden="true" />
                  {product}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white/72 p-5">
            <h2 className="font-semibold">Missing launch requirements</h2>
            <div className="mt-4 space-y-3">
              {selected.missingRequirements.map((requirement) => (
                <p key={requirement} className="flex items-center gap-3 text-sm">
                  <AlertCircle className="h-4 w-4 text-clay-700" aria-hidden="true" />
                  {requirement}
                </p>
              ))}
              {selected.missingRequirements.length === 0 ? (
                <p className="flex items-center gap-3 text-sm">
                  <Circle className="h-4 w-4 text-sage-700" aria-hidden="true" />
                  Ready for final publish review
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </Card>

      <ConfirmationModal
        open={confirmOpen}
        title={`Publish ${selected.title}?`}
        description={
          selected.missingRequirements.length > 0
            ? "This campaign still has launch warnings. Publishing will set the campaign status to Live."
            : "This will set the campaign status to Live and make it visible on the storefront."
        }
        confirmLabel="Publish campaign"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          try {
            await updateCampaignStatus(selected.slug, "Live");
            dispatch({ type: "UPDATE_CAMPAIGN_STATUS", slug: selected.slug, status: "Live" });
            toast(`${selected.title} is now live`);
            setConfirmOpen(false);
          } catch {
            toast("Campaign could not be published. Check the database connection.", "error");
          }
        }}
      />
    </div>
  );
}
