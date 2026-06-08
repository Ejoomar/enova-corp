const faqs = [
  {
    q: "¿Cuáles son los métodos de pago aceptados?",
    a: "Aceptamos transferencias bancarias nacionales (Mercantil y Provincial), Zelle, Binance Pay y Pago Móvil. Al finalizar tu pedido te indicamos los datos según el método elegido.",
  },
  {
    q: "¿Los precios están en dólares?",
    a: "Sí, los precios se muestran en USD. El pago puede realizarse en dólares (Zelle, Binance) o en bolívares a la tasa del día según el método de pago elegido.",
  },
  {
    q: "¿Tienen política de devoluciones?",
    a: "No manejamos devoluciones como política general. En el caso de que ocurra un error de despacho por nuestra parte (equipo enviado incorrecto), coordinamos el cambio sin costo adicional. Para defectos de fábrica aplica la garantía del producto.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: "El despacho se realiza al día hábil siguiente de confirmado el pago, vía MRW. El tiempo de entrega al interior del país varía según la ciudad, generalmente entre 2 y 4 días hábiles adicionales.",
  },
  {
    q: "¿Hacen envíos a todo Venezuela?",
    a: "Sí, enviamos a cualquier ciudad del país por MRW. También está disponible el retiro en tienda en C.C. Alto Chama, Local 105-A, Mérida, el mismo día hábil.",
  },
  {
    q: "¿Tienen garantía los productos?",
    a: "Sí. La garantía varía según la categoría del producto: laptops y computadoras tienen 1 año, otros equipos entre 3 y 6 meses. Para UPS y reguladores aplica una garantía limitada (ver página de garantía para detalles). El servicio técnico de garantía lo realizamos nosotros directamente.",
  },
  {
    q: "¿Los equipos fiscales requieren instalación?",
    a: "Sí, los equipos fiscales SENIAT requieren configuración. Ofrecemos servicio de instalación y programación. Coordínalo con nosotros al momento de la compra.",
  },
  {
    q: "¿Tienen servicio técnico propio?",
    a: "Sí. Contamos con técnicos propios para las marcas que distribuimos. El servicio técnico —incluido el de garantía— se coordina directamente con ENOVA CORP.",
  },
  {
    q: "¿Hacen descuentos para empresas?",
    a: "Sí, ofrecemos precios especiales para clientes corporativos que ejecuten proyectos tecnológicos. El descuento aplica por proyecto, no por cantidad de un mismo producto. Contáctanos para una cotización personalizada.",
  },
  {
    q: "¿Los productos son originales?",
    a: "100%. Somos distribuidores autorizados. Todos los productos incluyen factura oficial y garantía de fábrica.",
  },
  {
    q: "¿Cuál es el horario de atención?",
    a: "Lunes a viernes de 9:00 AM a 6:00 PM y sábados de 9:00 AM a 4:00 PM. Los domingos no atendemos. Puedes escribirnos por WhatsApp fuera de horario y te respondemos al próximo día hábil.",
  },
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
