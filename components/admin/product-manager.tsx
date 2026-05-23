"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckSquare, Edit3, EyeOff, Plus, Save, Search, Square } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { useDebounce } from "@/lib/use-debounce";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { updateProductStatus, upsertProduct } from "@/lib/actions/products";
import { type Product } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(3, "Product name needs at least 3 characters."),
  slug: z.string().min(3, "Slug is required.").regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens."),
  category: z.string().min(2, "Choose a category."),
  collection: z.string().min(2, "Collection is required."),
  price: z.number().min(1, "Price must be at least 1."),
  stock: z.number().int().min(0, "Stock cannot be negative."),
  status: z.enum(["Published", "Draft", "Hidden"]),
  market: z.string().min(2, "Market is required."),
  imageAlt: z.string().min(12, "Alt text should describe the product image."),
  description: z.string().min(40, "Description should be at least 40 characters.")
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductManager() {
  const { state, dispatch } = useStore();
  const { products } = state;
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [marketFilter, setMarketFilter] = useState("All");
  const [editingSlug, setEditingSlug] = useState<string | null>(products[0].slug);
  const [originalSlug, setOriginalSlug] = useState<string | null>(products[0].slug);
  const [savedMessage, setSavedMessage] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 200);

  const editing = editingSlug ? products.find((p) => p.slug === editingSlug) ?? null : null;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: toFormValues(products[0])
  });

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = [product.name, product.sku, product.category, product.collection]
        .join(" ")
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || product.status === statusFilter;
      const matchesMarket = marketFilter === "All" || product.market === marketFilter;
      return matchesQuery && matchesStatus && matchesMarket;
    });
  }, [products, debouncedQuery, statusFilter, marketFilter]);

  function editProduct(product: Product) {
    setEditingSlug(product.slug);
    setOriginalSlug(product.slug);
    setSavedMessage("");
    form.reset(toFormValues(product));
  }

  function createNew() {
    setEditingSlug(null);
    setOriginalSlug(null);
    setSavedMessage("");
    form.reset({
      name: "", slug: "", category: "", collection: "",
      price: 0, stock: 0, status: "Draft",
      market: "", imageAlt: "", description: ""
    });
  }

  async function handleSave(values: ProductFormValues) {
    const now = new Date().toISOString().split("T")[0];
    const product: Product = editing
      ? { ...editing, ...values, updatedAt: now }
      : {
          ...values,
          rating: 0,
          badge: "",
          tone: "",
          ritual: [],
          ingredients: [],
          image: "linear-gradient(135deg, #f0f2f0 0%, #ffffff 100%)",
          sku: `AUR-NEW-${values.slug.slice(0, 8).toUpperCase()}`,
          seoCompleteness: 0,
          updatedAt: now,
        };
    try {
      const saved = await upsertProduct(product, originalSlug ?? undefined);
      dispatch({ type: "UPSERT_PRODUCT", product: saved, originalSlug: originalSlug ?? undefined });
      setEditingSlug(saved.slug);
      setOriginalSlug(saved.slug);
      setSavedMessage(`${values.name} saved.`);
      toast(`${values.name} saved successfully`);
    } catch {
      toast("Product could not be saved. Check the database connection.", "error");
    }
  }

  function toggleSelected(slug: string) {
    setSelectedSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  }

  function toggleAllFiltered() {
    const filteredSlugs = filtered.map((product) => product.slug);
    const allSelected = filtered.length > 0 && filteredSlugs.every((slug) => selectedSlugs.includes(slug));
    setSelectedSlugs((current) =>
      allSelected
        ? current.filter((slug) => !filteredSlugs.includes(slug))
        : Array.from(new Set([...current, ...filteredSlugs]))
    );
  }

  async function bulkUpdateStatus(status: Product["status"]) {
    const selectedProducts = products.filter((product) => selectedSlugs.includes(product.slug));
    try {
      const savedProducts = await Promise.all(
        selectedProducts.map((product) => updateProductStatus(product.slug, status))
      );
      savedProducts.forEach((product) => {
        dispatch({ type: "UPSERT_PRODUCT", product });
      });
      toast(`${selectedProducts.length} products moved to ${status.toLowerCase()}`);
      setSelectedSlugs([]);
    } catch {
      toast("Bulk status update failed. Check the database connection.", "error");
    }
  }

  const selectedCount = selectedSlugs.length;
  const allFilteredSelected = filtered.length > 0 && filtered.every((product) => selectedSlugs.includes(product.slug));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <section className="space-y-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/72 p-4 shadow-inset lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm"
              placeholder="Search product, SKU, collection..."
            />
          </label>
          <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={["All", "Published", "Draft", "Hidden"]} />
          <FilterSelect label="Market" value={marketFilter} onChange={setMarketFilter} options={["All", "UK", "EU", "US"]} />
          <Button onClick={createNew}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add product
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset">
          <div className="flex flex-col gap-3 border-b border-line bg-white/78 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <button
              type="button"
              onClick={toggleAllFiltered}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
              aria-label={allFilteredSelected ? "Clear selected products" : "Select all filtered products"}
            >
              {allFilteredSelected ? <CheckSquare className="h-4 w-4 text-sage-700" /> : <Square className="h-4 w-4 text-muted" />}
              {selectedCount > 0 ? `${selectedCount} selected` : "Select products"}
            </button>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" className="px-3 text-xs" disabled={selectedCount === 0} onClick={() => bulkUpdateStatus("Published")}>
                Bulk publish
              </Button>
              <Button type="button" variant="secondary" className="px-3 text-xs" disabled={selectedCount === 0} onClick={() => bulkUpdateStatus("Draft")}>
                Bulk unpublish
              </Button>
              <Button type="button" variant="secondary" className="px-3 text-xs" disabled={selectedCount === 0} onClick={() => bulkUpdateStatus("Hidden")}>
                <EyeOff className="h-4 w-4" aria-hidden="true" />
                Hide selected
              </Button>
            </div>
          </div>
          <div className="hidden grid-cols-[0.25fr_1.3fr_0.7fr_0.65fr_0.7fr_0.9fr_0.35fr] gap-4 border-b border-line bg-surface-strong px-5 py-3 text-xs font-semibold uppercase text-muted lg:grid">
            <span aria-hidden="true" />
            <span>Product</span>
            <span>Status</span>
            <span>Stock</span>
            <span>SEO</span>
            <span>Warnings</span>
            <span className="text-right">Edit</span>
          </div>
          <div className="divide-y divide-line">
            {filtered.map((product) => {
              const missingAlt = product.imageAlt.trim().length === 0;
              return (
                <article key={product.slug} className="grid gap-4 px-5 py-4 lg:grid-cols-[0.25fr_1.3fr_0.7fr_0.65fr_0.7fr_0.9fr_0.35fr] lg:items-center">
                  <label className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <input
                      type="checkbox"
                      checked={selectedSlugs.includes(product.slug)}
                      onChange={() => toggleSelected(product.slug)}
                      className="h-4 w-4 rounded border-line text-sage-700"
                      aria-label={`Select ${product.name}`}
                    />
                    <span className="lg:sr-only">Select</span>
                  </label>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="mt-1 text-xs text-muted">{product.sku} · {product.category} · {formatCurrency(product.price)}</p>
                  </div>
                  <StatusPill status={product.status} />
                  <p className="text-sm font-semibold">{product.stock} units</p>
                  <div className="min-w-36">
                    <div className="mb-2 flex justify-between text-xs font-semibold text-muted">
                      <span>SEO</span>
                      <span>{product.seoCompleteness}%</span>
                    </div>
                    <Progress value={product.seoCompleteness} />
                  </div>
                  <div>
                    {missingAlt ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-clay-200 bg-clay-50 px-3 py-1 text-xs font-semibold text-clay-700">
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                        Missing alt text
                      </span>
                    ) : (
                      <Badge tone="sage">Alt text ready</Badge>
                    )}
                  </div>
                  <Button variant="ghost" className="justify-self-start px-3 lg:justify-self-end" onClick={() => editProduct(product)}>
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                    <span className="lg:sr-only">Edit {product.name}</span>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Card className="h-fit">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{editing ? "Edit product" : "New product"}</h2>
            <p className="mt-1 text-sm text-muted">{editing?.name ?? "Unsaved draft"}</p>
          </div>
          <StatusPill status={form.watch("status")} />
        </div>

        {form.formState.isDirty && (
          <div className="sticky top-4 z-10 -mx-1 mb-2 flex items-center justify-between gap-3 rounded-xl border border-sage-300/60 bg-sage-50 px-4 py-3 shadow-soft">
            <span className="flex items-center gap-2 text-sm font-semibold text-sage-700">
              <Save className="h-4 w-4" aria-hidden="true" />
              Unsaved changes
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                className="px-3 text-xs"
                onClick={() => { setSavedMessage(""); form.reset(editing ? toFormValues(editing) : undefined); }}
              >
                Discard
              </Button>
              <Button type="submit" form="product-form" className="px-3 text-xs">
                Save now
              </Button>
            </div>
          </div>
        )}
        <form
          id="product-form"
          className="mt-6 space-y-4"
          onSubmit={form.handleSubmit(handleSave)}
        >
          <FormInput label="Product name" registration={form.register("name")} error={form.formState.errors.name?.message} />
          <FormInput
            label="Slug"
            registration={form.register("slug")}
            error={form.formState.errors.slug?.message}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="Category" registration={form.register("category")} error={form.formState.errors.category?.message} />
            <FormInput label="Collection" registration={form.register("collection")} error={form.formState.errors.collection?.message} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="Price" type="number" registration={form.register("price", { valueAsNumber: true })} error={form.formState.errors.price?.message} />
            <FormInput label="Stock" type="number" registration={form.register("stock", { valueAsNumber: true })} error={form.formState.errors.stock?.message} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Status
              <select className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm" {...form.register("status")}>
                <option>Published</option>
                <option>Draft</option>
                <option>Hidden</option>
              </select>
            </label>
            <FormInput label="Market" registration={form.register("market")} error={form.formState.errors.market?.message} />
          </div>
          <FormTextArea label="Image alt text" registration={form.register("imageAlt")} error={form.formState.errors.imageAlt?.message} />
          <FormTextArea label="Product description" registration={form.register("description")} error={form.formState.errors.description?.message} />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button type="submit">Save product</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSavedMessage("");
                form.reset(editing ? toFormValues(editing) : undefined);
              }}
            >
              Reset
            </Button>
          </div>
          {savedMessage ? (
            <p className="rounded-xl border border-sage-300/60 bg-sage-50 px-4 py-3 text-sm font-semibold text-sage-700" role="status">
              {savedMessage}
            </p>
          ) : null}
        </form>
      </Card>
    </div>
  );
}

function toFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    collection: product.collection,
    price: product.price,
    stock: product.stock,
    status: product.status,
    market: product.market,
    imageAlt: product.imageAlt,
    description: product.description
  };
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block min-w-36 text-xs font-semibold text-muted">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-medium text-ink"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function FormInput({
  label,
  registration,
  error,
  type = "text",
  disabled = false
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        className={cn(
          "mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm",
          disabled && "cursor-not-allowed opacity-50"
        )}
        type={type}
        disabled={disabled}
        {...registration}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-clay-700">{error}</span> : null}
    </label>
  );
}

function FormTextArea({
  label,
  registration,
  error
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <textarea className="mt-2 min-h-24 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm leading-6" {...registration} />
      {error ? <span className="mt-1 block text-xs font-medium text-clay-700">{error}</span> : null}
    </label>
  );
}
