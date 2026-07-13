export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 rounded-full border-2 border-border border-t-brand animate-spin" />
        <p className="text-sm text-text-muted">Loading…</p>
      </div>
    </main>
  );
}
