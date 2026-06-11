import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const isAuthenticated = await verifySessionToken(token)

  // Autenticado intentando ir al login → dashboard
  if (isAuthenticated && pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // No autenticado intentando acceder al admin → login
  if (!isAuthenticated && pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
