"use client";

import { CheckCircle2, Search, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { updateAuditIssue } from "@/lib/actions/audit";
import { useDebounce } from "@/lib/use-debounce";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { type AuditIssue } from "@/lib/mock-data";

export function AuditIssueManager() {
  const { state, dispatch } = useStore();
  const { auditIssues } = state;
  const { toast } = useToast();

  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 200);

  const filtered = useMemo(() => {
    return auditIssues.filter((issue) => {
      const matchesPriority = priority === "All" || issue.priority === priority;
      const matchesStatus = status === "All" || issue.status === status;
      const matchesQuery = [issue.area, issue.issue, issue.owner]
        .join(" ")
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());
      return matchesPriority && matchesStatus && matchesQuery;
    });
  }, [auditIssues, priority, status, debouncedQuery]);

  async function markFixed(id: string) {
    try {
      await updateAuditIssue(id, "Fixed");
      dispatch({ type: "UPDATE_AUDIT_ISSUE", id, status: "Fixed" });
      toast("Issue marked as fixed");
    } catch {
      toast("Audit issue could not be updated. Check the database connection.", "error");
    }
  }

  async function closeIssue(id: string) {
    try {
      await updateAuditIssue(id, "Closed");
      dispatch({ type: "UPDATE_AUDIT_ISSUE", id, status: "Closed" });
      toast("Issue closed", "info");
    } catch {
      toast("Audit issue could not be closed. Check the database connection.", "error");
    }
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Website audit issues</h1>
          <p className="mt-2 text-sm text-muted">Track practical web administration fixes across content, SEO, links, and localization.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Search audit issues</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 rounded-full border border-line bg-white pl-10 pr-4 text-sm" placeholder="Search issues..." />
          </label>
          <IssueSelect label="Priority" value={priority} onChange={setPriority} options={["All", "Critical", "High", "Medium", "Low"]} />
          <IssueSelect label="Status" value={status} onChange={setStatus} options={["All", "Open", "In progress", "Waiting for approval", "Fixed", "Closed"]} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <div className="hidden grid-cols-[0.8fr_1.7fr_0.55fr_0.65fr_0.6fr_0.8fr] gap-4 bg-surface-strong px-4 py-3 text-xs font-semibold uppercase text-muted lg:grid">
          <span>Area</span>
          <span>Issue</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Due</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-line bg-white/70">
          {filtered.length > 0 ? filtered.map((issue) => (
            <article key={issue.id} className="grid gap-3 px-4 py-4 lg:grid-cols-[0.8fr_1.7fr_0.55fr_0.65fr_0.6fr_0.8fr] lg:items-center">
              <p className="text-sm font-semibold">{issue.area}</p>
              <div>
                <p className="text-sm leading-6">{issue.issue}</p>
                <p className="text-xs text-muted">{issue.owner}</p>
              </div>
              <PriorityBadge priority={issue.priority} />
              <StatusPill status={issue.status} />
              <p className="text-sm text-muted">{issue.due}</p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  className="px-3"
                  disabled={issue.status === "Fixed" || issue.status === "Closed"}
                  onClick={() => markFixed(issue.id)}
                  aria-label={`Mark ${issue.area} fixed`}
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <span className="lg:sr-only">Fix</span>
                </Button>
                <Button
                  variant="ghost"
                  className="px-3"
                  disabled={issue.status === "Closed"}
                  onClick={() => closeIssue(issue.id)}
                  aria-label={`Close ${issue.area} issue`}
                >
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  <span className="lg:sr-only">Close</span>
                </Button>
              </div>
            </article>
          )) : (
            <div className="px-4 py-10 text-center">
              <p className="font-semibold">No issues match these filters</p>
              <p className="mt-1 text-sm text-muted">Adjust priority or status to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function IssueSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block min-w-36 text-xs font-semibold text-muted">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function PriorityBadge({ priority }: { priority: AuditIssue["priority"] }) {
  const classes = {
    Critical: "border-red-200 bg-red-50 text-red-700",
    High: "border-clay-200 bg-clay-50 text-clay-700",
    Medium: "border-yellow-200 bg-yellow-50 text-yellow-800",
    Low: "border-line bg-white text-muted"
  };

  return <span className={`w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[priority]}`}>{priority}</span>;
}
