import type { Metadata } from "next"
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
import { reviews } from "@/data/mock-reviews"
import { EMPRESA, SITE_URL } from "@/config/empresa"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.slug === id || p.id === id)

  if (!product) {
    return { title: "Producto no encontrado — ENOVA CORP" }
  }

  const title = `${product.name} — ENOVA CORP`
  const description =
    product.description?.slice(0, 155) ??
    `${product.name} disponible en ENOVA CORP.${product.brand ? ` Marca: ${product.brand}.` : ""} Garantía oficial y envíos a toda Venezuela desde Mérida.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : [],
      locale: "es_VE",
      type: "website",
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = products.find((p) => p.slug === id || p.id === id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-[length:var(--text-h2)] font-medium leading-[1.15]">Producto no encontrado</h1>
        <p className="text-muted-foreground">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/products">Ver todos los productos</Link>
        </Button>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8)

  const categoryData = categories.find((c) => c.slug === product.category)
  const categoryName = categoryData?.name ?? product.category

  // JSON-LD Product + Offer (+ rating si el producto tiene reseñas)
  const productReviews = reviews.filter((r) => r.productId === product.id)
  const avgRating = productReviews.length
    ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length
    : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? `${product.name} disponible en ${EMPRESA.nombre}.`,
    sku: product.code ?? product.id,
    brand: { "@type": "Brand", name: product.brand },
    category: categoryName,
    image: product.images.filter(Boolean),
    url: `${SITE_URL}/products/${product.slug}`,
    ...(product.price > 0 && {
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/products/${product.slug}`,
        priceCurrency: "USD",
        price: product.price,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: { "@type": "Organization", name: EMPRESA.nombre },
      },
    }),
    ...(avgRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.round(avgRating * 10) / 10,
        reviewCount: productReviews.length,
      },
    }),
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
