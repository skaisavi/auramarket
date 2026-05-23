import { AdminLayoutClient } from "@/components/layout/admin-layout-client";
import { getAdminState } from "@/lib/data/admin-state";
import { StoreProvider } from "@/lib/store";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const initialState = await getAdminState();

  return (
    <StoreProvider initialState={initialState}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </StoreProvider>
  );
}
