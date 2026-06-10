import { create } from "zustand"
import { persist } from "zustand/middleware"
import { orders as mockOrders, type Order } from "@/data/mock-orders"

interface OrdersState {
  // Persisted list (source of truth)
  allOrders: Order[]

  // Actions
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: Order["status"]) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      allOrders: mockOrders,

      addOrder: (order) => {
        set((state) => ({ allOrders: [order, ...state.allOrders] }))
      },

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
      version: 2,
      partialize: (state) => ({ allOrders: state.allOrders }),
      // v1 → v2: Order ganó campos opcionales (totalBs, tasaBcv, source) —
      // los pedidos v1 persistidos siguen siendo válidos, se conservan tal cual.
      migrate: (persisted) => {
        const state = persisted as { allOrders?: Order[] } | undefined
        return { allOrders: state?.allOrders ?? mockOrders }
      },
    }
  )
)
