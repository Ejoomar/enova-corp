import { CatalogGrid } from "@/components/products/CatalogGrid"
import { products } from "@/data/mock-products"

export const metadata = {
  title: "Catálogo de Productos — ENOVA CORP",
  description:
    "Catálogo completo de equipos tecnológicos: laptops, redes, impresoras, cámaras, periféricos y más. Solicita tu cotización.",
}

const catalogProducts = products.map((p) => ({
  id:       p.id,
  name:     p.name,
  category: p.category,
  slug:     p.slug,
  price:    p.price > 0 ? p.price : null,
  plusIva:  p.plusIva,
  code:     p.code,
  image:    p.images[0],
}))

export default function CatalogoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <CatalogGrid products={catalogProducts} />
    </main>
  )
}
