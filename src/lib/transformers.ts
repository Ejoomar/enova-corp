// Transformers stub — DB not used in UI-only mode
// Data is loaded directly from public/data/productos.json
import type { Product, Category, Brand } from "@/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformProduct(product: any): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand?.name ?? product.brand ?? "",
    category: product.category?.slug ?? product.category ?? "",
    price: Number(product.price ?? 0),
    originalPrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    images: product.images ?? [],
    description: product.description ?? "",
    specs: (product.specs as Record<string, string>) ?? {},
    stock: product.stock ?? 0,
    isNew: product.isNew ?? false,
    isFeatured: product.isFeatured ?? false,
    rating: product.rating ?? 4.5,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformCategory(category: any): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon ?? "Package",
    productCount: category._count?.products ?? 0,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformBrand(brand: any): Brand {
  return {
    id: brand.id,
    name: brand.name,
    logo: brand.logo ?? undefined,
    productCount: brand._count?.products ?? 0,
  }
}
