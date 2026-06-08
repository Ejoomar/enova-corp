import { Truck, ClipboardList, ShieldCheck, Headphones } from "lucide-react"

const pillars = [
  {
    Icon: Truck,
    title: "Despacho Nacional",
    sub: "MRW · ZOOM · 24–48 h hábiles",
    tag: "Todo el país",
  },
  {
    Icon: ClipboardList,
    title: "Cotización Rápida",
    sub: "Respuesta en menos de 24 h",
    tag: "Empresas · B2B",
  },
  {
    Icon: ShieldCheck,
    title: "Garantía Oficial",
    sub: "6 meses a 1 año por producto",
    tag: "Respaldo de marca",
  },
  {
    Icon: Headphones,
    title: "Atención Inmediata",
    sub: "WhatsApp · Instagram · Web",
    tag: "Lun – Sáb",
  },
]

export function TrustBanner() {
  return (
    <section style={{ backgroundColor: "var(--brass)" }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, sub, tag }, i) => (
            <div
              key={title}
              className={[
                "flex items-start gap-4 px-6 py-8 lg:px-8 lg:py-9",
                "transition-colors duration-200 hover:bg-white/[0.07]",
                i > 0 ? "border-l border-white/20" : "",
                i >= 2 ? "border-t border-white/20 lg:border-t-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Icon */}
              <Icon className="mt-0.5 h-[22px] w-[22px] shrink-0 text-white/75" strokeWidth={1.5} />

              {/* Text */}
              <div className="min-w-0">
                <p className="font-display text-[14px] font-semibold leading-snug tracking-[-0.01em] text-white">
                  {title}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-white/60">
                  {sub}
                </p>
                <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-white/45">
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
