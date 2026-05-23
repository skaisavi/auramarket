import { GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { homepageBlocks } from "@/lib/mock-data";

export default function AdminHomepagePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <h1 className="text-2xl font-semibold tracking-tight">Homepage builder</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Review homepage modules, ownership, content readiness, and publishing state without redesigning the page.
        </p>
      </div>
      <Card>
        <div className="space-y-4">
          {homepageBlocks.map((block, index) => (
            <article key={block.id} className="grid gap-4 rounded-2xl border border-line bg-white/72 p-4 sm:grid-cols-[auto_3rem_1fr_auto] sm:items-center">
              <GripVertical className="h-5 w-5 text-muted" aria-hidden="true" />
              <span className="font-serif text-3xl font-semibold text-sage-300">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-xs font-semibold uppercase text-sage-700">{block.type}</p>
                <h2 className="mt-1 font-semibold">{block.name}</h2>
                <p className="mt-1 text-sm text-muted">{block.note} · {block.owner}</p>
              </div>
              <StatusPill status={block.status} />
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}
