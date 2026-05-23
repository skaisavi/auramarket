import { CampaignManager } from "@/components/admin/campaign-manager";

export default function AdminCampaignsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Campaign manager</h1>
        <p className="mt-2 text-sm text-muted">Plan launch dates, monitor readiness, and clear blockers before publishing.</p>
      </div>
      <CampaignManager />
    </section>
  );
}
