"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { formatCurrency } from "@/lib/utils";

export function RecentlyViewedRail({ currentSlug }: { currentSlug: string }) {
  const { items } = useRecentlyViewed();
  const visible = items.filter((p) => p.slug !== currentSlug);

  if (visible.length === 0) return null;

  return (
    <section className="border-t border-line bg-white/48">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="text-lg font-semibold tracking-tight">Recently viewed</h2>
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
          {visible.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex w-48 shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="aspect-[4/3] border-b border-white/70"
                style={{ background: product.image }}
                aria-hidden="true"
              />
              <div className="p-3">
                <p className="text-xs text-muted">{product.category}</p>
                <p className="mt-1 truncate text-sm font-semibold">{product.name}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="h-3 w-3 fill-gold text-gold" aria-hidden="true" />
                    {product.rating}
                  </span>
                  <span className="font-semibold">{formatCurrency(product.price)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
