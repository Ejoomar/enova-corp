import { NextResponse } from 'next/server'
import { settingsStore } from '@/lib/settings-store'

interface DolarApiItem {
  nombre: string
  fuente: string
  compra: number
  venta: number
  promedio: number
  fechaActualizacion: string
}

// Module-scope cache — survives between requests, resets on server restart.
// Ensures the last successful live rate is returned even when the external API
// is temporarily unavailable.
let cachedBcv: number | null = null
let cachedParalelo: number | null = null
let cachedAt: string | null = null

export async function GET() {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares', {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('API error')

    const data: DolarApiItem[] = await res.json()
    const paralelo = data.find((d) => d.fuente === 'paralelo')
    const bcv      = data.find((d) => d.fuente === 'oficial')

    // Persist successful fetch in module-scope cache
    if (bcv?.promedio) {
      cachedBcv   = bcv.promedio
      cachedAt    = bcv.fechaActualizacion ?? new Date().toISOString()
    }
    if (paralelo?.promedio) {
      cachedParalelo = paralelo.promedio
    }

    return NextResponse.json({
      paralelo:  paralelo?.promedio   ?? null,
      bcv:       bcv?.promedio        ?? null,
      updatedAt: bcv?.fechaActualizacion ?? new Date().toISOString(),
    })
  } catch {
    // Fallback priority:
    //   1. Last successful live rate (module-scope cache)
    //   2. Admin-configured manual rate (settingsStore)
    //   3. null (no Bs price shown)
    const fallbackBcv = cachedBcv ?? settingsStore.store.bcvRate

    return NextResponse.json({
      paralelo:  cachedParalelo,
      bcv:       fallbackBcv,
      updatedAt: cachedAt ?? new Date().toISOString(),
      fallback:  true,
    })
  }
}
