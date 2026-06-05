import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "@/types"

interface FavoritesState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isFavorite: (productId: string) => boolean
  getItemCount: () => number
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id)
          if (exists) return state
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        })),

      toggleItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id)
        if (exists) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isFavorite: (productId) => get().items.some((p) => p.id === productId),

      getItemCount: () => get().items.length,
    }),
    { name: "enova-favorites" }
  )
)
