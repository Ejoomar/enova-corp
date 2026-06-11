import { NextRequest, NextResponse } from "next/server"
import { orders } from "@/data/mock-orders"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const filtered = status && status !== "all"
    ? orders.filter((o) => o.status === status)
    : orders

  return NextResponse.json({
    success: true,
    data: filtered,
    meta: { total: filtered.length },
  })
}
