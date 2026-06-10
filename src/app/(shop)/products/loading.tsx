export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8" aria-busy="true" aria-label="Cargando catálogo">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-64 animate-pulse rounded-md bg-[var(--surface-1)]" />
        <div className="h-4 w-40 animate-pulse rounded-md bg-[var(--surface-1)]" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square animate-pulse rounded-sm bg-[var(--surface-1)]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--surface-1)]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--surface-1)]" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-[var(--surface-1)]" />
          </div>
        ))}
      </div>
    </div>
  )
}
