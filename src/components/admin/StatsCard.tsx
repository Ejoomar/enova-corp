"use client"

import { useEffect, useRef, useState } from "react"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  /** Formatea el número ya animado. Por defecto separador de miles local. */
  format?: (n: number) => string
  /** Pass null to hide the trend row entirely (e.g. no prior-period data). */
  change?: number | null
  icon: LucideIcon
}

const DURATION_MS = 600

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Cuenta desde 0 hasta `target` en DURATION_MS. Sin movimiento si el usuario lo pide.
function useCountUp(target: number): number {
  // Lazy init: con reduced-motion el estado nunca cambia y el efecto no programa frames.
  const [reduced] = useState(prefersReducedMotion)
  const [display, setDisplay] = useState(() => (reduced ? target : 0))
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduced) return
    const start = performance.now()
    const from = 0
    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (target - from) * eased)
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, reduced])

  // Con reduced-motion el valor es siempre el target actual (sin animar).
  return reduced ? target : display
}

export function StatsCard({ title, value, format, change = null, icon: Icon }: StatsCardProps) {
  const animated = useCountUp(value)
  const formatter = format ?? ((n: number) => Math.round(n).toLocaleString())

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm truncate pr-1">
          {title}
        </CardTitle>
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
      </CardHeader>
      <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
        <div className="text-xl font-bold sm:text-2xl tabular-nums">{formatter(animated)}</div>

        {change != null && (
          <div className="flex items-center gap-1 text-xs mt-1">
            {change === 0 ? (
              <span className="text-muted-foreground hidden sm:inline">Sin cambio</span>
            ) : change > 0 ? (
              <>
                <TrendingUp className="h-3 w-3 shrink-0 text-[var(--color-success)]" />
                <span className={cn("text-[var(--color-success)]")}>+{change}%</span>
                <span className="text-muted-foreground hidden sm:inline">vs mes anterior</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 shrink-0 text-destructive" />
                <span className="text-destructive">{change}%</span>
                <span className="text-muted-foreground hidden sm:inline">vs mes anterior</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
