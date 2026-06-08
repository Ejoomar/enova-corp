export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Legal</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Términos y<br />Condiciones
        </h1>
      </div>

      <div className="max-w-3xl space-y-10">
        {[
          { title: "1. Aceptación de términos", body: "Al acceder y utilizar el sitio web de ENOVA CORP ®, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte, no podrá acceder al servicio." },
          { title: "2. Productos y precios",     body: "ENOVA CORP ® se reserva el derecho de modificar precios, disponibilidad y descripción de productos sin previo aviso. Los precios pueden estar expresados en USD o Bolívares según se indique." },
          { title: "3. Proceso de compra",       body: "Al realizar un pedido, usted garantiza que la información proporcionada es veraz y completa. ENOVA CORP ® se reserva el derecho de cancelar pedidos por razones de stock o error en precios." },
          { title: "4. Garantías",               body: "La garantía varía según el tipo de producto: laptops, PCs y computadoras tienen 1 año de garantía. Otros equipos tienen garantía de 3, 6 o 12 meses según la categoría. Los equipos UPS tienen garantía limitada, ya que su vida útil depende directamente de la estabilidad eléctrica de la zona donde se instalen, factor que escapa al control de ENOVA CORP ®. El servicio de garantía lo realizamos nosotros mismos. Las garantías no cubren daños por mal uso." },
          { title: "5. Devoluciones",            body: "ENOVA CORP ® no maneja devoluciones como política general. El cliente es responsable de estar seguro del producto que adquiere antes de realizar el pago. La única excepción se aplica cuando el error es nuestro: si despachamos un equipo incorrecto por equivocación en el envío, coordinamos el cambio sin costo adicional para el cliente." },
          { title: "6. Limitación de responsabilidad", body: "ENOVA CORP ® no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de los productos adquiridos." },
        ].map((section) => (
          <div key={section.title} className="border-b border-[var(--hairline)] pb-10 last:border-0">
            <h2 className="font-display text-xl font-light mb-3 tracking-[-0.01em]">{section.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{section.body}</p>
          </div>
        ))}

        <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
          Última actualización: Junio 2025 · ENOVA CORP ® Venezuela
        </p>
      </div>
    </div>
  )
}
