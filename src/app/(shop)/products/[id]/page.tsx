"use client"

import { use } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/components/products/ProductGallery"
import { ProductDetail } from "@/components/products/ProductDetail"
import { ProductReviews } from "@/components/products/ProductReviews"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { products, categories } from "@/data/mock-products"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)

  // Buscar por slug o por id (el link usa product.slug)
  const product = products.find(
    (p) => p.slug === id || p.id === id
  )

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p className="text-muted-foreground">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/products">Ver todos los productos</Link>
        </Button>
      </div>
    )
  }

  // Productos relacionados: misma categoría, excluyendo el actual
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8)

  const categoryData = categories.find((c) => c.slug === product.category)
  const categoryName = categoryData?.name ?? product.category

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back — Mobile */}
      <Button variant="ghost" asChild className="mb-4 -ml-2 sm:hidden">
        <Link href="/products">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Volver
        </Link>
      </Button>

      {/* Breadcrumb — Desktop */}
      <Breadcrumb className="mb-6 hidden sm:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[200px] truncate">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductDetail product={product} />
      </div>

      {/* Reviews */}
      <Separator className="my-12" />
      <div className="max-w-2xl">
        <ProductReviews productId={product.id} rating={product.rating} />
      </div>

      {/* Related Products */}
      <RelatedProducts
        products={related}
        categorySlug={product.category}
        categoryName={categoryName}
      />
    </div>
  )
}
