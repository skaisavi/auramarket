"use client";

import { ArrowLeft, ClipboardCheck, Edit3, Globe2, Megaphone, PackageCheck, PanelTop } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import type { Banner, Campaign, Market, Product, Translation } from "@/lib/mock-data";

type DrawerState =
  | { type: "market" }
  | { type: "campaign"; item: Campaign }
  | { type: "product"; item: Product }
  | { type: "banner"; item: Banner }
  | null;

export function MarketDetailManager({
  banners,
  campaigns,
  market,
  products,
  translation
}: {
  banners: Banner[];
  campaigns: Campaign[];
  market: Market;
  products: Product[];
  translation?: Translation;
}) {
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const lowStockProducts = products.filter((product) => product.stock <= 80);
  const productsMissingAlt = products.filter((product) => product.imageAlt.trim().length === 0);
  const expiredBanners = banners.filter((banner) => new Date(`${banner.endsAt}T00:00:00`) < new Date("2026-05-23T00:00:00"));
  const drawerTitle = getDrawerTitle(drawer, market);

  const marketReadinessChecks = useMemo(() => [
    { label: "Market content is live or preparing", complete: market.status !== "Paused" },
    { label: "Translation coverage is above 80%", complete: (translation?.completeness ?? 0) >= 80 },
    { label: "No expired banners are active", complete: expiredBanners.length === 0 },
    { label: "Campaign blockers reviewed", complete: campaigns.every((campaign) => campaign.missingRequirements.length <= 2) },
    { label: "Product image alt text reviewed", complete: productsMissingAlt.length === 0 }
  ], [campaigns, expiredBanners.length, market.status, productsMissingAlt.length, translation?.completeness]);

  return (
    <section className="space-y-6">
      <Button href="/admin/markets" variant="ghost" className="px-0">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to markets
      </Button>
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
          <Globe2 className="h-4 w-4" aria-hidden="true" />
          {market.code} - {market.currency}
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{market.name}</h1>
            <p className="mt-2 text-sm text-muted">Market readiness, content coverage, banners, and campaign activity.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <StatusPill status={market.status} />
            <Button type="button" variant="secondary" onClick={() => setDrawer({ type: "market" })}>
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Review market
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Market health" value={`${market.health}%`} progress={market.health} />
        <MetricCard label="Products visible" value={String(products.length)} progress={Math.min(100, products.length * 10)} />
        <MetricCard label="Active banners" value={String(banners.length)} progress={Math.min(100, banners.length * 20)} />
        <MetricCard label="Translation coverage" value={translation ? `${translation.completeness}%` : "Pending"} progress={translation?.completeness ?? 20} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Campaigns touching this market</h2>
              <p className="mt-1 text-sm text-muted">Review blockers before local campaign approval.</p>
            </div>
            <Megaphone className="h-5 w-5 text-sage-700" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {campaigns.map((campaign) => (
              <article key={campaign.slug} className="rounded-xl border border-line bg-white/72 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <p className="mt-1 text-sm text-muted">{campaign.market} - Launch {campaign.launchDate}</p>
                    <p className="mt-2 text-xs font-semibold text-muted">{campaign.missingRequirements.length} launch blockers</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill status={campaign.status} />
                    <Button type="button" variant="ghost" className="px-3" onClick={() => setDrawer({ type: "campaign", item: campaign })}>
                      <Edit3 className="h-4 w-4" aria-hidden="true" />
                      Review
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Visible products</h2>
              <p className="mt-1 text-sm text-muted">Stock, SEO, and media checks for this market.</p>
            </div>
            <PackageCheck className="h-5 w-5 text-sage-700" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {products.slice(0, 5).map((product) => (
              <article key={product.slug} className="rounded-xl border border-line bg-white/72 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted">{product.stock} units - SEO {product.seoCompleteness}%</p>
                  </div>
                  <Button type="button" variant="ghost" className="px-3" onClick={() => setDrawer({ type: "product", item: product })}>
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                    Check
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Market banners</h2>
              <p className="mt-1 text-sm text-muted">Confirm placements, dates, destination links, and alt text before publishing.</p>
            </div>
            <PanelTop className="h-5 w-5 text-sage-700" aria-hidden="true" />
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {banners.length > 0 ? banners.map((banner) => (
              <article key={banner.id} className="rounded-xl border border-line bg-white/72 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{banner.placement}</h3>
                    <p className="mt-1 text-sm text-muted">{banner.message}</p>
                    <p className="mt-2 text-xs text-muted">{banner.startsAt} to {banner.endsAt}</p>
                  </div>
                  <StatusPill status={banner.status} />
                </div>
                <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => setDrawer({ type: "banner", item: banner })}>
                  Review banner
                </Button>
              </article>
            )) : (
              <p className="rounded-xl border border-dashed border-line bg-white/60 p-4 text-sm text-muted">
                No market-specific banners are scheduled yet.
              </p>
            )}
          </div>
        </Card>
      </div>

      <Drawer open={drawer !== null} onClose={() => setDrawer(null)} title={drawerTitle} width="max-w-xl">
        <div className="space-y-5 p-6">
          {drawer?.type === "market" ? (
            <MarketDrawerContent
              checks={marketReadinessChecks}
              expiredBannerCount={expiredBanners.length}
              lowStockCount={lowStockProducts.length}
              market={market}
              missingAltCount={productsMissingAlt.length}
              translation={translation}
            />
          ) : null}
          {drawer?.type === "campaign" ? <CampaignDrawerContent campaign={drawer.item} /> : null}
          {drawer?.type === "product" ? <ProductDrawerContent product={drawer.item} /> : null}
          {drawer?.type === "banner" ? <BannerDrawerContent banner={drawer.item} /> : null}
        </div>
      </Drawer>
    </section>
  );
}

function MetricCard({
  label,
  value,
  progress
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <Card>
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <Progress value={progress} className="mt-5" />
    </Card>
  );
}

function MarketDrawerContent({
  checks,
  expiredBannerCount,
  lowStockCount,
  market,
  missingAltCount,
  translation
}: {
  checks: { label: string; complete: boolean }[];
  expiredBannerCount: number;
  lowStockCount: number;
  market: Market;
  missingAltCount: number;
  translation?: Translation;
}) {
  return (
    <>
      <div className="rounded-2xl border border-line bg-surface/70 p-4">
        <p className="text-sm font-semibold text-muted">Market status</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-2xl font-semibold">{market.health}% ready</p>
          <StatusPill status={market.status} />
        </div>
        <Progress value={market.health} className="mt-4" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <DrawerMetric label="Low stock" value={lowStockCount} />
        <DrawerMetric label="Missing alt" value={missingAltCount} />
        <DrawerMetric label="Expired banners" value={expiredBannerCount} />
      </div>
      <div className="rounded-2xl border border-line p-4">
        <h3 className="font-semibold">Readiness checks</h3>
        <div className="mt-4 space-y-3">
          {checks.map((check) => (
            <div key={check.label} className="flex items-start justify-between gap-3 text-sm">
              <span className="text-muted">{check.label}</span>
              <span className={check.complete ? "font-semibold text-sage-700" : "font-semibold text-clay-700"}>
                {check.complete ? "Ready" : "Needs work"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm leading-6 text-muted">
        Translation owner: {translation?.reviewer ?? "Not assigned"}. Coverage is {translation ? `${translation.completeness}%` : "not configured"}.
      </p>
    </>
  );
}

function CampaignDrawerContent({ campaign }: { campaign: Campaign }) {
  return (
    <>
      <div className="rounded-2xl border border-line bg-surface/70 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted">Campaign</p>
            <h3 className="mt-1 text-xl font-semibold">{campaign.title}</h3>
          </div>
          <StatusPill status={campaign.status} />
        </div>
        <Progress value={campaign.readiness} className="mt-4" />
        <p className="mt-2 text-sm text-muted">{campaign.readiness}% ready for {campaign.launchDate}</p>
      </div>
      <div>
        <h4 className="font-semibold">Missing launch requirements</h4>
        <div className="mt-3 space-y-2">
          {campaign.missingRequirements.map((requirement) => (
            <p key={requirement} className="rounded-xl border border-clay-200 bg-clay-50 px-3 py-2 text-sm text-clay-700">
              {requirement}
            </p>
          ))}
          {campaign.missingRequirements.length === 0 ? <p className="text-sm text-muted">No blockers recorded.</p> : null}
        </div>
      </div>
    </>
  );
}

function ProductDrawerContent({ product }: { product: Product }) {
  const needsAltText = product.imageAlt.trim().length === 0;
  return (
    <>
      <div className="h-32 rounded-2xl border border-line" style={{ background: product.image }} aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-muted">{product.category}</p>
        <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <DrawerMetric label="Stock" value={product.stock} />
        <DrawerMetric label="SEO" value={`${product.seoCompleteness}%`} />
        <DrawerMetric label="Market" value={product.market} />
      </div>
      <p className={needsAltText ? "rounded-xl border border-clay-200 bg-clay-50 p-3 text-sm text-clay-700" : "rounded-xl border border-sage-200 bg-sage-50 p-3 text-sm text-sage-700"}>
        {needsAltText ? "Image alt text is missing and should be completed before promotion." : product.imageAlt}
      </p>
    </>
  );
}

function BannerDrawerContent({ banner }: { banner: Banner }) {
  const needsAltText = banner.imageAlt.trim().length === 0;
  const expired = new Date(`${banner.endsAt}T00:00:00`) < new Date("2026-05-23T00:00:00");
  return (
    <>
      <div className="h-32 rounded-2xl border border-line" style={{ background: banner.visual }} aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{banner.placement}</p>
          <h3 className="mt-1 text-xl font-semibold">{banner.message}</h3>
        </div>
        <StatusPill status={banner.status} />
      </div>
      <div className="rounded-2xl border border-line p-4 text-sm">
        <p><span className="font-semibold">Destination:</span> {banner.destination}</p>
        <p className="mt-2"><span className="font-semibold">Schedule:</span> {banner.startsAt} to {banner.endsAt}</p>
        <p className="mt-2"><span className="font-semibold">Market:</span> {banner.market}</p>
      </div>
      {needsAltText || expired ? (
        <div className="space-y-2">
          {needsAltText ? <p className="rounded-xl border border-clay-200 bg-clay-50 p-3 text-sm text-clay-700">Missing image alt text.</p> : null}
          {expired ? <p className="rounded-xl border border-clay-200 bg-clay-50 p-3 text-sm text-clay-700">Banner has passed its end date and should be archived or renewed.</p> : null}
        </div>
      ) : (
        <p className="rounded-xl border border-sage-200 bg-sage-50 p-3 text-sm text-sage-700">{banner.imageAlt}</p>
      )}
    </>
  );
}

function DrawerMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-line bg-white/72 p-3">
      <p className="text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-muted">{label}</p>
    </div>
  );
}

function getDrawerTitle(drawer: DrawerState, market: Market) {
  if (drawer?.type === "campaign") return `Review ${drawer.item.title}`;
  if (drawer?.type === "product") return `Check ${drawer.item.name}`;
  if (drawer?.type === "banner") return `Review ${drawer.item.placement}`;
  return `${market.name} market review`;
}
