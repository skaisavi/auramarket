"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { adminNavigation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-line bg-white/72 px-4 py-4 shadow-inset lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5">
      <Link href="/admin" className="mb-6 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
          <Leaf className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-semibold">AuraMarket</span>
          <span className="text-xs text-muted">Web administration</span>
        </span>
      </Link>
      <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-fit items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                active ? "bg-sage-50 text-sage-700" : "text-muted hover:bg-white hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
