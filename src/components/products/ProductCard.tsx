"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { cn } from "@/lib/utils"
import { formatUSD, formatBsF, usdToBsF } from "@/lib/currency"

interface ProductCardProps {
  product: Product
  bsfRate?: number | null
}

export function ProductCard({ product, bsfRate }: ProductCardProps) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const [imgError, setImgError] = useState(false)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const productImage = (!imgError && product.images?.[0]) ? product.images[0] : null
  const sinPrecio = !product.price || product.price === 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <article className="group flex flex-col">
      {/* Media */}
      <Link href={`/products/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden border border-[var(--hairline)] bg-white transition-colors group-hover:border-[var(--brass)]/40">

          {/* Tags */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="font-mono-ui border border-[var(--brass)]/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--brass)]">
                Nuevo
              </span>
            )}
            {hasDiscount && (
              <span className="font-mono-ui border border-[var(--muted-foreground)]/30 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 border border-[var(--hairline)] bg-[var(--background)]/80 hover:border-[var(--brass)] hover:text-[var(--brass)]"
              aria-label="Ver producto"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(`/products/${product.slug}`)
              }}
            >
              <Eye className="h-3 w-3" />
              <span className="sr-only">Ver producto</span>
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-full w-full">
            {productImage ? (
              <Image
                src={productImage}
                alt={product.name}
                fill
                className="object-contain p-4 grayscale-[8%] contrast-[1.05] transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center">
                <span className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
                  {product.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Meta */}
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5">
        <div className="min-w-0">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {product.brand} · {product.category}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display mt-1 text-base font-light leading-tight tracking-[-0.01em] transition-colors group-hover:text-[var(--brass-bright)]">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="shrink-0 text-right">
          {sinPrecio ? (
            <a
              href={`https://wa.me/584223668201?text=${encodeURIComponent("Hola ENOVA CORP, quiero cotizar: " + product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] hover:text-[var(--brass-bright)]"
              onClick={(e) => e.stopPropagation()}
            >
              Cotizar
            </a>
          ) : (
            <>
              <p className="font-mono-ui text-sm tabular-nums text-foreground">
                {formatUSD(product.price)}
              </p>
              {bsfRate !== null && bsfRate !== undefined && (
                <p className="font-mono-ui text-[10px] tabular-nums text-[var(--muted-foreground)]">
                  {formatBsF(usdToBsF(product.price, bsfRate))}
                </p>
              )}
              {hasDiscount && (
                <p className="font-mono-ui text-[10px] tabular-nums text-[var(--muted-foreground)] line-through">
                  {formatUSD(product.originalPrice!)}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Specs hairline */}
      <div className="mt-3 border-t border-[var(--hairline)] pt-3">
        <div className="grid grid-cols-2 gap-x-3">
          <p className="font-mono-ui text-[10px] text-[var(--muted-foreground)]">
            {sinPrecio ? (
              <span className="text-[var(--muted-foreground)]">Bajo cotización</span>
            ) : product.stock > 0 ? (
              <span className="text-[var(--color-success)]">En stock</span>
            ) : (
              <span className="text-destructive">Agotado</span>
            )}
          </p>
          {sinPrecio ? (
            <a
              href={`https://wa.me/584223668201?text=${encodeURIComponent("Hola ENOVA CORP, quiero cotizar: " + product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono-ui text-right text-[10px] uppercase tracking-[0.14em] text-[var(--color-success)] transition-colors hover:opacity-80"
            >
              Cotizar →
            </a>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                "font-mono-ui text-right text-[10px] uppercase tracking-[0.14em] transition-colors",
                product.stock > 0
                  ? "text-[var(--muted-foreground)] hover:text-[var(--brass)]"
                  : "cursor-not-allowed opacity-40"
              )}
            >
              + Agregar
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
