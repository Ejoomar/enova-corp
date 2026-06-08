import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const mockUsers = [
  { id: "1", name: "Carlos Mendoza", email: "carlos.mendoza@gmail.com", avatar: null, role: "admin", status: "active", createdAt: "2025-01-15T10:00:00.000Z", orders: 0, totalSpent: 0 },
  { id: "2", name: "María García", email: "maria.garcia@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-02-20T14:30:00.000Z", orders: 5, totalSpent: 1249.95 },
  { id: "3", name: "Luis Rodríguez", email: "luis.rodriguez@hotmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-03-10T09:15:00.000Z", orders: 2, totalSpent: 459.98 },
  { id: "4", name: "Ana Martínez", email: "ana.martinez@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-04-05T16:45:00.000Z", orders: 8, totalSpent: 2199.92 },
  { id: "5", name: "José Hernández", email: "jose.hernandez@yahoo.com", avatar: null, role: "customer", status: "inactive", createdAt: "2025-04-18T11:20:00.000Z", orders: 1, totalSpent: 189.99 },
  { id: "6", name: "Carmen López", email: "carmen.lopez@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-05-02T08:00:00.000Z", orders: 3, totalSpent: 749.97 },
  { id: "7", name: "Pedro Díaz", email: "pedro.diaz@gmail.com", avatar: null, role: "customer", status: "suspended", createdAt: "2025-05-14T13:30:00.000Z", orders: 0, totalSpent: 0 },
  { id: "8", name: "Sofía Torres", email: "sofia.torres@gmail.com", avatar: null, role: "customer", status: "active", createdAt: "2025-05-28T10:45:00.000Z", orders: 4, totalSpent: 899.96 },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const status = searchParams.get("status")

  try {
    const where: Record<string, unknown> = {}
    if (role) where.role = role.toUpperCase()
    if (status) where.status = status.toUpperCase()

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        _count: { select: { orders: true } },
        orders: { select: { total: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    const transformedUsers = users.map((user: typeof users[number]) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role.toLowerCase(),
      status: user.status.toLowerCase(),
      createdAt: user.createdAt.toISOString(),
      orders: user._count.orders,
      totalSpent: user.orders.reduce((sum: number, order: { total: unknown }) => sum + Number(order.total), 0),
    }))

    return NextResponse.json(transformedUsers)
  } catch {
    let filtered = mockUsers
    if (role) filtered = filtered.filter((u) => u.role === role.toLowerCase())
    if (status) filtered = filtered.filter((u) => u.status === status.toLowerCase())
    return NextResponse.json(filtered)
  }
}
