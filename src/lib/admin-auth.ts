import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const ADMIN_COOKIE = "enova_admin_session"

export function isAdminAuthenticated(request: NextRequest): boolean {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "enova2024"
  const cookie = request.cookies.get(ADMIN_COOKIE)
  return cookie?.value === ADMIN_PASSWORD
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
