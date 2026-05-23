"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { type Product } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = has(product.slug);

  function handleAddToBasket(e: React.MouseEvent) {
    e.preventDefault();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative">
          <div
            className="aspect-[4/3] shrink-0 border-b border-white/70"
            style={{ background: product.image }}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 shadow-sm backdrop-blur-sm transition hover:scale-110",
              wishlisted ? "text-clay-600" : "text-muted hover:text-clay-500"
            )}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart className={cn("h-4 w-4 transition", wishlisted && "fill-clay-500 text-clay-500")} />
          </button>

          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-200 group-hover:translate-y-0">
            <button
              type="button"
              onClick={handleAddToBasket}
              className={cn(
                "flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold transition",
                added
                  ? "bg-sage-600 text-white"
                  : "bg-ink/90 text-white hover:bg-ink backdrop-blur-sm"
              )}
              aria-label={`Add ${product.name} to basket`}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {added ? "Added!" : "Add to basket"}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Badge tone="sage">{product.badge}</Badge>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">{product.category}</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">{product.name}</h2>
            </div>
            <p className="font-semibold">{formatCurrency(product.price)}</p>
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-5 text-sm">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              {product.rating}
            </span>
            <span className="text-muted">{product.stock} in stock</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
