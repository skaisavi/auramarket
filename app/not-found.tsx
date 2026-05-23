import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6 py-12">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-white/78 shadow-soft md:grid md:grid-cols-[0.9fr_1.1fr]">
        <div
          className="min-h-72 border-b border-line md:border-b-0 md:border-r"
          style={{ background: "linear-gradient(135deg, #dfead8 0%, #fbfaf7 52%, #cab794 100%)" }}
          aria-hidden="true"
        />
        <div className="flex flex-col justify-center p-8 text-left sm:p-10">
          <p className="text-sm font-semibold uppercase text-sage-700">404 - missing page</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">This ritual has moved</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            The page you opened is not available. Return to the storefront or review the admin dashboard if you were checking a managed route.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Return home</Button>
            <Button href="/admin" variant="secondary">Open admin</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
