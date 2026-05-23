import { notFound } from "next/navigation";
import { PackageCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { ProductCard } from "@/components/public/product-card";
import { AddToBasketButton } from "@/components/public/add-to-basket-button";
import { ReviewSection } from "@/components/public/review-section";
import { RecentlyViewedRail } from "@/components/public/recently-viewed-rail";
import { ProductTracker } from "@/components/public/product-tracker";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { getAllProductSlugs, getProduct, getProducts, getReviewsForProduct } from "@/lib/data/public";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts, initialReviews] = await Promise.all([
    getProduct(slug),
    getProducts(),
    getReviewsForProduct(slug),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.category === product.category || item.collection === product.collection)
    )
    .slice(0, 3);
  const displayedRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : allProducts.filter((item) => item.slug !== product.slug).slice(0, 3);
  const benefits = getBenefits(product.category);
  const safetyNotes = getSafetyNotes(product.category);
  const review = getReview(product.rating);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Breadcrumbs crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.category, href: `/products?category=${product.category.toLowerCase().replace(/\s+/g, "-")}` },
          { label: product.name },
        ]} />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div
            className="min-h-[32rem] rounded-2xl border border-white/80 shadow-soft"
            style={{ background: product.image }}
            aria-label={product.imageAlt || `${product.name} product visual`}
            role="img"
          />
          <article>
            <Badge tone="clay">{product.collection}</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <span className="rounded-full border border-line bg-white/72 px-4 py-2 text-sm font-semibold">
                {formatCurrency(product.price)}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-line bg-white/72 px-4 py-2 text-sm font-semibold">
                <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                {product.rating} rating
              </span>
              <span className="flex items-center gap-2 rounded-full border border-line bg-white/72 px-4 py-2 text-sm font-semibold">
                <PackageCheck className="h-4 w-4 text-sage-700" aria-hidden="true" />
                {product.stock} in stock
              </span>
            </div>
            <div className="mt-8">
              <AddToBasketButton product={product} />
              {product.stock < 60 ? (
                <p className="mt-3 text-sm text-clay-700">
                  Only {product.stock} left — order soon.
                </p>
              ) : null}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <DetailPanel title="Ritual">
                <ol className="space-y-3 text-sm text-muted">
                  {product.ritual.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-50 text-xs font-semibold text-sage-700">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </DetailPanel>
              <DetailPanel title="Ingredients">
                <ul className="space-y-3 text-sm text-muted">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden="true" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </DetailPanel>
            </div>
          </article>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <DetailPanel title="Benefits" icon={<Sparkles className="h-5 w-5 text-sage-700" aria-hidden="true" />}>
            <ul className="space-y-3 text-sm text-muted">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </DetailPanel>
          <DetailPanel title="Safety notes" icon={<ShieldCheck className="h-5 w-5 text-sage-700" aria-hidden="true" />}>
            <ul className="space-y-3 text-sm text-muted">
              {safetyNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </DetailPanel>
          <DetailPanel title="Customer review" icon={<Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />}>
            <p className="text-sm leading-7 text-muted">{review.quote}</p>
            <p className="mt-4 text-sm font-semibold">{review.name}</p>
            <p className="mt-1 text-xs text-muted">Verified AuraMarket customer</p>
          </DetailPanel>
        </div>
      </section>

      <ProductTracker product={product} />
      <ReviewSection productSlug={product.slug} productRating={product.rating} initialReviews={initialReviews} />

      <RecentlyViewedRail currentSlug={product.slug} />

      <section className="border-t border-line bg-white/48">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge tone="sage">Related rituals</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Customers also viewed</h2>
            </div>
            <Button href="/products" variant="secondary">Browse all products</Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {displayedRelated.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DetailPanel({
  title,
  children,
  icon
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white/76 p-5 shadow-inset">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function getBenefits(category: string) {
  if (category.includes("Sleep")) {
    return [
      "Supports a consistent evening routine.",
      "Creates a calming scent cue before bed.",
      "Pairs well with bath and pillow rituals."
    ];
  }
  if (category.includes("Skincare")) {
    return [
      "Helps skin feel nourished and comfortable.",
      "Designed for calm daily layering.",
      "Supports a soft, luminous finish."
    ];
  }
  if (category.includes("Focus") || category.includes("Aromatherapy")) {
    return [
      "Refreshes the workspace without feeling sharp.",
      "Supports focused morning routines.",
      "Works well as a desk-to-dusk ritual."
    ];
  }
  return [
    "Adds structure to a personal care routine.",
    "Uses considered botanical ingredients.",
    "Designed for repeatable everyday rituals."
  ];
}

function getSafetyNotes(category: string) {
  if (category.includes("Essential") || category.includes("Aromatherapy") || category.includes("Focus")) {
    return [
      "Avoid direct contact with eyes.",
      "Keep away from children and pets.",
      "Do not apply undiluted essential oils directly to skin."
    ];
  }
  if (category.includes("Skincare") || category.includes("Bodycare")) {
    return [
      "Patch test before first use.",
      "Discontinue use if irritation occurs.",
      "Store away from direct sunlight."
    ];
  }
  return [
    "Use only as directed.",
    "Keep packaging closed between uses.",
    "Consult ingredients list before use if sensitive."
  ];
}

function getReview(rating: number) {
  if (rating >= 4.8) {
    return {
      name: "Maya R.",
      quote:
        "This has become part of my evening routine. The texture and scent feel considered, and the product page made it easy to understand how to use it."
    };
  }

  return {
    name: "Noah L.",
    quote:
      "Beautifully presented and easy to work into a daily ritual. I appreciated the clear usage notes and ingredient detail."
  };
}
