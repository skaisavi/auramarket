"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/campaigns/winter-reset", label: "Campaigns" },
  { href: "/admin", label: "Admin" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 transition hover:bg-white md:hidden"
        aria-label="Open navigation"
        aria-expanded={open}
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-ink/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="animate-drawer-in absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-pearl shadow-2xl"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="text-lg font-semibold tracking-wide">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition hover:bg-white"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center rounded-xl px-4 py-4 text-lg font-semibold transition",
                      pathname === href || pathname.startsWith(href + "/")
                        ? "bg-sage-50 text-sage-700"
                        : "text-ink hover:bg-white/70"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-line p-4 space-y-2">
              <Link
                href="/search"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-white/70 hover:text-ink"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-white/70 hover:text-ink"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Account
              </Link>
              <button
                type="button"
                onClick={() => { setOpen(false); openCart(); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-white/70 hover:text-ink"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Basket
                {count > 0 && (
                  <span className="ml-auto rounded-full bg-ink px-2 py-0.5 text-xs text-white">{count}</span>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
