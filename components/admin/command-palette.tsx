"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, LayoutDashboard, Search } from "lucide-react";
import { adminNavigation } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Entry = {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  group: "Navigation" | "Products";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { state } = useStore();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navEntries: Entry[] = useMemo(() => adminNavigation.map((item) => ({
    id: `nav-${item.href}`,
    label: item.label,
    href: item.href,
    group: "Navigation",
  })), []);

  const productEntries: Entry[] = useMemo(() => state.products.map((p) => ({
    id: `product-${p.slug}`,
    label: p.name,
    sublabel: `${p.category} · ${p.status}`,
    href: `/admin/products`,
    group: "Products",
  })), [state.products]);

  const allEntries = useMemo(() => [...navEntries, ...productEntries], [navEntries, productEntries]);

  const filtered = useMemo(() => {
    if (!query.trim()) return navEntries.slice(0, 8);
    const q = query.toLowerCase();
    return allEntries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.sublabel?.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [allEntries, navEntries, query]);

  const grouped = useMemo(() => {
    const groups: Record<string, Entry[]> = {};
    for (const entry of filtered) {
      if (!groups[entry.group]) groups[entry.group] = [];
      groups[entry.group].push(entry);
    }
    return groups;
  }, [filtered]);

  function navigate(href: string) {
    router.push(href);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = filtered[activeIndex];
      if (entry) navigate(entry.href);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-line bg-white/72 px-4 py-2 text-sm text-muted shadow-inset transition hover:bg-white lg:flex"
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Search</span>
        <kbd className="ml-2 flex items-center gap-0.5 rounded border border-line bg-surface-strong px-1.5 py-0.5 font-mono text-xs text-muted">
          <span>⌘</span><span>K</span>
        </kbd>
      </button>
    );
  }

  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]">
      <div
        className="animate-fade-in absolute inset-0 bg-ink/30 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="animate-fade-in relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, products, actions…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Command palette search"
          />
          <kbd className="rounded border border-line bg-surface-strong px-1.5 py-0.5 font-mono text-xs text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            Object.entries(grouped).map(([group, entries]) => (
              <div key={group}>
                <p className="px-5 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted">{group}</p>
                {entries.map((entry) => {
                  globalIndex++;
                  const idx = globalIndex;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => navigate(entry.href)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-3 text-left transition",
                        isActive ? "bg-sage-50" : "hover:bg-surface-strong"
                      )}
                    >
                      <span className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-lg border",
                        isActive ? "border-sage-300/60 bg-white text-sage-700" : "border-line bg-surface-strong text-muted"
                      )}>
                        <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate text-sm font-semibold">{entry.label}</span>
                        {entry.sublabel && (
                          <span className="block truncate text-xs text-muted">{entry.sublabel}</span>
                        )}
                      </span>
                      {isActive && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-sage-600" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-line px-5 py-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1"><kbd className="rounded border border-line bg-surface-strong px-1 py-0.5 font-mono">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-line bg-surface-strong px-1 py-0.5 font-mono">↵</kbd> open</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-line bg-surface-strong px-1 py-0.5 font-mono">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
