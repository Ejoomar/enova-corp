"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, MessageCircle, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
function ProductCard({ product }: { product: CatalogProduct }) {
  const [imgError, setImgError] = useState(false)
  const waMessage = encodeURIComponent(
    `Hola ENOVA CORP, quiero cotizar: ${product.name}`
  )
  const waUrl = `https://wa.me/582125550100?text=${waMessage}`

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-warning)]/50">
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
      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {product.name}
        </h3>

        {product.price != null && product.price > 0 ? (
          <p className="flex items-baseline gap-1.5 text-base font-bold text-primary">
            ${product.price.toLocaleString("en-US")}
            {product.plusIva && (
              <span className="text-[11px] font-medium text-[var(--color-warning)]">
                + IVA
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">Precio a cotizar</p>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-success)] px-3 py-2 text-xs font-semibold text-[var(--primary-foreground)] transition-colors hover:opacity-90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Cotizar
          </a>
          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
              title="Ver en sitio oficial"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main Grid
// ─────────────────────────────────────────────
export function CatalogGrid({ products }: CatalogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState("")

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
