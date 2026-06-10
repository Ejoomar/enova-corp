"use client"
import { EMPRESA } from "@/config/empresa"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Minus, Plus, FileText, MessageCircle, Mail, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useQuoteStore } from "@/stores/quote-store"

export default function CotizacionPage() {
  const { items, removeItem, updateQuantity, updateNotes, clearQuote } = useQuoteStore()
  const [sent, setSent] = useState(false)

  const buildWhatsAppMessage = () => {
    if (items.length === 0) return ""
    const lines = items.map((item) => {
      const note = item.notes ? ` (${item.notes})` : ""
      return `• ${item.quantity}x ${item.product.name}${note}`
    })
    return encodeURIComponent(
      `Hola ENOVA CORP, quiero cotizar los siguientes productos:\n\n${lines.join("\n")}\n\nQuedo atento.`
    )
  }

  const buildEmailBody = () => {
    if (items.length === 0) return ""
    const lines = items.map((item) => {
      const note = item.notes ? ` — ${item.notes}` : ""
      return `- ${item.quantity}x ${item.product.name}${note}`
    })
    return encodeURIComponent(
      `Estimados,\n\nSolicito cotización para:\n\n${lines.join("\n")}\n\nQuedo a la espera.\n\nSaludos`
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <ClipboardList className="h-14 w-14 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-bold">Tu cotización está vacía</h1>
          <p className="mt-2 text-muted-foreground">
            Agregá productos desde el catálogo para armar tu pedido.
          </p>
        </div>
        <Button asChild variant="brass" size="lg">
          <Link href="/products">Ver catálogo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Solicitud de cotización</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "producto" : "productos"} · Revisá y enviá tu pedido
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearQuote} className="text-destructive hover:text-destructive">
          <Trash2 className="mr-1.5 h-4 w-4" />
          Limpiar
        </Button>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-1)] p-4">
            <div className="flex items-start gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                  {item.product.brand}
                </p>
                <p className="mt-0.5 font-medium leading-tight">{item.product.name}</p>
                <p className="mt-1 font-mono-ui text-sm font-medium text-[var(--brass)]">
                  ${item.product.price.toLocaleString("en-US")}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[var(--hairline)] hover:bg-[var(--background)] disabled:opacity-40"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[var(--hairline)] hover:bg-[var(--background)]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="shrink-0 p-1 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Notes */}
            <div className="mt-3">
              <input
                type="text"
                placeholder="Notas opcionales (color, modelo, etc.)"
                value={item.notes}
                onChange={(e) => updateNotes(item.product.id, e.target.value)}
                className="w-full rounded border border-[var(--hairline)] bg-[var(--background)] px-3 py-1.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--brass)]"
              />
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Summary */}
      <div className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-1)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[var(--brass)]" />
          <h2 className="font-semibold">Enviar cotización</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Elegí cómo querés enviarnos tu solicitud. Te respondemos con precios y disponibilidad en menos de 24 h.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${EMPRESA.whatsapp}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSent(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-success)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar por WhatsApp
          </a>
          <a
            href={`mailto:Gerencia@enovacorp.co?subject=Solicitud de cotización&body=${buildEmailBody()}`}
            onClick={() => setSent(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--hairline)] px-4 py-3 text-sm font-medium hover:bg-[var(--background)] transition-colors"
          >
            <Mail className="h-4 w-4" />
            Enviar por Email
          </a>
        </div>

        {sent && (
          <p className="text-center text-sm text-[var(--color-success)]">
            ¡Listo! Tu solicitud fue enviada. Te responderemos pronto.
          </p>
        )}
      </div>
    </div>
  )
}
