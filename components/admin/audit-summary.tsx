import { Audit } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";

export function AuditSummary({ audits }: { audits: Audit[] }) {
  return (
    <Card>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Website audit summary</h2>
          <p className="mt-1 text-sm text-muted">Operational checks for content, catalog, and campaign links.</p>
        </div>
        <p className="text-sm font-semibold text-sage-700">Next sweep: 16:00</p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {audits.map((audit) => (
          <article key={audit.id} className="rounded-xl border border-line bg-white/72 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold">{audit.area}</h3>
              <StatusPill status={audit.status} />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Progress value={audit.score} />
              <span className="text-sm font-semibold">{audit.score}%</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{audit.note}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
