"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight, Plus, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsCard } from "@/components/admin/StatsCard"
import { useOrdersStore } from "@/stores/orders-store"
import { useProductsStore } from "@/stores/products-store"
import { usePaymentsStore } from "@/stores/payments-store"
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from "@/lib/order-status"

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "Buen día"
  if (h < 19) return "Buenas tardes"
  return "Buenas noches"
}

export default function AdminDashboard() {
  // Evita desajuste de hidratación: los stores se rehidratan desde localStorage en cliente.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const allOrders = useOrdersStore((s) => s.allOrders)
  const totalProducts = useProductsStore((s) => s.allProducts.length)
  const pendingPayments = usePaymentsStore((s) =>
    s.allPayments.filter((p) => p.status === "pending").length
  )

  const stats = useMemo(() => {
    const active = allOrders.filter((o) => o.status !== "cancelled")
    const revenue = active.reduce((sum, o) => sum + o.total, 0)
    const customers = new Set(allOrders.map((o) => o.shippingAddress.name)).size
    return { revenue, orders: allOrders.length, customers }
  }, [allOrders])

  const ordersByStatus = useMemo(() => {
    const counts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 }
    for (const o of allOrders) counts[o.status] += 1
    return counts
  }, [allOrders])

  const recentOrders = useMemo(
    () =>
      [...allOrders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [allOrders]
  )

  if (!mounted) {
    return <DashboardSkeleton />
  }

  const today = new Date().toLocaleDateString("es-VE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
  const pendingOrders = ordersByStatus.pending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{greeting()}</h1>
          <p className="text-muted-foreground capitalize">
            {today}
            {pendingOrders > 0 && (
              <span className="lowercase">
                {" "}— tienes <strong className="text-foreground">{pendingOrders}</strong> pedido
                {pendingOrders !== 1 ? "s" : ""} pendiente{pendingOrders !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/admin/products/new">
              <Plus className="mr-1.5 h-4 w-4" />
              Nuevo producto
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/payments">
              <CreditCard className="mr-1.5 h-4 w-4" />
              Comprobantes
              {pendingPayments > 0 && (
                <Badge variant="destructive" className="ml-1.5 h-5 px-1.5">
                  {pendingPayments}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard
          title="Ingresos Totales"
          value={stats.revenue}
          format={(n) => `$${Math.round(n).toLocaleString("en-US")}`}
          icon={DollarSign}
        />
        <StatsCard title="Pedidos" value={stats.orders} icon={ShoppingCart} />
        <StatsCard title="Clientes" value={stats.customers} icon={Users} />
        <StatsCard title="Productos" value={totalProducts} icon={Package} />
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos Recientes</CardTitle>
              <CardDescription>Los últimos pedidos de tu tienda</CardDescription>
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
                Aún no hay pedidos. Cuando un cliente complete su compra aparecerá aquí.
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 -mx-2 px-2 rounded-md transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{initialsOf(order.shippingAddress.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.shippingAddress.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={ORDER_STATUS_VARIANTS[order.status] ?? "outline"}>
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </Badge>
                      <span className="text-sm font-medium tabular-nums">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </Link>
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
                <Badge variant="outline">{ordersByStatus.pending}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Procesando</span>
                <Badge variant="secondary">{ordersByStatus.processing}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enviados</span>
                <Badge variant="secondary">{ordersByStatus.shipped}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Entregados</span>
                <Badge variant="default">{ordersByStatus.delivered}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cancelados</span>
                <Badge variant="destructive">{ordersByStatus.cancelled}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
