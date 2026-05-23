import { Translation } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function TranslationStatus({ translations }: { translations: Translation[] }) {
  return (
    <Card className="h-full">
      <h2 className="text-lg font-semibold">Translation status</h2>
      <p className="mt-1 text-sm text-muted">Localized content readiness for active markets.</p>
      <div className="mt-5 space-y-4">
        {translations.map((translation) => (
          <article key={translation.locale} className="rounded-xl border border-line bg-white/72 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{translation.market}</h3>
                <p className="text-xs text-muted">{translation.locale} · {translation.reviewer}</p>
              </div>
              <span className="text-sm font-semibold">{translation.completeness}%</span>
            </div>
            <Progress value={translation.completeness} className="mt-4" />
            <p className="mt-3 text-xs text-muted">{translation.pending} strings pending review</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
