import { Truck, MessageSquare, Globe, CreditCard } from "lucide-react"
import { whatsappLink } from "@/config/empresa"

const pillars = [
  {
    num: "01",
    title: "Distribución directa",
    desc: "Trabajamos con proveedores seleccionados para ofrecerte los mejores equipos al mejor precio.",
    stat: "+500",
    statLabel: "equipos distribuidos",
    Icon: Truck,
  },
  {
    num: "02",
    title: "Soporte técnico",
    desc: "Equipo especializado disponible para asesorarte antes, durante y después de tu compra.",
    stat: "98%",
    statLabel: "satisfacción del cliente",
    Icon: MessageSquare,
  },
  {
    num: "03",
    title: "Cobertura nacional",
    desc: "Enviamos a todo Venezuela. Tu pedido llega donde estés, de forma rápida y segura.",
    stat: "+23",
    statLabel: "estados cubiertos",
    Icon: Globe,
  },
  {
    num: "04",
    title: "Múltiples métodos de pago",
    desc: "USD, Bs., Zelle, Pago Móvil, Binance y transferencias a todos los bancos venezolanos.",
    stat: "6+",
    statLabel: "formas de pago aceptadas",
    Icon: CreditCard,
  },
]

const cardBase =
  "group relative flex flex-col border border-[var(--hairline)] bg-[var(--surface-1)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brass)]/40 hover:shadow-[0_12px_40px_-8px_rgba(0,87,183,0.16)]"

export function BrandSection() {
  const [p1, p2, p3, p4] = pillars

  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-20">

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col gap-6 lg:pt-2">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[var(--brass)]">
              ENOVA CORP · Mérida, Venezuela
            </span>

            <h2 className="font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              Por qué<br />elegirnos.
            </h2>

            <p className="max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
              Más de 5 años siendo el distribuidor tecnológico de confianza en Venezuela. Equipos certificados, garantía real y atención personalizada.
            </p>

            {/* Separador decorativo */}
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--brass)]/50" />
              <div className="h-1 w-1 rounded-full bg-[var(--brass)]/40" />
            </div>

            <a
              href={whatsappLink("Hola ENOVA CORP, quiero más información")}
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

          {/* ── Columna derecha: bento asimétrico ── */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 — tall (row-span-2) */}
            <div
              className={`${cardBase} justify-between lg:row-span-2`}
              style={{ borderTop: "2px solid var(--brass)" }}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--brass)]/15 text-[var(--brass)] transition-all duration-300 group-hover:bg-[var(--brass)]/25 group-hover:scale-105">
                    <p1.Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {p1.num}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-medium leading-snug tracking-[-0.01em] text-foreground">
                  {p1.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)]">
                  {p1.desc}
                </p>
              </div>

              {/* Stat al pie */}
              <div className="mt-8 border-t border-[var(--hairline)] pt-5">
                <p className="font-display text-4xl font-light tracking-tight text-[var(--brass)]">
                  {p1.stat}
                </p>
                <p className="mt-1 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  {p1.statLabel}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={cardBase}
              style={{ borderTop: "2px solid var(--brass)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brass)]/15 text-[var(--brass)] transition-all duration-300 group-hover:bg-[var(--brass)]/25 group-hover:scale-105">
                  <p2.Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                  {p2.num}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-foreground">
                {p2.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)]">
                {p2.desc}
              </p>
              <div className="mt-4 border-t border-[var(--hairline)] pt-4">
                <span className="font-display text-2xl font-light text-[var(--brass)]">{p2.stat}</span>
                <span className="ml-2 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                  {p2.statLabel}
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className={cardBase}
              style={{ borderTop: "2px solid var(--brass)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brass)]/15 text-[var(--brass)] transition-all duration-300 group-hover:bg-[var(--brass)]/25 group-hover:scale-105">
                  <p3.Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                  {p3.num}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-foreground">
                {p3.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)]">
                {p3.desc}
              </p>
              <div className="mt-4 border-t border-[var(--hairline)] pt-4">
                <span className="font-display text-2xl font-light text-[var(--brass)]">{p3.stat}</span>
                <span className="ml-2 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                  {p3.statLabel}
                </span>
              </div>
            </div>

            {/* Card 4 — wide (col-span-2), layout horizontal */}
            <div
              className={`${cardBase} sm:col-span-2 lg:col-span-2`}
              style={{ borderTop: "2px solid var(--brass)" }}
            >
              <div className="flex items-start gap-6 lg:items-center">
                {/* Izquierda */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brass)]/15 text-[var(--brass)] transition-all duration-300 group-hover:bg-[var(--brass)]/25 group-hover:scale-105">
                      <p4.Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                      {p4.num}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-foreground">
                    {p4.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)]">
                    {p4.desc}
                  </p>
                </div>

                {/* Divisor + stat grande */}
                <div className="hidden shrink-0 items-center gap-6 lg:flex">
                  <div className="h-16 w-px bg-[var(--hairline)]" />
                  <div className="text-center">
                    <p className="font-display text-5xl font-light tracking-tight text-[var(--brass)]">
                      {p4.stat}
                    </p>
                    <p className="mt-1 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      {p4.statLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
