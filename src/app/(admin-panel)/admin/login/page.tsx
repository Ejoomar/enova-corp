"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginContent />
    </Suspense>
  )
}

function AdminLoginContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/admin"
  const hasError = searchParams.get("error") === "1"

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--brass)" }}
          >
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Panel Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            ENOVA CORP — Acceso restringido
          </p>
        </div>

        {/* Native form POST — el browser maneja el cookie automáticamente */}
        <form
          method="POST"
          action="/api/admin/auth"
          className="rounded-xl border border-[var(--hairline)] bg-card p-6 shadow-sm space-y-5"
        >
          <input type="hidden" name="redirectTo" value={from} />

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña de administrador
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoFocus
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brass)]/40"
            />
          </div>

          {hasError && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Contraseña incorrecta. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--brass)" }}
          >
            Ingresar al panel
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          ENOVA CORP © {new Date().getFullYear()} — Solo personal autorizado
        </p>
      </div>
    </div>
  )
}
