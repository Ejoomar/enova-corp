"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, LogOut, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { usePaymentsStore } from "@/stores/payments-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { AdminMobileNav } from "./AdminMobileNav"

export function AdminHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  // Lee del mismo store que la página de Pagos para que el contador refleje al instante
  // las aprobaciones/rechazos (antes leía un endpoint mock y quedaba desactualizado).
  const pendingPayments = usePaymentsStore((state) =>
    state.allPayments.filter((p) => p.status === "pending").length
  )

  const initials = "AD"

  async function handleSignOut() {
    await fetch("/api/admin/auth", { method: "DELETE" })
    window.location.href = "/admin/login"
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    // Route order-like queries to orders, everything else to products
    if (/^ord/i.test(q) || /^\d{4,}/.test(q)) {
      router.push(`/admin/orders?q=${encodeURIComponent(q)}`)
    } else {
      router.push(`/admin/products?q=${encodeURIComponent(q)}`)
    }
    setSearchQuery("")
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <AdminMobileNav />

      <div className="hidden flex-1 md:flex md:max-w-sm">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos, pedidos..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex-1 md:flex-none" />

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => router.push("/admin/payments")}
          title="Comprobantes de pago pendientes"
        >
          <Bell className="h-4 w-4" />
          {pendingPayments > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-destructive" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground truncate">
                  Gerencia@enovacorp.co
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
