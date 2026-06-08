import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import { settingsStore } from "@/lib/settings-store"

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

    settingsStore.general       = { ...settingsStore.general,       ...(body.general       ?? {}) }
    settingsStore.store         = { ...settingsStore.store,         ...(body.store         ?? {}) }
    settingsStore.notifications = { ...settingsStore.notifications, ...(body.notifications ?? {}) }
    settingsStore.payments      = { ...settingsStore.payments,      ...(body.payments      ?? {}) }

    return NextResponse.json({ success: true, data: settingsStore })
  } catch {
    return NextResponse.json({ error: "Error al guardar configuración" }, { status: 500 })
  }
}
