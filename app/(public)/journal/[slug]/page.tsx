import { notFound } from "next/navigation";
import { ArrowLeft, Clock, PenLine } from "lucide-react";
import { ArticleCard } from "@/components/public/article-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resourceArticles, type ResourceArticle } from "@/lib/mock-data";

const articleBodies: Record<string, { intro: string; sections: { title: string; body: string }[]; checklist: string[] }> = {
  "build-a-relaxing-evening-routine": {
    intro: "A good evening ritual is not about adding more tasks to the end of the day. It is about creating a repeatable sequence that tells your body the pace is changing.",
    sections: [
      {
        title: "Start with one anchor",
        body: "Choose a simple sensory cue, such as a lavender bath soak, a pillow mist, or a warm facial oil. Use it at the same time each evening so the cue becomes familiar rather than decorative."
      },
      {
        title: "Keep the routine light",
        body: "Three steps are enough: soften the room, care for the body, then reduce stimulation. The routine should feel easier to repeat than to skip."
      },
      {
        title: "Measure calm practically",
        body: "Notice whether you reach for your phone less, fall asleep more steadily, or wake with fewer signs of tension. Small improvements are the real signal."
      }
    ],
    checklist: ["Set a consistent start time", "Choose one scent cue", "Keep the final step screen-free"]
  },
  "best-essential-oils-for-focus": {
    intro: "Focus scents work best when they support the environment instead of overwhelming it. Bright citrus, rosemary, and peppermint can help define a sharper work block.",
    sections: [
      {
        title: "Use scent as a boundary",
        body: "Diffuse a blend only while you are doing focused work. When the session ends, turn it off. This helps the fragrance become a useful signal rather than background noise."
      },
      {
        title: "Choose cleaner notes",
        body: "Rosemary feels clear, lemon feels bright, and peppermint feels cooling. Together they create a crisp workspace without becoming heavy."
      },
      {
        title: "Avoid scent fatigue",
        body: "Short sessions are better than constant diffusion. Thirty minutes is enough for a morning reset or a post-lunch focus block."
      }
    ],
    checklist: ["Diffuse for 20 to 30 minutes", "Ventilate the workspace", "Pair scent with one clear task"]
  },
  "calm-home-workspace": {
    intro: "A calm workspace is built from small repeatable choices: fewer visual distractions, steady light, and a scent that marks the beginning of focused time.",
    sections: [
      {
        title: "Edit the surface",
        body: "Keep only the objects you use daily within reach. A tidy surface reduces the number of decisions your attention has to process."
      },
      {
        title: "Create a reset cue",
        body: "A botanical mist, a glass of water, or opening a window can become the small action that marks the start of a focused work block."
      },
      {
        title: "Protect the end of the day",
        body: "Clear away the work cue when the day ends. This helps the same room feel less like an always-on office."
      }
    ],
    checklist: ["Clear the desk before starting", "Use one scent or light cue", "Reset the surface after work"]
  }
};

export function generateStaticParams() {
  return resourceArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = resourceArticles.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} | AuraMarket Journal` : "AuraMarket Journal",
    description: article?.excerpt
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = resourceArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const related = resourceArticles.filter(
    (item) => item.slug !== article.slug && item.status === "Published"
  ).slice(0, 3);
  const body = getArticleBody(article);

  return (
    <div>
      <article>
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <Button href="/journal" variant="ghost" className="mb-8 px-0">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to journal
          </Button>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <Badge tone="neutral">{article.category}</Badge>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {article.readingTime}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <PenLine className="h-4 w-4" aria-hidden="true" />
                  {article.author}
                </span>
              </div>
            </div>
            <div
              className="min-h-72 rounded-2xl border border-white/80 shadow-soft lg:min-h-[28rem]"
              style={{ background: article.image }}
              aria-label={`${article.title} editorial image`}
              role="img"
            />
          </div>
        </section>

        <section className="border-y border-line bg-white/42">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.68fr_0.32fr]">
            <div className="space-y-8">
              <p className="text-xl leading-9 text-ink/80">{body.intro}</p>
              {body.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-muted">{section.body}</p>
                </section>
              ))}
            </div>
            <aside className="h-fit rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
              <h2 className="text-lg font-semibold">Ritual checklist</h2>
              <div className="mt-4 space-y-3">
                {body.checklist.map((item) => (
                  <p key={item} className="rounded-xl border border-sage-200 bg-sage-50 px-4 py-3 text-sm font-semibold text-sage-700">
                    {item}
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">Related reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function getArticleBody(article: ResourceArticle) {
  return articleBodies[article.slug] ?? {
    intro: "This guide is designed to help customers make confident, practical choices while keeping the AuraMarket editorial tone calm and useful.",
    sections: [
      {
        title: "Choose with intention",
        body: "Start with the part of the day you want to improve, then select products that support that moment rather than buying a full routine at once."
      },
      {
        title: "Build a repeatable rhythm",
        body: "Simple rituals become useful when they are easy to repeat. Keep the steps visible, tactile, and connected to an existing habit."
      },
      {
        title: "Review what works",
        body: "After two weeks, keep what genuinely improves the routine and remove anything that feels fussy or unnecessary."
      }
    ],
    checklist: ["Start with one need", "Repeat for two weeks", "Keep only what helps"]
  };
}
