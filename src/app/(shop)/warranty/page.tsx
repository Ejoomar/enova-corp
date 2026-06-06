export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Garantía</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Garantía de<br />6 meses a 1 año
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] sm:grid-cols-2 mb-12">
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

      <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
        <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-4">Para hacer válida tu garantía</p>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
          Contacta a nuestro equipo de soporte con tu número de pedido y descripción del problema.
          Responderemos en menos de 24 horas hábiles para coordinar la revisión o reemplazo del equipo.
        </p>
      </div>
    </div>
  )
}
