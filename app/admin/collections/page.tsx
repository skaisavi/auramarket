import { CollectionManager } from "@/components/admin/collection-manager";
import { collections } from "@/lib/mock-data";

export default function AdminCollectionsPage() {
  return <CollectionManager collections={collections} />;
}
