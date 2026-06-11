import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, createSessionToken } from "@/lib/admin-session"

// Rate limiting en memoria. Best-effort: en serverless cada instancia cuenta aparte,
// pero añade fricción real contra fuerza bruta sobre una contraseña única.
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutos
const attempts = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

function isRateLimited(ip: string): boolean {
  const entry = attempts.get(ip)
  if (!entry || Date.now() > entry.resetAt) return false
  return entry.count >= MAX_ATTEMPTS
}

function registerFailedAttempt(ip: string): void {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    entry.count += 1
  }
}

function redirectToLogin(request: NextRequest, params: Record<string, string>) {
  const url = new URL("/admin/login", request.url)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)
  return NextResponse.redirect(url, { status: 303 })
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = formData.get("password") as string | null
  const redirectTo = (formData.get("redirectTo") as string | null) ?? "/admin"
  const ip = getClientIp(request)

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  // Sin secreto configurado no se puede autenticar a nadie (fail-safe, sin fallback).
  if (!ADMIN_PASSWORD) {
    return redirectToLogin(request, { error: "config" })
  }

  if (isRateLimited(ip)) {
    return redirectToLogin(request, { error: "rate", from: redirectTo })
  }

  if (!password || password !== ADMIN_PASSWORD) {
    registerFailedAttempt(ip)
    return redirectToLogin(request, { error: "1", from: redirectTo })
  }

  attempts.delete(ip)

  const token = await createSessionToken()
  if (!token) {
    return redirectToLogin(request, { error: "config" })
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 })
  response.cookies.set(ADMIN_COOKIE, token, {
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
