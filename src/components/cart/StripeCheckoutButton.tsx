"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"

export function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false)
  const items = useCartStore((state) => state.items)
  const router = useRouter()

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    try {
      // UI-only mode: redirect to checkout page
      router.push("/checkout")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Proceder al Pago
        </>
      )}
    </Button>
  )
}
