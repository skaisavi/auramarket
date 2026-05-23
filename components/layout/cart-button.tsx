"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white/72 px-4 text-sm font-semibold shadow-inset transition hover:bg-white"
      aria-label={`Open basket${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      Basket
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
