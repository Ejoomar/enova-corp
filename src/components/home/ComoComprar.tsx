import { MousePointerClick, MessageCircle, Wallet, PackageCheck } from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

const pasos = [
  {
    num: "01",
    Icon: MousePointerClick,
    title: "Elige tus productos",
    desc: "Explora el catálogo y arma tu carrito o cotización con precios en USD y Bs. a tasa BCV.",
  },
  {
    num: "02",
    Icon: MessageCircle,
    title: "Confirma por WhatsApp",
    desc: "Al confirmar, tu pedido nos llega completo por WhatsApp con tu referencia única.",
  },
  {
    num: "03",
    Icon: Wallet,
    title: "Paga como prefieras",
    desc: "Pago Móvil, Zelle, Binance o USD en efectivo. Envías el comprobante y lo verificamos al instante.",
  },
  {
    num: "04",
    Icon: PackageCheck,
    title: "Recibe tu pedido",
    desc: "Despacho en 24–48h hábiles por MRW o Zoom a todo el país, o delivery el mismo día en Mérida.",
  },
]

export function ComoComprar() {
  return (
    <section className="border-b border-[var(--hairline)] bg-[var(--surface-1)]/40 py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono-ui mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--brass)]">
            — Comprar es fácil
          </p>
          <h2 className="font-display text-4xl font-light tracking-[-0.02em]">
            Cómo comprar en ENOVA.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {pasos.map(({ num, Icon, title, desc }, i) => (
            <ScrollReveal key={num} delay={i * 100} className="relative">
              {/* Connector line — desktop only, not after last */}
              {i < pasos.length - 1 && (
                <div className="absolute left-14 right-0 top-7 hidden h-px bg-[var(--hairline)] lg:block" />
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brass)]">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              <p className="font-mono-ui mt-5 text-[11px] tracking-[0.14em] text-[var(--brass)]">
                {num}
              </p>
              <h3 className="font-display mt-1.5 text-lg font-medium tracking-[-0.01em]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
