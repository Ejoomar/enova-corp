"use client"

import { Truck, RefreshCw, TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"
import { StripeCheckoutButton } from "./StripeCheckoutButton"
import { formatUSD, formatBsF, usdToBsF } from "@/lib/currency"

interface CartSummaryProps {
  items: CartItem[]
  bsfRate: number | null
  bsfLoading: boolean
  bsfUpdatedAt: string | null
}

function getRelativeTime(isoString: string | null): string {
  if (!isoString) return ""
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 60000)
  if (diff < 1) return "ahora mismo"
  if (diff === 1) return "hace 1 min"
  return `hace ${diff} min`
}

export function CartSummary({ items, bsfRate, bsfLoading, bsfUpdatedAt }: CartSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal >= 200 ? 0 : 15
  const total = subtotal + shipping

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatUSD(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span>{shipping === 0 ? "Gratis" : formatUSD(shipping)}</span>
        </div>

        {shipping > 0 && (
          <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-xs">
            <Truck className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>
              Agrega {formatUSD(200 - subtotal)} más para envío gratis
            </span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total USD</span>
          <span className="text-lg text-primary">{formatUSD(total)}</span>
        </div>

        {/* Bolivares section */}
        {bsfRate !== null ? (
          <div className="rounded-md bg-muted/60 p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Bs.</span>
              <span className="text-sm font-semibold">
                {formatBsF(usdToBsF(total, bsfRate))}
              </span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>BCV: Bs. {bsfRate.toFixed(2)} / $</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {getRelativeTime(bsfUpdatedAt)}
              </span>
            </div>
          </div>
        ) : bsfLoading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Obteniendo tasa de cambio...</span>
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <StripeCheckoutButton />
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Pago seguro con Stripe. Impuestos incluidos.
      </p>
    </div>
  )
}
