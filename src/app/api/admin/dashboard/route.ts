import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 1000) / 10
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
      // Period comparisons
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

      // This month vs last month — revenue
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfThisMonth } },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } },
        _sum: { total: true },
      }),

      // This month vs last month — orders
      prisma.order.count({ where: { createdAt: { gte: startOfThisMonth } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),

      // This month vs last month — new customers
      prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfThisMonth } } }),
      prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),
    ])

    const statusCounts = ordersByStatus.reduce(
      (acc, item) => { acc[item.status.toLowerCase()] = item._count; return acc },
      {} as Record<string, number>
    )

    const transformedRecentOrders = recentOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.user.name,
      email: order.user.email,
      total: Number(order.total),
      status: order.status.toLowerCase(),
      createdAt: order.createdAt.toISOString(),
    }))

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
        products:  null, // total count — no meaningful MoM comparison
      },
      ordersByStatus: {
        pending:    statusCounts.pending    ?? 0,
        processing: statusCounts.processing ?? 0,
        shipped:    statusCounts.shipped    ?? 0,
        delivered:  statusCounts.delivered  ?? 0,
        cancelled:  statusCounts.cancelled  ?? 0,
      },
      recentOrders: transformedRecentOrders,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Error fetching dashboard stats" },
      { status: 500 }
    )
  }
}
