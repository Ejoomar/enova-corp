import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "enova_admin_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 días

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { password } = body as { password?: string }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "enova2024"
  const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN ?? "enova_admin_default"

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
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
