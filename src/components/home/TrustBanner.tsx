import { Truck, ClipboardList, ShieldCheck, Headphones } from "lucide-react"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

const pillars = [
  {
    Icon: Truck,
    title: "Despacho Nacional",
    sub: "MRW · ZOOM · 24–48 h hábiles",
    tag: "Enviamos a todo el país",
  },
  {
    Icon: ClipboardList,
    title: "Cotización Rápida",
    sub: "Respuesta en menos de 24 h",
    tag: "Empresas · Personas · B2B",
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
    tag: "Lunes a sábado",
  },
]

export function TrustBanner() {
  return (
    <section style={{ backgroundColor: "var(--brass)" }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, sub, tag }, i) => (
            <ScrollReveal
              key={title}
              delay={i * 90}
              className={[
                "flex items-start gap-5 px-7 py-9 lg:px-8 lg:py-10",
                "transition-colors duration-200 hover:bg-white/[0.07]",
                i > 0 ? "border-l border-white/20" : "",
                i >= 2 ? "border-t border-white/20 lg:border-t-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Icon container — glass pill */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-[15px] font-medium leading-tight text-white">
                  {title}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/75">
                  {sub}
                </p>
                <p className="mt-2.5 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-white/60">
                  {tag}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
