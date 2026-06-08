import { create } from "zustand"

interface DashboardStats {
  totalProducts: number
  totalCustomers: number
  totalOrders: number
  totalRevenue: number
}

interface StatChanges {
  revenue:   number | null
  orders:    number | null
  customers: number | null
  products:  number | null
}

interface OrdersByStatus {
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customer: string
  email: string
  total: number
  status: string
  createdAt: string
}

interface AdminOrder {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
  }
  status: string
  subtotal: number
  shipping: number
  total: number
  paymentMethod: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  items: {
    name: string
    quantity: number
    price: number
    total: number
    image: string
  }[]
  itemCount: number
  createdAt: string
  updatedAt: string
}

interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  status: string
  createdAt: string
  orders: number
  totalSpent: number
}

interface AdminState {
  // Dashboard
  stats: DashboardStats | null
  statChanges: StatChanges | null
  ordersByStatus: OrdersByStatus | null
  recentOrders: RecentOrder[]

  // Orders
  orders: AdminOrder[]
  ordersTotal: number

  // Users
  users: AdminUser[]

  // Granular loading flags — each section spins independently
  dashboardLoading: boolean
  ordersLoading: boolean
  usersLoading: boolean

  error: string | null

  // Actions
  fetchDashboard: () => Promise<void>
  fetchOrders: (params?: { status?: string; limit?: number; offset?: number }) => Promise<void>
  fetchUsers: (params?: { role?: string; status?: string }) => Promise<void>
  updateOrderStatus: (id: string, status: string) => Promise<void>
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: null,
  statChanges: null,
  ordersByStatus: null,
  recentOrders: [],
  orders: [],
  ordersTotal: 0,
  users: [],
  dashboardLoading: false,
  ordersLoading: false,
  usersLoading: false,
  error: null,

  fetchDashboard: async () => {
    set({ dashboardLoading: true, error: null })
    try {
      const response = await fetch("/api/admin/dashboard")
      if (!response.ok) throw new Error("Error fetching dashboard")
      const data = await response.json()
      set({
        stats: data.stats,
        statChanges: data.statChanges ?? null,
        ordersByStatus: data.ordersByStatus,
        recentOrders: data.recentOrders,
        dashboardLoading: false,
      })
    } catch (error) {
      set({ error: (error as Error).message, dashboardLoading: false })
    }
  },

  fetchOrders: async (params = {}) => {
    set({ ordersLoading: true, error: null })
    try {
      const searchParams = new URLSearchParams()
      if (params.status) searchParams.set("status", params.status)
      if (params.limit) searchParams.set("limit", params.limit.toString())
      if (params.offset) searchParams.set("offset", params.offset.toString())

      const response = await fetch(`/api/admin/orders?${searchParams}`)
      if (!response.ok) throw new Error("Error fetching orders")
      const data = await response.json()
      set({
        orders: data.orders,
        ordersTotal: data.total,
        ordersLoading: false,
      })
    } catch (error) {
      set({ error: (error as Error).message, ordersLoading: false })
    }
  },

  fetchUsers: async (params = {}) => {
    set({ usersLoading: true, error: null })
    try {
      const searchParams = new URLSearchParams()
      if (params.role) searchParams.set("role", params.role)
      if (params.status) searchParams.set("status", params.status)

      const response = await fetch(`/api/users?${searchParams}`)
      if (!response.ok) throw new Error("Error fetching users")
      const users = await response.json()
      set({ users, usersLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, usersLoading: false })
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ ordersLoading: true, error: null })
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Error updating order")
      await get().fetchOrders()
    } catch (error) {
      set({ error: (error as Error).message, ordersLoading: false })
      throw error
    }
  },
}))
