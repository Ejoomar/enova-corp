import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "@/types"

export interface QuoteItem {
  product: Product
  quantity: number
  notes: string
}

interface QuoteState {
  items: QuoteItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNotes: (productId: string, notes: string) => void
  clearQuote: () => void
  getItemCount: () => number
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity, notes: "" }] }
        })
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })),

      updateNotes: (productId, notes) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, notes } : i
          ),
        })),

      clearQuote: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "enova-quote",
      version: 1,
      // v0 (sin version) → v1: mismo shape; se conservan las cotizaciones guardadas.
      migrate: (persisted) => {
        const state = persisted as { items?: QuoteItem[] } | undefined
        return { items: state?.items ?? [] }
      },
    }
  )
)
