"use client";

import { AlertTriangle, CalendarDays, ExternalLink, PauseCircle, PlayCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { updateBannerStatus } from "@/lib/actions/banners";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";

const today = new Date("2026-05-23T00:00:00");

export function BannerManager() {
  const { state, dispatch } = useStore();
  const { banners } = state;
  const { toast } = useToast();

  const [market, setMarket] = useState("All");

  const marketOptions = useMemo(
    () => ["All", ...Array.from(new Set(banners.map((b) => b.market))).sort()],
    [banners]
  );

  const filtered = useMemo(
    () => banners.filter((banner) => market === "All" || banner.market === market),
    [banners, market]
  );

  async function setBannerStatus(id: string, status: "Live" | "Paused") {
    try {
      await updateBannerStatus(id, status);
      dispatch({ type: "UPDATE_BANNER_STATUS", id, status });
      toast(status === "Paused" ? "Banner paused" : "Banner resumed", status === "Paused" ? "info" : "success");
    } catch {
      toast("Banner status could not be updated. Check the database connection.", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/72 p-4 shadow-inset sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Banner manager</h1>
          <p className="mt-1 text-sm text-muted">Review promotional surfaces, expiry risk, destinations, and image accessibility.</p>
        </div>
        <label className="block min-w-40 text-xs font-semibold text-muted">
          Market
          <select value={market} onChange={(event) => setMarket(event.target.value)} className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink">
            {marketOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <section className="grid gap-5 lg:grid-cols-3">
        {filtered.map((banner) => {
          const expired = new Date(`${banner.endsAt}T00:00:00`) < today;
          const missingAlt = banner.imageAlt.trim().length === 0;

          return (
            <Card key={banner.id} className="overflow-hidden p-0">
              <div className="aspect-[16/9] border-b border-line p-5" style={{ background: banner.visual }}>
                <div className="flex h-full flex-col justify-between rounded-xl bg-white/42 p-4 backdrop-blur-sm">
                  <Badge tone="neutral">{banner.placement}</Badge>
                  <p className="max-w-xs text-xl font-semibold leading-tight">{banner.message}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{banner.market}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {banner.startsAt} to {banner.endsAt}
                    </p>
                  </div>
                  <StatusPill status={expired ? "Expired" : banner.status} />
                </div>
                <div className="mt-4 space-y-3">
                  {expired ? <Warning text="Banner has expired and should be archived or renewed." /> : null}
                  {missingAlt ? <Warning text="Image alt text is missing for this banner." /> : null}
                </div>
                <div className="mt-5 flex gap-3">
                  {!expired && banner.status === "Live" && (
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setBannerStatus(banner.id, "Paused")}
                    >
                      <PauseCircle className="h-4 w-4" aria-hidden="true" />
                      Pause
                    </Button>
                  )}
                  {banner.status === "Paused" && (
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setBannerStatus(banner.id, "Live")}
                    >
                      <PlayCircle className="h-4 w-4" aria-hidden="true" />
                      Resume
                    </Button>
                  )}
                  <Button href={banner.destination} variant="secondary" className="flex-1">
                    Preview
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-clay-200 bg-clay-50 px-3 py-2 text-xs font-semibold leading-5 text-clay-700">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {text}
    </p>
  );
}
