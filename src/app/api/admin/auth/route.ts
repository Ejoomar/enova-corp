import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "enova_admin_session"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = formData.get("password") as string | null
  const redirectTo = (formData.get("redirectTo") as string | null) ?? "/admin"

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "enova2024"

  if (!password || password !== ADMIN_PASSWORD) {
    // Volver al login con error
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("error", "1")
    loginUrl.searchParams.set("from", redirectTo)
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  // Contraseña correcta → cookie + redirect al dashboard
  const response = NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 })
  response.cookies.set(ADMIN_COOKIE, ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(ADMIN_COOKIE)
  return response
}
