export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
      <div>
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-sage-300" />
        <p className="mt-4 text-sm font-semibold text-muted">Preparing AuraMarket...</p>
      </div>
    </div>
  );
}
