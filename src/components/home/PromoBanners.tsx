import Link from "next/link"
import Image from "next/image"

const banners = [
  {
    id: 1,
    tag: "Lo más vendido",
    title: "Impresoras\nHP & Epson",
    subtitle: "LaserJet · OfficeJet · EcoTank",
    cta: "Ver impresoras",
    href: "/products?category=impresoras",
    // Tailwind bg classes for the card itself
    bgFrom: "#18181b",
    bgTo: "#27272a",
    accent: "#f59e0b",
    tagBg: "bg-amber-400",
    tagText: "text-zinc-900",
    image: "/images/categories/impresoras.jpg",
    // Color used in the blending gradient (must match bgFrom)
    fadeColor: "18,24,36",
  },
  {
    id: 2,
    tag: "Conectividad",
    title: "Redes &\nInfraestructura",
    subtitle: "TP-Link · Mercusys · Mikrotik",
    cta: "Ver redes",
    href: "/products?category=redes",
    bgFrom: "#0c1445",
    bgTo: "#0f172a",
    accent: "#60a5fa",
    tagBg: "bg-blue-500",
    tagText: "text-white",
    image: "/images/categories/redes.jpg",
    fadeColor: "12,20,69",
  },
  {
    id: 3,
    tag: "Vigilancia",
    title: "Cámaras\nde Seguridad",
    subtitle: "EZVIZ · Hikvision · IP · CCTV",
    cta: "Ver cámaras",
    href: "/products?category=camaras",
    bgFrom: "#1c1007",
    bgTo: "#1a1a1a",
    accent: "#fb923c",
    tagBg: "bg-orange-400",
    tagText: "text-white",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80",
    fadeColor: "28,16,7",
  },
]

export function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {banners.map((b) => (
          <Link
            key={b.id}
            href={b.href}
            className="group relative h-48 overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 sm:h-52"
            style={{ background: `linear-gradient(135deg, ${b.bgFrom} 0%, ${b.bgTo} 100%)` }}
          >
            {/* ── Full-bleed image on the right, faded into background ── */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%] transition-transform duration-500 group-hover:scale-105">
              <Image
                src={b.image}
                alt=""
                fill
                className="object-cover object-left"
                sizes="(max-width: 640px) 62vw, 200px"
              />
              {/* Left-fade: blends image into card background seamlessly */}
              <div
                className="absolute inset-y-0 left-0 w-[70%]"
                style={{
                  background: `linear-gradient(to right, rgb(${b.fadeColor}) 0%, rgba(${b.fadeColor},0.85) 30%, rgba(${b.fadeColor},0) 100%)`,
                }}
              />
            </div>

            {/* ── Bottom vignette ── */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background: `linear-gradient(to top, rgb(${b.fadeColor}) 0%, rgba(${b.fadeColor},0) 100%)`,
              }}
            />

            {/* ── Accent border glow ── */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-70"
              style={{ boxShadow: `inset 0 0 0 1.5px ${b.accent}` }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 flex h-full flex-col justify-between p-5">
              {/* Tag */}
              <span className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${b.tagBg} ${b.tagText}`}>
                {b.tag}
              </span>

              {/* Title + CTA */}
              <div>
                <h3
                  className="whitespace-pre-line text-xl font-bold leading-tight text-white drop-shadow-md"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
                >
                  {b.title}
                </h3>
                <p className="mt-1 text-[11px] text-white/50">{b.subtitle}</p>
                <span
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold transition-gap duration-200 group-hover:gap-2"
                  style={{ color: b.accent }}
                >
                  {b.cta} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
