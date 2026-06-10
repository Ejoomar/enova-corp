import Link from "next/link"
import Image from "next/image"
import { Search, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EMPRESA, whatsappLink } from "@/config/empresa"

const categorias = [
  { label: "Laptops", href: "/products?category=laptops" },
  { label: "Redes", href: "/products?category=redes" },
  { label: "Equipos Fiscales", href: "/products?category=equipos-fiscales" },
  { label: "Periféricos", href: "/products?category=perifericos" },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 text-center">
      <Link href="/" className="mb-10">
        <Image src="/images/logo.png" alt={EMPRESA.nombre} width={56} height={56} className="h-14 w-auto" />
      </Link>

      <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--brass)]">
        Error 404
      </p>
      <h1 className="font-display mt-3 text-4xl font-light tracking-[-0.02em] sm:text-5xl">
        Esta página no existe
      </h1>
      <p className="mt-4 max-w-md text-sm text-[var(--muted-foreground)]">
        El enlace puede estar roto o el producto ya no está disponible.
        Explora el catálogo o escríbenos y te ayudamos a encontrarlo.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/products">
            <Search className="mr-2 h-4 w-4" />
            Ver catálogo
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={whatsappLink("Hola ENOVA CORP, estoy buscando un producto.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Preguntar por WhatsApp
          </a>
        </Button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {categorias.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]"
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
