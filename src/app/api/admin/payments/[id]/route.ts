import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  const { id } = await params
  const { status } = await request.json()

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
  }

  // When Supabase is connected:
  // await db.paymentProof.update({ where: { id }, data: { status, reviewedAt: new Date() } })

  return NextResponse.json({
    success: true,
    data: { id, status, reviewedAt: new Date().toISOString() },
  })
}
