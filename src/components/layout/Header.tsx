"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "./MobileNav"
import { SearchDialog } from "@/components/search/SearchDialog"
import { useCartStore } from "@/stores/cart-store"

const navLinks = [
  { label: "Smartphones",  href: "/products?category=smartphones" },
  { label: "Laptops",      href: "/products?category=laptops"      },
  { label: "Audio",        href: "/products?category=audio"        },
  { label: "Gaming",       href: "/products?category=gaming"       },
  { label: "Catálogo",     href: "/catalogo"                       },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    setMounted(true)
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--hairline)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-8">

          {/* Logo wordmark */}
          <Link
            href="/"
            className="font-display shrink-0 text-xl font-medium tracking-[-0.04em] text-foreground transition-colors hover:text-[var(--brass-bright)]"
          >
            ENOVA CORP
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 text-[var(--muted-foreground)] md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.14em]">Buscar</span>
              <kbd className="ml-1 rounded border border-[var(--hairline)] px-1 py-0.5 font-mono-ui text-[10px] text-[var(--muted-foreground)]">
                ⌘K
              </kbd>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>

            <Link href="/profile/favorites">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Favoritos</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-0 bg-[var(--brass)] p-0 font-mono-ui text-[10px] text-[var(--background)]">
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-mono-ui text-[11px] uppercase tracking-[0.14em]">
                  Ingresar
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="brass" size="sm">
                  Registrarse
                </Button>
              </Link>
            </div>

            <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
              <User className="h-4 w-4" />
              <span className="sr-only">Mi cuenta</span>
            </Button>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
