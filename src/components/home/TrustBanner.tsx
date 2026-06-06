"use client"

import { Truck, ClipboardList, ShieldCheck } from "lucide-react"

const pillars = [
  {
    icon: Truck,
    title: "Despacho Nacional",
    sub: "MRW · ZOOM · 24–48 h hábiles",
  },
  {
    icon: ClipboardList,
    title: "Cotización Rápida",
    sub: "Respuesta en 24 h",
  },
  {
    icon: ShieldCheck,
    title: "Garantía Oficial",
    sub: "1 año de fábrica",
  },
]

export function TrustBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6 lg:px-10">
      <div className="grid grid-cols-1 divide-y divide-[var(--hairline)] overflow-hidden rounded-xl bg-[#0a0f1e] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {pillars.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-center gap-4 px-8 py-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="text-xs text-white/50">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
