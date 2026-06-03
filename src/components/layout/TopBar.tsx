import { Truck, ShieldCheck, Phone } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Envíos a todo</span>
            <span className="font-semibold">Chile</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <a href="tel:+56232090021" className="hidden sm:inline hover:underline">Contacto</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Despacho 24–48 h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Garantía oficial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
