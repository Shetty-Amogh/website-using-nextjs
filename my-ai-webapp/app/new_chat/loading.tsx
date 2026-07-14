export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-40 rounded bg-zinc-800" />
        <div className="h-12 w-full rounded bg-zinc-900" />
        <div className="h-12 w-3/4 rounded bg-zinc-900" />
      </div>
    </main>
  );
}
