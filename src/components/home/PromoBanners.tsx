import Link from "next/link"
import Image from "next/image"

const banners = [
  {
    id: 1,
    tag: "Lo más vendido",
    title: "Smartphones\nde alta gama",
    subtitle: "iPhone 16 · Galaxy S25 · Z Fold 6",
    cta: "Ver smartphones",
    href: "/products?category=smartphones",
    bg: "from-zinc-900 to-slate-800",
    accent: "border-amber-400",
    tagColor: "bg-amber-400 text-black",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80",
  },
  {
    id: 2,
    tag: "Nuevos ingresos",
    title: "Audio y\nAuriculares",
    subtitle: "Sony WH-1000XM5 · AirPods Pro 2",
    cta: "Ver audio",
    href: "/products?category=audio",
    bg: "from-blue-950 to-slate-900",
    accent: "border-blue-400",
    tagColor: "bg-blue-400 text-white",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
  },
  {
    id: 3,
    tag: "Para gamers",
    title: "Gaming\nde alto nivel",
    subtitle: "Monitores · Periféricos · GPUs",
    cta: "Ver gaming",
    href: "/products?category=gaming",
    bg: "from-stone-900 to-zinc-800",
    accent: "border-orange-400",
    tagColor: "bg-orange-400 text-white",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80",
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
            <p className="mt-1 text-xs text-slate-400">{banner.subtitle}</p>

            {/* CTA */}
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:underline">
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
