"use client"

import { useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"

const categoryImages: Record<string, string> = {
  "laptops":          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85",
  "perifericos":      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=85",
  "redes":            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=85",
  "impresoras":       "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=85",
  "equipos-fiscales": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
  "consumibles":      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=85",
  "camaras":          "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=85",
  "otros":            "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=85",
}

/* ── Desktop filmstrip card ── */
interface FilmCardProps {
  index: number
  name: string
  slug: string
  productCount: number
}

function FilmCard({ index, name, slug, productCount }: FilmCardProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const num = String(index + 1).padStart(2, "0")
  const imageSrc = categoryImages[slug]

  const handleMouseEnter = useCallback(() => {
    if (imgWrapRef.current) {
      imgWrapRef.current.style.transition = "transform 80ms linear"
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!imgWrapRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    imgWrapRef.current.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!imgWrapRef.current) return
    imgWrapRef.current.style.transition = "transform 700ms cubic-bezier(0.16,1,0.3,1)"
    imgWrapRef.current.style.transform = "translate(0, 0)"
    const el = imgWrapRef.current
    setTimeout(() => {
      if (el) el.style.transition = "transform 80ms linear"
    }, 720)
  }, [])

  return (
    <Link
      href={`/products?category=${slug}`}
      className="film-card relative min-w-0 flex-1 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[#070b10]" />
      {imageSrc && (
        <div ref={imgWrapRef} className="absolute" style={{ inset: "-10px" }}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="film-img object-cover"
            sizes="20vw"
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/5" />
      <span className="film-num pointer-events-none absolute left-3.5 top-3.5 font-mono-ui text-[9px] tracking-[0.14em] text-white/30">
        {num}
      </span>
      <span className="film-arrow pointer-events-none absolute right-3.5 top-3.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[var(--brass)]/50 bg-[var(--brass)]/25 text-[11px] text-[var(--brass-bright)]">
        →
      </span>
      <div className="film-line pointer-events-none absolute bottom-0 left-0 h-0.5 bg-[var(--brass)]" />
      <div className="pointer-events-none absolute bottom-[18px] left-3.5 right-3.5 overflow-hidden">
        <div className="relative mb-1 h-[1.35em] overflow-hidden">
          <span className="split-left absolute left-0 top-0 inline-block overflow-hidden whitespace-nowrap text-[15px] font-semibold text-white">
            {name}
          </span>
          <span className="split-right absolute left-0 top-0 inline-block overflow-hidden whitespace-nowrap text-[15px] font-semibold text-white">
            {name}
          </span>
        </div>
        <span className="film-count font-mono-ui text-[9px] uppercase tracking-[0.1em]">
          {productCount} productos
        </span>
      </div>
    </Link>
  )
}

/* ── Mobile grid card ── */
interface MobileCardProps {
  name: string
  slug: string
  productCount: number
}

function MobileCard({ name, slug, productCount }: MobileCardProps) {
  const imageSrc = categoryImages[slug]
  return (
    <Link
      href={`/products?category=${slug}`}
      className="group relative h-36 overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 bg-[#070b10]" />
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover brightness-[0.55] transition-transform duration-500 group-active:scale-105"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      {/* Línea azul inferior en hover/active */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--brass)] transition-all duration-300 group-active:w-full" />
      <div className="absolute bottom-0 left-0 p-3">
        <p className="text-[13px] font-semibold leading-tight text-white">{name}</p>
        <p className="mt-0.5 font-mono-ui text-[9px] uppercase tracking-[0.1em] text-white/50">
          {productCount} prod.
        </p>
      </div>
    </Link>
  )
}

/* ── Main section ── */
export function CategoryGrid() {
  const { categories, fetchCategories } = useProductsStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <section className="border-b border-[var(--hairline)] py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-8 md:mb-12 grid grid-cols-12 items-end gap-4 md:gap-6">
          <h2 className="col-span-12 font-display text-3xl md:text-4xl font-light tracking-[-0.02em] lg:col-span-7">
            Todo en tecnología.<br />Un solo lugar.
          </h2>
        </div>

        {/* ── MOBILE: 2-col grid ── */}
        <div className="md:hidden">
          {categories.length === 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => (
                  <MobileCard
                    key={category.id}
                    name={category.name}
                    slug={category.slug}
                    productCount={category.productCount}
                  />
                ))}
              </div>
              {/* CTA móvil */}
              <Link
                href="/products"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--brass)]/40 bg-[var(--brass)]/10 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] transition-colors active:bg-[var(--brass)]/20"
              >
                Ver catálogo completo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* ── DESKTOP: filmstrip accordion ── */}
        <div className="hidden md:block">
          {categories.length === 0 ? (
            <div className="flex h-[380px] gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="flex-1 rounded-none" />
              ))}
            </div>
          ) : (
            <>
              <div className="filmstrip-grid flex h-[380px] gap-0.5 overflow-hidden rounded-lg border border-[var(--hairline)]">
                {categories.slice(0, 6).map((category, i) => (
                  <FilmCard
                    key={category.id}
                    index={i}
                    name={category.name}
                    slug={category.slug}
                    productCount={category.productCount}
                  />
                ))}
              </div>
              {/* CTA desktop */}
              <div className="mt-6 flex justify-end">
                <Link
                  href="/products"
                  className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)]"
                >
                  Ver todas las categorías →
                </Link>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
