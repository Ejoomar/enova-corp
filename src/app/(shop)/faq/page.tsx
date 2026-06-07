const faqs = [
  { q: "¿Los precios incluyen IVA?",                   a: "Los equipos fiscales están sujetos a IVA según la legislación venezolana. Los demás productos se indican con o sin IVA en su ficha." },
  { q: "¿Cuáles son los métodos de pago aceptados?",   a: "Aceptamos USD, Bolívares, Zelle, Pago Móvil, Binance, Cashea y transferencias a todos los bancos venezolanos." },
  { q: "¿Puedo devolver un producto?",                  a: "Aceptamos devoluciones dentro de los primeros 7 días si el producto presenta defectos de fábrica, con su empaque original." },
  { q: "¿Los equipos fiscales requieren instalación?",  a: "Sí, los equipos fiscales SENIAT requieren configuración. Ofrecemos servicio de instalación y programación incluida." },
  { q: "¿Tienen servicio técnico propio?",              a: "Contamos con técnicos certificados para las marcas que distribuimos. El servicio técnico se coordina previa cita." },
  { q: "¿Hacen descuentos por volumen?",                a: "Sí, ofrecemos precios especiales para compras mayores a 5 unidades. Contáctanos para una cotización B2B personalizada." },
  { q: "¿Los productos son originales?",                a: "100%. Somos distribuidores autorizados. Todos los productos vienen con factura oficial y garantía de 6 meses a 1 año según la marca." },
  { q: "¿Cuánto tarda la entrega en el interior?",     a: "El tiempo de entrega al interior del país es de 3 a 5 días hábiles dependiendo de la ciudad." },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— FAQ</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Preguntas<br />frecuentes
        </h1>
      </div>

      <div className="border border-[var(--hairline)]">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[var(--hairline)] bg-[var(--surface-1)] p-7 last:border-0">
            <h2 className="font-display text-lg font-light mb-2 tracking-[-0.01em]">{faq.q}</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
