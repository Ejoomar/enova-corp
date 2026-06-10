export interface AdminUser {
  id: string
  name: string
  email: string
  phone?: string
  avatar: string | null
  role: "admin" | "customer"
  status: "active" | "inactive" | "suspended"
  createdAt: string
  orders: number
  totalSpent: number
}

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Carlos Mendoza", email: "carlos.mendoza@gmail.com", avatar: null, role: "admin", status: "active", createdAt: "2025-01-15T10:00:00.000Z", orders: 0, totalSpent: 0 },
  { id: "2", name: "María García", email: "maria.garcia@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-02-20T14:30:00.000Z", orders: 5, totalSpent: 1249.95 },
  { id: "3", name: "Luis Rodríguez", email: "luis.rodriguez@hotmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-03-10T09:15:00.000Z", orders: 2, totalSpent: 459.98 },
  { id: "4", name: "Ana Martínez", email: "ana.martinez@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-04-05T16:45:00.000Z", orders: 8, totalSpent: 2199.92 },
  { id: "5", name: "José Hernández", email: "jose.hernandez@yahoo.com", avatar: null, role: "customer", status: "inactive", createdAt: "2025-04-18T11:20:00.000Z", orders: 1, totalSpent: 189.99 },
  { id: "6", name: "Carmen López", email: "carmen.lopez@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-05-02T08:00:00.000Z", orders: 3, totalSpent: 749.97 },
  { id: "7", name: "Pedro Díaz", email: "pedro.diaz@gmail.com", avatar: null, role: "customer", status: "suspended", createdAt: "2025-05-14T13:30:00.000Z", orders: 0, totalSpent: 0 },
  { id: "8", name: "Sofía Torres", email: "sofia.torres@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-05-28T10:45:00.000Z", orders: 4, totalSpent: 899.96 },
]
