"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { whatsappLink } from "@/config/empresa"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[ENOVA] Error de aplicación:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 text-center">
      <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-destructive">
        Algo salió mal
      </p>
      <h1 className="font-display mt-3 text-3xl font-light tracking-[-0.02em] sm:text-4xl">
        Tuvimos un problema técnico
      </h1>
      <p className="mt-4 max-w-md text-sm text-[var(--muted-foreground)]">
        Ya estamos al tanto. Intenta de nuevo — y si el problema sigue,
        escríbenos por WhatsApp y te atendemos directo.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={whatsappLink("Hola ENOVA CORP, la página web me dio un error.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Avisar por WhatsApp
          </a>
        </Button>
      </div>

      <Link href="/" className="mt-8 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] hover:text-[var(--brass)]">
        ← Volver al inicio
      </Link>
    </div>
  )
}
