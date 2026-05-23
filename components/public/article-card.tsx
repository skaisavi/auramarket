import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResourceArticle } from "@/lib/mock-data";

export function ArticleCard({ article }: { article: ResourceArticle }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white/78 shadow-inset transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/journal/${article.slug}`} className="block">
        <div
          className="aspect-[16/9] border-b border-white/70"
          style={{ background: article.image }}
          aria-hidden="true"
        />
        <div className="p-5">
          <Badge tone="neutral">{article.category}</Badge>
          <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{article.title}</h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{article.excerpt}</p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {article.readingTime}
            </span>
            <span className="font-semibold">{article.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
