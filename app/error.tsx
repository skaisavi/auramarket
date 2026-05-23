"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight">Something needs attention</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          The page could not finish loading. Try again, or review the workflow from the dashboard.
        </p>
        <Button className="mt-6" onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
