import { notFound } from "next/navigation";
import { MarketDetailManager } from "@/components/admin/market-detail-manager";
import { banners, campaigns, markets, products, translations } from "@/lib/mock-data";

export function generateStaticParams() {
  return markets.map((market) => ({ code: market.code.toLowerCase() }));
}

export default async function MarketDetailPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const market = markets.find((item) => item.code.toLowerCase() === code.toLowerCase());

  if (!market) {
    notFound();
  }

  const marketProducts = products.filter((product) => product.market === market.code || product.market === "EU");
  const marketBanners = banners.filter((banner) => banner.market === market.code || banner.market === "EU");
  const marketCampaigns = campaigns.filter((campaign) => campaign.market.includes(market.code) || campaign.market.includes(market.name));
  const translation = translations.find((item) => item.market === market.name || item.locale.toLowerCase().includes(market.code.toLowerCase()));

  return (
    <MarketDetailManager
      banners={marketBanners}
      campaigns={marketCampaigns.length > 0 ? marketCampaigns : campaigns.slice(0, 2)}
      market={market}
      products={marketProducts}
      translation={translation}
    />
  );
}
