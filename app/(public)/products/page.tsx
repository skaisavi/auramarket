import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/public/product-card";
import { Badge } from "@/components/ui/badge";
import { getPublishedProducts } from "@/lib/data/public";
import { categories } from "@/lib/mock-data";

type ProductsSearchParams = {
  category?: string;
  benefit?: string;
  price?: string;
  sort?: string;
  q?: string;
};

const benefitOptions = ["All", "Sleep", "Focus", "Glow", "Bath", "Gift"];
const priceOptions = ["All", "Under £30", "£30-£50", "Over £50"];
const sortOptions = ["Newest", "Price low", "Price high", "Best sellers"];

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<ProductsSearchParams>;
}) {
  const [params, allProducts] = await Promise.all([
    searchParams,
    getPublishedProducts(),
  ]);
  const selectedCategory = params.category ?? "all";
  const selectedBenefit = params.benefit ?? "All";
  const selectedPrice = params.price ?? "All";
  const selectedSort = params.sort ?? "Newest";
  const query = params.q?.trim().toLowerCase() ?? "";

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        slugify(product.category) === selectedCategory ||
        product.category.toLowerCase().includes(selectedCategory.replaceAll("-", " "));
      const matchesBenefit =
        selectedBenefit === "All" ||
        [product.name, product.description, product.collection, product.badge, product.category]
          .join(" ")
          .toLowerCase()
          .includes(selectedBenefit.toLowerCase());
      const matchesPrice =
        selectedPrice === "All" ||
        (selectedPrice === "Under £30" && product.price < 30) ||
        (selectedPrice === "£30-£50" && product.price >= 30 && product.price <= 50) ||
        (selectedPrice === "Over £50" && product.price > 50);
      const matchesQuery =
        query.length === 0 ||
        [product.name, product.category, product.collection, product.description, product.badge]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesBenefit && matchesPrice && matchesQuery;
    })
    .sort((a, b) => {
      if (selectedSort === "Price low") return a.price - b.price;
      if (selectedSort === "Price high") return b.price - a.price;
      if (selectedSort === "Best sellers") return b.rating - a.rating;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone="sage">Ritual catalog</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Products</h1>
          <p className="mt-4 max-w-2xl text-muted">
            A curated listing pattern for wellness merchandising, with clear category, stock, rating, and market cues.
          </p>
        </div>
        <div className="rounded-full border border-line bg-white/72 px-4 py-2 text-sm font-semibold text-muted shadow-inset">
          {filteredProducts.length} products found
        </div>
      </div>

      <form className="mt-8 rounded-2xl border border-line bg-white/72 p-4 shadow-inset" action="/products">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:items-end">
          <label className="block text-xs font-semibold text-muted">
            Search
            <span className="relative mt-1 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                name="q"
                defaultValue={params.q ?? ""}
                className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm font-medium text-ink"
                placeholder="Search rituals..."
              />
            </span>
          </label>
          <FilterSelect label="Category" name="category" value={selectedCategory} options={[["all", "All categories"], ...categories.map((category) => [category.slug, category.name] as [string, string])]} />
          <FilterSelect label="Benefit" name="benefit" value={selectedBenefit} options={benefitOptions.map((option) => [option, option])} />
          <FilterSelect label="Price" name="price" value={selectedPrice} options={priceOptions.map((option) => [option, option])} />
          <FilterSelect label="Sort" name="sort" value={selectedSort} options={sortOptions.map((option) => [option, option])} />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold text-muted">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters update this catalog using shareable URL parameters.
          </p>
          <div className="flex gap-3">
            <Link href="/products" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:bg-pearl">
              Clear
            </Link>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-sage-700">
              Apply filters
            </button>
          </div>
        </div>
      </form>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-white/64 p-10 text-center">
          <h2 className="text-xl font-semibold">No products match these filters</h2>
          <p className="mt-3 text-sm text-muted">Try clearing one filter or searching for a broader ritual need.</p>
        </div>
      ) : null}
    </section>
  );
}

function FilterSelect({
  label,
  name,
  value,
  options
}: {
  label: string;
  name: string;
  value: string;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block text-xs font-semibold text-muted">
      {label}
      <select
        name={name}
        defaultValue={value}
        className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");
}
