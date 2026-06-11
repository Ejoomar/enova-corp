import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, verifySessionToken } from "./admin-session"

export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE)?.value
  return verifySessionToken(token)
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
