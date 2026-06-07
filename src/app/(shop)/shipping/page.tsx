import Image from "next/image"

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="mb-16">
        <h1 className="font-display text-5xl font-light tracking-[-0.02em]">
          Envíos a todo<br />Venezuela
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-12">
        {[
          { title: "Envío estándar",   time: "3 — 5 días hábiles", desc: "Disponible para todo el territorio venezolano. Confirmación de despacho vía email." },
          { title: "Envío express",    time: "1 — 2 días hábiles",  desc: "Entrega prioritaria para Caracas y ciudades principales. Costo adicional aplicable." },
          { title: "Retiro en tienda", time: "Mismo día",            desc: "Retira tu pedido directamente en nuestra ubicación. Previa coordinación." },
        ].map((item) => (
          <div key={item.title} className="bg-[var(--surface-1)] rounded-xl p-8">
            <h2 className="font-display text-2xl font-light mb-1 tracking-[-0.02em]">{item.title}</h2>
            <p className="font-mono-ui text-[11px] text-[var(--brass)] mb-3">{item.time}</p>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Carriers banner — CSS puro, resolución infinita */}
      <div className="mb-12 overflow-hidden rounded-xl bg-[#0a0f1e]">
        <div className="flex flex-col items-center justify-center gap-8 px-8 py-10 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/10">

          {/* Eyebrow */}
          <div className="hidden w-full text-center sm:block sm:w-auto sm:pr-10">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/40">
              Transportamos<br />con
            </p>
          </div>

          {/* MRW */}
          <div className="flex flex-col items-center gap-3 sm:px-12">
            <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-white px-3">
              <Image
                src="/logos/mrw.svg"
                alt="MRW Venezuela"
                width={82}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="font-mono-ui text-[10px] text-white/40">800+ agencias · Nacional</p>
          </div>

          {/* ZOOM */}
          <div className="flex flex-col items-center gap-3 sm:px-12">
            <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-white px-3">
              <Image
                src="/logos/zoom.png"
                alt="ZOOM"
                width={82}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="font-mono-ui text-[10px] text-white/40">Express · Día siguiente</p>
          </div>

        </div>
      </div>

      <div className="bg-[var(--surface-1)] rounded-xl p-8">
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
