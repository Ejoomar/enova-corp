import { NextRequest, NextResponse } from "next/server"
import { adminUsers } from "@/data/mock-admin-users"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const status = searchParams.get("status")

  let filtered = adminUsers
  if (role) filtered = filtered.filter((u) => u.role === role.toLowerCase())
  if (status) filtered = filtered.filter((u) => u.status === status.toLowerCase())

  return NextResponse.json(filtered)
}
