import { EMPRESA } from "@/config/empresa"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const topics = [
  { title: "¿Cómo realizar un pedido?",         desc: "Agrega productos al carrito, completa el checkout y recibirás confirmación por email." },
  { title: "¿Cuáles son los métodos de pago?",  desc: "Aceptamos tarjetas de crédito/débito y transferencias bancarias." },
  { title: "¿Cómo rastrear mi pedido?",         desc: "Una vez despachado, recibirás un número de seguimiento al correo registrado." },
  { title: "¿Cuál es la política de garantía?", desc: "Ofrecemos garantía de 6 meses a 1 año según marca y categoría. Ver sección Garantía para el detalle por marca." },
  { title: "¿Hacen envíos a todo Venezuela?",   desc: "Sí, realizamos envíos a todas las ciudades y estados de Venezuela." },
  { title: "¿Cómo solicitar soporte técnico?",  desc: `Contáctanos por Instagram ${EMPRESA.instagram}, WhatsApp ${EMPRESA.whatsappDisplay} o al email ${EMPRESA.email}.` },
]

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Ayuda</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">Centro de Ayuda</h1>
      </div>

      <div className="border border-[var(--hairline)]">
        {topics.map((topic, i) => (
          <div key={i} className="group flex items-start justify-between gap-6 border-b border-[var(--hairline)] bg-[var(--surface-1)] p-7 last:border-0 transition-colors hover:bg-[var(--surface-2)]">
            <div>
              <h2 className="font-display text-lg font-light mb-1 group-hover:text-[var(--brass)] transition-colors">{topic.title}</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{topic.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="mt-12 border border-[var(--hairline)] bg-[var(--surface-1)] p-8 text-center">
        <p className="text-sm text-[var(--muted-foreground)] mb-4">¿No encontraste lo que buscabas?</p>
        <Link href="/contact" className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] hover:text-[var(--brass-bright)] transition-colors">
          Contactar soporte →
        </Link>
      </div>
    </div>
  )
}
