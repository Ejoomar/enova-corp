const items = [
  { type: "badge", badge: "Nuevo",  badge_variant: "new",    text: "Cámaras EZVIZ — Garantía 6 meses" },
  { type: "text",                                             text: "Equipos Fiscales SENIAT · Instalación incluida" },
  { type: "badge", badge: "Fiscal", badge_variant: "fiscal", text: "Impresoras HP & Epson · Mejor precio garantizado" },
  { type: "text",                                             text: "Envíos Express a todo Venezuela" },
  { type: "badge", badge: "Nuevo",  badge_variant: "new",    text: "Redes TP-Link & Mercusys — Novedades" },
  { type: "badge", badge: "Oferta", badge_variant: "sale",   text: "Dell OptiPlex · Mejor precio" },
  { type: "text",                                             text: "Garantía 6 meses a 1 año · Dell · HP · Lenovo · Epson · TP-Link" },
  { type: "text",                                             text: "@enovacorpve · Instagram" },
] as const

const badgeClass: Record<string, string> = {
  new:    "bg-white/20 border-white/32 text-white",
  sale:   "bg-[var(--color-warning)]/20 border-[var(--color-warning)]/40 text-[var(--color-warning)]",
  fiscal: "bg-[var(--color-success)]/15 border-[var(--color-success)]/35 text-[var(--color-success)]",
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
