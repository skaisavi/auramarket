import { ArrowRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { markets, translations } from "@/lib/mock-data";

export default function AdminMarketsPage() {
  const localeByMarket: Record<string, string> = {
    UK: "en-GB",
    EU: "fr-FR",
    US: "en-US",
    LT: "lt-LT",
    IT: "it-IT"
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
          <Globe2 className="h-4 w-4" aria-hidden="true" />
          Market operations
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Markets</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Drill into each market to review readiness, translations, campaigns, banners, and visible products.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {markets.map((market) => {
          const translation = translations.find((item) => item.locale === localeByMarket[market.code]);
          return (
            <Card key={market.code}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{market.name}</h2>
                  <p className="mt-1 text-sm text-muted">{market.code} - {market.currency}</p>
                </div>
                <StatusPill status={market.status} />
              </div>
              <p className="mt-6 text-3xl font-semibold">{market.health}%</p>
              <Progress value={market.health} className="mt-4" />
              <p className="mt-4 text-sm text-muted">
                Translation readiness: {translation ? `${translation.completeness}%` : "pending setup"}
              </p>
              <Button href={`/admin/markets/${market.code.toLowerCase()}`} variant="secondary" className="mt-5 w-full">
                View market
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
