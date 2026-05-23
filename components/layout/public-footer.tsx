import Link from "next/link";
import { Leaf } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All products", href: "/products" },
    { label: "Essential Oils", href: "/products?category=essential-oils" },
    { label: "Skincare", href: "/products?category=skincare" },
    { label: "Sleep & Relaxation", href: "/products?category=sleep-relaxation" },
    { label: "Wellness Bundles", href: "/products?category=wellness-bundles" }
  ],
  Campaigns: [
    { label: "Winter Reset", href: "/campaigns/winter-reset" },
    { label: "Summer Wellness Edit", href: "/campaigns/summer-wellness-edit" },
    { label: "Sleep Better Week", href: "/campaigns/sleep-better-week" },
    { label: "Morning Light", href: "/campaigns/morning-light" }
  ],
  Journal: [
    { label: "All articles", href: "/journal" },
    { label: "Evening ritual guide", href: "/journal/build-a-relaxing-evening-routine" },
    { label: "Aromatherapy basics", href: "/journal/beginners-guide-to-aromatherapy" },
    { label: "Essential oils for focus", href: "/journal/best-essential-oils-for-focus" }
  ],
  Admin: [
    { label: "Dashboard", href: "/admin" },
    { label: "Products", href: "/admin/products" },
    { label: "Campaigns", href: "/admin/campaigns" },
    { label: "Website audit", href: "/admin/audits" }
  ]
};

export function PublicFooter() {
  return (
    <footer className="border-t border-line/70 bg-white/50">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,_1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="AuraMarket home">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-100 text-sage-700">
                <Leaf className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="font-semibold">AuraMarket</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Premium wellness commerce with careful content, calm merchandising, and practical administration workflows.
            </p>
            <p className="mt-6 text-xs text-muted">
              Built as a portfolio project for Web Administrator and Junior Front-End Developer roles. All products and data are illustrative.
            </p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold">{group}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© 2026 AuraMarket. Portfolio demonstration project.</p>
          <p className="text-xs text-muted">UK · EU · US · LT · IT</p>
        </div>
      </div>
    </footer>
  );
}
