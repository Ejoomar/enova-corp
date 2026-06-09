"use client"

import { useProductsStore } from "@/stores/products-store"
import { CatalogGrid } from "./CatalogGrid"

export function CatalogoClient() {
  const allProducts = useProductsStore((s) => s.allProducts)

  const catalogProducts = allProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    slug: p.slug,
    price: p.price > 0 ? p.price : null,
    plusIva: p.plusIva,
    code: p.code,
    image: p.images[0] ?? "",
  }))

  return <CatalogGrid products={catalogProducts} />
}
