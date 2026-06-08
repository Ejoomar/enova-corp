import Link from "next/link"
import { Building2, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function B2BPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Empresas</span>
        <div className="col-span-12 lg:col-span-8">
          <h1 className="font-display text-5xl font-light tracking-[-0.02em] mb-4">
            Atención B2B<br />Para empresas
          </h1>
          <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-xl">
            Soluciones tecnológicas integrales para empresas venezolanas. Precios especiales, crédito empresarial y soporte dedicado.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {[
          { icon: Building2,       title: "Precios corporativos", desc: "Precios especiales por proyecto corporativo. Una empresa puede adquirir múltiples equipos distintos para un proyecto y recibe precio preferencial. Cotización en 24 horas." },
          { icon: ShieldCheck,     title: "Garantía incluida",    desc: "Todos los equipos incluyen garantía de 6 meses a 1 año según marca. Soporte técnico post-venta incluido." },
          { icon: Truck,           title: "Entrega a tu empresa",  desc: "Despachamos por MRW a cualquier ciudad de Venezuela. El envío se realiza al día hábil siguiente de confirmado el pago." },
          { icon: HeadphonesIcon,  title: "Soporte dedicado",      desc: "Atención directa para gestionar tu proyecto, cotización y seguimiento de pedido. Horario L–V 9am–6pm, Sáb 9am–4pm." },
        ].map((item) => (
          <div key={item.title} className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
            <item.icon className="h-6 w-6 text-[var(--brass)] mb-4" />
            <h2 className="font-display text-xl font-light mb-2 tracking-[-0.02em]">{item.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-light tracking-[-0.02em] mb-1">¿Listo para comenzar?</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Contáctanos y un asesor se comunicará contigo en menos de 24 horas.</p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href="/cotizacion">Solicitar cotización</Link>
        </Button>
      </div>
    </div>
  )
}
