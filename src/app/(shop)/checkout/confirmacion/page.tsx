"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Copy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/cart-store"

const PAYMENT_METHODS = [
  {
    label: "Pago Móvil",
    details: [
      { key: "Banco", value: "Banesco" },
      { key: "Teléfono", value: "0412-345-6789" },
      { key: "Cédula", value: "V-12.345.678" },
    ],
  },
  {
    label: "Zelle",
    details: [
      { key: "Email", value: "pagos@enovacorp.co" },
      { key: "Nombre", value: "ENOVA CORP C.A." },
    ],
  },
  {
    label: "USD Efectivo / Transferencia",
    details: [
      { key: "Contacto", value: "WhatsApp: +58 422-366-8201" },
    ],
  },
  {
    label: "Binance Pay",
    details: [
      { key: "ID", value: "ENOVA-CORP" },
      { key: "Moneda", value: "USDT · BEP20" },
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

export default function ConfirmacionPage() {
  const { items, clearCart } = useCartStore()
  const orderId = `ENV-${Date.now().toString(36).toUpperCase()}`

  // Clear cart on mount
  useEffect(() => {
    clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold">¡Pedido registrado!</h1>
        <p className="mt-2 text-muted-foreground">
          Gracias por tu compra en ENOVA CORP
        </p>
        <p className="mt-1 font-mono text-sm text-[var(--brass)]">
          Referencia: {orderId}
        </p>
      </div>

      {/* Instructions */}
      <div className="rounded-xl border border-[var(--hairline)] bg-card p-6 space-y-4">
        <h2 className="font-semibold text-base">Próximos pasos</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-none">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">1</span>
            <span>Realiza el pago usando uno de los métodos disponibles.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">2</span>
            <span>Envía el comprobante de pago por WhatsApp junto con tu referencia <strong className="text-foreground">{orderId}</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brass)] text-white text-xs font-bold">3</span>
            <span>Un asesor confirmará y coordinará la entrega contigo.</span>
          </li>
        </ol>
      </div>

      <Separator className="my-6" />

      {/* Payment methods */}
      <h2 className="mb-4 font-semibold">Métodos de pago disponibles</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.label}
            className="rounded-lg border border-[var(--hairline)] bg-card p-4 space-y-2"
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
            href={`https://wa.me/584223668201?text=${encodeURIComponent(`Hola ENOVA CORP, adjunto mi comprobante de pago. Referencia: ${orderId}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar comprobante por WhatsApp
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  )
}
