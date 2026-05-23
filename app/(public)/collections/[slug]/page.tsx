import { notFound } from "next/navigation";
import { CalendarDays, Globe2 } from "lucide-react";
import { ProductCard } from "@/components/public/product-card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { collections, products } from "@/lib/mock-data";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) notFound();

  const featuredProducts = products.filter((p) =>
    collection.featuredProducts.some(
      (name) => p.name.toLowerCase() === name.toLowerCase()
    )
  );

  const moreProducts = products
    .filter(
      (p) =>
        !featuredProducts.some((f) => f.slug === p.slug) &&
        p.collection === collection.name
    )
    .slice(0, 3);

  const displayed = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <>
      <section
        className="relative border-b border-line"
        style={{ background: collection.heroImage }}
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Breadcrumbs crumbs={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.name },
          ]} />
          <div className="max-w-2xl rounded-2xl bg-white/52 p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="sage">Collection</Badge>
              <StatusPill status={collection.status} />
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {collection.name}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">{collection.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                {collection.market} · {collection.language}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {collection.startsAt} – {collection.endsAt}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="clay">Featured products</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Included in this collection
            </h2>
          </div>
          <Button href="/products" variant="secondary">
            Browse all products
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {moreProducts.length > 0 && (
          <>
            <h3 className="mt-14 text-xl font-semibold">Also in this range</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {moreProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
