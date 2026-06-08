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
    desc: "USD, Bs., Zelle, Pago Móvil, Binance y transferencias a todos los bancos venezolanos.",
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">

          {/* ── Columna izquierda: ancla editorial ── */}
          <div className="flex flex-col gap-7">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--brass)]">
              ENOVA CORP · Mérida, Venezuela
            </span>

            <h2 className="font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              Por qué<br />elegirnos.
            </h2>

            <p className="max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
              Más de 5 años siendo el distribuidor tecnológico de confianza en Venezuela. Equipos certificados, garantía real y atención personalizada.
            </p>

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/584223668201?text=Hola%20ENOVA%20CORP%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta self-start inline-flex items-center gap-2.5 border border-[var(--brass)]/40 px-5 py-2.5 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] transition-all duration-200 hover:border-[var(--brass)] hover:bg-[var(--brass)]/8"
            >
              Contáctanos
              <span aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* ── Columna derecha: grid 2×2 ── */}
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="group flex flex-col gap-5 border border-[var(--hairline)] bg-[var(--surface-1)] p-5 transition-all duration-300 hover:border-[var(--brass)]/30 hover:shadow-[0_4px_24px_-4px_rgba(0,87,183,0.10)] sm:p-6"
                style={{ borderTop: "2px solid var(--brass)" }}
              >
                {/* Icono + número */}
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--brass)]/10 text-[var(--brass)] transition-transform duration-300 group-hover:scale-105">
                    {p.icon}
                  </div>
                  <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {p.num}
                  </span>
                </div>

                {/* Contenido */}
                <div>
                  <h3 className="font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-base">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)] sm:text-[13px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
