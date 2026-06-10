export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Garantía</span>
        <div className="col-span-12 lg:col-span-8">
          <h1 className="font-display text-[length:var(--text-h1)] font-light leading-[1.1] mb-4">
            Garantía de<br />fábrica en todos<br />los productos
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xl">
            El servicio técnico de garantía es atendido directamente por ENOVA CORP, sin necesidad de enviar el equipo al fabricante.
          </p>
        </div>
      </div>

      {/* Brand warranty table */}
      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] sm:grid-cols-2 mb-8">
        {[
          { brand: "Dell",      period: "1 año",   coverage: "Laptops Vostro, Inspiron y desktops OptiPlex. Cobertura total de hardware." },
          { brand: "HP",        period: "1 año",   coverage: "Laptops y desktops EliteDesk. Soporte técnico incluido." },
          { brand: "Lenovo",    period: "1 año",   coverage: "ThinkCentre y IdeaCentre. Garantía de hardware completa." },
          { brand: "Epson",     period: "1 año",   coverage: "Impresoras EcoTank y multifuncionales. Cabezal y componentes." },
          { brand: "TP-Link",   period: "6 meses", coverage: "Routers, switches y access points. Reemplazo por defecto de fábrica." },
          { brand: "Mercusys",  period: "6 meses", coverage: "Routers y repetidores de red. Defectos de fabricación." },
          { brand: "Hikvision", period: "6 meses", coverage: "Cámaras IP, DVRs y accesorios. Componentes electrónicos." },
          { brand: "EZVIZ",     period: "6 meses", coverage: "Cámaras inteligentes y cerraduras. Defectos de fábrica." },
          { brand: "ACLAS",     period: "6 meses", coverage: "Balanzas e impresoras fiscales homologadas SENIAT." },
          { brand: "Hiksemi",   period: "6 meses", coverage: "SSDs, memorias RAM y almacenamiento flash." },
        ].map((item) => (
          <div key={item.brand} className="border border-[var(--hairline)] bg-[var(--surface-1)] p-7">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-xl font-light tracking-[-0.02em]">{item.brand}</h2>
              <span className="font-mono-ui text-[11px] text-[var(--brass)]">{item.period}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.coverage}</p>
          </div>
        ))}
      </div>

      {/* UPS special notice */}
      <div className="mb-8 border border-amber-500/20 bg-amber-500/5 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
          <div>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-amber-500/80 mb-3">
              Nota especial — UPS y reguladores
            </p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
              Los UPS y reguladores tienen <strong className="text-foreground">garantía limitada</strong>. En condiciones eléctricas normales, la vida útil estimada es de aproximadamente 18 meses. En Venezuela, debido a las fluctuaciones e interrupciones del servicio eléctrico, la durabilidad real puede reducirse a entre 8 y 12 meses según la zona y la frecuencia de los cortes. Esta variación está fuera del control del fabricante y de ENOVA CORP, y no aplica como defecto de garantía.
            </p>
          </div>
        </div>
      </div>

      {/* How to claim */}
      <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-4">
          Para hacer válida tu garantía
        </p>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
          Contáctanos por WhatsApp o email con tu número de pedido y una descripción del problema. Responderemos en menos de 24 horas hábiles para coordinar la revisión. El servicio técnico se realiza directamente en nuestras instalaciones: Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida.
        </p>
      </div>
    </div>
  )
}
