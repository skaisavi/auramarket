"use client";

import { AlertTriangle, CheckCircle2, Languages } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { translations as allTranslations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const languages = ["English", "French", "German", "Spanish", "Italian", "Lithuanian"] as const;

export function ContentManager() {
  const { state, dispatch } = useStore();
  const { contentTranslations } = state;
  const { toast } = useToast();

  const [activeLanguage, setActiveLanguage] = useState<(typeof languages)[number]>("English");
  const activeStatus = allTranslations.find((t) => t.language === activeLanguage);

  const rows = useMemo(
    () => contentTranslations.filter((item) => item.language === activeLanguage),
    [activeLanguage, contentTranslations]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-white/72 p-4 shadow-inset">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
              <Languages className="h-4 w-4" aria-hidden="true" />
              Multilingual content manager
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Localized storefront copy</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Track translation coverage, missing copy, reviewer ownership, and page sections before market launches.
            </p>
          </div>
          {activeStatus ? (
            <div className="min-w-56 rounded-xl bg-sage-50 p-4">
              <div className="flex justify-between text-sm font-semibold">
                <span>{activeStatus.locale}</span>
                <span>{activeStatus.completeness}%</span>
              </div>
              <Progress value={activeStatus.completeness} className="mt-3 bg-white/80" />
              <p className="mt-3 text-xs text-muted">{activeStatus.pending} strings pending · {activeStatus.reviewer}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Translation languages">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              role="tab"
              aria-selected={activeLanguage === language}
              onClick={() => setActiveLanguage(language)}
              className={cn(
                "min-w-fit rounded-full border px-4 py-2 text-sm font-semibold transition",
                activeLanguage === language
                  ? "border-sage-300 bg-sage-50 text-sage-700"
                  : "border-line bg-white/70 text-muted hover:text-ink"
              )}
            >
              {language}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Card>
          <h2 className="text-lg font-semibold">{activeLanguage} content queue</h2>
          <div className="mt-5 space-y-4">
            {rows.length > 0 ? rows.map((item) => (
              <article key={item.id} className="rounded-2xl border border-line bg-white/72 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-muted">{item.section}</p>
                    <h3 className="mt-1 font-semibold">{item.source}</h3>
                  </div>
                  <StatusPill status={item.status} />
                </div>
                {item.status === "Missing" ? (
                  <p className="mt-4 flex items-start gap-2 rounded-xl border border-clay-200 bg-clay-50 px-3 py-2 text-sm font-semibold text-clay-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Translation is missing for this content block.
                  </p>
                ) : (
                  <p className="mt-4 rounded-xl bg-surface-strong px-3 py-3 text-sm leading-6">{item.translated}</p>
                )}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted">{item.owner} · Updated {item.updatedAt}</p>
                  {item.status === "Review" && (
                    <Button
                      variant="secondary"
                      className="px-3 py-1 text-xs"
                      onClick={() => { dispatch({ type: "UPDATE_TRANSLATION_STATUS", id: item.id, status: "Complete" }); toast("Translation approved"); }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Approve
                    </Button>
                  )}
                </div>
              </article>
            )) : (
              <div className="rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center">
                <p className="font-semibold">No queued strings for {activeLanguage}</p>
                <p className="mt-2 text-sm text-muted">This language is ready for the next content import.</p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Translation health</h2>
          <div className="mt-5 space-y-4">
            {allTranslations.map((translation) => (
              <article key={translation.locale} className="rounded-xl border border-line bg-white/72 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">{translation.language}</h3>
                    <p className="text-xs text-muted">{translation.market} · {translation.reviewer}</p>
                  </div>
                  <StatusPill status={translation.pending === 0 ? "Complete" : translation.pending > 20 ? "Missing" : "Review"} />
                </div>
                <Progress value={translation.completeness} className="mt-4" />
              </article>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
