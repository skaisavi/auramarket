import { AlertTriangle } from "lucide-react";
import {
  activityLogs,
  auditIssues,
  audits,
  banners,
  campaigns,
  dashboardStats,
  markets,
  products,
  translations
} from "@/lib/mock-data";
import { AuditSummary } from "@/components/admin/audit-summary";
import { CampaignReadiness } from "@/components/admin/campaign-readiness";
import { DashboardAnalytics } from "@/components/admin/dashboard-analytics";
import { PriorityQueue } from "@/components/admin/priority-queue";
import { RecentActivity } from "@/components/admin/recent-activity";
import { StatCard } from "@/components/admin/stat-card";
import { TranslationStatus } from "@/components/admin/translation-status";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <DashboardAnalytics campaigns={campaigns} markets={markets} products={products} />

      <PriorityQueue
        activityLogs={activityLogs}
        auditIssues={auditIssues}
        banners={banners}
        campaigns={campaigns}
        products={products}
        translations={translations}
      />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AuditSummary audits={audits} />
        <RecentActivity items={activityLogs} limit={6} showViewAll />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <CampaignReadiness />
        <TranslationStatus translations={translations} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-lg font-semibold">Market operations</h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-strong text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Market</th>
                  <th className="px-4 py-3 font-semibold">Currency</th>
                  <th className="px-4 py-3 font-semibold">Health</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white/70">
                {markets.map((market) => (
                  <tr key={market.code}>
                    <td className="px-4 py-3 font-semibold">{market.name}</td>
                    <td className="px-4 py-3 text-muted">{market.currency}</td>
                    <td className="px-4 py-3">{market.health}%</td>
                    <td className="px-4 py-3"><StatusPill status={market.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold">Expired content warnings</h2>
            <Button href="/admin/banners" variant="secondary" className="px-3 text-xs">
              Review banners
            </Button>
          </div>
          <div className="mt-5 space-y-3">
            {banners
              .filter((banner) => {
                const today = new Date("2026-05-23T00:00:00");
                return new Date(`${banner.endsAt}T00:00:00`) < today;
              })
              .map((banner) => (
                <div key={banner.id} className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-clay-700" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-clay-700">{banner.placement}</p>
                    <p className="mt-0.5 text-xs text-clay-700/80">
                      Expired {banner.endsAt} · {banner.market} market · Should be archived or renewed.
                    </p>
                  </div>
                </div>
              ))}
            {banners.filter((banner) => {
              const today = new Date("2026-05-23T00:00:00");
              return new Date(`${banner.endsAt}T00:00:00`) < today;
            }).length === 0 ? (
              <p className="text-sm text-muted">No expired banners detected today.</p>
            ) : null}
          </div>
        </Card>
      </section>
    </div>
  );
}
