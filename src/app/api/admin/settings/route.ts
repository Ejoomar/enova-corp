import { NextRequest, NextResponse } from "next/server"
import { settingsStore } from "@/lib/settings-store"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  return NextResponse.json({ success: true, data: settingsStore })
}

export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorizedResponse()

  try {
    const body = await request.json()

    settingsStore.general       = { ...settingsStore.general,       ...(body.general       ?? {}) }
    settingsStore.store         = { ...settingsStore.store,         ...(body.store         ?? {}) }
    settingsStore.notifications = { ...settingsStore.notifications, ...(body.notifications ?? {}) }
    settingsStore.payments      = { ...settingsStore.payments,      ...(body.payments      ?? {}) }

    return NextResponse.json({ success: true, data: settingsStore })
  } catch {
    return NextResponse.json({ error: "Error al guardar configuración" }, { status: 500 })
  }
}
