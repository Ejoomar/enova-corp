"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { formatUSD } from "@/lib/currency"

interface RelatedProductsProps {
  products: Product[]
  categorySlug: string
  categoryName: string
}

interface RailCardProps {
  product: Product
  index: number
}

function RailCard({ product, index }: RailCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const num = String(index + 1).padStart(2, "0")
  const sinPrecio = !product.price || product.price === 0
  const img = product.images?.[0] ?? null

  return (
    <div className="group relative flex w-[210px] flex-shrink-0 flex-col overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--surface-1)] transition-colors hover:border-[var(--brass)]/40">

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative flex h-40 items-center justify-center border-b border-[var(--hairline)] bg-[var(--surface-2)]">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-contain p-3 grayscale-[8%] contrast-[1.05] transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="210px"
            />
          ) : (
            <span className="px-2 text-center font-mono-ui text-[9px] text-[var(--muted-foreground)]">
              {product.name}
            </span>
          )}
          {product.isNew && (
            <span className="absolute left-2 top-2 border border-[var(--brass)]/40 bg-[var(--brass)]/10 px-1.5 py-0.5 font-mono-ui text-[8px] uppercase tracking-[0.12em] text-[var(--brass)]">
              Nuevo
            </span>
          )}
        </div>
      </Link>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-1 font-mono-ui text-[8px] tracking-[0.14em] text-[var(--hairline)]">
          {num}
        </p>
        <p className="font-mono-ui text-[9px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 flex-1 font-display text-[13px] font-light leading-snug tracking-[-0.01em] text-foreground transition-colors hover:text-[var(--brass-bright)]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between border-t border-[var(--hairline)] pt-2.5">
          {sinPrecio ? (
            <a
              href={`https://wa.me/584223668201?text=${encodeURIComponent(
                "Hola ENOVA CORP, quiero cotizar: " + product.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)]"
              onClick={(e) => e.stopPropagation()}
            >
              Cotizar →
            </a>
          ) : (
            <>
              <p className="font-mono-ui text-[13px] font-semibold tabular-nums text-[var(--brass-bright)]">
                {formatUSD(product.price)}
              </p>
              <button
                onClick={() => addItem(product)}
                disabled={product.stock === 0}
                className="font-mono-ui text-[9px] uppercase tracking-[0.1em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Agregar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Línea azul inferior al hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--brass)] transition-all duration-300 ease-out group-hover:w-full" />
    </div>
  )
}

export function RelatedProducts({
  products,
  categorySlug,
  categoryName,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const CARD_W = 222 // 210px card + 12px gap
  const PAGE   = 4   // cards por scroll

  const updateButtons = () => {
    const el = scrollRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateButtons()
    const el = scrollRef.current
    el?.addEventListener("scroll", updateButtons, { passive: true })
    return () => el?.removeEventListener("scroll", updateButtons)
  }, [])

  if (products.length === 0) return null

  return (
    <section className="border-t border-[var(--hairline)] pt-16 mt-16">

      {/* Header editorial */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            — Misma categoría
          </p>
          <h2 className="font-display text-3xl font-light tracking-[-0.02em]">
            También te puede<br />interesar.
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/products?category=${categorySlug}`}
            className="hidden border-b border-[var(--brass)]/35 pb-0.5 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)] sm:block"
          >
            Ver {categoryName} →
          </Link>
          <div className="flex gap-1.5">
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: -CARD_W * PAGE, behavior: "smooth" })
              }
              disabled={!canPrev}
              aria-label="Anteriores"
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--hairline)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--brass)] hover:text-[var(--brass)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: CARD_W * PAGE, behavior: "smooth" })
              }
              disabled={!canNext}
              aria-label="Siguientes"
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--hairline)] text-[var(--muted-foreground)] transition-colors hover:border-[var(--brass)] hover:text-[var(--brass)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rail deslizante */}
      <div
        ref={scrollRef}
        onScroll={updateButtons}
        className="flex gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product, i) => (
          <RailCard key={product.id} product={product} index={i} />
        ))}
      </div>

    </section>
  )
}
