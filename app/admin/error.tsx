"use client";

import { Button } from "@/components/ui/button";

export default function AdminError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div className="max-w-md rounded-2xl border border-line bg-white/72 p-8 shadow-inset">
        <h1 className="text-2xl font-semibold tracking-tight">Admin workflow could not load</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          The interface hit an error while preparing this management view. Try again from the current admin context.
        </p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </div>
    </div>
  );
}
