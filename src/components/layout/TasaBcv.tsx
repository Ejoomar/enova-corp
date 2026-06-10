"use client"

import { TrendingUp } from "lucide-react"
import { useDolarRate } from "@/hooks/useDolarRate"
import { formatBsF } from "@/lib/currency"

/**
 * Indicador de tasa BCV del día en el topbar.
 * Genera confianza: el cliente ve a qué tasa se calculan los precios en Bs.
 */
export function TasaBcv() {
  const { bcv, loading } = useDolarRate()

  if (loading || !bcv) return null

  return (
    <span
      className="flex items-center gap-1.5"
      title="Los pagos en bolívares se calculan a esta tasa oficial BCV"
    >
      <TrendingUp className="h-3.5 w-3.5" />
      <span className="tabular-nums">
        BCV {formatBsF(bcv)}
      </span>
    </span>
  )
}
