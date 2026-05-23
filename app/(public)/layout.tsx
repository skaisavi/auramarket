import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { RecentlyViewedProvider } from "@/lib/recently-viewed";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PromoBanner } from "@/components/layout/promo-banner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecentlyViewedProvider>
    <WishlistProvider>
      <CartProvider>
        <PublicHeader />
        <PromoBanner />
        <main>{children}</main>
        <PublicFooter />
      </CartProvider>
    </WishlistProvider>
    </RecentlyViewedProvider>
  );
}
