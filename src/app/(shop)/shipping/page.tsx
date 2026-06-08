import Image from "next/image"

const payments = [
  { name: "Pago Móvil", label: "Todos los bancos",  src: "/logos/pagomovil.svg", w: 120, h: 44,  color: "#0057B7", maxWClass: "max-w-[90px] sm:max-w-[110px]" },
  { name: "Zelle",      label: "USD · Instantáneo", src: "/logos/zelle.svg",     w: 220, h: 90,  color: "#6C1CD1", maxWClass: "max-w-[90px] sm:max-w-[150px]" },
  { name: "Binance",   label: "USDT · Cripto",     src: "/logos/binance.svg",   w: 520, h: 112, color: "#F3BA2F", maxWClass: "max-w-[90px] sm:max-w-[210px]" },
  { name: "USD",       label: "Efectivo · Divisa",  src: "/logos/usd.svg",       w: 120, h: 48,  color: "#1A7A3C", maxWClass: "max-w-[90px] sm:max-w-[120px]" },
  { name: "Cashea",    label: "Pago en cuotas",    src: "/logos/cashea.svg",    w: 465, h: 135, color: "#FFF212", maxWClass: "max-w-[90px] sm:max-w-[190px]" },
]

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="mb-16">
        <h1 className="font-display text-5xl font-light tracking-[-0.02em]">
          Envíos a todo<br />Venezuela
        </h1>
      </div>

      {/* Shipping options */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-12">
        {[
          {
            title: "Envío nacional",
            time: "Despacho en 1 día hábil",
            desc: "Tu pedido se despacha al día hábil siguiente de confirmado el pago. Disponible para todo el territorio venezolano vía MRW.",
          },
          {
            title: "Retiro en tienda",
            time: "Mismo día hábil",
            desc: "Retira tu pedido directamente en nuestra tienda: Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida. Coordina previa confirmación de pago.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-[var(--surface-1)] rounded-xl p-8">
            <h2 className="font-display text-2xl font-light mb-1 tracking-[-0.02em]">{item.title}</h2>
            <p className="font-mono-ui text-[11px] text-[var(--brass)] mb-3">{item.time}</p>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Carrier banner */}
      <div className="mb-12 overflow-hidden rounded-xl border border-white/5 bg-[#0a0f1e]">
        <div className="flex flex-col items-center justify-center gap-10 px-10 py-10 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/8">
          <div className="hidden sm:flex sm:flex-col sm:items-end sm:pr-12">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/30 leading-loose">
              Enviamos<br />con
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:px-14">
            <Image
              src="/logos/mrw.svg"
              alt="MRW Venezuela"
              width={640}
              height={183}
              className="h-9 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
            />
            <p className="font-mono-ui text-[10px] text-white/40">Cobertura nacional · +800 agencias</p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:px-14">
            <Image
              src="/logos/zoom.svg"
              alt="Zoom Envíos Expresos"
              width={572}
              height={162}
              className="h-8 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
            />
            <p className="font-mono-ui text-[10px] text-white/40">Entrega rápida · Principales ciudades</p>
          </div>
        </div>
      </div>

      {/* Payment methods — same logos as footer */}
      <div className="mb-12">
        <div className="mb-8">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--brass)] mb-3">
            — Métodos de pago
          </p>
          <h2 className="font-display text-3xl font-light tracking-[-0.03em] text-[var(--foreground)]">
            Tú eliges cómo pagar
          </h2>
          <p className="mt-2 font-mono-ui text-[11px] text-[var(--muted-foreground)]">
            USD · Bolívares · Cripto
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {payments.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] px-5 py-6 transition-all duration-200 hover:border-[var(--brass)]/40"
            >
              {/* Accent line top */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
              />
              {/* Logo */}
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.w}
                  height={p.h}
                  className={`h-full w-auto object-contain ${p.maxWClass}`}
                />
              </div>
              {/* Sub-label */}
              <p className="mt-3 text-center font-mono-ui text-[10px] font-semibold uppercase tracking-[0.10em] text-[var(--foreground)]/70">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-[var(--surface-1)] rounded-xl p-8">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-6">
          Información importante
        </p>
        <ul className="space-y-3">
          {[
            "El despacho se realiza el día hábil siguiente de confirmado el pago.",
            "Los tiempos de entrega por MRW varían según la ciudad de destino.",
            "Para pedidos al interior del país se coordina el número de guía vía WhatsApp.",
            "En caso de daño durante el transporte, contáctanos en un plazo máximo de 48 horas.",
            "Retiro en tienda disponible el mismo día hábil en C.C. Alto Chama, Local 105-A, Mérida.",
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
