"use client"

import { useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"

const categoryImages: Record<string, string> = {
  "laptops":          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85",
  "smartphones":      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85",
  "equipos-fiscales": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85",
  "impresoras":       "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=85",
  "perifericos":      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=85",
  "gaming":           "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=85",
  "audio":            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85",
}

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
      {/* Fondo oscuro base */}
      <div className="absolute inset-0 bg-[#070b10]" />

      {/* Wrapper parallax — margen negativo para espacio de movimiento */}
      {imageSrc && (
        <div ref={imgWrapRef} className="absolute" style={{ inset: "-10px" }}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="film-img object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      )}

      {/* Gradiente overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-black/5" />

      {/* Número top-left */}
      <span className="film-num pointer-events-none absolute left-3.5 top-3.5 font-mono-ui text-[9px] tracking-[0.14em] text-white/30">
        {num}
      </span>

      {/* Flecha top-right */}
      <span className="film-arrow pointer-events-none absolute right-3.5 top-3.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[var(--brass)]/50 bg-[var(--brass)]/25 text-[11px] text-[var(--brass-bright)]">
        →
      </span>

      {/* Línea azul inferior */}
      <div className="film-line pointer-events-none absolute bottom-0 left-0 h-0.5 bg-[var(--brass)]" />

      {/* Info — nombre y conteo */}
      <div className="pointer-events-none absolute bottom-[18px] left-3.5 right-3.5 overflow-hidden">
        {/* Split text — nombre duplicado con clip-path en cada mitad */}
        <div className="relative mb-1 h-[1.35em] overflow-hidden">
          <span className="split-left absolute left-0 top-0 inline-block overflow-hidden whitespace-nowrap text-[15px] font-semibold text-white">
            {name}
          </span>
          <span className="split-right absolute left-0 top-0 inline-block overflow-hidden whitespace-nowrap text-[15px] font-semibold text-white">
            {name}
          </span>
        </div>
        {/* Conteo de productos */}
        <span className="film-count font-mono-ui text-[9px] uppercase tracking-[0.1em]">
          {productCount} productos
        </span>
      </div>
    </Link>
  )
}

export function CategoryGrid() {
  const { categories, fetchCategories } = useProductsStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <div className="mb-12 grid grid-cols-12 items-end gap-6">
          <h2 className="col-span-12 font-display text-4xl font-light tracking-[-0.02em] lg:col-span-7">
            Todo en tecnología.<br />Un solo lugar.
          </h2>
          <Link
            href="/products"
            className="col-span-12 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)] lg:col-span-3 lg:justify-self-end"
          >
            Ver todas las categorías →
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="flex h-[380px] gap-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 rounded-none" />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  )
}
