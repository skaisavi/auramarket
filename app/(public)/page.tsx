import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { ArticleCard } from "@/components/public/article-card";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { ProductCard } from "@/components/public/product-card";
import { RitualFinder } from "@/components/public/ritual-finder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedCampaign, getPublishedProducts } from "@/lib/data/public";
import { categories, resourceArticles } from "@/lib/mock-data";

export default async function HomePage() {
  const [allProducts, campaign] = await Promise.all([
    getPublishedProducts(),
    getFeaturedCampaign(),
  ]);
  const featuredProducts = allProducts.slice(0, 4);
  const featuredArticles = resourceArticles.filter((a) => a.status === "Published").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden">
        <Image
          src="/images/auramarket-wellness-hero.png"
          alt="Editorial still life of AuraMarket wellness products with linen and botanicals"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pearl via-pearl/72 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <Badge tone="sage">Premium wellness commerce</Badge>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              AuraMarket
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Botanical wellness products for everyday rituals. Skincare, sleep, and focus — designed for a quieter life.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">
                Shop rituals
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/collections" variant="secondary">
                Explore collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="neutral">Shop by ritual</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Product categories</h2>
          </div>
          <Button href="/products" variant="secondary">
            View all products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="aspect-[3/2] border-b border-white/70"
                style={{ background: category.image }}
                aria-hidden="true"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{category.description}</p>
                <p className="mt-4 text-xs font-semibold text-sage-700">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <RitualFinder products={allProducts} />

      {/* Best sellers */}
      <section className="bg-white/56">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <Badge tone="clay">Best sellers</Badge>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Products that earn their place in a daily ritual.
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted">
              Carefully formulated with botanical ingredients for sleep, skin, and focus. Every product is chosen for how it fits into a real routine — not just how it looks on a shelf.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Campaign feature */}
      {campaign ? (
      <section>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="rounded-2xl border border-white/80 bg-sage-50 p-8 shadow-inset">
            <Sparkles className="h-8 w-8 text-sage-700" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">{campaign.title}</h2>
            <p className="mt-4 text-muted">{campaign.heroCopy}</p>
            <Button href={`/campaigns/${campaign.slug}`} className="mt-7">
              Explore campaign
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Leaf, label: "Plant-derived formula" },
              { icon: Sparkles, label: "Gift ready" },
              { icon: Globe, label: "Free UK delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-line bg-white/80 p-5 shadow-inset">
                <Icon className="h-5 w-5 text-sage-700" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      {/* Wellness editorial — Build Your Evening Ritual */}
      <section className="bg-sage-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="sage">Evening ritual</Badge>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-snug tracking-tight sm:text-5xl">
              Build Your Evening Ritual
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Create space for calm with botanical rituals designed for everyday balance. Three steps, fifteen minutes, one quiet evening.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Prepare the space",
                body: "Mist your room with Solace Aromatherapy or light a diffuser. Clear your desk. The environment comes first."
              },
              {
                step: "02",
                title: "Slow the body",
                body: "Run a warm bath with Luna Mineral Bath Soak. Spend 18 minutes without a screen. Let the magnesium work."
              },
              {
                step: "03",
                title: "Settle the mind",
                body: "Apply Deep Rest Pillow Spray before lying down. Breathe slowly. Your nervous system will follow."
              }
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-sage-300/60 bg-white/60 p-6 shadow-inset">
                <span className="font-serif text-4xl font-semibold text-sage-300">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/products?category=sleep-relaxation" variant="secondary">
              Shop sleep products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="border-y border-line bg-white/48">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, title: "Botanical ingredients", body: "Every product is formulated with plant-derived, traceable ingredients." },
              { icon: ShieldCheck, title: "No harsh chemicals", body: "Free from parabens, sulphates, and synthetic fragrance. Always." },
              { icon: Sparkles, title: "Calm packaging", body: "Minimal, recyclable packaging designed to feel right on a bathroom shelf." },
              { icon: Globe, title: "Worldwide shipping", body: "Available across UK, EU, US, and growing." }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-50 text-sage-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journal preview */}
      {featuredArticles.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge tone="gold">Wellness journal</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Rituals & resources</h2>
            </div>
            <Button href="/journal" variant="secondary">
              All articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Newsletter */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-semibold tracking-tight">Join the AuraMarket Circle</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Seasonal ritual guides, early campaign access, and considered updates. Calm in your inbox — never overwhelming.
            </p>
            <NewsletterForm />
            <p className="mt-5 text-xs text-white/48">We respect your inbox. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
