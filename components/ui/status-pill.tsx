import { cn } from "@/lib/utils";

export function StatusPill({
  status
}: {
  status:
    | "Draft"
    | "Ready"
    | "Live"
    | "Scheduled"
    | "Paused"
    | "Healthy"
    | "Review"
    | "Action needed"
    | "Preparing"
    | "Published"
    | "Hidden"
    | "Open"
    | "In progress"
    | "Fixed"
    | "Expired"
    | "Complete"
    | "Missing"
    | "Blocked"
    | "Archived"
    | "Waiting for approval"
    | "Closed"
    | "Delivered";
}) {
  const classes: Record<string, string> = {
    Live: "bg-sage-50 text-sage-700 border-sage-300/60",
    Published: "bg-sage-50 text-sage-700 border-sage-300/60",
    Complete: "bg-sage-50 text-sage-700 border-sage-300/60",
    Ready: "bg-sage-50 text-sage-700 border-sage-300/60",
    Healthy: "bg-sage-50 text-sage-700 border-sage-300/60",
    Fixed: "bg-sage-50 text-sage-700 border-sage-300/60",
    Delivered: "bg-sage-50 text-sage-700 border-sage-300/60",
    Scheduled: "bg-yellow-50 text-yellow-800 border-yellow-200",
    Review: "bg-yellow-50 text-yellow-800 border-yellow-200",
    Preparing: "bg-yellow-50 text-yellow-800 border-yellow-200",
    "In progress": "bg-yellow-50 text-yellow-800 border-yellow-200",
    Draft: "bg-white text-muted border-line",
    Paused: "bg-white text-muted border-line",
    Hidden: "bg-white text-muted border-line",
    Archived: "bg-white text-muted border-line",
    Open: "bg-clay-50 text-clay-700 border-clay-200",
    Expired: "bg-clay-50 text-clay-700 border-clay-200",
    Missing: "bg-clay-50 text-clay-700 border-clay-200",
    Blocked: "bg-clay-50 text-clay-700 border-clay-200",
    "Waiting for approval": "bg-yellow-50 text-yellow-800 border-yellow-200",
    Closed: "bg-white text-muted border-line",
    "Action needed": "bg-clay-50 text-clay-700 border-clay-200"
  };

  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-semibold",
        classes[status]
      )}
    >
      {status}
    </span>
  );
}
