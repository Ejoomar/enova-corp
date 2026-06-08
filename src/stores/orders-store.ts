import { create } from "zustand"
import { persist } from "zustand/middleware"
import { orders as mockOrders, type Order } from "@/data/mock-orders"

interface OrdersState {
  // Persisted list (source of truth)
  allOrders: Order[]

  // Actions
  updateOrderStatus: (id: string, status: Order["status"]) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      allOrders: mockOrders,

      updateOrderStatus: (id, status) => {
        set((state) => ({
          allOrders: state.allOrders.map((o) =>
            o.id === id
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o
          ),
        }))
      },
    }),
    {
      name: "enova-orders",
      version: 1,
      partialize: (state) => ({ allOrders: state.allOrders }),
      migrate: () => ({ allOrders: mockOrders }),
    }
  )
)
