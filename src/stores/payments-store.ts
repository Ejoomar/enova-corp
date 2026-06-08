import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PaymentProofMock } from "@/app/api/admin/payments/route"

// Default mock data — mirrored from the API route so the store seeds itself
const DEFAULT_PAYMENTS: PaymentProofMock[] = [
  {
    id: "pay-001",
    orderNumber: "ORD-2025-001",
    userName: "Juan Pérez",
    userEmail: "juan.perez@email.com",
    amount: 760,
    method: "Transferencia Banco de Venezuela",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    notes: "Comprobante de transferencia BdV — Ref. 202403150874",
    status: "approved",
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: "pay-002",
    orderNumber: "ORD-2025-002",
    userName: "María García",
    userEmail: "maria.garcia@email.com",
    amount: 290,
    method: "Pago Móvil Mercantil",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    notes: null,
    status: "pending",
    createdAt: "2024-03-18T14:20:00Z",
  },
  {
    id: "pay-003",
    orderNumber: "ORD-2025-003",
    userName: "Carlos López",
    userEmail: "carlos.lopez@email.com",
    amount: 230,
    method: "Zelle",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    notes: "Zelle enviado a +1 305 555 0100",
    status: "pending",
    createdAt: "2024-03-20T09:15:00Z",
  },
  {
    id: "pay-004",
    orderNumber: null,
    userName: "Ana Rodríguez",
    userEmail: "ana.rodriguez@email.com",
    amount: 77,
    method: "Transferencia BBVA Provincial",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    notes: null,
    status: "rejected",
    createdAt: "2024-03-10T16:45:00Z",
  },
]

interface PaymentsState {
  // Persisted list (source of truth)
  allPayments: PaymentProofMock[]

  // Actions
  updatePaymentStatus: (id: string, status: PaymentProofMock["status"]) => void
}

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set) => ({
      allPayments: DEFAULT_PAYMENTS,

      updatePaymentStatus: (id, status) => {
        set((state) => ({
          allPayments: state.allPayments.map((p) =>
            p.id === id ? { ...p, status } : p
          ),
        }))
      },
    }),
    {
      name: "enova-payments",
      version: 1,
      partialize: (state) => ({ allPayments: state.allPayments }),
      migrate: () => ({ allPayments: DEFAULT_PAYMENTS }),
    }
  )
)
