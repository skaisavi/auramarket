"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { type Product } from "./mock-data";
import { formatCurrency } from "./utils";

export type CartItem = { product: Product; quantity: number };

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; slug: string }
  | { type: "UPDATE_QTY"; slug: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.product.slug === action.product.slug);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.product.slug === action.product.slug
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          )
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity ?? 1 }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.slug !== action.slug) };
    case "UPDATE_QTY":
      if (action.quantity < 1) return { items: state.items.filter((i) => i.product.slug !== action.slug) };
      return { items: state.items.map((i) => i.product.slug === action.slug ? { ...i, quantity: action.quantity } : i) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  openCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const add = useCallback((product: Product, quantity?: number) => {
    dispatch({ type: "ADD", product, quantity });
    setDrawerOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    dispatch({ type: "REMOVE", slug });
  }, []);

  const updateQty = useCallback((slug: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", slug, quantity });
  }, []);

  const openCart = useCallback(() => setDrawerOpen(true), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <CartContext.Provider value={{ items: state.items, count, total, add, remove, updateQty, openCart }}>
      {children}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="animate-fade-in absolute inset-0 bg-ink/20 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Your basket"
            className="animate-drawer-in relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Your basket</h2>
                {count > 0 && (
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-white">{count}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition hover:bg-surface-strong"
                aria-label="Close basket"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong">
                    <ShoppingBag className="h-7 w-7 text-muted" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold">Your basket is empty</p>
                    <p className="mt-1 text-sm text-muted">Add a product to start your ritual.</p>
                  </div>
                  <Button href="/products" variant="secondary" onClick={() => setDrawerOpen(false)}>
                    Browse products
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-line px-6">
                  {state.items.map((item) => (
                    <li key={item.product.slug} className="flex gap-4 py-5">
                      <div
                        className="h-16 w-16 shrink-0 rounded-xl border border-line"
                        style={{ background: item.product.image }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-tight">{item.product.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{item.product.category}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1 rounded-full border border-line bg-white">
                            <button
                              type="button"
                              onClick={() => updateQty(item.product.slug, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-surface-strong"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.product.slug, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-surface-strong"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</span>
                            <button
                              type="button"
                              onClick={() => remove(item.product.slug)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:text-clay-700"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {state.items.length > 0 && (
              <footer className="shrink-0 border-t border-line p-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
                <p className="mb-4 text-xs text-muted">Shipping and taxes calculated at checkout.</p>
                <Button className="w-full">Proceed to checkout</Button>
                <Button
                  variant="secondary"
                  className="mt-3 w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Continue shopping
                </Button>
              </footer>
            )}
          </aside>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
