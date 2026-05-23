import { InventoryManager } from "@/components/admin/inventory-manager";

export default function AdminInventoryPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Stock & Inventory</h1>
        <p className="mt-2 text-sm text-muted">
          Monitor stock levels across your catalog, flag low-stock products, and update unit counts inline.
        </p>
      </div>
      <InventoryManager />
    </section>
  );
}
