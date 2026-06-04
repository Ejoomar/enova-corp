export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Logística</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Envíos a todo<br />Venezuela
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] lg:grid-cols-3 mb-12">
        {[
          { num: "01", title: "Envío estándar",  time: "3 — 5 días hábiles", desc: "Disponible para todo el territorio venezolano. Confirmación de despacho vía email." },
          { num: "02", title: "Envío express",   time: "1 — 2 días hábiles",  desc: "Entrega prioritaria para Caracas y ciudades principales. Costo adicional aplicable." },
          { num: "03", title: "Retiro en tienda",time: "Mismo día",            desc: "Retira tu pedido directamente en nuestra ubicación. Previa coordinación." },
        ].map((item) => (
          <div key={item.num} className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
            <span className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">{item.num}</span>
            <h2 className="font-display text-2xl font-light mt-4 mb-1 tracking-[-0.02em]">{item.title}</h2>
            <p className="font-mono-ui text-[11px] text-[var(--brass)] mb-3">{item.time}</p>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-6">Información importante</p>
        <ul className="space-y-3">
          {[
            "Los tiempos de entrega son estimados y pueden variar según la zona geográfica.",
            "Pedidos realizados antes de las 12:00 PM se procesan el mismo día hábil.",
            "Para equipos fiscales, la instalación y configuración se coordina por separado.",
            "En caso de daño durante el transporte, contáctanos en un plazo máximo de 48 horas.",
          ].map((note, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
              <span className="text-[var(--brass)] mt-0.5">·</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
