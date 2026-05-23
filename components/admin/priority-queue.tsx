import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ActivityLog, AuditIssue, Banner, Campaign, Product, Translation } from "@/lib/mock-data";

type QueueItem = {
  title: string;
  detail: string;
  href: string;
  priority: "Critical" | "High" | "Medium";
  owner: string;
};

export function PriorityQueue({
  activityLogs,
  auditIssues,
  banners,
  campaigns,
  products,
  translations
}: {
  activityLogs: ActivityLog[];
  auditIssues: AuditIssue[];
  banners: Banner[];
  campaigns: Campaign[];
  products: Product[];
  translations: Translation[];
}) {
  const today = new Date("2026-05-23T00:00:00");
  const queue: QueueItem[] = [
    ...auditIssues
      .filter((issue) => issue.status !== "Closed" && issue.status !== "Fixed")
      .slice(0, 3)
      .map((issue) => ({
        title: issue.issue,
        detail: `${issue.area} due ${issue.due}`,
        href: "/admin/audits",
        priority: issue.priority === "Critical" ? "Critical" : issue.priority === "High" ? "High" : "Medium",
        owner: issue.owner
      } satisfies QueueItem)),
    ...products
      .filter((product) => product.imageAlt.trim().length === 0 || product.stock <= 60)
      .slice(0, 3)
      .map((product) => ({
        title: product.imageAlt.trim().length === 0 ? `${product.name} needs image alt text` : `${product.name} stock needs review`,
        detail: `${product.market} market - ${product.stock} units - SEO ${product.seoCompleteness}%`,
        href: "/admin/products",
        priority: product.stock <= 20 ? "Critical" : "High",
        owner: "Web admin"
      } satisfies QueueItem)),
    ...banners
      .filter((banner) => new Date(`${banner.endsAt}T00:00:00`) < today || banner.imageAlt.trim().length === 0)
      .slice(0, 2)
      .map((banner) => ({
        title: `${banner.placement} banner needs review`,
        detail: `${banner.market} market - ends ${banner.endsAt}`,
        href: "/admin/banners",
        priority: "High",
        owner: "Campaigns"
      } satisfies QueueItem)),
    ...campaigns
      .filter((campaign) => campaign.missingRequirements.length > 0)
      .slice(0, 2)
      .map((campaign) => ({
        title: `${campaign.title} has launch blockers`,
        detail: `${campaign.missingRequirements.length} missing requirements before ${campaign.launchDate}`,
        href: "/admin/campaigns",
        priority: campaign.readiness < 70 ? "High" : "Medium",
        owner: "Marketing"
      } satisfies QueueItem)),
    ...translations
      .filter((translation) => translation.pending > 0)
      .slice(0, 2)
      .map((translation) => ({
        title: `${translation.language} translations pending`,
        detail: `${translation.pending} strings waiting for ${translation.reviewer}`,
        href: "/admin/content",
        priority: translation.completeness < 70 ? "High" : "Medium",
        owner: "Localization"
      } satisfies QueueItem))
  ]
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority))
    .slice(0, 7);

  const latestSystemActivity = activityLogs.find((log) => log.actor === "System");

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Web admin priority queue
          </p>
          <h2 className="mt-2 text-lg font-semibold">What needs action today</h2>
          <p className="mt-1 text-sm text-muted">Generated from stock, campaign, translation, banner, and audit signals.</p>
        </div>
        <Button href="/admin/activity" variant="secondary" className="px-3 text-xs">
          View log
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {queue.map((item) => (
          <a
            key={`${item.href}-${item.title}`}
            href={item.href}
            className="grid gap-3 rounded-xl border border-line bg-white/70 p-4 transition hover:-translate-y-0.5 hover:bg-white sm:grid-cols-[auto_1fr_auto] sm:items-start"
          >
            <span className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${priorityClasses(item.priority)}`}>
              {item.priority === "Medium" ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <AlertTriangle className="h-4 w-4" aria-hidden="true" />}
            </span>
            <span>
              <span className="block text-sm font-semibold">{item.title}</span>
              <span className="mt-1 block text-xs leading-5 text-muted">{item.detail}</span>
            </span>
            <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-semibold text-muted">{item.owner}</span>
          </a>
        ))}
      </div>

      {latestSystemActivity ? (
        <p className="mt-5 rounded-xl border border-line bg-surface/70 px-4 py-3 text-xs text-muted">
          Latest system signal: {latestSystemActivity.detail}
        </p>
      ) : null}
    </Card>
  );
}

function priorityRank(priority: QueueItem["priority"]) {
  return { Critical: 0, High: 1, Medium: 2 }[priority];
}

function priorityClasses(priority: QueueItem["priority"]) {
  if (priority === "Critical") return "bg-clay-50 text-clay-700";
  if (priority === "High") return "bg-yellow-50 text-yellow-700";
  return "bg-sage-50 text-sage-700";
}
