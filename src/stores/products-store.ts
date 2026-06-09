import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, Category, Brand, FilterState } from "@/types"
import {
  products as mockProducts,
  categories as mockCategories,
  brands as mockBrands,
} from "@/data/mock-products"

interface ProductsState {
  // ── Persisted catalog (source of truth, admin-editable) ──────────────────
  allProducts: Product[]

  // ── Filtered shop view ────────────────────────────────────────────────────
  products: Product[]
  categories: Category[]
  brands: Brand[]
  featuredProducts: Product[]
  filters: FilterState
  loading: boolean
  error: string | null

  // ── Admin catalog actions ─────────────────────────────────────────────────
  updateProduct: (id: string, data: Partial<Product>) => void
  addProduct: (product: Product) => void
  deleteProduct: (id: string) => void

  // ── Shop view actions ─────────────────────────────────────────────────────
  fetchProducts: (filters?: Partial<FilterState>) => Promise<void>
  fetchFeaturedProducts: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchBrands: () => Promise<void>
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
}

const MAX_PRICE = 1_500

const defaultFilters: FilterState = {
  search: "",
  categories: [],
  brands: [],
  priceRange: [0, MAX_PRICE],
  sortBy: "newest",
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      // ── Persisted catalog ────────────────────────────────────────────────
      allProducts: mockProducts,

      // ── Shop view state ──────────────────────────────────────────────────
      products: [],
      categories: [],
      brands: [],
      featuredProducts: [],
      filters: defaultFilters,
      loading: false,
      error: null,

      // ── Admin catalog actions ────────────────────────────────────────────
      updateProduct: (id, data) => {
        set((state) => ({
          allProducts: state.allProducts.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        }))
      },

      addProduct: (product) => {
        set((state) => ({ allProducts: [...state.allProducts, product] }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          allProducts: state.allProducts.filter((p) => p.id !== id),
        }))
      },

      // ── Shop view actions ────────────────────────────────────────────────
      fetchProducts: async (filterOverrides) => {
        set({ loading: true, error: null })
        try {
          const filters = { ...get().filters, ...filterOverrides }
          const source = get().allProducts

          let filtered = [...source]

          if (filters.search.trim().length >= 2) {
            const q = filters.search.trim().toLowerCase()
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                (p.description ?? "").toLowerCase().includes(q)
            )
          }

          if (filters.categories.length > 0) {
            filtered = filtered.filter((p) => filters.categories.includes(p.category))
          }
          if (filters.brands.length > 0) {
            filtered = filtered.filter((p) => filters.brands.includes(p.brand))
          }
          filtered = filtered.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
          )

          if (filters.sortBy === "price-asc") {
            filtered.sort((a, b) => a.price - b.price)
          } else if (filters.sortBy === "price-desc") {
            filtered.sort((a, b) => b.price - a.price)
          } else if (filters.sortBy === "rating") {
            filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          }

          set({ products: filtered, loading: false })
        } catch (error) {
          set({ error: (error as Error).message, loading: false })
        }
      },

      fetchFeaturedProducts: async () => {
        try {
          const featured = get().allProducts.filter((p) => p.isFeatured).slice(0, 8)
          set({ featuredProducts: featured })
        } catch (error) {
          set({ error: (error as Error).message })
        }
      },

      fetchCategories: async () => {
        try {
          set({ categories: mockCategories })
        } catch (error) {
          set({ error: (error as Error).message })
        }
      },

      fetchBrands: async () => {
        try {
          set({ brands: mockBrands })
        } catch (error) {
          set({ error: (error as Error).message })
        }
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }))
      },

      resetFilters: () => {
        set({ filters: defaultFilters })
      },
    }),
    {
      name: "enova-products",
      // Bump this version whenever mock-products.ts changes image URLs or
      // product data so browsers discard the cached catalog and reload fresh.
      version: 4,
      partialize: (state) => ({ allProducts: state.allProducts }),
      migrate: () => ({ allProducts: mockProducts }),
    }
  )
)
