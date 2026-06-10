export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8" aria-busy="true" aria-label="Cargando producto">
      <div className="mb-6 h-4 w-72 animate-pulse rounded bg-[var(--surface-1)]" />
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galería */}
        <div className="space-y-4">
          <div className="aspect-square animate-pulse rounded-lg bg-[var(--surface-1)]" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-md bg-[var(--surface-1)]" />
            ))}
          </div>
        </div>
        {/* Detalle */}
        <div className="space-y-5">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-1)]" />
          <div className="h-9 w-4/5 animate-pulse rounded bg-[var(--surface-1)]" />
          <div className="h-7 w-40 animate-pulse rounded bg-[var(--surface-1)]" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-1)]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--surface-1)]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--surface-1)]" />
          </div>
          <div className="flex gap-3 pt-6">
            <div className="h-12 w-40 animate-pulse rounded-md bg-[var(--surface-1)]" />
            <div className="h-12 w-40 animate-pulse rounded-md bg-[var(--surface-1)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
