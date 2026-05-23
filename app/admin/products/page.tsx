import { ProductManager } from "@/components/admin/product-manager";

export default function AdminProductsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Product manager</h1>
        <p className="mt-2 text-sm text-muted">Maintain catalog readiness, accessibility, SEO quality, and publish status.</p>
      </div>
      <ProductManager />
    </section>
  );
}
