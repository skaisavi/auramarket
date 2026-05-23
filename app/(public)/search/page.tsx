"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/public/article-card";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/use-debounce";
import { products, resourceArticles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const POPULAR = ["Sleep ritual", "Vitamin C serum", "Magnesium", "Face oil", "Lavender", "Eye cream"];

type Tab = "all" | "products" | "articles";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const debounced = useDebounce(query.trim().toLowerCase(), 150);

  const productResults = useMemo(
    () =>
      debounced.length === 0
        ? []
        : products.filter((p) =>
            [p.name, p.category, p.collection, p.description].join(" ").toLowerCase().includes(debounced)
          ),
    [debounced]
  );

  const articleResults = useMemo(
    () =>
      debounced.length === 0
        ? []
        : resourceArticles.filter((a) =>
            [a.title, a.category, a.excerpt].join(" ").toLowerCase().includes(debounced)
          ),
    [debounced]
  );

  const showProducts = tab === "all" || tab === "products";
  const showArticles = tab === "all" || tab === "articles";
  const hasResults = productResults.length > 0 || articleResults.length > 0;
  const isSearching = debounced.length > 0;

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "all", label: "All", count: isSearching ? productResults.length + articleResults.length : undefined },
    { id: "products", label: "Products", count: isSearching ? productResults.length : undefined },
    { id: "articles", label: "Articles", count: isSearching ? articleResults.length : undefined },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="border-b border-line pb-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Search</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          Find products, rituals, and wellness articles across the AuraMarket catalog.
        </p>

        <div className="mt-6 max-w-2xl">
          <label className="relative block">
            <span className="sr-only">Search products and articles</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full rounded-full border border-line bg-white pl-12 pr-12 text-sm font-medium outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
              placeholder="Search sleep, serum, lavender..."
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted transition hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div className="mt-5 flex gap-2" role="tablist" aria-label="Filter results">
          {tabs.map(({ id, label, count }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition",
                tab === id
                  ? "border-sage-300 bg-sage-50 text-sage-700"
                  : "border-line bg-white/70 text-muted hover:text-ink"
              )}
            >
              {label}
              {count !== undefined && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-xs", tab === id ? "bg-sage-200 text-sage-800" : "bg-surface-strong text-muted")}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {!isSearching && (
        <div className="mt-10">
          <p className="text-sm font-semibold text-muted">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-sage-300 hover:bg-sage-50"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center">
            <Search className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold">Start typing to search</p>
            <p className="mt-2 text-sm text-muted">Results update live as you type.</p>
          </div>
        </div>
      )}

      {isSearching && !hasResults && (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center">
          <p className="text-lg font-semibold">No results for &ldquo;{debounced}&rdquo;</p>
          <p className="mt-2 text-sm text-muted">Try a different keyword or browse the full catalog.</p>
          <Button href="/products" variant="secondary" className="mt-6">
            Browse all products
          </Button>
        </div>
      )}

      {isSearching && hasResults && (
        <div className="mt-10 space-y-12">
          {showProducts && productResults.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">
                Products
                <span className="ml-2 text-sm font-normal text-muted">({productResults.length})</span>
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {productResults.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          )}

          {showArticles && articleResults.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">
                Articles
                <span className="ml-2 text-sm font-normal text-muted">({articleResults.length})</span>
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articleResults.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {showProducts && productResults.length === 0 && tab === "products" && (
            <div className="rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
              <p className="font-semibold">No products match &ldquo;{debounced}&rdquo;</p>
            </div>
          )}

          {showArticles && articleResults.length === 0 && tab === "articles" && (
            <div className="rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
              <p className="font-semibold">No articles match &ldquo;{debounced}&rdquo;</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
