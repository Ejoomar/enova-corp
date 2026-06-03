"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Laptops / PCs",    href: "/products?category=laptops"          },
  { label: "Smartphones",      href: "/products?category=smartphones"      },
  { label: "Equipos Fiscales", href: "/products?category=equipos-fiscales" },
  { label: "Impresoras",       href: "/products?category=impresoras"       },
  { label: "Periféricos",      href: "/products?category=perifericos"      },
  { label: "Catálogo",         href: "/catalogo"                           },
]

const utilLinks = [
  { label: "Favoritos",  href: "/profile/favorites" },
  { label: "Cotización", href: "/cotizacion"        },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menú</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full border-r border-[var(--hairline)] bg-[var(--background)] p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-[var(--hairline)] px-6 py-4">
          <SheetTitle className="text-left">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                src="/images/logo.jpg"
                alt="ENOVA CORP"
                width={44}
                height={44}
                className="rounded-lg"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-[var(--hairline)] px-6 py-5 transition-colors hover:text-[var(--brass)]"
            >
              <span className="font-display text-2xl font-light tracking-[-0.02em]">
                {link.label}
              </span>
              <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-[var(--hairline)] px-6 pt-6">
          <p className="eyebrow mb-4">Más opciones</p>
          <div className="flex flex-col gap-2">
            {utilLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
