import { ArrowRight, Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { collections } from "@/lib/mock-data";

export default function CollectionsPage() {
  const live = collections.filter((c) => c.status === "Live");
  const rest = collections.filter((c) => c.status !== "Live");

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="border-b border-line pb-10">
        <Badge tone="sage">Collections</Badge>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">Curated rituals</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Thoughtfully grouped products for every mood, season, and intention — from sleep essentials to summer wellness edits.
        </p>
      </div>

      {live.length > 0 && (
        <section className="mt-12">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">Live now</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {live.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} featured />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-14">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">Coming soon</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CollectionCard({
  collection,
  featured = false,
}: {
  collection: (typeof collections)[number];
  featured?: boolean;
}) {
  const isLive = collection.status === "Live";

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset transition hover:-translate-y-1 hover:shadow-soft">
      <div
        className="relative aspect-[16/9] border-b border-white/70 p-5"
        style={{ background: collection.heroImage }}
      >
        <div className="flex h-full flex-col justify-between rounded-xl bg-white/42 p-4 backdrop-blur-sm">
          <StatusPill status={collection.status} />
        <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {featured ? "Featured edit" : collection.market}
            </p>
            <h2 className="mt-1 text-xl font-semibold leading-tight">{collection.name}</h2>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-muted">{collection.description}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
          {collection.language}
        </div>
        <div className="mt-5">
          {isLive ? (
            <Button href={`/collections/${collection.slug}`} variant="secondary" className="w-full">
              Explore collection
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <div className="flex h-11 items-center justify-center rounded-full border border-dashed border-line text-sm text-muted">
              Available {collection.startsAt}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
