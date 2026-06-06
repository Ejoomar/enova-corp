import { CatalogGrid } from "@/components/products/CatalogGrid"
import productos from "../../../../public/data/productos.json"

export const metadata = {
  title: "Catálogo de Productos — ENOVA CORP",
  description:
    "Catálogo completo de equipos tecnológicos: laptops, redes, impresoras, cámaras, periféricos y más. Solicita tu cotización.",
}

export default function CatalogoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <CatalogGrid products={productos as any} />
    </main>
  )
}
