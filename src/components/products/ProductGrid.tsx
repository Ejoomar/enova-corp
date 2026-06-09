"use client"

import { useState, useEffect } from "react"
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "./ProductCard"
import { Product } from "@/types"
import { useDolarRate } from "@/hooks/useDolarRate"

const PAGE_SIZE = 24

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
  const [page, setPage] = useState(1)

  // Reset to page 1 when filter results change
  useEffect(() => { setPage(1) }, [products])

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, products.length)

  return (
    <div>
      {onViewModeChange && (
        <div className="mb-8 flex items-center justify-between border-b border-[var(--hairline)] pb-4">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {products.length > PAGE_SIZE
              ? `${start}–${end} de ${products.length} productos`
              : `${products.length} productos`}
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
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col divide-y divide-[var(--hairline)]"
            }
          >
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} bsfRate={bcv} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4 border-t border-[var(--hairline)] pt-8">
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center border border-[var(--hairline)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--brass)] hover:text-[var(--brass)] disabled:pointer-events-none disabled:opacity-30"
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isActive = p === page
                  const isNearby = Math.abs(p - page) <= 1 || p === 1 || p === totalPages
                  if (!isNearby) {
                    if (p === page - 2 || p === page + 2) {
                      return <span key={p} className="font-mono-ui text-[11px] text-[var(--muted-foreground)] px-1">…</span>
                    }
                    return null
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                      className={`flex h-8 w-8 items-center justify-center font-mono-ui text-[11px] tracking-[0.08em] transition-colors ${
                        isActive
                          ? "border border-[var(--brass)] bg-[var(--brass)] text-white"
                          : "border border-[var(--hairline)] text-[var(--muted-foreground)] hover:border-[var(--brass)] hover:text-[var(--brass)]"
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center border border-[var(--hairline)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--brass)] hover:text-[var(--brass)] disabled:pointer-events-none disabled:opacity-30"
                aria-label="Página siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
