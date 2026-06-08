"use client"

import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/admin/ProductForm"
import { useProductsStore } from "@/stores/products-store"

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  // Read from the persisted Zustand store so edits made via the admin panel
  // are reflected immediately — mock-products.ts is only the initial seed.
  const product = useProductsStore((state) =>
    state.allProducts.find((p) => p.id === id)
  )

  if (!product) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar producto</h1>
          <p className="text-sm text-muted-foreground truncate max-w-sm">{product.name}</p>
        </div>
      </div>

      <ProductForm
        mode="edit"
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          stock: product.stock,
          category: product.category,
          brand: product.brand,
          images: product.images,
          isNew: product.isNew,
          isFeatured: product.isFeatured,
          plusIva: product.plusIva,
        }}
      />
    </div>
  )
}
