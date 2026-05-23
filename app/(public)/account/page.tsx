"use client";

import {
  Bell,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Package,
  PackageCheck,
  Settings,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { useWishlist } from "@/lib/wishlist";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "orders" | "profile" | "preferences";

type OrderStatus = "Preparing" | "Delivered" | "Complete";

const MOCK_ORDERS: { id: string; date: string; status: OrderStatus; icon: React.ElementType; total: number; items: string[] }[] = [
  {
    id: "AM-1048",
    date: "18 May 2026",
    status: "Preparing",
    icon: PackageCheck,
    total: 112.0,
    items: ["Luna Mineral Bath Soak", "Deep Rest Pillow Spray × 2"],
  },
  {
    id: "AM-1031",
    date: "4 May 2026",
    status: "Delivered",
    icon: Truck,
    total: 68.0,
    items: ["Vitamin C Brightening Serum", "Rose Hydration Mist"],
  },
  {
    id: "AM-1019",
    date: "22 Apr 2026",
    status: "Complete",
    icon: CheckCircle2,
    total: 145.0,
    items: ["Aura Night Face Oil", "Magnesium Body Lotion", "Chamomile Eye Cream"],
  },
  {
    id: "AM-1005",
    date: "8 Apr 2026",
    status: "Complete",
    icon: CheckCircle2,
    total: 55.0,
    items: ["Deep Sleep Ritual Candle"],
  },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const { items: wishlistItems, remove: removeFromWishlist } = useWishlist();
  const [newsletter, setNewsletter] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(false);
  const [newArrivals, setNewArrivals] = useState(true);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-50 text-sage-700">
              <User className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">Skaiste Savitri</h1>
            <p className="mt-1 text-sm text-muted">skaiste@example.com</p>
            <p className="mt-1 text-xs text-muted">Member since March 2025</p>
          </div>

          <nav className="rounded-2xl border border-line bg-white/78 p-3 shadow-inset" aria-label="Account navigation">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                  tab === id ? "bg-sage-50 text-sage-700" : "text-muted hover:bg-surface-strong hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>

          <Button href="/products" variant="secondary" className="w-full">
            Continue shopping
          </Button>
        </aside>

        <div>
          {tab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Order history</h2>
              {MOCK_ORDERS.map((order) => {
                const Icon = order.icon;
                return (
                  <article
                    key={order.id}
                    className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">Order {order.id}</h3>
                          <StatusPill status={order.status} />
                        </div>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          Placed {order.date}
                        </p>
                      </div>
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {order.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted">
                          <Icon className="h-3.5 w-3.5 shrink-0 text-sage-600" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}

          {tab === "profile" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold tracking-tight">Your profile</h2>

              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <h3 className="font-semibold">Personal details</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "First name", value: "Skaiste" },
                    { label: "Last name", value: "Savitri" },
                    { label: "Email address", value: "skaiste@example.com" },
                    { label: "Phone", value: "+44 7700 900 123" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-1.5 rounded-xl border border-line bg-surface-strong px-4 py-3 text-sm font-medium">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="mt-5">
                  Edit details
                </Button>
              </div>

              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sage-700" aria-hidden="true" />
                  <h3 className="font-semibold">Delivery address</h3>
                </div>
                <p className="mt-3 rounded-xl border border-line bg-surface-strong px-4 py-3 text-sm leading-6">
                  12 Wellness Lane
                  <br />
                  London, W1A 1AA
                  <br />
                  United Kingdom
                </p>
                <Button variant="secondary" className="mt-4">
                  Update address
                </Button>
              </div>

              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-sage-700" aria-hidden="true" />
                  <h3 className="font-semibold">Saved products</h3>
                  {wishlistItems.length > 0 && (
                    <span className="rounded-full bg-sage-50 px-2 py-0.5 text-xs font-semibold text-sage-700">{wishlistItems.length}</span>
                  )}
                </div>
                {wishlistItems.length === 0 ? (
                  <div className="mt-4 rounded-xl border border-dashed border-line bg-surface-strong p-5 text-center">
                    <p className="text-sm text-muted">No saved products yet — heart a product to save it here.</p>
                    <Button href="/products" variant="secondary" className="mt-3 text-xs px-3 py-1">Browse products</Button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {wishlistItems.map((product) => (
                      <div key={product.slug} className="flex items-center gap-3 rounded-xl border border-line bg-surface-strong px-3 py-3">
                        <div className="h-10 w-10 shrink-0 rounded-lg border border-line" style={{ background: product.image }} aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{product.name}</p>
                          <p className="text-xs text-muted">{formatCurrency(product.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.slug)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:text-clay-700"
                          aria-label={`Remove ${product.name} from saved`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "preferences" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold tracking-tight">Preferences</h2>

              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-sage-700" aria-hidden="true" />
                  <h3 className="font-semibold">Notifications &amp; communications</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    {
                      id: "newsletter",
                      label: "Monthly newsletter",
                      description: "Wellness insights, new arrivals, and seasonal rituals.",
                      checked: newsletter,
                      onChange: setNewsletter,
                    },
                    {
                      id: "restock",
                      label: "Restock alerts",
                      description: "Notify me when a saved product is back in stock.",
                      checked: restockAlerts,
                      onChange: setRestockAlerts,
                    },
                    {
                      id: "newarrivals",
                      label: "New arrivals",
                      description: "Be the first to know about new products and collections.",
                      checked: newArrivals,
                      onChange: setNewArrivals,
                    },
                  ].map(({ id, label, description, checked, onChange }) => (
                    <label
                      key={id}
                      className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line bg-surface-strong px-4 py-4 transition hover:bg-white"
                    >
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-muted">{description}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        onClick={() => onChange(!checked)}
                        className={cn(
                          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400",
                          checked ? "border-sage-600 bg-sage-600" : "border-line bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                            checked ? "translate-x-5" : "translate-x-0.5"
                          )}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <h3 className="font-semibold">Regional settings</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Preferred market", value: "United Kingdom" },
                    { label: "Language", value: "English" },
                    { label: "Currency", value: "GBP (£)" },
                    { label: "Delivery region", value: "Europe" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-1.5 rounded-xl border border-line bg-surface-strong px-4 py-3 text-sm font-medium">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
