const pillars = [
  {
    num: "01",
    title: "Distribución directa",
    desc: "Trabajamos con proveedores seleccionados para ofrecerte los mejores equipos al mejor precio.",
  },
  {
    num: "02",
    title: "Soporte técnico",
    desc: "Equipo especializado disponible para asesorarte antes, durante y después de tu compra.",
  },
  {
    num: "03",
    title: "Cobertura nacional",
    desc: "Enviamos a todo Venezuela. Tu pedido llega donde estés, de forma rápida y segura.",
  },
  {
    num: "04",
    title: "Pago en divisas",
    desc: "Aceptamos USD, transferencias y múltiples métodos de pago adaptados al mercado venezolano.",
  },
]

export function BrandSection() {
  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16 grid grid-cols-12 items-end gap-6">
          <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">
            — 04 / 04
          </span>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display text-4xl font-light tracking-[-0.02em]">
              Por qué elegirnos.
            </h2>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group flex flex-col gap-6 bg-[var(--background)] px-8 py-10 transition-colors hover:bg-[var(--surface-1)]"
            >
              <span className="font-mono-ui text-[11px] font-medium text-[var(--brass)] tracking-[0.12em]">
                {p.num}
              </span>
              <h3 className="font-display text-xl font-medium leading-snug tracking-[-0.02em] text-foreground">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
