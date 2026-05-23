import { CampaignReadiness } from "@/components/admin/campaign-readiness";
import { LaunchReadinessChecklist } from "@/components/admin/launch-readiness-checklist";

export default function AdminLaunchPage() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <LaunchReadinessChecklist />
      <CampaignReadiness />
    </section>
  );
}
