import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/admin/ProductForm"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nuevo producto</h1>
          <p className="text-sm text-muted-foreground">Agrega un producto al catálogo</p>
        </div>
      </div>

      <ProductForm mode="create" />
    </div>
  )
}
