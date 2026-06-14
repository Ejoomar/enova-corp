import { create } from "zustand"

export type PaymentMethodId = "pago-movil" | "usd-efectivo"

export const PAYMENT_METHOD_LABELS: Record<PaymentMethodId, string> = {
  "pago-movil": "Pago Móvil",
  "usd-efectivo": "USD Efectivo / Divisa",
}

export interface ShippingData {
  nombre: string
  telefono: string
  cedula?: string
  email?: string
  estado: string
  ciudad: string
  direccion: string
  courier: "mrw" | "zoom"
  notas?: string
}

export const COURIER_LABELS: Record<ShippingData["courier"], string> = {
  "mrw": "MRW (cobro en destino)",
  "zoom": "Zoom (cobro en destino)",
}

interface CheckoutState {
  shipping: ShippingData | null
  paymentMethod: PaymentMethodId | null

  setShipping: (data: ShippingData) => void
  setPaymentMethod: (method: PaymentMethodId) => void
  reset: () => void
}

// Sin persist: el checkout es efímero por diseño — el pedido confirmado
// se guarda en orders-store, que sí persiste.
export const useCheckoutStore = create<CheckoutState>()((set) => ({
  shipping: null,
  paymentMethod: null,

  setShipping: (data) => set({ shipping: data }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  reset: () => set({ shipping: null, paymentMethod: null }),
}))
