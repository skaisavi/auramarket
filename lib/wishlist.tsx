"use client";

import { createContext, useCallback, useContext, useReducer, type ReactNode } from "react";
import { type Product } from "./mock-data";

type WishlistState = { items: Product[] };
type WishlistAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; slug: string }
  | { type: "TOGGLE"; product: Product };

function reducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD":
      if (state.items.some((i) => i.slug === action.product.slug)) return state;
      return { items: [...state.items, action.product] };
    case "REMOVE":
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case "TOGGLE": {
      const exists = state.items.some((i) => i.slug === action.product.slug);
      return exists
        ? { items: state.items.filter((i) => i.slug !== action.product.slug) }
        : { items: [...state.items, action.product] };
    }
    default:
      return state;
  }
}

type WishlistCtx = {
  items: Product[];
  has: (slug: string) => boolean;
  toggle: (product: Product) => void;
  remove: (slug: string) => void;
};

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const has = useCallback((slug: string) => state.items.some((i) => i.slug === slug), [state.items]);
  const toggle = useCallback((product: Product) => dispatch({ type: "TOGGLE", product }), []);
  const remove = useCallback((slug: string) => dispatch({ type: "REMOVE", slug }), []);

  return (
    <WishlistContext.Provider value={{ items: state.items, has, toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
