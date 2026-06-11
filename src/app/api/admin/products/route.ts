import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { products as mockProducts } from "@/data/mock-products"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  slug: z.string().min(1, "Slug requerido"),
  description: z.string().optional(),
  price: z.number().positive("Precio debe ser positivo"),
  originalPrice: z.number().optional(),
  stock: z.number().int().min(0, "Stock no puede ser negativo"),
  category: z.string().min(1, "Categoría requerida"),
  brand: z.string().min(1, "Marca requerida"),
  images: z.array(z.string()).min(1, "Al menos una imagen requerida"),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  plusIva: z.boolean().optional(),
})

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  return NextResponse.json({
    success: true,
    data: mockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      category: p.category,
      brand: p.brand,
      images: p.images,
      isNew: p.isNew,
      isFeatured: p.isFeatured,
      plusIva: p.plusIva,
    })),
    meta: { total: mockProducts.length },
  })
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  const body = await request.json()
  const parsed = productSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // In UI-only mode this returns a mock response
  // When Supabase is connected: await db.product.create({ data: parsed.data })
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
}
