"use client";

import { ArrowRight, Minus, Package, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const PROMO_CODES: Record<string, { label: string; discount: number }> = {
  RITUAL10: { label: "10% off your ritual", discount: 0.1 },
  AURA20: { label: "20% AuraMarket welcome offer", discount: 0.2 },
  SLEEP15: { label: "15% off sleep essentials", discount: 0.15 },
};

export default function BasketPage() {
  const { items, total, updateQty, remove } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const promo = appliedCode ? PROMO_CODES[appliedCode] : null;
  const discount = promo ? total * promo.discount : 0;
  const finalTotal = total - discount;

  const related = products.filter((p) => !items.some((i) => i.product.slug === p.slug)).slice(0, 4);

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedCode(code);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code. Try RITUAL10, AURA20, or SLEEP15.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="border-b border-line pb-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Your ritual basket</h1>
        <p className="mt-3 text-sm text-muted">
          {items.length === 0
            ? "Your basket is empty — browse the catalog to begin your ritual."
            : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"} ready for checkout`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-line bg-white/60 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong">
            <ShoppingBag className="h-7 w-7 text-muted" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xl font-semibold">Nothing here yet</p>
            <p className="mt-2 text-sm text-muted">Add a product from the catalog to get started.</p>
          </div>
          <Button href="/products">Browse products</Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <article
                key={product.slug}
                className="grid gap-4 rounded-2xl border border-line bg-white/78 p-5 shadow-inset sm:grid-cols-[7rem_1fr_auto] sm:items-center"
              >
                <div
                  className="aspect-square rounded-xl border border-white/80"
                  style={{ background: product.image }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{product.collection}</p>
                  <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
                  <p className="mt-1 text-sm text-muted">{product.category}</p>
                  <p className="mt-2 text-sm font-semibold">{formatCurrency(product.price)} each</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-1 rounded-full border border-line bg-white px-1">
                    <button
                      type="button"
                      onClick={() => updateQty(product.slug, quantity - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-sage-50"
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(product.slug, quantity + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-sage-50"
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">{formatCurrency(product.price * quantity)}</p>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:text-clay-700"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit space-y-4">
            <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-sage-700" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Order summary</h2>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
                {promo && (
                  <div className="flex justify-between text-sage-700">
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                      {appliedCode}
                    </span>
                    <span className="font-semibold">−{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted">Delivery</span>
                  <span className="font-semibold">Complimentary</span>
                </div>
              </div>
              <div className="mt-5 border-t border-line pt-5">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
                <Button href="/checkout" className="mt-5 w-full">
                  Continue to checkout
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/products" variant="secondary" className="mt-3 w-full">
                  Continue shopping
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
              <p className="text-sm font-semibold">Promo code</p>
              {promo ? (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-sage-300/60 bg-sage-50 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-sage-700">{appliedCode}</p>
                    <p className="text-xs text-sage-600">{promo.label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAppliedCode(null)}
                    className="text-xs font-semibold text-muted underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") applyPromo(); }}
                    placeholder="Enter code"
                    className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-sm outline-none focus:border-sage-400"
                  />
                  <Button variant="secondary" onClick={applyPromo} className="shrink-0 px-4">
                    Apply
                  </Button>
                </div>
              )}
              {promoError && <p className="mt-2 text-xs text-clay-700">{promoError}</p>}
            </div>

            <div className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Package className="h-4 w-4" aria-hidden="true" />
                Complimentary delivery on all orders
              </div>
            </div>
          </aside>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">You might also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
