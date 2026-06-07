"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useDolarRate } from "@/hooks/useDolarRate"
import { formatBsF, usdToBsF } from "@/lib/currency"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface CatalogProduct {
  id: string
  name: string
  category: string
  categoryLabel?: string
  slug: string
  price: number | null
  plusIva?: boolean
  code?: string
  image: string
  localImage?: string
  url?: string
}

interface CatalogGridProps {
  products: CatalogProduct[]
}

// ─────────────────────────────────────────────
// Category labels for filter chips
// ─────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  laptops:            "Laptops / PCs",
  perifericos:        "Periféricos",
  redes:              "Redes",
  impresoras:         "Impresoras",
  "equipos-fiscales": "Equipos Fiscales",
  consumibles:        "Consumibles",
  camaras:            "Cámaras",
  otros:              "Otros",
  general:            "General",
}

// ─────────────────────────────────────────────
// Product Card
// ─────────────────────────────────────────────
function ProductCard({ product, bcvRate }: { product: CatalogProduct; bcvRate: number | null }) {
  const [imgError, setImgError] = useState(false)
  const hasPrice = product.price != null && product.price > 0
  const bsValue = (bcvRate && hasPrice) ? usdToBsF(product.price!, bcvRate) : null
  const waUrl = `https://wa.me/584223668201?text=${encodeURIComponent(`Hola ENOVA CORP, quiero cotizar: ${product.name}`)}`

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-warning)]/50"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Sin imagen
          </div>
        )}

        {/* Category badge */}
        <Badge
          variant="secondary"
          className="absolute left-2 top-2 text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
        >
          {CATEGORY_LABELS[product.category] ?? product.categoryLabel}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto pt-1">
          {hasPrice ? (
            <div className="flex flex-col gap-0.5">
              <p className="flex items-baseline gap-1.5 text-base font-bold text-primary">
                ${product.price!.toLocaleString("en-US")}
                {product.plusIva && (
                  <span className="text-[11px] font-medium text-[var(--color-warning)]">
                    + IVA
                  </span>
                )}
              </p>
              {bsValue != null && (
                <p className="font-mono-ui text-[10px] tabular-nums text-muted-foreground">
                  {formatBsF(bsValue)}
                </p>
              )}
            </div>
          ) : (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)]"
            >
              Consultar →
            </a>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────
// Main Grid
// ─────────────────────────────────────────────
export function CatalogGrid({ products }: CatalogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const { bcv } = useDolarRate()

  // Unique categories present in the data
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return cats.filter(Boolean)
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.category === activeCategory
      const catLabel = CATEGORY_LABELS[p.category] ?? p.categoryLabel ?? p.category
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        catLabel.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [products, activeCategory, search])

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Catálogo de Productos</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]/50"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            activeCategory === null
              ? "border-[var(--color-warning)] bg-[var(--color-warning)] text-[var(--primary-foreground)]"
              : "hover:border-[var(--color-warning)] hover:text-[var(--color-warning)]"
          )}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "border-[var(--color-warning)] bg-[var(--color-warning)] text-[var(--primary-foreground)]"
                : "hover:border-[var(--color-warning)] hover:text-[var(--color-warning)]"
            )}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}

        {(activeCategory || search) && (
          <button
            onClick={() => {
              setActiveCategory(null)
              setSearch("")
            }}
            className="flex items-center gap-1 rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive hover:bg-destructive/10"
          >
            <X className="h-3 w-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No se encontraron productos con ese filtro.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} bcvRate={bcv} />
          ))}
        </div>
      )}
    </section>
  )
}
