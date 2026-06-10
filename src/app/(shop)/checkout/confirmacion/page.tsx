"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Copy, MessageCircle, PackageSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useOrdersStore } from "@/stores/orders-store"
import { EMPRESA, whatsappLink } from "@/config/empresa"
import { formatUSD, formatBsF } from "@/lib/currency"
import type { Order } from "@/data/mock-orders"

const PAYMENT_METHODS = [
  {
    label: EMPRESA.pagos.pagoMovil.label,
    details: [
      { key: "Banco", value: EMPRESA.pagos.pagoMovil.banco },
      { key: "Teléfono", value: EMPRESA.pagos.pagoMovil.telefono },
      { key: "Cédula", value: EMPRESA.pagos.pagoMovil.cedula },
    ],
  },
  {
    label: EMPRESA.pagos.zelle.label,
    details: [
      { key: "Email", value: EMPRESA.pagos.zelle.email },
      { key: "Nombre", value: EMPRESA.pagos.zelle.titular },
    ],
  },
  {
    label: EMPRESA.pagos.usdEfectivo.label,
    details: [
      { key: "Contacto", value: `WhatsApp: ${EMPRESA.whatsappDisplay}` },
    ],
  },
  {
    label: EMPRESA.pagos.binance.label,
    details: [
      { key: "ID", value: EMPRESA.pagos.binance.id },
      { key: "Moneda", value: EMPRESA.pagos.binance.moneda },
    ],
  },
]

function CopyButton({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text).catch(() => {})
  }
  return (
    <button
      onClick={copy}
      title="Copiar"
      className="ml-1 inline-flex items-center text-[var(--muted-foreground)] hover:text-[var(--brass)] transition-colors"
    >
      <Copy className="h-3 w-3" />
    </button>
  )
}

function buildWhatsAppMessage(order: Order): string {
  const lines = [
    `Hola ENOVA CORP, acabo de hacer el pedido *${order.id}*:`,
    "",
    ...order.items.map(
      (item) => `• ${item.quantity}x ${item.name} — ${formatUSD(item.price * item.quantity)}`
    ),
    "",
    `Subtotal: ${formatUSD(order.subtotal)}`,
    `Envío: ${order.shipping === 0 ? "Gratis" : formatUSD(order.shipping)}`,
    order.totalBs && order.tasaBcv
      ? `*Total: ${formatUSD(order.total)}* (${formatBsF(order.totalBs)} — tasa BCV ${formatBsF(order.tasaBcv)})`
      : `*Total: ${formatUSD(order.total)}*`,
    "",
    `Envío: ${order.shippingAddress.courier ?? "Por coordinar"} a ${order.shippingAddress.city}, ${order.shippingAddress.state}`,
    `Recibe: ${order.shippingAddress.name} · ${order.shippingAddress.phone}`,
    `Método de pago: ${order.paymentMethod}`,
    "",
    "Adjunto mi comprobante de pago.",
  ]
  return lines.join("\n")
}

export default function ConfirmacionPage() {
  return (
    <Suspense>
      <ConfirmacionContent />
    </Suspense>
  )
}

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref")
  const allOrders = useOrdersStore((s) => s.allOrders)
  // El snapshot de React va un render detrás de la hidratación del store:
  // esperar un instante antes de declarar "no encontrado" en cargas directas.
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 250)
    return () => clearTimeout(t)
  }, [])

  const order = ref ? allOrders.find((o) => o.id === ref) : undefined

  if (!order && !settled) return null

  if (!order) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <PackageSearch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="font-display text-[length:var(--text-h3)] font-medium leading-[1.15]">No encontramos tu pedido</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          El enlace puede haber expirado. Si ya hiciste tu pedido,
          escríbenos por WhatsApp y te ayudamos.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline">
            <Link href="/products">Ir al catálogo</Link>
          </Button>
          <Button asChild style={{ backgroundColor: "#25D366" }} className="text-white">
            <a href={whatsappLink("Hola ENOVA CORP, hice un pedido en la web y necesito ayuda.")} target="_blank" rel="noopener noreferrer">
              Escribir por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="font-display text-[length:var(--text-h2)] font-medium leading-[1.15]">¡Pedido registrado!</h1>
        <p className="mt-2 text-muted-foreground">
          Gracias por tu compra en ENOVA CORP
        </p>
        <p className="mt-1 font-mono text-sm text-[var(--brass)]">
          Referencia: {order.id}
        </p>
      </div>

      {/* Order summary */}
      <div className="rounded-xl border border-[var(--hairline)] bg-card p-6 space-y-3">
        <h2 className="font-display font-medium text-base">Tu pedido</h2>
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {item.quantity}x {item.name}
            </span>
            <span className="font-medium shrink-0 pl-3">
              {formatUSD(item.price * item.quantity)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatUSD(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span>{order.shipping === 0 ? "Gratis" : formatUSD(order.shipping)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatUSD(order.total)}</span>
        </div>
        {order.totalBs != null && order.tasaBcv != null && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total en Bs. (tasa BCV {formatBsF(order.tasaBcv)})</span>
            <span className="font-medium text-foreground">{formatBsF(order.totalBs)}</span>
          </div>
        )}
        <Separator />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Envío a:</span>{" "}
          {order.shippingAddress.name} · {order.shippingAddress.phone}
          <br />
          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state}
          {order.shippingAddress.courier && (
            <>
              <br />
              <span className="font-medium text-foreground">Vía:</span>{" "}
              {order.shippingAddress.courier}
            </>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Instructions */}
      <div className="rounded-xl border border-[var(--hairline)] bg-card p-6 space-y-4">
        <h2 className="font-display font-medium text-base">Próximos pasos</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-none">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">1</span>
            <span>Realiza el pago de <strong className="text-foreground">{formatUSD(order.total)}</strong> usando <strong className="text-foreground">{order.paymentMethod}</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">2</span>
            <span>Envía el comprobante por WhatsApp con tu referencia <strong className="text-foreground">{order.id}</strong> (el botón de abajo ya lleva tu pedido completo).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">3</span>
            <span>Un asesor confirmará tu pago y coordinará la entrega contigo.</span>
          </li>
        </ol>
      </div>

      <Separator className="my-6" />

      {/* Payment methods */}
      <h2 className="mb-4 font-display font-medium">Métodos de pago disponibles</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.label}
            className={`rounded-lg border bg-card p-4 space-y-2 ${
              method.label === order.paymentMethod ||
              order.paymentMethod.startsWith(method.label)
                ? "border-[var(--brass)] ring-1 ring-[var(--brass)]"
                : "border-[var(--hairline)]"
            }`}
          >
            <p className="text-sm font-semibold text-[var(--brass)]">{method.label}</p>
            {method.details.map(({ key, value }) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">
                  {value}
                  <CopyButton text={value} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          asChild
          className="gap-2"
          style={{ backgroundColor: "#25D366" }}
        >
          <a
            href={whatsappLink(buildWhatsAppMessage(order))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar pedido por WhatsApp
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  )
}
