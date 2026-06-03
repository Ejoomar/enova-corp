"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const categoryImages: Record<string, string> = {
  "laptops":          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
  "smartphones":      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
  "equipos-fiscales": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
  "impresoras":       "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80",
  "perifericos":      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
  "gaming":           "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
  "audio":            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
}

interface CategoryCardProps {
  index: number
  name: string
  slug: string
  productCount: number
  className?: string
}

function CategoryCard({ index, name, slug, productCount, className }: CategoryCardProps) {
  const num = String(index + 1).padStart(2, "0")
  const imageSrc = categoryImages[slug]

  return (
    <Link
      href={`/products?category=${slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-[var(--hairline)] bg-[var(--surface-1)] transition-colors hover:border-[var(--brass)]",
        className
      )}
    >
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain p-8 grayscale-[15%] opacity-20 transition-all duration-500 group-hover:opacity-35 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">{num}</span>
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {productCount} productos
          </span>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-2xl font-light leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-[var(--brass-bright)]">
            {name}
          </h3>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] opacity-0 transition-all group-hover:opacity-100">
            Ver productos
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-[var(--brass)] opacity-0 transition-all group-hover:opacity-100" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[var(--brass)] transition-all duration-300 group-hover:w-full" />
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
          <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">
            — 02 / 04
          </span>
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-none" />
            ))}
          </div>
        ) : (
          <div className="grid auto-rows-[minmax(220px,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 6).map((category, i) => (
              <CategoryCard
                key={category.id}
                index={i}
                name={category.name}
                slug={category.slug}
                productCount={category.productCount}
                className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
