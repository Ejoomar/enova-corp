"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  tag: string
  title: string
  subtitle: string
  description: string
  cta1: { label: string; href: string }
  cta2: { label: string; href: string }
  image: string
  imageAlt: string
  bg: string
  tagColor: string
  isBrand?: boolean
}

const slides: Slide[] = [
  {
    id: 0,
    tag: "Computación | Equipos Fiscales",
    title: "ENOVA",
    subtitle: "CORP ®",
    description: "Distribuidor oficial de tecnología en Venezuela. Laptops, smartphones, equipos fiscales e impresoras con garantía oficial.",
    cta1: { label: "Ver Catálogo", href: "/catalogo" },
    cta2: { label: "Equipos Fiscales", href: "/products?category=equipos-fiscales" },
    image: "https://images.unsplash.com/photo-1593640408182-31c228d05b95?w=700&q=85",
    imageAlt: "ENOVA CORP — Tecnología Venezuela",
    bg: "from-[#020817] via-[#0a1628] to-[#0c1e3d]",
    tagColor: "bg-[var(--brass)]/20 text-[var(--brass-bright)] border border-[var(--brass)]/40",
    isBrand: true,
  },
  {
    id: 1,
    tag: "Lo más buscado",
    title: "MacBook Air",
    subtitle: "Chip M3",
    description: "Sin ventilador, ultra liviana y con hasta 18 h de batería. La laptop perfecta para trabajo y estudio.",
    cta1: { label: "Ver Laptops", href: "/products?category=laptops" },
    cta2: { label: "Ver Todo", href: "/products" },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&q=85",
    imageAlt: "MacBook Air M3",
    bg: "from-[#0a0a0a] via-[#111827] to-[#1a2744]",
    tagColor: "bg-white/15 text-white border border-white/25",
  },
  {
    id: 2,
    tag: "Nuevo Lanzamiento",
    title: "iPhone 16",
    subtitle: "Pro Max",
    description: "Chip A18 Pro, cámara de 48 MP con zoom óptico 5x y pantalla Super Retina XDR de 6.9\".",
    cta1: { label: "Ver iPhones", href: "/products?category=smartphones" },
    cta2: { label: "Ver Todo", href: "/products" },
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&q=85",
    imageAlt: "iPhone 16 Pro Max",
    bg: "from-[#0c1445] via-[#0f1f5c] to-[#0a2a6e]",
    tagColor: "bg-white/15 text-white border border-white/25",
  },
  {
    id: 3,
    tag: "Top ventas",
    title: "Sony WH-1000XM5",
    subtitle: "Silencio Absoluto",
    description: "Cancelación de ruido de referencia. 8 micrófonos, 30 h de batería y audio LDAC sin compromisos.",
    cta1: { label: "Ver Audio", href: "/products?category=audio" },
    cta2: { label: "Ver Todo", href: "/products" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
    imageAlt: "Sony WH-1000XM5",
    bg: "from-[#0a0a0a] via-[#141414] to-[#1c1c2e]",
    tagColor: "bg-white/15 text-white border border-white/25",
  },
]

export function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  return (
    <section className="relative w-full overflow-hidden border-b border-[var(--hairline)]">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`relative min-w-full bg-gradient-to-r ${slide.bg}`}
              style={{ minHeight: 380 }}
            >
              {/* Noise overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: "url(/noise.svg)" }}
              />

              {/* Blue accent line for brand slide */}
              {slide.isBrand && (
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--brass)] via-[var(--brass-bright)] to-transparent" />
              )}

              <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-6 px-8 py-14 lg:px-14 lg:py-20">

                {/* Text column */}
                <div className="col-span-12 flex flex-col gap-5 lg:col-span-6">
                  <span className={`self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${slide.tagColor}`}>
                    {slide.tag}
                  </span>

                  <div>
                    <h2 className={`font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${slide.isBrand ? "text-[var(--brass-bright)]" : "text-white"}`}>
                      {slide.title}
                    </h2>
                    <h2 className={`font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${slide.isBrand ? "text-white" : "text-white/70"}`}>
                      {slide.subtitle}
                    </h2>
                  </div>

                  <p className="max-w-sm text-sm leading-relaxed text-white/70">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      size="lg"
                      className={slide.isBrand
                        ? "bg-[var(--brass)] text-white hover:bg-[var(--brass-bright)] font-semibold"
                        : "bg-[var(--surface-1)] text-[var(--foreground)] hover:bg-[var(--surface-1)]/90 font-semibold"
                      }
                    >
                      <Link href={slide.cta1.href}>{slide.cta1.label}</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="ghost"
                      className="border border-white/30 text-white hover:bg-white/10"
                    >
                      <Link href={slide.cta2.href}>{slide.cta2.label}</Link>
                    </Button>
                  </div>
                </div>

                {/* Image column */}
                <div className="col-span-12 flex items-center justify-center lg:col-span-6 lg:justify-end">
                  <div className="relative h-[220px] w-[340px] sm:h-[260px] sm:w-[420px] lg:h-[300px] lg:w-[500px]">
                    <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-sm" />
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      className="rounded-2xl object-cover object-center drop-shadow-2xl"
                      sizes="(max-width: 768px) 340px, 500px"
                      priority={slide.id === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow — Prev */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 lg:left-5"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Arrow — Next */}
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 lg:right-5"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-6 bg-[var(--brass-bright)]"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
