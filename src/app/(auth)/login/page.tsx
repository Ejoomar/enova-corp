import { Suspense } from "react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* Left panel — editorial */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-[var(--hairline)] bg-[var(--surface-1)] p-12 lg:flex">
        {/* Decorative number */}
        <div className="eyebrow">01 / ACCESO</div>

        {/* Center lockup */}
        <div>
          <p className="font-mono-ui mb-6 text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            Energlass · Plataforma de Herrajes
          </p>
          <h2 className="font-display text-[clamp(3rem,5vw,5rem)] font-light leading-[0.93] tracking-[-0.03em] text-foreground">
            Accede a tu<br />
            <em className="not-italic text-[var(--brass)]">cuenta</em>.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
            Gestiona tus pedidos, proyectos y cotizaciones desde un solo lugar.
          </p>
        </div>

        {/* Bottom specs strip */}
        <div className="border-t border-[var(--hairline)] pt-8">
          <div className="grid grid-cols-3 divide-x divide-[var(--hairline)]">
            {[
              { n: "316L", l: "Acero marino" },
              { n: "450+", l: "Proyectos" },
              { n: "48h", l: "Despacho" },
            ].map((s) => (
              <div key={s.n} className="px-4 first:pl-0">
                <p className="font-display text-2xl font-light text-foreground">{s.n}</p>
                <p className="font-mono-ui mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="font-display mb-10 block text-xl font-medium tracking-[-0.04em] text-foreground transition-colors hover:text-[var(--brass)] lg:hidden"
          >
            ENERGLASS
          </Link>

          <p className="eyebrow mb-2">Iniciar sesión</p>
          <h1 className="font-display mb-8 text-3xl font-light tracking-[-0.02em]">
            Bienvenido de vuelta.
          </h1>

          <Suspense fallback={<div className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">Cargando...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
