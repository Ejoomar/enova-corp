"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (_data: LoginFormData) => {
    setError(null)
    setError("Autenticación no disponible en modo demo. Configura la base de datos para activarla.")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="font-mono-ui text-[11px] text-destructive">{error}</p>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <label htmlFor="email" className="eyebrow block">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          className={cn(
            "w-full border-0 border-b bg-transparent px-0 py-3 font-mono-ui text-sm text-foreground placeholder:text-[var(--muted-foreground)] focus:outline-none",
            errors.email
              ? "border-destructive"
              : "border-[var(--hairline)] focus:border-[var(--brass)]",
            "transition-colors"
          )}
          {...register("email")}
        />
        {errors.email && (
          <p className="font-mono-ui text-[10px] text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <label htmlFor="password" className="eyebrow block">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={cn(
              "w-full border-0 border-b bg-transparent px-0 py-3 pr-8 font-mono-ui text-sm text-foreground placeholder:text-[var(--muted-foreground)] focus:outline-none",
              errors.password
                ? "border-destructive"
                : "border-[var(--hairline)] focus:border-[var(--brass)]",
              "transition-colors"
            )}
            {...register("password")}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="font-mono-ui text-[10px] text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 bg-[var(--brass)] px-6 py-4 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--background)] transition-colors hover:bg-[var(--brass-bright)] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar sesión →"
        )}
      </button>

      {/* Footer links */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
          ¿Sin cuenta?{" "}
          <Link
            href="/register"
            className="text-[var(--brass)] underline-offset-4 hover:underline"
          >
            Regístrate
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="font-mono-ui text-[11px] text-[var(--muted-foreground)] underline-offset-4 hover:text-[var(--brass)] hover:underline"
        >
          Olvidé contraseña
        </Link>
      </div>
    </form>
  )
}
