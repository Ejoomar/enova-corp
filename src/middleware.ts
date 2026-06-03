import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// UI-only mode: pass all requests through without auth checks.
// Auth integration requires a running PostgreSQL database.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
