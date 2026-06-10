"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FilterSidebar } from "@/components/products/FilterSidebar"
import { FilterMobile } from "@/components/products/FilterMobile"
import { ProductGrid } from "@/components/products/ProductGrid"
import { SortSelect } from "@/components/products/SortSelect"
import { useProductsStore } from "@/stores/products-store"
import { FilterState } from "@/types"

function ProductsContent() {
  const searchParams = useSearchParams()
  const {
    products, loading, filters,
    setFilters, fetchProducts, fetchCategories, fetchBrands,
  } = useProductsStore()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Init categories and brands once on mount
  useEffect(() => {
    fetchCategories()
    fetchBrands()
  }, [fetchCategories, fetchBrands])

  // Every time the URL params change → update filters and fetch
  useEffect(() => {
    const category = searchParams.get("category")
    const q        = searchParams.get("q")

    const next: Partial<FilterState> = {
      search:     q        ?? "",
      categories: category ? [category] : [],
    }

    setFilters(next)
    fetchProducts(next)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    fetchProducts(newFilters)
  }, [setFilters, fetchProducts])

  const activeFilterCount =
    filters.brands.length +
    filters.categories.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 3_000_000 ? 1 : 0) +
    (filters.search.trim().length >= 2 ? 1 : 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Productos</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {filters.search.trim() ? `"${filters.search.trim()}"` : "Todos los Productos"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Cargando..."
              : `${products.length} producto${products.length !== 1 ? "s" : ""} encontrado${products.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FilterMobile
            filters={filters}
            onFiltersChange={handleFiltersChange}
            activeFilterCount={activeFilterCount}
          />
          <SortSelect
            value={filters.sortBy}
            onChange={(sortBy) => handleFiltersChange({ ...filters, sortBy: sortBy as FilterState["sortBy"] })}
          />
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </aside>
        <div className="flex-1">
          <ProductGrid
            products={products}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            loading={loading}
            onClearFilters={() => handleFiltersChange({ search: "", brands: [], categories: [], priceRange: [0, 1500], sortBy: filters.sortBy })}
          />
        </div>
      </div>
    </div>
  )
}

export function ProductsPageClient() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
