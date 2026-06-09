import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "enova_admin_session"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "enova2024"

  const cookie = request.cookies.get(ADMIN_COOKIE)
  const isAuthenticated = cookie?.value === ADMIN_PASSWORD

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
