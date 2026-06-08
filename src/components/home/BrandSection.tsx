const pillars = [
  {
    num: "01",
    title: "Distribución directa",
    desc: "Trabajamos con proveedores seleccionados para ofrecerte los mejores equipos al mejor precio.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Soporte técnico",
    desc: "Equipo especializado disponible para asesorarte antes, durante y después de tu compra.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Cobertura nacional",
    desc: "Enviamos a todo Venezuela. Tu pedido llega donde estés, de forma rápida y segura.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Múltiples métodos de pago",
    desc: "Aceptamos USD, Bs., Zelle, Pago Móvil, Binance y transferencias a todos los bancos venezolanos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <path d="M1 10h22" />
      </svg>
    ),
  },
]

export function BrandSection() {
  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-4xl font-light tracking-[-0.02em]">
            Por qué elegirnos.
          </h2>
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            4 razones para confiar en nosotros
          </p>
        </div>

        {/* Pillars grid — gap-px + bg-hairline crea los divisores */}
        <div className="grid grid-cols-1 gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group relative flex flex-col gap-8 overflow-hidden bg-[var(--background)] px-8 py-10 transition-colors duration-300 hover:bg-[var(--surface-1)]"
            >
              {/* Número fantasma — marca de agua decorativa */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-3 select-none font-mono-ui text-[80px] font-bold leading-none text-[var(--foreground)] opacity-[0.04]"
              >
                {p.num}
              </span>

              {/* Línea brass izquierda — se desliza hacia abajo al hacer hover */}
              <div className="absolute left-0 top-0 h-0 w-[2px] bg-[var(--brass)] transition-all duration-500 group-hover:h-full" />

              {/* Icono */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--brass)]/10 text-[var(--brass)] transition-transform duration-300 group-hover:scale-105">
                {p.icon}
              </div>

              {/* Contenido */}
              <div className="flex flex-col gap-3">
                <span className="font-mono-ui text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--brass)]">
                  {p.num}
                </span>
                <h3 className="font-display text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
