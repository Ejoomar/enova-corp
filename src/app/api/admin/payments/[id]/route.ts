import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { status } = await request.json()

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
  }

  // When Supabase is connected:
  // await db.paymentProof.update({ where: { id }, data: { status, reviewedBy: session.user.email, reviewedAt: new Date() } })
  // If status === "approved", trigger Resend email to customer

  return NextResponse.json({
    success: true,
    data: { id, status, reviewedAt: new Date().toISOString() },
  })
}
