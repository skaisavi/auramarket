import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "sage",
  className
}: {
  children: React.ReactNode;
  tone?: "sage" | "clay" | "gold" | "neutral";
  className?: string;
}) {
  const tones = {
    sage: "border-sage-300/60 bg-sage-50 text-sage-700",
    clay: "border-clay-200 bg-clay-50 text-clay-700",
    gold: "border-yellow-200 bg-yellow-50 text-yellow-800",
    neutral: "border-line bg-white/70 text-muted"
  };

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
