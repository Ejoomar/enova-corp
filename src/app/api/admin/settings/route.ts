import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// In a real app this would be persisted in a database.
// For now it lives in module scope so changes survive the request lifecycle
// during local dev (but reset on server restart).
let settingsStore = {
  general: {
    storeName: "ENOVA CORP",
    storeEmail: "Gerencia@enovacorp.co",
    storePhone: "0422-3668201",
    storeAddress: "Av. Libertador, Urb. La Castellana, Caracas",
    storeDescription: "Tu tienda de tecnología de confianza",
    timezone: "america-caracas",
    currency: "usd",
  },
  store: {
    showOutOfStock: true,
    showStockCount: true,
    allowReviews: true,
    shippingCost: 15,
    freeShippingFrom: 200,
  },
  notifications: {
    notifyNewOrders: true,
    notifyFailedPayments: true,
    notifyLowStock: true,
    notifyNewUsers: false,
  },
  payments: {
    acceptCards: true,
    acceptTransfer: true,
    acceptDigital: true,
    acceptCOD: false,
  },
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  return NextResponse.json({ success: true, data: settingsStore })
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()

    settingsStore = {
      general:       { ...settingsStore.general,       ...(body.general       ?? {}) },
      store:         { ...settingsStore.store,         ...(body.store         ?? {}) },
      notifications: { ...settingsStore.notifications, ...(body.notifications ?? {}) },
      payments:      { ...settingsStore.payments,      ...(body.payments      ?? {}) },
    }

    return NextResponse.json({ success: true, data: settingsStore })
  } catch {
    return NextResponse.json({ error: "Error al guardar configuración" }, { status: 500 })
  }
}
