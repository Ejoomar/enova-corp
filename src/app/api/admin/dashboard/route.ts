import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { dashboardStats, orders as mockOrders } from "@/data/mock-admin"

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 1000) / 10
}

/** Fallback used when Prisma is unavailable (UI-only / no DB mode). */
function mockDashboardResponse() {
  const statusCounts = mockOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    stats: {
      totalRevenue:   dashboardStats.totalRevenue,
      totalOrders:    dashboardStats.totalOrders,
      totalCustomers: dashboardStats.totalCustomers,
      totalProducts:  dashboardStats.totalProducts,
    },
    statChanges: {
      revenue:   dashboardStats.revenueChange,
      orders:    dashboardStats.ordersChange,
      customers: dashboardStats.customersChange,
      products:  dashboardStats.productsChange,
    },
    ordersByStatus: {
      pending:    statusCounts.pending    ?? 0,
      processing: statusCounts.processing ?? 0,
      shipped:    statusCounts.shipped    ?? 0,
      delivered:  statusCounts.delivered  ?? 0,
      cancelled:  statusCounts.cancelled  ?? 0,
    },
    recentOrders: mockOrders.slice(0, 5).map((o) => ({
      id:          o.id,
      orderNumber: o.id,
      customer:    o.userName,
      email:       "",
      total:       o.total,
      status:      o.status,
      createdAt:   new Date(o.createdAt).toISOString(),
    })),
  }
}

export async function GET() {
  try {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const [
      totalProducts,
      totalCustomers,
      totalOrders,
      revenueData,
      recentOrders,
      ordersByStatus,
      thisMonthRevenue,
      lastMonthRevenue,
      thisMonthOrders,
      lastMonthOrders,
      thisMonthCustomers,
      lastMonthCustomers,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.order.groupBy({ by: ["status"], _count: true }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfThisMonth } },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { createdAt: { gte: startOfThisMonth } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),
      prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfThisMonth } } }),
      prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),
    ])

    const statusCounts = ordersByStatus.reduce(
      (acc: Record<string, number>, item: { status: string; _count: number }) => {
        acc[item.status.toLowerCase()] = item._count
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      stats: {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue: Number(revenueData._sum.total ?? 0),
      },
      statChanges: {
        revenue:   pctChange(Number(thisMonthRevenue._sum.total ?? 0), Number(lastMonthRevenue._sum.total ?? 0)),
        orders:    pctChange(thisMonthOrders,    lastMonthOrders),
        customers: pctChange(thisMonthCustomers, lastMonthCustomers),
        products:  null,
      },
      ordersByStatus: {
        pending:    statusCounts.pending    ?? 0,
        processing: statusCounts.processing ?? 0,
        shipped:    statusCounts.shipped    ?? 0,
        delivered:  statusCounts.delivered  ?? 0,
        cancelled:  statusCounts.cancelled  ?? 0,
      },
      recentOrders: recentOrders.map((order: { id: string; orderNumber: string; user: { name: string; email: string }; total: number | string; status: string; createdAt: Date }) => ({
        id:          order.id,
        orderNumber: order.orderNumber,
        customer:    order.user.name,
        email:       order.user.email,
        total:       Number(order.total),
        status:      order.status.toLowerCase(),
        createdAt:   order.createdAt.toISOString(),
      })),
    })
  } catch {
    // Prisma not available (UI-only mode) — serve mock data so the dashboard
    // renders correctly without a database connection.
    console.warn("[dashboard] Prisma unavailable — falling back to mock data")
    return NextResponse.json(mockDashboardResponse())
  }
}
