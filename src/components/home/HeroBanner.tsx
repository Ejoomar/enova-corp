"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBannerStore } from "@/stores/banner-store"

export function HeroBanner() {
  const allSlides = useBannerStore((s) => s.slides)
  const slides = [...allSlides]
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order)
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

  // Accesibilidad: detener el autoplay si el usuario pide menos movimiento
  useEffect(() => {
    if (!emblaApi) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      emblaApi.plugins().autoplay?.stop()
    }
  }, [emblaApi])

  // Skeleton mientras Zustand hidrata desde localStorage
  if (slides.length === 0) {
    return (
      <section
        className="relative w-full border-b border-[var(--hairline)] animate-pulse bg-[var(--surface-1)]"
        style={{ minHeight: 380 }}
        aria-hidden="true"
      />
    )
  }

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
              {/* ── Fondo SVG — todas las pantallas ── */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.bgImage}
                alt=""
                aria-hidden="true"
                loading={slide.order === 0 ? "eager" : "lazy"}
                fetchPriority={slide.order === 0 ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: slide.imagePosition ?? "center center" }}
              />
              {/* Overlay oscuro para legibilidad del texto en móvil */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 lg:from-transparent lg:via-transparent lg:to-transparent" />

              {/* Noise overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: "url(/noise.svg)" }}
              />

              {/* Blue accent line for brand slide */}
              {slide.isBrand && (
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--brass)] via-[var(--brass-bright)] to-transparent" />
              )}

              <div className="relative mx-auto flex max-w-[1440px] items-center px-8 py-14 lg:px-14 lg:py-20">

                {/* Text column — full width */}
                <div className="flex max-w-xl flex-col gap-5">
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
                      <Link href={slide.cta1Href}>{slide.cta1Label}</Link>
                    </Button>
                    {slide.cta2Label && (
                      <Button
                        asChild
                        size="lg"
                        variant="ghost"
                        className="border border-white/30 text-white hover:bg-white/10"
                      >
                        <Link href={slide.cta2Href}>{slide.cta2Label}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows and dots — only when there is more than one slide */}
      {slides.length > 1 && (
        <>
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

          {/* Dot indicators — el activo muestra el progreso del autoplay (5s) */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-white/25"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              >
                {i === selectedIndex && (
                  <span
                    key={selectedIndex}
                    className="absolute inset-0 origin-left rounded-full bg-[var(--brass-bright)] motion-safe:animate-[dot-progress_5s_linear_forwards] motion-reduce:transform-none"
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
