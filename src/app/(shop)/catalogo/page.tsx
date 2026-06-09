import { CatalogoClient } from "@/components/products/CatalogoClient"

export const metadata = {
  title: "Catálogo de Productos — ENOVA CORP",
  description:
    "Catálogo completo de equipos tecnológicos: laptops, redes, impresoras, cámaras, periféricos y más. Solicita tu cotización.",
}

export default function CatalogoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <CatalogoClient />
    </main>
  )
}
