import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getProductById } from "@/lib/get-product"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  originalPrice: z.number().optional(),
  stock: z.number().int().min(0).optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  images: z.array(z.string()).optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  plusIva: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: product })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { id } = await params
  const body = await request.json()
  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // When Supabase is connected: await db.product.update({ where: { id }, data: parsed.data })
  return NextResponse.json({
    success: true,
    data: { id, ...parsed.data, updatedAt: new Date().toISOString() },
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { id } = await params

  // When Supabase is connected: await db.product.delete({ where: { id } })
  return NextResponse.json({ success: true, data: { id } })
}
