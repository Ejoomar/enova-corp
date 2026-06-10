import type { Metadata } from "next"
import { categories } from "@/data/mock-products"
import { ProductsPageClient } from "@/components/products/ProductsPageClient"

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const { category } = await searchParams
  const categoryData = category ? categories.find((c) => c.slug === category) : null

  if (categoryData) {
    const title = `${categoryData.name} en Venezuela — ENOVA CORP`
    const description = `Compra ${categoryData.name.toLowerCase()} con garantía oficial en ENOVA CORP. Precios en USD y Bs. a tasa BCV, envíos a toda Venezuela por MRW y Zoom.`
    return {
      title,
      description,
      openGraph: { title, description, locale: "es_VE", type: "website" },
    }
  }

  return {
    title: "Productos — ENOVA CORP",
    description:
      "Catálogo completo de computación, laptops, redes, equipos fiscales, impresoras y cámaras. Garantía oficial y envíos a toda Venezuela.",
    openGraph: {
      title: "Productos — ENOVA CORP",
      description:
        "Catálogo completo de computación, laptops, redes, equipos fiscales, impresoras y cámaras.",
      locale: "es_VE",
      type: "website",
    },
  }
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
