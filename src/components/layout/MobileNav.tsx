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
  { label: "Redes",            href: "/products?category=redes"            },
  { label: "Equipos Fiscales", href: "/products?category=equipos-fiscales" },
  { label: "Impresoras",       href: "/products?category=impresoras"       },
  { label: "Periféricos",      href: "/products?category=perifericos"      },
  { label: "Catálogo",         href: "/catalogo"                           },
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
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="ENOVA CORP"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-display text-[15px] font-medium tracking-[-0.03em] text-foreground">
                ENOVA CORP
              </span>
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
      </SheetContent>
    </Sheet>
  )
}
