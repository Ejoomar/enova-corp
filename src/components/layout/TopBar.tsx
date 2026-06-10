import Link from "next/link"
import { Truck, ShieldCheck, Phone } from "lucide-react"
import { EMPRESA } from "@/config/empresa"
import { TasaBcv } from "./TasaBcv"

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">Envíos a todo</span>
              <span className="font-semibold">Venezuela</span>
            </div>
            <span className="hidden text-white/40 md:inline">·</span>
            <span className="hidden md:inline">
              <TasaBcv />
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:+${EMPRESA.whatsapp}`}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              aria-label="Llamar a Contacto"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Contacto</span>
            </a>
            <Link
              href="/shipping"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Truck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Entrega Express</span>
            </Link>
            <Link
              href="/warranty"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Garantía oficial</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
