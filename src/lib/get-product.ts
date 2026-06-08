/**
 * Shared server-side product lookup.
 *
 * UI-only phase: reads from mock data.
 * When Prisma is connected, replace the body with:
 *   return prisma.product.findUnique({ where: { id } })
 *
 * Both the page (Server Component) and the API route import this function
 * so they always share the same data source.
 */
import { products as mockProducts } from "@/data/mock-products"
import type { Product } from "@/types"

export async function getProductById(id: string): Promise<Product | null> {
  return mockProducts.find((p) => p.id === id) ?? null
}
