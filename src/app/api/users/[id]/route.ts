import { NextRequest, NextResponse } from "next/server"
import { adminUsers } from "@/data/mock-admin-users"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { id } = await params
  const user = adminUsers.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { id } = await params
  const user = adminUsers.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  }

  const body = await request.json()

  // UI-only mode: echo the merged result without persisting.
  // When Supabase is connected: await db.user.update({ where: { id }, data })
  return NextResponse.json({
    id: user.id,
    name: body.name ?? user.name,
    email: body.email ?? user.email,
    phone: body.phone !== undefined ? body.phone : user.phone,
    role: body.role ?? user.role,
    status: body.status ?? user.status,
  })
}
