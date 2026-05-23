"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { type Product } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

export function AddToBasketButton({ product }: { product: Product }) {
  const { add } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, qty);
    toast(`${product.name} added to basket`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-muted" htmlFor="qty">Qty</label>
        <div className="flex items-center gap-1 rounded-full border border-line bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-surface-strong"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-10 bg-transparent text-center text-sm font-semibold focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-surface-strong"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition sm:w-auto sm:px-10",
          added
            ? "bg-sage-700 text-white"
            : "bg-ink text-white shadow-soft hover:bg-sage-700"
        )}
        aria-label={`Add ${product.name} to basket`}
      >
        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        {added ? "Added to basket!" : `Add to basket — ${formatCurrency(product.price * qty)}`}
      </button>
    </div>
  );
}
