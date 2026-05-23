export default function AdminLoading() {
  return (
    <div className="space-y-6 px-5 py-6 sm:px-8">
      <div className="h-24 animate-pulse rounded-2xl border border-line bg-white/60" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-36 animate-pulse rounded-2xl border border-line bg-white/60" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-2xl border border-line bg-white/60" />
    </div>
  );
}
