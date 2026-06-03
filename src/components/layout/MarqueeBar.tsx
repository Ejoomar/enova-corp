const items = [
  { type: "badge", badge: "Nuevo",  badge_variant: "new",    text: "iPhone 16 Pro Max — Disponible ahora" },
  { type: "text",                                             text: "MacBook Air M3 · Garantía Apple oficial" },
  { type: "badge", badge: "Fiscal", badge_variant: "fiscal", text: "Equipos SENIAT · Instalación incluida" },
  { type: "text",                                             text: "Envíos Express a todo Venezuela" },
  { type: "badge", badge: "Nuevo",  badge_variant: "new",    text: "Samsung Galaxy S25 Ultra" },
  { type: "badge", badge: "Oferta", badge_variant: "sale",   text: "HP LaserJet Pro · Mejor precio" },
  { type: "text",                                             text: "Garantía oficial · Apple · Samsung · HP · Lenovo · Brother" },
  { type: "text",                                             text: "@enovacorpve · Instagram" },
] as const

const badgeClass: Record<string, string> = {
  new:    "bg-white/20 border-white/32 text-white",
  sale:   "bg-amber-400/20 border-amber-300/40 text-amber-200",
  fiscal: "bg-emerald-400/15 border-emerald-300/35 text-emerald-200",
}

export function MarqueeBar() {
  return (
    <div
      aria-hidden="true"
      className="relative h-9 overflow-hidden bg-[var(--brass)] select-none"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--brass)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--brass)] to-transparent" />

      {/* Track — duplicated for seamless loop */}
      <div className="flex h-full w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="flex items-center gap-[7px] px-7 text-[11.5px] font-medium text-white/92 whitespace-nowrap tracking-[0.01em]">
                  {item.type === "badge" && (
                    <span
                      className={`inline-flex h-[18px] items-center rounded-[3px] border px-[6px] text-[8.5px] font-bold uppercase tracking-[0.12em] leading-none ${badgeClass[item.badge_variant]}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.text}
                </span>
                <span className="text-white/22 text-[10px]">◆</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
