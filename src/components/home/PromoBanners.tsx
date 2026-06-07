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
    bg: "from-zinc-900 to-slate-800",
    accent: "border-[var(--color-warning)]",
    tagColor: "bg-[var(--color-warning)] text-[var(--foreground)]",
    image: "/images/categories/impresoras.jpg",
  },
  {
    id: 2,
    tag: "Conectividad",
    title: "Redes &\nInfraestructura",
    subtitle: "TP-Link · Mercusys · Mikrotik",
    cta: "Ver redes",
    href: "/products?category=redes",
    bg: "from-blue-950 to-slate-900",
    accent: "border-[var(--color-info)]",
    tagColor: "bg-[var(--color-info)] text-[var(--primary-foreground)]",
    image: "/images/categories/redes.jpg",
  },
  {
    id: 3,
    tag: "Vigilancia",
    title: "Cámaras\nde Seguridad",
    subtitle: "EZVIZ · Hikvision · IP · CCTV",
    cta: "Ver cámaras",
    href: "/products?category=camaras",
    bg: "from-stone-900 to-zinc-800",
    accent: "border-orange-400",
    tagColor: "bg-orange-400 text-white",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&q=80",
  },
]

export function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className={`group relative overflow-hidden rounded-2xl border-2 ${banner.accent} bg-gradient-to-br ${banner.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30`}
          >
            {/* Tag */}
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${banner.tagColor} mb-3`}
            >
              {banner.tag}
            </span>

            {/* Title */}
            <h3 className="whitespace-pre-line text-xl font-bold leading-tight text-white">
              {banner.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">{banner.subtitle}</p>

            {/* CTA */}
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-warning)] group-hover:underline">
              {banner.cta} →
            </span>

            {/* Product image floating */}
            <div className="pointer-events-none absolute right-4 bottom-4 opacity-70 transition-opacity group-hover:opacity-100">
              <div className="relative" style={{ width: 100, height: 100 }}>
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="100px"
                />
              </div>
            </div>

            {/* Bottom gradient */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
          </Link>
        ))}
      </div>
    </section>
  )
}
