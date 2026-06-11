import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/admin-auth"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE = 4.5 * 1024 * 1024 // 4.5 MB

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated(request))) return unauthorizedResponse()

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo no permitido. Solo JPG, PNG, WebP o GIF." },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "El archivo supera 4.5 MB" }, { status: 400 })
  }

  // If no Vercel Blob token configured, return a helpful error
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Almacenamiento no configurado. Agrega BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel." },
      { status: 503 }
    )
  }

  const ext = file.name.split(".").pop() ?? "jpg"
  const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const blob = await put(filename, file, { access: "public" })

  return NextResponse.json({ url: blob.url })
}
