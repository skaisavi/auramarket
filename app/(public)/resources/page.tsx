import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, CalendarCheck, Languages, SearchCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { resourceArticles } from "@/lib/mock-data";

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <Badge tone="sage">Wellness resources</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Editorial guides for everyday rituals</h1>
        </div>
        <p className="text-sm leading-7 text-muted">
          A CMS-style resources page showing how AuraMarket can support editorial content, buying guides, and educational articles alongside product merchandising.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {resourceArticles.map((article, index) => (
          <article key={article.slug} className={index === 0 ? "overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset lg:col-span-2" : "overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset"}>
            <Link href={`/journal/${article.slug}`} className="block h-full">
              <div className={index === 0 ? "h-64 border-b border-line" : "h-44 border-b border-line"} style={{ background: article.image }} aria-hidden="true" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <Badge tone="neutral">{article.category}</Badge>
                  <StatusPill status={article.status} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between gap-4 text-xs font-semibold text-muted">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {article.readingTime}
                  </span>
                  <span>{article.author}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage-700">
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-line bg-sage-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Resources managed like real CMS content</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            These articles connect the public brand experience to the admin workflows: content status, translations, SEO checks, and publishing schedules.
          </p>
          <Button href="/admin/content" className="mt-6">
            View content manager
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <ResourceMetric icon={<SearchCheck className="h-5 w-5" aria-hidden="true" />} label="SEO review" value="4 ready" />
          <ResourceMetric icon={<Languages className="h-5 w-5" aria-hidden="true" />} label="Translation tasks" value="6 locales" />
          <ResourceMetric icon={<CalendarCheck className="h-5 w-5" aria-hidden="true" />} label="Scheduled posts" value="1 queued" />
        </div>
      </section>
    </section>
  );
}

function ResourceMetric({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-700">
        {icon}
      </div>
      <p className="mt-5 text-xl font-semibold">{value}</p>
      <p className="mt-1 text-sm font-semibold text-muted">{label}</p>
    </div>
  );
}
