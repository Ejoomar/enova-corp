import { NextResponse } from 'next/server'

interface DolarApiItem {
  nombre: string
  fuente: string
  compra: number
  venta: number
  promedio: number
  fechaActualizacion: string
}

export async function GET() {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares', {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('API error')

    const data: DolarApiItem[] = await res.json()
    const paralelo = data.find((d) => d.fuente === 'paralelo')
    const bcv = data.find((d) => d.fuente === 'oficial')

    return NextResponse.json({
      paralelo: paralelo?.promedio ?? null,
      bcv: bcv?.promedio ?? null,
      updatedAt: bcv?.fechaActualizacion ?? new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'No se pudo obtener la tasa de cambio' },
      { status: 500 }
    )
  }
}
