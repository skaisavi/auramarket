import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { campaigns, products } from "@/lib/mock-data";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export default async function CampaignPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = campaigns.find((item) => item.slug === slug);

  if (!campaign) {
    notFound();
  }

  const focusProducts = products.filter((product) => campaign.focusProducts.includes(product.name));

  return (
    <div>
      <section className="relative min-h-[34rem] overflow-hidden">
        <Image
          src="/images/auramarket-wellness-hero.png"
          alt="AuraMarket wellness campaign still life"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/74 via-ink/36 to-transparent" />
        <div className="relative mx-auto flex min-h-[34rem] max-w-7xl items-center px-5 py-16 text-white sm:px-8">
          <div className="max-w-2xl">
            <Badge tone="gold">{campaign.market}</Badge>
            <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight sm:text-7xl">{campaign.title}</h1>
            <p className="mt-5 text-lg leading-8 text-white/84">{campaign.heroCopy}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/products" className="bg-white text-ink hover:bg-pearl">
                Shop focus products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <span className="flex items-center gap-2 text-sm font-semibold text-white/88">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Launch {campaign.launchDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Campaign readiness</h2>
            <StatusPill status={campaign.status} />
          </div>
          <p className="mt-5 text-4xl font-semibold">{campaign.readiness}%</p>
          <Progress value={campaign.readiness} className="mt-5" />
          <p className="mt-5 text-sm leading-6 text-muted">
            This page structure connects public campaign storytelling to the admin readiness workflow.
          </p>
        </aside>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Featured rituals</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {focusProducts.map((product) => (
              <article key={product.slug} className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
                <Badge tone="sage">{product.category}</Badge>
                <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
