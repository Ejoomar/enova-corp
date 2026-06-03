import { CatalogGrid } from "@/components/products/CatalogGrid"
import productos from "../../../../public/data/productos.json"

export const metadata = {
  title: "Catálogo de Productos — Energlass",
  description:
    "Catálogo completo de herrajes para puertas de vidrio, shower door, barandas y más. Solicita tu cotización.",
}

export default function CatalogoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <CatalogGrid products={productos as any} />
    </main>
  )
}
