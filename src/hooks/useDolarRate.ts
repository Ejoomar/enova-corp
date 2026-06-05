"use client"

import { useState, useEffect } from 'react'

export interface DolarRate {
  paralelo: number | null
  bcv: number | null
  updatedAt: string | null
  loading: boolean
  error: string | null
}

export function useDolarRate(): DolarRate {
  const [rate, setRate] = useState<DolarRate>({
    paralelo: null,
    bcv: null,
    updatedAt: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('/api/exchange-rate')
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        setRate({
          paralelo: data.paralelo,
          bcv: data.bcv,
          updatedAt: data.updatedAt,
          loading: false,
          error: null,
        })
      } catch {
        setRate((prev) => ({
          ...prev,
          loading: false,
          error: 'No se pudo obtener la tasa',
        }))
      }
    }

    fetchRate()
    // auto-refresh every 5 minutes
    const interval = setInterval(fetchRate, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return rate
}
