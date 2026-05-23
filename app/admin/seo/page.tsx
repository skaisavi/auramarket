import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { seoRecords } from "@/lib/mock-data";

export default function AdminSeoPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <h1 className="text-2xl font-semibold tracking-tight">SEO manager</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Review page titles, meta descriptions, score gaps, and ownership before content is approved for launch.
        </p>
      </div>
      <Card>
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[1fr_0.9fr_0.45fr_0.6fr_0.6fr] gap-4 bg-surface-strong px-4 py-3 text-xs font-semibold uppercase text-muted lg:grid">
            <span>Page</span><span>Issue</span><span>Score</span><span>Status</span><span>Owner</span>
          </div>
          <div className="divide-y divide-line bg-white/70">
            {seoRecords.map((record) => (
              <article key={record.path} className="grid gap-4 px-4 py-4 lg:grid-cols-[1fr_0.9fr_0.45fr_0.6fr_0.6fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold">{record.path}</p>
                  <p className="mt-1 text-xs text-muted">{record.title}</p>
                </div>
                <p className="flex items-start gap-2 text-sm text-muted">
                  {record.status === "Healthy" ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-sage-700" aria-hidden="true" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-clay-700" aria-hidden="true" />}
                  {record.issue}
                </p>
                <div>
                  <div className="mb-2 text-sm font-semibold">{record.score}%</div>
                  <Progress value={record.score} />
                </div>
                <StatusPill status={record.status} />
                <p className="text-sm text-muted">{record.owner}</p>
              </article>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
