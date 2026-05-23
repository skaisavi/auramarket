"use client";

import { CalendarDays, Edit3, Plus } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { StatusPill } from "@/components/ui/status-pill";
import type { CalendarItem } from "@/lib/mock-data";
import { useToast } from "@/lib/toast";

type CalendarFormState = Omit<CalendarItem, "id">;

const channels: CalendarItem["channel"][] = ["Homepage", "Email", "Product", "Banner", "Audit"];
const statuses: CalendarItem["status"][] = ["Draft", "Ready", "Live", "Blocked"];

export function ContentCalendar({ items }: { items: CalendarItem[] }) {
  const { toast } = useToast();
  const [calendarItems, setCalendarItems] = useState(items);
  const [channel, setChannel] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CalendarFormState>(() => toFormState(items[0]));
  const filtered = calendarItems.filter((item) => channel === "All" || item.channel === channel);

  function openEdit(item: CalendarItem) {
    setEditingId(item.id);
    setForm(toFormState(item));
    setDrawerOpen(true);
  }

  function openCreate() {
    setEditingId(null);
    setForm({
      date: "2026-06-01",
      title: "",
      channel: "Homepage",
      status: "Draft",
      owner: "Web admin",
      note: ""
    });
    setDrawerOpen(true);
  }

  function saveCalendarItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saved: CalendarItem = {
      id: editingId ?? `cal-${Date.now()}`,
      ...form
    };
    setCalendarItems((current) => {
      const exists = current.some((item) => item.id === editingId);
      const next = exists
        ? current.map((item) => (item.id === editingId ? saved : item))
        : [saved, ...current];
      return next.sort((a, b) => a.date.localeCompare(b.date));
    });
    setDrawerOpen(false);
    toast(`${saved.title} saved`, "success");
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white/72 p-5 shadow-inset sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Content calendar
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Publishing timeline</h1>
          <p className="mt-2 text-sm text-muted">Coordinate launch content, banners, audits, emails, and product updates.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-44 text-xs font-semibold text-muted">
            Channel
            <select value={channel} onChange={(event) => setChannel(event.target.value)} className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink">
              {["All", ...channels].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <Button type="button" onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add item
          </Button>
        </div>
      </section>

      <Card>
        <div className="relative space-y-5 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
          {filtered.map((item) => (
            <article key={item.id} className="relative grid gap-4 pl-10 md:grid-cols-[10rem_1fr_auto_auto] md:items-start">
              <span className="absolute left-[0.55rem] top-1.5 h-3 w-3 rounded-full bg-sage-500 ring-4 ring-pearl" aria-hidden="true" />
              <time className="text-sm font-semibold text-muted">{item.date}</time>
              <div>
                <p className="text-xs font-semibold uppercase text-sage-700">{item.channel}</p>
                <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.note}</p>
                <p className="mt-2 text-xs text-muted">{item.owner}</p>
              </div>
              <StatusPill status={item.status} />
              <Button type="button" variant="ghost" className="justify-self-start px-3 md:justify-self-end" onClick={() => openEdit(item)}>
                <Edit3 className="h-4 w-4" aria-hidden="true" />
                <span className="md:sr-only">Edit {item.title}</span>
              </Button>
            </article>
          ))}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
              <h2 className="font-semibold">No calendar items found</h2>
              <p className="mt-2 text-sm text-muted">Add a scheduled update or choose a different channel.</p>
            </div>
          ) : null}
        </div>
      </Card>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? "Edit calendar item" : "Add calendar item"}
        width="max-w-xl"
      >
        <form className="space-y-5 p-6" onSubmit={saveCalendarItem}>
          <Field label="Title">
            <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
          </Field>
          <Field label="Date">
            <input type="date" required value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Channel">
              <select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value as CalendarItem["channel"] })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm">
                {channels.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CalendarItem["status"] })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm">
                {statuses.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Owner">
            <input required value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
          </Field>
          <Field label="Note">
            <textarea required value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-line px-3 py-2 text-sm leading-6" />
          </Field>
          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="submit">Save calendar item</Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

function toFormState(item: CalendarItem): CalendarFormState {
  return {
    date: item.date,
    title: item.title,
    channel: item.channel,
    status: item.status,
    owner: item.owner,
    note: item.note
  };
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}
