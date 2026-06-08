"use client"

const pillars = [
  {
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Despacho Nacional",
    sub: "MRW · ZOOM · 24–48 h hábiles",
    detail: "Enviamos a todo el país",
  },
  {
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: "Cotización Rápida",
    sub: "Respuesta en menos de 24 h",
    detail: "Empresas · Personas · B2B",
  },
  {
    accent: "#22c55e",
    glow: "rgba(34,197,94,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Garantía Oficial",
    sub: "6 meses a 1 año por producto",
    detail: "Respaldo de marca",
  },
  {
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Atención Inmediata",
    sub: "WhatsApp · Instagram · Web",
    detail: "Lunes a sábado",
  },
]

export function TrustBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6 lg:px-10">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ accent, glow, icon, title, sub, detail }) => (
          <div
            key={title}
            className="group relative flex flex-col justify-between gap-6 overflow-hidden bg-[#080c18] px-7 py-7 transition-all duration-300 hover:bg-[#0d1224]"
          >
            {/* Top accent gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)` }}
            />

            {/* Subtle corner glow on hover */}
            <div
              className="pointer-events-none absolute -top-8 -left-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: glow }}
            />

            {/* Icon */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
              style={{ background: glow, color: accent }}
            >
              {icon}
            </div>

            {/* Text */}
            <div>
              <p className="text-[15px] font-semibold leading-snug text-white/90 tracking-[-0.01em]">
                {title}
              </p>
              <p className="mt-1 text-[12px] text-white/45 leading-snug">
                {sub}
              </p>
              <p
                className="mt-3 inline-block font-mono-ui text-[10px] uppercase tracking-[0.12em] transition-colors duration-200"
                style={{ color: accent, opacity: 0.7 }}
              >
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
