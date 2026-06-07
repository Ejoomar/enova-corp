import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import { orders } from "@/data/mock-orders"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: order })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { status } = await request.json()

  const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
  }

  // When Supabase is connected: await db.order.update({ where: { id }, data: { status } })
  return NextResponse.json({
    success: true,
    data: { id, status, updatedAt: new Date().toISOString() },
  })
}
