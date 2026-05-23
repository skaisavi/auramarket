"use client";

import { Edit3, Plus, Search, Sparkles } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import type { Collection } from "@/lib/mock-data";
import { useToast } from "@/lib/toast";

type CollectionFormState = {
  slug: string;
  name: string;
  description: string;
  featuredProducts: string;
  market: string;
  language: string;
  status: Collection["status"];
  startsAt: string;
  endsAt: string;
  seoCompleteness: number;
};

export function CollectionManager({ collections }: { collections: Collection[] }) {
  const { toast } = useToast();
  const [collectionRows, setCollectionRows] = useState(collections);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<CollectionFormState>(() => toFormState(collections[0]));

  const filtered = useMemo(() => collectionRows.filter((collection) => {
    const matchesQuery = [collection.name, collection.description, collection.market, collection.language]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = status === "All" || collection.status === status;
    return matchesQuery && matchesStatus;
  }), [collectionRows, query, status]);

  function openEdit(collection: Collection) {
    setEditingSlug(collection.slug);
    setForm(toFormState(collection));
    setDrawerOpen(true);
  }

  function openCreate() {
    setEditingSlug(null);
    setForm({
      slug: "",
      name: "",
      description: "",
      featuredProducts: "",
      market: "UK",
      language: "English",
      status: "Draft",
      startsAt: "2026-06-01",
      endsAt: "2026-08-31",
      seoCompleteness: 50
    });
    setDrawerOpen(true);
  }

  function saveCollection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const saved: Collection = {
      slug,
      name: form.name,
      description: form.description,
      heroImage: "linear-gradient(135deg, #f8efe5 0%, #ffffff 48%, #a8bfa3 100%)",
      featuredProducts: form.featuredProducts.split(",").map((item) => item.trim()).filter(Boolean),
      market: form.market,
      language: form.language,
      status: form.status,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      seoCompleteness: form.seoCompleteness
    };

    setCollectionRows((current) => {
      const exists = current.some((collection) => collection.slug === editingSlug);
      return exists
        ? current.map((collection) => (collection.slug === editingSlug ? saved : collection))
        : [saved, ...current];
    });
    setDrawerOpen(false);
    toast(`${saved.name} saved`, "success");
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white/72 p-5 shadow-inset lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Collection manager
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Merchandising collections</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Manage collection visibility, featured products, market coverage, language readiness, and SEO quality.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block text-xs font-semibold text-muted">
            Search
            <span className="relative mt-1 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm sm:w-72"
                placeholder="Search collections..."
              />
            </span>
          </label>
          <label className="block min-w-40 text-xs font-semibold text-muted">
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink">
              {["All", "Draft", "Scheduled", "Live", "Archived"].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <Button type="button" onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add collection
          </Button>
        </div>
      </section>

      {filtered.length > 0 ? (
        <section className="grid gap-5 xl:grid-cols-2">
          {filtered.map((collection) => (
            <Card key={collection.slug} className="overflow-hidden p-0">
              <div className="h-32 border-b border-line" style={{ background: collection.heroImage }} aria-hidden="true" />
              <div className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-muted">{collection.market} - {collection.language}</p>
                    <h2 className="mt-1 text-xl font-semibold">{collection.name}</h2>
                  </div>
                  <StatusPill status={collection.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{collection.description}</p>
                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs font-semibold text-muted">
                    <span>SEO completeness</span>
                    <span>{collection.seoCompleteness}%</span>
                  </div>
                  <Progress value={collection.seoCompleteness} />
                </div>
                <div className="mt-5 rounded-xl border border-line bg-white/70 p-4">
                  <p className="text-sm font-semibold">Featured products</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {collection.featuredProducts.map((product) => (
                      <span key={product} className="rounded-full bg-sage-50 px-3 py-1 text-xs font-semibold text-sage-700">{product}</span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted">Active window: {collection.startsAt} to {collection.endsAt}</p>
                <Button type="button" variant="secondary" className="mt-5 w-full" onClick={() => openEdit(collection)}>
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  Edit collection
                </Button>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card className="py-12 text-center">
          <h2 className="text-lg font-semibold">No collections found</h2>
          <p className="mt-2 text-sm text-muted">Adjust the search or status filter to review another merchandising set.</p>
        </Card>
      )}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingSlug ? "Edit collection" : "Add collection"}
        width="max-w-xl"
      >
        <form className="space-y-5 p-6" onSubmit={saveCollection}>
          <Field label="Collection name">
            <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
          </Field>
          <Field label="Slug">
            <input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" placeholder="auto-generated if empty" />
          </Field>
          <Field label="Description">
            <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-line px-3 py-2 text-sm leading-6" />
          </Field>
          <Field label="Featured products">
            <textarea value={form.featuredProducts} onChange={(event) => setForm({ ...form, featuredProducts: event.target.value })} className="mt-2 min-h-20 w-full rounded-xl border border-line px-3 py-2 text-sm leading-6" placeholder="Comma-separated product names" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Market">
              <input required value={form.market} onChange={(event) => setForm({ ...form, market: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
            </Field>
            <Field label="Language">
              <input required value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Start date">
              <input type="date" required value={form.startsAt} onChange={(event) => setForm({ ...form, startsAt: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
            </Field>
            <Field label="End date">
              <input type="date" required value={form.endsAt} onChange={(event) => setForm({ ...form, endsAt: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Collection["status"] })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm">
                {["Draft", "Scheduled", "Live", "Archived"].map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>
            <Field label="SEO completeness">
              <input type="number" min={0} max={100} value={form.seoCompleteness} onChange={(event) => setForm({ ...form, seoCompleteness: Number(event.target.value) })} className="mt-2 h-11 w-full rounded-xl border border-line px-3 text-sm" />
            </Field>
          </div>
          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="submit">Save collection</Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

function toFormState(collection: Collection): CollectionFormState {
  return {
    slug: collection.slug,
    name: collection.name,
    description: collection.description,
    featuredProducts: collection.featuredProducts.join(", "),
    market: collection.market,
    language: collection.language,
    status: collection.status,
    startsAt: collection.startsAt,
    endsAt: collection.endsAt,
    seoCompleteness: collection.seoCompleteness
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
