import Link from "next/link";
import { Leaf, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/layout/cart-button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-pearl/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3 font-semibold" aria-label="AuraMarket home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-sage-700">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg tracking-wide">AuraMarket</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          <Link href="/products" className="hover:text-ink">Products</Link>
          <Link href="/collections" className="hover:text-ink">Collections</Link>
          <Link href="/journal" className="hover:text-ink">Journal</Link>
          <Link href="/campaigns/winter-reset" className="hover:text-ink">Campaigns</Link>
          <Link href="/admin" className="hover:text-ink">Admin</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/search" variant="ghost" className="px-3" aria-label="Search AuraMarket">
            <Search className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/account" variant="ghost" className="hidden px-3 sm:inline-flex" aria-label="Account">
            <User className="h-4 w-4" aria-hidden="true" />
          </Button>
          <CartButton />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
