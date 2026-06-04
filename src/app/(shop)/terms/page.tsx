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
          { title: "4. Garantías",               body: "Los productos adquiridos en ENOVA CORP ® están cubiertos por la garantía oficial del fabricante según las condiciones de cada marca. Las garantías no cubren daños por mal uso." },
          { title: "5. Devoluciones",            body: "Las devoluciones están sujetas a verificación del estado del producto. Se aceptan dentro de los 7 días calendario posteriores a la recepción, con empaque original y sin señales de uso." },
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
