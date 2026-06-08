const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Despacho Nacional",
    sub: "MRW · ZOOM · 24–48 h hábiles",
    tag: "Todo el país",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: "Cotización Rápida",
    sub: "Respuesta en menos de 24 h",
    tag: "Empresas · B2B",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Garantía Oficial",
    sub: "6 meses a 1 año por producto",
    tag: "Respaldo de marca",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Atención Inmediata",
    sub: "WhatsApp · Instagram · Web",
    tag: "Lun – Sáb",
  },
]

export function TrustBanner() {
  return (
    <section className="bg-[#0057b7]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon, title, sub, tag }, i) => (
            <div
              key={title}
              className={[
                "flex items-start gap-4 px-6 py-7 lg:px-8 lg:py-8",
                "transition-colors duration-200 hover:bg-white/[0.06]",
                // vertical dividers
                i > 0 ? "border-l border-white/20" : "",
                // horizontal divider on mobile second row
                i >= 2 ? "border-t border-white/20 lg:border-t-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Icon */}
              <span className="mt-0.5 text-white/80">{icon}</span>

              {/* Text */}
              <div className="min-w-0">
                <p className="font-display text-[14px] font-semibold leading-snug tracking-[-0.01em] text-white">
                  {title}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-white/65">
                  {sub}
                </p>
                <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-white/50">
                  {tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
