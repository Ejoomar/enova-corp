"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "./MobileNav"
import { SearchDialog } from "@/components/search/SearchDialog"
import { ImageSearch } from "@/components/search/ImageSearch"
import { useCartStore } from "@/stores/cart-store"
import { useQuoteStore } from "@/stores/quote-store"

const navLinks = [
  { label: "Laptops",           href: "/products?category=laptops"          },
  { label: "Redes",             href: "/products?category=redes"            },
  { label: "Equipos Fiscales",  href: "/products?category=equipos-fiscales" },
  { label: "Periféricos",       href: "/products?category=perifericos"      },
  { label: "Catálogo",          href: "/catalogo"                           },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())
  const quoteCount = useQuoteStore((state) => state.getItemCount())

  // Bounce del badge cuando AUMENTA el contador (no al hidratar ni al quitar)
  const [cartBounce, setCartBounce] = useState(false)
  const prevItemCount = useRef(itemCount)
  useEffect(() => {
    if (mounted && itemCount > prevItemCount.current) {
      setCartBounce(true)
      const t = setTimeout(() => setCartBounce(false), 400)
      prevItemCount.current = itemCount
      return () => clearTimeout(t)
    }
    prevItemCount.current = itemCount
  }, [itemCount, mounted])

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
    <header className="sticky top-0 z-50 isolate w-full border-b border-[var(--hairline)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-8">

          {/* Logo + wordmark */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="ENOVA CORP"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="hidden font-display text-[15px] font-medium tracking-[-0.02em] text-foreground min-[440px]:inline">
              ENOVA CORP
            </span>
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
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>

            <ImageSearch />

            <Link href="/cotizacion">
              <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Cotización">
                <ClipboardList className="h-4 w-4" />
                {mounted && quoteCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-0 bg-[var(--brass)] p-0 font-mono-ui text-[10px] text-[var(--background)]">
                    {quoteCount > 99 ? "99+" : quoteCount}
                  </Badge>
                )}
                <span className="sr-only">Cotización</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
                {mounted && itemCount > 0 && (
                  <Badge
                    className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-0 bg-[var(--brass)] p-0 font-mono-ui text-[10px] text-[var(--background)] ${
                      cartBounce ? "animate-cart-bounce" : ""
                    }`}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
