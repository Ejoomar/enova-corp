"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "./ProductCard"
import { Product } from "@/types"
import { useDolarRate } from "@/hooks/useDolarRate"

interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
  loading?: boolean
  onClearFilters?: () => void
}

export function ProductGrid({
  products,
  viewMode = "grid",
  onViewModeChange,
  loading = false,
  onClearFilters,
}: ProductGridProps) {
  const { bcv } = useDolarRate()

  return (
    <div>
      {onViewModeChange && (
        <div className="mb-8 flex items-center justify-between border-b border-[var(--hairline)] pb-4">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {products.length} productos
          </span>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "ghost-hairline" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="sr-only">Vista cuadrícula</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "ghost-hairline" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-3.5 w-3.5" />
              <span className="sr-only">Vista lista</span>
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-none" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-display text-2xl font-light text-[var(--muted-foreground)]">
            Sin resultados
          </p>
          <p className="font-mono-ui mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            Ajusta los filtros de búsqueda
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="mt-6 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)] border border-[var(--brass)]/40 px-4 py-2"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col divide-y divide-[var(--hairline)]"
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} bsfRate={bcv} />
          ))}
        </div>
      )}
    </div>
  )
}
