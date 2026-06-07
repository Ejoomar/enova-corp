import { auth } from "@/auth"
import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 })
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo de archivo no permitido. Solo JPG, PNG, WebP o GIF." },
      { status: 400 }
    )
  }

  const maxSize = 4.5 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json({ error: "El archivo supera el límite de 4.5 MB" }, { status: 400 })
  }

  const ext = file.name.split(".").pop() ?? "jpg"
  const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const blob = await put(filename, file, { access: "public" })

  return NextResponse.json({ url: blob.url })
}
