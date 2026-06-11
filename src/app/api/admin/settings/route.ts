import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { settingsStore } from "@/lib/settings-store"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

// Cada sección y cada campo es opcional: el formulario envía solo lo que cambió.
// Zod descarta cualquier clave o tipo inesperado.
const settingsSchema = z.object({
  general: z
    .object({
      storeName: z.string().max(120).optional(),
      storeEmail: z.string().email().max(160).optional(),
      storePhone: z.string().max(40).optional(),
      storeAddress: z.string().max(240).optional(),
      storeDescription: z.string().max(400).optional(),
      timezone: z.string().max(60).optional(),
      currency: z.string().max(10).optional(),
    })
    .optional(),
  store: z
    .object({
      showOutOfStock: z.boolean().optional(),
      showStockCount: z.boolean().optional(),
      allowReviews: z.boolean().optional(),
      shippingCost: z.number().min(0).max(100000).optional(),
      freeShippingFrom: z.number().min(0).max(1000000).optional(),
      bcvRate: z.number().positive().max(1000000).nullable().optional(),
    })
    .optional(),
  notifications: z
    .object({
      notifyNewOrders: z.boolean().optional(),
      notifyLowStock: z.boolean().optional(),
    })
    .optional(),
  payments: z
    .object({
      acceptCards: z.boolean().optional(),
      acceptTransfer: z.boolean().optional(),
      acceptDigital: z.boolean().optional(),
    })
    .optional(),
})

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  return NextResponse.json({ success: true, data: settingsStore })
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const parsed = settingsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data
  settingsStore.general       = { ...settingsStore.general,       ...(data.general       ?? {}) }
  settingsStore.store         = { ...settingsStore.store,         ...(data.store         ?? {}) }
  settingsStore.notifications = { ...settingsStore.notifications, ...(data.notifications ?? {}) }
  settingsStore.payments      = { ...settingsStore.payments,      ...(data.payments      ?? {}) }

  return NextResponse.json({ success: true, data: settingsStore })
}
