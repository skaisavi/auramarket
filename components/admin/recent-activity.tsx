import { ActivityLog } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RecentActivity({
  items,
  limit,
  showViewAll = false
}: {
  items: ActivityLog[];
  limit?: number;
  showViewAll?: boolean;
}) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;
  const hiddenCount = items.length - visibleItems.length;

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <span className="text-xs font-semibold text-sage-700">Live log</span>
      </div>
      <div className="mt-5 space-y-3">
        {visibleItems.map((item) => (
          <article key={item.id} className="grid grid-cols-[auto_1fr] gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sage-500" aria-hidden="true" />
            <div>
              <p className="text-sm leading-6">
                <span className="font-semibold">{item.actor}</span> {item.action}{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <p className="text-xs text-muted">{item.time}</p>
            </div>
          </article>
        ))}
      </div>
      {showViewAll ? (
        <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {hiddenCount > 0 ? `${hiddenCount} more updates in the full log` : "Full activity log is up to date"}
          </p>
          <Button href="/admin/activity" variant="secondary" className="px-4 text-xs">
            View all activity
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
