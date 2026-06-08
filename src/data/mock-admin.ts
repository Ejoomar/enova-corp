export interface Order {
  id: string
  userId: string
  userName: string
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "4",
    userName: "Ana Martínez",
    items: 2,
    total: 1299.99,
    status: "delivered",
    createdAt: "2025-06-07",
  },
  {
    id: "ORD-002",
    userId: "2",
    userName: "María García",
    items: 1,
    total: 459.99,
    status: "shipped",
    createdAt: "2025-06-07",
  },
  {
    id: "ORD-003",
    userId: "6",
    userName: "Carmen López",
    items: 3,
    total: 189.99,
    status: "processing",
    createdAt: "2025-06-06",
  },
  {
    id: "ORD-004",
    userId: "3",
    userName: "Luis Rodríguez",
    items: 1,
    total: 799.99,
    status: "pending",
    createdAt: "2025-06-06",
  },
  {
    id: "ORD-005",
    userId: "8",
    userName: "Sofía Torres",
    items: 2,
    total: 299.99,
    status: "delivered",
    createdAt: "2025-06-05",
  },
]

export const dashboardStats = {
  totalRevenue:   18540.50,
  revenueChange:  14.3,
  totalOrders:    312,
  ordersChange:   9.8,
  totalCustomers: 187,
  customersChange: 6.2,
  totalProducts:  119,
  productsChange: 4.5,
}
