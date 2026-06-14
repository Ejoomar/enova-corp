"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { PaymentForm } from "@/components/checkout/PaymentForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { useCartStore } from "@/stores/cart-store"
import { useOrdersStore } from "@/stores/orders-store"
import {
  useCheckoutStore,
  PAYMENT_METHOD_LABELS,
  COURIER_LABELS,
} from "@/stores/checkout-store"
import { useDolarRate } from "@/hooks/useDolarRate"
import { formatBsF, usdToBsF } from "@/lib/currency"

const steps = [
  { id: 1, name: "Envío" },
  { id: 2, name: "Pago" },
  { id: 3, name: "Confirmar" },
]


export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const addOrder = useOrdersStore((s) => s.addOrder)
  const { shipping, paymentMethod, reset } = useCheckoutStore()
  const { bcv } = useDolarRate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isConfirming, setIsConfirming] = useState(false)

  // El store del carrito hidrata async desde localStorage — sin esperar,
  // esta página redirigía a /cart aun con productos en el carrito.
  const [hydrated, setHydrated] = useState(
    () => useCartStore.persist?.hasHydrated() ?? true
  )
  useEffect(() => {
    const unsub = useCartStore.persist?.onFinishHydration(() => setHydrated(true))
    if (useCartStore.persist?.hasHydrated()) setHydrated(true)
    return unsub
  }, [])

  // Redirect to cart if empty (but not while we're placing the order).
  // OJO: tras hidratar, el snapshot de React va un render detrás del store —
  // hasHydrated()=true no garantiza que `items` ya refleje localStorage.
  // Por eso la decisión se difiere y relee el store vivo con getState().
  useEffect(() => {
    if (!hydrated || isConfirming || items.length > 0) return
    const t = setTimeout(() => {
      if (useCartStore.getState().items.length === 0) {
        router.replace("/cart")
      }
    }, 150)
    return () => clearTimeout(t)
  }, [hydrated, items, router, isConfirming])

  if (!hydrated || (items.length === 0 && !isConfirming)) return null

  function handleConfirm() {
    if (!shipping || !paymentMethod) return
    setIsConfirming(true)

    const reference = `ENV-${Date.now().toString(36).toUpperCase()}`
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
    const total = subtotal
    const now = new Date().toISOString()

    addOrder({
      id: reference,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      subtotal,
      shipping: 0,
      total,
      totalBs: bcv ? usdToBsF(total, bcv) : null,
      tasaBcv: bcv ?? null,
      paymentMethod: PAYMENT_METHOD_LABELS[paymentMethod],
      status: "pending",
      shippingAddress: {
        name: shipping.nombre,
        phone: shipping.telefono,
        address: shipping.direccion,
        city: shipping.ciudad,
        state: shipping.estado,
        cedula: shipping.cedula,
        email: shipping.email,
        courier: COURIER_LABELS[shipping.courier],
      },
      source: "web",
      notes: shipping.notas,
      createdAt: now,
      updatedAt: now,
    })

    clearCart()
    reset()
    toast.success(`Pedido ${reference} registrado`, {
      description: "Ahora envía tu comprobante de pago por WhatsApp.",
    })
    router.push(`/checkout/confirmacion?ref=${reference}`)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="-ml-2 mb-4">
          <Link href="/cart">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver al Carrito
          </Link>
        </Button>
        <h1 className="font-display text-[length:var(--text-h2)] font-medium leading-[1.15]">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                    currentStep > step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`ml-2 hidden text-sm font-medium sm:block ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-12 sm:w-24 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-6">
            {currentStep === 1 && (
              <ShippingForm onValid={() => setCurrentStep(2)} />
            )}
            {currentStep === 2 && (
              <PaymentForm onValid={() => setCurrentStep(3)} />
            )}
            {currentStep === 3 && shipping && paymentMethod && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-medium">Confirmar Pedido</h2>
                <p className="text-sm text-muted-foreground">
                  Por favor revisa los detalles de tu pedido antes de confirmar.
                </p>

                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium">Datos de Envío</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {shipping.nombre}
                    {shipping.cedula ? ` · ${shipping.cedula}` : ""}<br />
                    {shipping.telefono}
                    {shipping.email ? ` · ${shipping.email}` : ""}<br />
                    {shipping.direccion}<br />
                    {shipping.ciudad}, {shipping.estado}<br />
                    <span className="font-medium text-foreground">
                      {COURIER_LABELS[shipping.courier]}
                    </span>
                  </p>
                  {shipping.notas && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Notas: {shipping.notas}
                    </p>
                  )}
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium">Método de Pago</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {PAYMENT_METHOD_LABELS[paymentMethod]}
                  </p>
                  {bcv && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Tasa BCV de hoy: {formatBsF(bcv)}/USD
                    </p>
                  )}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={currentStep === 1}
              >
                Atrás
              </Button>
              {currentStep === 1 && (
                <Button type="submit" form="shipping-form">Continuar</Button>
              )}
              {currentStep === 2 && (
                <Button type="submit" form="payment-form">Continuar</Button>
              )}
              {currentStep === 3 && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleConfirm}
                  disabled={isConfirming}
                >
                  {isConfirming ? "Registrando..." : "Confirmar Pedido"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}
