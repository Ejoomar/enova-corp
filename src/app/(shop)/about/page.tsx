export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Empresa</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Sobre<br />ENOVA CORP ®
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] lg:grid-cols-3">
        {[
          { num: "01", title: "Quiénes somos", body: "ENOVA CORP ® es un distribuidor oficial de tecnología en Venezuela, especializado en computación, equipos fiscales, smartphones e impresoras. Operamos con las marcas líderes del mercado global." },
          { num: "02", title: "Nuestra misión", body: "Acercar la tecnología de última generación a empresas y consumidores venezolanos, con garantía oficial, soporte técnico y los mejores precios del mercado nacional." },
          { num: "03", title: "Nuestra garantía", body: "Todos nuestros productos cuentan con garantía oficial de fábrica. Trabajamos directamente con distribuidores autorizados de Apple, Samsung, HP, Lenovo y Brother." },
        ].map((item) => (
          <div key={item.num} className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8">
            <span className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">{item.num}</span>
            <h2 className="font-display text-2xl font-light mt-4 mb-3 tracking-[-0.02em]">{item.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 gap-px border border-[var(--hairline)] sm:grid-cols-4">
        {[
          { stat: "10+", label: "Años en el mercado" },
          { stat: "50+", label: "Marcas distribuidas" },
          { stat: "5K+", label: "Clientes satisfechos" },
          { stat: "24h", label: "Soporte técnico" },
        ].map((item) => (
          <div key={item.stat} className="border border-[var(--hairline)] bg-[var(--surface-1)] p-8 text-center">
            <p className="font-display text-4xl font-light text-[var(--brass)]">{item.stat}</p>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
