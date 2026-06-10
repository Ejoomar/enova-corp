import { NextRequest, NextResponse } from "next/server"
import { dashboardStats, orders as mockOrders } from "@/data/mock-admin"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const statusCounts = mockOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  return NextResponse.json({
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
  })
}
