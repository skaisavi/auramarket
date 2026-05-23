import { AlertTriangle, BarChart3, Globe2, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Campaign, Market, Product } from "@/lib/mock-data";

type TrendPoint = {
  label: string;
  value: number;
};

const revenueByMarket: Record<string, TrendPoint[]> = {
  UK: [
    { label: "Mon", value: 18.4 },
    { label: "Tue", value: 21.2 },
    { label: "Wed", value: 20.8 },
    { label: "Thu", value: 25.1 },
    { label: "Fri", value: 28.6 },
    { label: "Sat", value: 32.4 }
  ],
  EU: [
    { label: "Mon", value: 14.2 },
    { label: "Tue", value: 16.1 },
    { label: "Wed", value: 15.9 },
    { label: "Thu", value: 18.7 },
    { label: "Fri", value: 22.5 },
    { label: "Sat", value: 24.2 }
  ],
  US: [
    { label: "Mon", value: 7.8 },
    { label: "Tue", value: 9.1 },
    { label: "Wed", value: 8.4 },
    { label: "Thu", value: 11.2 },
    { label: "Fri", value: 13.8 },
    { label: "Sat", value: 15.4 }
  ]
};

export function DashboardAnalytics({
  campaigns,
  markets,
  products
}: {
  campaigns: Campaign[];
  markets: Market[];
  products: Product[];
}) {
  const lowStockProducts = products.filter((product) => product.stock <= 80);
  const missingAltText = products.filter((product) => product.imageAlt.trim().length === 0);
  const averageReadiness = Math.round(
    campaigns.reduce((total, campaign) => total + campaign.readiness, 0) / campaigns.length
  );
  const readinessTrend = campaigns.map((campaign) => ({
    label: campaign.title,
    value: campaign.readiness
  }));

  return (
    <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              Revenue by market
            </p>
            <h2 className="mt-2 text-lg font-semibold">Trading pulse</h2>
          </div>
          <p className="text-sm font-semibold text-muted">Last 6 days</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {Object.entries(revenueByMarket).map(([marketCode, trend]) => {
            const latest = trend[trend.length - 1].value;
            const market = markets.find((item) => item.code === marketCode);
            return (
              <div key={marketCode} className="rounded-xl border border-line bg-white/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted">{market?.name ?? marketCode}</p>
                    <p className="mt-1 text-2xl font-semibold">{formatRevenue(latest)}</p>
                  </div>
                  <span className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-semibold text-sage-700">
                    +{Math.round(((latest - trend[0].value) / trend[0].value) * 100)}%
                  </span>
                </div>
                <Sparkline
                  className="mt-4"
                  label={`${marketCode} revenue trend`}
                  points={trend.map((point) => point.value)}
                />
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
        <Card>
          <p className="flex items-center gap-2 text-sm font-semibold text-clay-700">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Stock and media alerts
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <AlertMetric label="Low stock" value={lowStockProducts.length} />
            <AlertMetric label="Missing alt text" value={missingAltText.length} />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Campaign products below threshold and product images missing alt text should be reviewed before the next homepage refresh.
          </p>
        </Card>

        <Card>
          <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <Megaphone className="h-4 w-4" aria-hidden="true" />
            Campaign readiness
          </p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold">{averageReadiness}%</p>
              <p className="mt-1 text-sm text-muted">Average readiness</p>
            </div>
            <Sparkline
              className="h-16 w-36"
              label="Campaign readiness trend"
              points={readinessTrend.map((point) => point.value)}
            />
          </div>
          <Progress value={averageReadiness} className="mt-5" />
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Globe2 className="h-4 w-4" aria-hidden="true" />
            {campaigns.filter((campaign) => campaign.missingRequirements.length > 0).length} launches still have blockers.
          </div>
        </Card>
      </div>
    </section>
  );
}

function AlertMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-surface/70 p-4">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-muted">{label}</p>
    </div>
  );
}

function Sparkline({
  className,
  label,
  points
}: {
  className?: string;
  label: string;
  points: number[];
}) {
  const width = 180;
  const height = 70;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coordinates = points.map((point, index) => {
    const x = (index / (points.length - 1 || 1)) * width;
    const y = height - ((point - min) / range) * (height - 12) - 6;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      className={className ?? "h-20 w-full"}
      preserveAspectRatio="none"
    >
      <polyline
        points={coordinates.join(" ")}
        fill="none"
        stroke="#5E8C61"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      {coordinates.map((coordinate) => {
        const [cx, cy] = coordinate.split(",");
        return <circle key={coordinate} cx={cx} cy={cy} r="3.5" fill="#2F4636" />;
      })}
    </svg>
  );
}

function formatRevenue(value: number) {
  return `£${value.toFixed(1)}k`;
}
