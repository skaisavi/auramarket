import { ArticleCard } from "@/components/public/article-card";
import { Badge } from "@/components/ui/badge";
import { resourceArticles } from "@/lib/mock-data";

export const metadata = {
  title: "Wellness Journal | AuraMarket",
  description: "Guides, rituals, and aromatherapy resources from the AuraMarket editorial team."
};

export default function JournalPage() {
  const published = resourceArticles.filter((article) => article.status === "Published");
  const featured = published[0];
  const rest = published.slice(1);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="border-b border-line pb-8">
        <Badge tone="sage">Wellness journal</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Rituals & resources</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Practical guides for building a calmer daily rhythm — from aromatherapy basics to skincare layering and focused workspace design.
        </p>
      </div>

      {featured ? (
        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="min-h-64 border-b border-line lg:border-b-0 lg:border-r"
            style={{ background: featured.image }}
            aria-hidden="true"
          />
          <div className="flex flex-col justify-center p-8">
            <Badge tone="neutral">{featured.category}</Badge>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted">
              <span>{featured.readingTime}</span>
              <span>·</span>
              <span className="font-semibold">{featured.author}</span>
            </div>
            <a
              href={`/journal/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-700 hover:text-ink"
            >
              Read article →
            </a>
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
