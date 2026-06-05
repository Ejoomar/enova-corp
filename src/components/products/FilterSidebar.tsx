"use client"

import { X } from "lucide-react"
import { BrandFilter } from "./BrandFilter"
import { PriceFilter } from "./PriceFilter"
import { CategoryFilter } from "./CategoryFilter"
import { FilterState } from "@/types"

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 3000000

  const handleClearFilters = () => {
    onFiltersChange({
      brands: [],
      categories: [],
      priceRange: [0, 10000000],
      sortBy: filters.sortBy,
    })
  }

  return (
    <div className="border-r border-[var(--hairline)] pr-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <p className="eyebrow">Filtros</p>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]"
          >
            Limpiar
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <p className="eyebrow mb-4">Categoría</p>
          <CategoryFilter
            selectedCategories={filters.categories}
            onCategoriesChange={(categories) =>
              onFiltersChange({ ...filters, categories })
            }
          />
        </div>

        <div className="border-t border-[var(--hairline)] pt-8">
          <p className="eyebrow mb-4">Precio</p>
          <PriceFilter
            priceRange={filters.priceRange}
            maxPrice={3000000}
            onPriceChange={(priceRange) =>
              onFiltersChange({ ...filters, priceRange })
            }
          />
        </div>

        <div className="border-t border-[var(--hairline)] pt-8">
          <p className="eyebrow mb-4">Marca</p>
          <BrandFilter
            selectedBrands={filters.brands}
            onBrandsChange={(brands) =>
              onFiltersChange({ ...filters, brands })
            }
          />
        </div>
      </div>
    </div>
  )
}
