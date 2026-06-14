"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Hash, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Order } from "@/data/mock-orders"
import { useOrdersStore } from "@/stores/orders-store"
import { ORDER_STATUS_LABELS as STATUS_LABELS, ORDER_STATUS_VARIANTS as STATUS_VARIANTS } from "@/lib/order-status"

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { allOrders, updateOrderStatus } = useOrdersStore()
  const order = allOrders.find((o) => o.id === id) ?? null

  function changeStatus(status: string) {
    updateOrderStatus(id, status as Order["status"])
    toast.success(`${id} → ${STATUS_LABELS[status] ?? status}`)
  }

  // Normaliza un teléfono venezolano a formato wa.me (código país 58, sin símbolos).
  function toWhatsappNumber(raw: string): string {
    const digits = raw.replace(/\D/g, "")
    if (digits.startsWith("58")) return digits
    if (digits.startsWith("0")) return `58${digits.slice(1)}`
    return `58${digits}`
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <Package className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-semibold">Pedido no encontrado</p>
        <p className="text-sm text-muted-foreground">El pedido <span className="font-mono">{id}</span> no existe.</p>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/orders"><ArrowLeft className="mr-2 h-4 w-4" />Volver a pedidos</Link>
        </Button>
      </div>
    )
  }

  const subtotal = order.subtotal ?? order.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const customerWhatsapp = `https://wa.me/${toWhatsappNumber(order.shippingAddress.phone)}?text=${encodeURIComponent(
    `Hola ${order.shippingAddress.name}, te escribimos de ENOVA CORP sobre tu pedido ${order.id} ` +
      `(${order.items.length} ${order.items.length === 1 ? "producto" : "productos"}, total $${order.total.toFixed(2)}). `
  )}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-mono">{order.id}</h1>
              <Badge variant={STATUS_VARIANTS[order.status] ?? "outline"}>
                {STATUS_LABELS[order.status] ?? order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {new Date(order.createdAt).toLocaleString("es-VE", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <Button
            asChild
            size="sm"
            className="bg-[#25D366] text-white hover:bg-[#1ebe5a]"
          >
            <a href={customerWhatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4" />
              Contactar cliente
            </a>
          </Button>
          <Select value={order.status} onValueChange={changeStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Shipping address */}
        <div className="rounded-lg border bg-background p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <MapPin className="h-4 w-4" />
            Dirección de envío
          </div>
          <div className="text-sm space-y-0.5">
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
            <p className="text-muted-foreground">{order.shippingAddress.address}</p>
            <p className="text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-lg border bg-background p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <CreditCard className="h-4 w-4" />
            Método de pago
          </div>
          <p className="text-sm font-medium">{order.paymentMethod}</p>
          {order.notes && (
            <p className="text-sm text-muted-foreground border-t pt-2 mt-2">{order.notes}</p>
          )}
        </div>

        {/* Dates */}
        <div className="rounded-lg border bg-background p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <Calendar className="h-4 w-4" />
            Fechas
          </div>
          <div className="text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Creado</span>
              <span>{new Date(order.createdAt).toLocaleDateString("es-VE")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Actualizado</span>
              <span>{new Date(order.updatedAt).toLocaleDateString("es-VE")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">
            {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        <div className="divide-y">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover border flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t bg-muted/20 px-4 py-3 space-y-1.5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {order.shipping > 0 ? (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Envío</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Envío</span>
              <span>Cobro en destino</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold border-t pt-1.5 mt-1.5">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
