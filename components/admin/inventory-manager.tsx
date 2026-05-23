"use client";

import { AlertTriangle, Check, ClipboardList, Edit3, Package, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { upsertProduct } from "@/lib/actions/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { type Product } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const LOW_STOCK = 60;
const CRITICAL_STOCK = 20;

type RestockRequest = {
  slug: string;
  productName: string;
  market: string;
  currentStock: number;
  requestedBy: string;
  priority: "Critical" | "Out of stock";
  createdAt: string;
};

function stockLevel(stock: number): "ok" | "low" | "critical" | "out" {
  if (stock === 0) return "out";
  if (stock <= CRITICAL_STOCK) return "critical";
  if (stock <= LOW_STOCK) return "low";
  return "ok";
}

export function InventoryManager() {
  const { state, dispatch } = useStore();
  const { toast } = useToast();
  const { products } = state;

  const [marketFilter, setMarketFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [alertFilter, setAlertFilter] = useState("All");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState(0);
  const [restockQueue, setRestockQueue] = useState<RestockRequest[]>([]);

  const markets = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.market))).sort()],
    [products]
  );

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesMarket = marketFilter === "All" || p.market === marketFilter;
        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        const level = stockLevel(p.stock);
        const matchesAlert =
          alertFilter === "All" ||
          (alertFilter === "Low" && level === "low") ||
          (alertFilter === "Critical" && (level === "critical" || level === "out"));
        return matchesMarket && matchesStatus && matchesAlert;
      })
      .sort((a, b) => a.stock - b.stock);
  }, [products, marketFilter, statusFilter, alertFilter]);

  const stats = useMemo(() => {
    const total = products.length;
    const low = products.filter((p) => stockLevel(p.stock) === "low").length;
    const critical = products.filter((p) => stockLevel(p.stock) === "critical" || p.stock === 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return { total, low, critical, outOfStock };
  }, [products]);

  function startEdit(product: Product) {
    setEditingSlug(product.slug);
    setEditingValue(product.stock);
  }

  function cancelEdit() {
    setEditingSlug(null);
  }

  async function saveEdit(product: Product) {
    const updated: Product = { ...product, stock: editingValue, updatedAt: new Date().toISOString().split("T")[0] };
    try {
      const saved = await upsertProduct(updated, product.slug);
      dispatch({ type: "UPSERT_PRODUCT", product: saved, originalSlug: product.slug });
      toast(`${product.name} stock updated to ${editingValue}`);
      setEditingSlug(null);
    } catch {
      toast("Stock could not be updated. Check the database connection.", "error");
    }
  }

  function requestRestock(product: Product) {
    const priority: RestockRequest["priority"] = product.stock === 0 ? "Out of stock" : "Critical";
    setRestockQueue((current) => {
      if (current.some((item) => item.slug === product.slug)) return current;
      return [
        {
          slug: product.slug,
          productName: product.name,
          market: product.market,
          currentStock: product.stock,
          requestedBy: "Web admin",
          priority,
          createdAt: new Date().toISOString().split("T")[0]
        },
        ...current
      ];
    });
    toast(`Restock request flagged for ${product.name}`);
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Total products" value={stats.total} icon={<Package className="h-5 w-5 text-muted" />} />
        <StatTile label="Low stock" value={stats.low} icon={<AlertTriangle className="h-5 w-5 text-yellow-600" />} tone="warn" />
        <StatTile label="Critical stock" value={stats.critical} icon={<AlertTriangle className="h-5 w-5 text-clay-700" />} tone="danger" />
        <StatTile label="Out of stock" value={stats.outOfStock} icon={<X className="h-5 w-5 text-clay-700" />} tone="danger" />
      </section>

      <section className="rounded-2xl border border-line bg-white/76 p-5 shadow-inset">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              Restock queue
            </p>
            <h2 className="mt-2 text-lg font-semibold">Flagged stock requests</h2>
          </div>
          <p className="text-sm font-semibold text-muted">{restockQueue.length} pending</p>
        </div>
        {restockQueue.length > 0 ? (
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {restockQueue.map((request) => (
              <article key={request.slug} className="rounded-xl border border-clay-200 bg-clay-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-clay-800">{request.productName}</h3>
                    <p className="mt-1 text-sm text-clay-700/80">
                      {request.market} - {request.currentStock} units - {request.requestedBy}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-clay-700">{request.priority}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-line bg-white/60 p-4 text-sm text-muted">
            No restock requests yet. Critical and out-of-stock rows can be flagged for buying or operations follow-up.
          </p>
        )}
      </section>

      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/72 p-4 shadow-inset sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-muted">
          Sorted by lowest stock first · {filtered.length} of {products.length} products
        </p>
        <div className="flex flex-wrap gap-3">
          <FilterSelect label="Market" value={marketFilter} onChange={setMarketFilter} options={markets} />
          <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={["All", "Published", "Draft", "Hidden"]} />
          <FilterSelect label="Alert" value={alertFilter} onChange={setAlertFilter} options={["All", "Low", "Critical"]} />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset">
        <div className="hidden grid-cols-[1.4fr_0.6fr_0.55fr_0.9fr_1.1fr_0.8fr_0.5fr] gap-4 border-b border-line bg-surface-strong px-5 py-3 text-xs font-semibold uppercase text-muted lg:grid">
          <span>Product</span>
          <span>Status</span>
          <span>Market</span>
          <span>Stock level</span>
          <span>Units</span>
          <span>Restock</span>
          <span className="text-right">Edit</span>
        </div>

        <div className="divide-y divide-line">
          {filtered.map((product) => {
            const level = stockLevel(product.stock);
            const isEditing = editingSlug === product.slug;
            const maxBar = 250;

            return (
              <article
                key={product.slug}
                className="grid gap-4 px-5 py-4 lg:grid-cols-[1.4fr_0.6fr_0.55fr_0.9fr_1.1fr_0.8fr_0.5fr] lg:items-center"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{product.sku} · {formatCurrency(product.price)}</p>
                </div>

                <StatusPill status={product.status} />

                <p className="text-sm font-semibold text-muted">{product.market}</p>

                <div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-strong">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        level === "ok" && "bg-sage-500",
                        level === "low" && "bg-yellow-400",
                        level === "critical" && "bg-clay-500",
                        level === "out" && "bg-red-500"
                      )}
                      style={{ width: `${Math.min(100, (product.stock / maxBar) * 100)}%` }}
                    />
                  </div>
                  <StockBadge level={level} />
                </div>

                <div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={editingValue}
                        onChange={(e) => setEditingValue(Math.max(0, Number(e.target.value)))}
                        className="h-9 w-24 rounded-xl border border-line bg-white px-3 text-sm font-semibold"
                        autoFocus
                        onKeyDown={(e) => { if (e.key === "Enter") saveEdit(product); if (e.key === "Escape") cancelEdit(); }}
                      />
                      <button
                        type="button"
                        onClick={() => saveEdit(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-50 text-sage-700 transition hover:bg-sage-100"
                        aria-label="Save"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition hover:bg-surface-strong"
                        aria-label="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className={cn(
                      "text-lg font-semibold",
                      level === "low" && "text-yellow-700",
                      level === "critical" && "text-clay-700",
                      level === "out" && "text-red-600"
                    )}>
                      {product.stock} <span className="text-sm font-normal text-muted">units</span>
                    </span>
                  )}
                </div>

                <div>
                  {level === "critical" || level === "out" ? (
                    <Button
                      type="button"
                      variant="secondary"
                      className="px-3 text-xs"
                      disabled={restockQueue.some((request) => request.slug === product.slug)}
                      onClick={() => requestRestock(product)}
                    >
                      Request restock
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold text-muted">Not needed</span>
                  )}
                </div>

                <Button
                  variant="ghost"
                  className="justify-self-start px-3 lg:justify-self-end"
                  onClick={() => isEditing ? cancelEdit() : startEdit(product)}
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  <span className="lg:sr-only">{isEditing ? "Cancel" : "Edit"}</span>
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  icon,
  tone = "neutral"
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: "neutral" | "warn" | "danger";
}) {
  return (
    <div className={cn(
      "rounded-2xl border p-5 shadow-inset",
      tone === "neutral" && "border-line bg-white/76",
      tone === "warn" && "border-yellow-200 bg-yellow-50",
      tone === "danger" && "border-clay-200 bg-clay-50"
    )}>
      <div className="flex items-center justify-between gap-3">
        <p className={cn(
          "text-sm font-semibold",
          tone === "neutral" && "text-muted",
          tone === "warn" && "text-yellow-800",
          tone === "danger" && "text-clay-700"
        )}>{label}</p>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function StockBadge({ level }: { level: ReturnType<typeof stockLevel> }) {
  if (level === "ok") return null;
  const config = {
    low: { label: "Low stock", classes: "text-yellow-700" },
    critical: { label: "Critical", classes: "text-clay-700" },
    out: { label: "Out of stock", classes: "text-red-600" }
  }[level];
  return <p className={cn("mt-1 text-xs font-semibold", config.classes)}>{config.label}</p>;
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs font-semibold text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-9 rounded-full border border-line bg-white px-3 text-sm font-medium text-ink"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
