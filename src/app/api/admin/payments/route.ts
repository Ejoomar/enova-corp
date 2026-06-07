import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export interface PaymentProofMock {
  id: string
  orderNumber: string | null
  userName: string
  userEmail: string
  amount: number
  method: string
  imageUrl: string
  notes: string | null
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

const mockPayments: PaymentProofMock[] = [
  {
    id: "pay-001",
    orderNumber: "ORD-2024-001",
    userName: "Juan Pérez",
    userEmail: "juan.perez@email.com",
    amount: 760,
    method: "Transferencia Banesco",
    imageUrl: "/images/products/placeholder.jpg",
    notes: "Comprobante de transferencia",
    status: "approved",
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: "pay-002",
    orderNumber: "ORD-2024-002",
    userName: "María García",
    userEmail: "maria.garcia@email.com",
    amount: 290,
    method: "Pago Móvil",
    imageUrl: "/images/products/placeholder.jpg",
    notes: null,
    status: "pending",
    createdAt: "2024-03-18T14:20:00Z",
  },
  {
    id: "pay-003",
    orderNumber: "ORD-2024-003",
    userName: "Carlos López",
    userEmail: "carlos.lopez@email.com",
    amount: 230,
    method: "Zelle",
    imageUrl: "/images/products/placeholder.jpg",
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
    method: "Transferencia Mercantil",
    imageUrl: "/images/products/placeholder.jpg",
    notes: null,
    status: "rejected",
    createdAt: "2024-03-10T16:45:00Z",
  },
]

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const filtered = status && status !== "all"
    ? mockPayments.filter((p) => p.status === status)
    : mockPayments

  return NextResponse.json({
    success: true,
    data: filtered,
    meta: { total: filtered.length },
  })
}
