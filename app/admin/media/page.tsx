import { AlertTriangle, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { mediaAssets } from "@/lib/mock-data";

export default function AdminMediaPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <h1 className="text-2xl font-semibold tracking-tight">Media library</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Track product, campaign, banner, and editorial assets with alt text and size readiness.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {mediaAssets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden p-0">
            <div className="aspect-[4/3] border-b border-line" style={{ background: asset.visual }} aria-hidden="true" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-50 text-sage-700">
                  <ImageIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <StatusPill status={asset.status === "Ready" ? "Ready" : asset.status === "Missing alt text" ? "Missing" : "Review"} />
              </div>
              <h2 className="mt-4 font-semibold">{asset.name}</h2>
              <p className="mt-2 text-sm text-muted">{asset.type} · {asset.size}</p>
              <p className="mt-3 text-xs text-muted">Used in: {asset.usedIn}</p>
              {asset.altText.length === 0 ? (
                <p className="mt-4 flex gap-2 rounded-xl border border-clay-200 bg-clay-50 px-3 py-2 text-xs font-semibold text-clay-700">
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  Alt text missing
                </p>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
