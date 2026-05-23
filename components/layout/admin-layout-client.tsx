"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/layout/admin-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-canvas">{children}</main>;
  }

  return (
    <div className="admin-shell min-h-screen lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminHeader />
        <main className="px-5 py-6 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
