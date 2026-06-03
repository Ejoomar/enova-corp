const specs = [
  { label: "Apple",   desc: "iPhone, MacBook, iPad, AirPods" },
  { label: "Samsung", desc: "Galaxy, Book, Tab, Buds" },
  { label: "HP",      desc: "Laptops, LaserJet, OfficeJet" },
  { label: "Lenovo",  desc: "ThinkPad, IdeaPad, Legion" },
  { label: "Brother", desc: "Impresoras, Multifuncionales" },
  { label: "Sony",    desc: "WH/WF-1000X, Xperia, SRS" },
]

export function BrandSection() {
  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <div className="mb-12 grid grid-cols-12 items-end gap-6">
          <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">
            — 04 / 04
          </span>
          <h2 className="col-span-12 font-display text-4xl font-light tracking-[-0.02em] lg:col-span-7">
            Marcas líderes. Garantía oficial.
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--hairline)] border border-[var(--hairline)] sm:grid-cols-3 lg:grid-cols-6">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="group flex flex-col gap-2 px-6 py-8 transition-colors hover:bg-[var(--surface-1)]"
            >
              <span className="font-mono-ui text-sm font-medium text-foreground transition-colors group-hover:text-[var(--brass)]">
                {spec.label}
              </span>
              <span className="font-mono-ui text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                {spec.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
