"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/products/ProductCard"
import { useProductsStore } from "@/stores/products-store"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedProducts() {
  const { featuredProducts, fetchFeaturedProducts } = useProductsStore()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-12 grid grid-cols-12 items-end gap-6">
          <h2 className="col-span-12 font-display text-4xl font-light tracking-[-0.02em] lg:col-span-7">
            Selección del mes.
          </h2>
          <Link
            href="/products"
            className="col-span-12 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)] transition-colors hover:text-[var(--brass-bright)] lg:col-span-3 lg:justify-self-end"
          >
            Ver todos →
          </Link>
        </div>

        {/* Product grid */}
        {featuredProducts.length === 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-none" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
