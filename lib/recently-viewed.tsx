"use client";

import { createContext, useCallback, useContext, useReducer, type ReactNode } from "react";
import { type Product } from "./mock-data";

const MAX = 8;

type State = { items: Product[] };
type Action = { type: "TRACK"; product: Product };

function reducer(state: State, action: Action): State {
  const without = state.items.filter((p) => p.slug !== action.product.slug);
  return { items: [action.product, ...without].slice(0, MAX) };
}

type Ctx = { items: Product[]; track: (product: Product) => void };
const RecentlyViewedContext = createContext<Ctx | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const track = useCallback((product: Product) => dispatch({ type: "TRACK", product }), []);
  return (
    <RecentlyViewedContext.Provider value={{ items: state.items, track }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
