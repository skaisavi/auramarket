import { CalendarDays, Percent } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { promotions } from "@/lib/mock-data";

export default function AdminPromotionsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <h1 className="text-2xl font-semibold tracking-tight">Discounts & promotions</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Manage promotional codes, campaign windows, expiry risk, and market-specific requirements.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {promotions.map((promotion) => (
          <Card key={promotion.id}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-50 text-sage-700">
                <Percent className="h-5 w-5" aria-hidden="true" />
              </span>
              <StatusPill status={promotion.status} />
            </div>
            <h2 className="mt-5 text-xl font-semibold">{promotion.name}</h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{promotion.code}</p>
            <p className="mt-3 text-sm text-muted">{promotion.discount} · {promotion.market}</p>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-muted">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {promotion.startsAt} to {promotion.endsAt}
            </p>
            <p className="mt-4 rounded-xl border border-line bg-white/72 p-3 text-sm leading-6 text-muted">{promotion.requirement}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
