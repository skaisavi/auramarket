"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { type Product } from "@/lib/mock-data";

export function ProductTracker({ product }: { product: Product }) {
  const { track } = useRecentlyViewed();
  useEffect(() => { track(product); }, [product, track]);
  return null;
}
