import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/admin/ProductForm"
import { auth } from "@/auth"
import { products as mockProducts } from "@/data/mock-products"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await auth()
  if (!session) notFound()

  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) notFound()

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
