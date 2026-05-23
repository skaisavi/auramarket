"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { ActivityLog } from "@/lib/mock-data";

export function ActivityLogManager({ logs }: { logs: ActivityLog[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => logs.filter((log) => {
    const matchesCategory = category === "All" || log.category === category;
    const matchesQuery = [log.actor, log.action, log.target, log.detail].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, logs, query]);

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activity log</h1>
          <p className="mt-2 text-sm text-muted">A traceable view of admin edits, publishing actions, and system warnings.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[16rem_12rem] sm:items-end">
          <label className="block text-xs font-semibold text-muted">
            Search
            <span className="relative mt-1 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm font-medium text-ink" placeholder="Search activity..." />
            </span>
          </label>
          <label className="block text-xs font-semibold text-muted">
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink">
              {["All", "Products", "Campaigns", "Banners", "Translations", "Audit", "System"].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white/70">
        {filtered.length > 0 ? filtered.map((log) => (
          <article key={log.id} className="grid gap-3 p-4 md:grid-cols-[8rem_1fr_7rem] md:items-start">
            <p className="text-sm font-semibold text-sage-700">{log.category}</p>
            <div>
              <p className="text-sm leading-6"><span className="font-semibold">{log.actor}</span> {log.action} <span className="font-medium">{log.target}</span></p>
              <p className="mt-1 text-sm leading-6 text-muted">{log.detail}</p>
            </div>
            <p className="text-sm text-muted md:text-right">{log.time}</p>
          </article>
        )) : (
          <div className="p-8 text-center">
            <p className="font-semibold">No activity matches these filters</p>
            <p className="mt-2 text-sm text-muted">Try another category or search term.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
