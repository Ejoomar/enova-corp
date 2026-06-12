import { ShieldCheck, BadgeCheck, Headphones } from "lucide-react"
import { EMPRESA } from "@/config/empresa"

// Sello de confianza para equipos fiscales: destaca homologación SENIAT + garantía,
// la información que el comprador de equipo fiscal busca explícitamente.
// `variant="compact"` para la página de categoría; "full" para el detalle de producto.
interface FiscalTrustBannerProps {
  variant?: "full" | "compact"
}

export function FiscalTrustBanner({ variant = "full" }: FiscalTrustBannerProps) {
  const { providencia, garantia } = EMPRESA.fiscal

  const homologacion = providencia
    ? `Homologado por el SENIAT · Providencia N° ${providencia}`
    : "Homologado por el SENIAT conforme a la normativa vigente"

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-1)] px-4 py-3 text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="h-4 w-4 text-[var(--brass)]" />
          {homologacion}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <BadgeCheck className="h-4 w-4 text-[var(--brass)]" />
          {garantia}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[var(--surface-1)] p-4 space-y-3">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--brass)]" />
        <div>
          <p className="text-sm font-medium">{homologacion}</p>
          <p className="text-xs text-muted-foreground">
            Equipo apto para emitir documentos fiscales según la normativa del SENIAT.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <BadgeCheck className="h-5 w-5 shrink-0 text-[var(--brass)]" />
        <p className="text-sm">{garantia}</p>
      </div>
      <div className="flex items-start gap-3">
        <Headphones className="h-5 w-5 shrink-0 text-[var(--brass)]" />
        <p className="text-sm text-muted-foreground">
          Instalación y acompañamiento en el proceso de homologación.
        </p>
      </div>
    </div>
  )
}
