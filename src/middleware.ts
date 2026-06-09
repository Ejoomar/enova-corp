import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "enova_admin_session"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get(ADMIN_COOKIE)
  const expected = process.env.ADMIN_SESSION_TOKEN ?? "enova_admin_default"
  const isAuthenticated = session?.value === expected

  // Si está autenticado y va al login → redirigir al dashboard
  if (isAuthenticated && pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // Si NO está autenticado y va a cualquier ruta admin → redirigir al login
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
