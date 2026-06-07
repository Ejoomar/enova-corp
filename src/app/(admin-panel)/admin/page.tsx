"use client"

import { useEffect } from "react"
import Link from "next/link"
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsCard } from "@/components/admin/StatsCard"
import { useAdminStore } from "@/stores/admin-store"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-3 w-32" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const statusLabels: Record<string, string> = {
  delivered: "Entregado",
  shipped: "Enviado",
  processing: "Procesando",
  cancelled: "Cancelado",
  pending: "Pendiente",
}

export default function AdminDashboard() {
  const { stats, statChanges, recentOrders, ordersByStatus, loading, error, fetchDashboard } = useAdminStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (loading && !stats) {
    return <DashboardSkeleton />
  }

  if (!loading && !stats && error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <div>
          <p className="text-lg font-semibold">Error al cargar el dashboard</p>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            No se pudo conectar con la base de datos. Verifica que el servidor esté activo e inténtalo de nuevo.
          </p>
        </div>
        <button
          onClick={() => fetchDashboard()}
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de ENOVA CORP
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ingresos Totales"
          value={`$${(stats?.totalRevenue || 0).toLocaleString("en-US")}`}
          change={statChanges?.revenue ?? null}
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value={(stats?.totalOrders || 0).toLocaleString()}
          change={statChanges?.orders ?? null}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Clientes"
          value={(stats?.totalCustomers || 0).toLocaleString()}
          change={statChanges?.customers ?? null}
          icon={Users}
        />
        <StatsCard
          title="Productos"
          value={(stats?.totalProducts || 0).toString()}
          change={statChanges?.products ?? null}
          icon={Package}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos Recientes</CardTitle>
              <CardDescription>Los ultimos pedidos de tu tienda</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                Ver todos
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay pedidos recientes
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {order.customer.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                            ? "secondary"
                            : order.status === "cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {statusLabels[order.status] || order.status}
                      </Badge>
                      <span className="text-sm font-medium">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Status Summary */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Resumen de Pedidos</CardTitle>
            <CardDescription>Estado de los pedidos en tu tienda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pendientes</span>
                <Badge variant="outline">{ordersByStatus?.pending ?? 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Procesando</span>
                <Badge variant="secondary">{ordersByStatus?.processing ?? 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enviados</span>
                <Badge variant="secondary">{ordersByStatus?.shipped ?? 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Entregados</span>
                <Badge variant="default">{ordersByStatus?.delivered ?? 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cancelados</span>
                <Badge variant="destructive">{ordersByStatus?.cancelled ?? 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
