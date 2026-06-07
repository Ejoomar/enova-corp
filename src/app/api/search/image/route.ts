import { NextRequest, NextResponse } from "next/server"
import { products } from "@/data/mock-products"

const GEMINI_MODEL = "gemini-pro-vision"

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Servicio no configurado" }, { status: 503 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "La imagen no puede superar 10 MB" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const mimeType = file.type || "image/jpeg"

    const prompt = `Analiza esta imagen de un producto tecnológico y responde SOLO con un JSON válido, sin texto adicional, con este formato exacto:
{
  "categoria": "categoría principal del producto en español (ej: laptop, router, impresora, camara, monitor, disco duro, memoria ram, teclado, mouse, audifono, ups, balanza, servidor, switch, access point, cable, computadora de escritorio)",
  "marca": "nombre de la marca si es visible, sino null",
  "modelo": "modelo específico si es visible, sino null",
  "palabras_clave": ["array", "de", "palabras", "clave", "descriptivas"],
  "descripcion": "descripción breve del producto en 1 línea"
}`

    // Use REST API directly — compatible with all key formats
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: base64 } },
              ],
            },
          ],
          generationConfig: { temperature: 0.1, maxOutputTokens: 512 },
        }),
      }
    )

    const geminiJson = await geminiRes.json()

    if (!geminiRes.ok) {
      const errMsg = geminiJson?.error?.message ?? `Gemini error ${geminiRes.status}`
      console.error("Gemini API error:", errMsg)
      return NextResponse.json({ error: errMsg }, { status: 502 })
    }

    const text: string =
      geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ""

    let analysis: {
      categoria: string
      marca: string | null
      modelo: string | null
      palabras_clave: string[]
      descripcion: string
    }

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text)
    } catch {
      console.error("JSON parse failed. Gemini returned:", text)
      return NextResponse.json({ error: "No se pudo interpretar la imagen" }, { status: 422 })
    }

    // Score each product for relevance
    const scored = products.map((product) => {
      let score = 0
      const searchText = [
        product.name,
        product.brand,
        product.category,
        product.description ?? "",
      ]
        .join(" ")
        .toLowerCase()

      if (analysis.categoria) {
        const cat = analysis.categoria.toLowerCase()
        if (
          product.category.toLowerCase().includes(cat) ||
          cat.includes(product.category.toLowerCase())
        ) {
          score += 40
        }
      }

      if (analysis.marca) {
        if (searchText.includes(analysis.marca.toLowerCase())) score += 30
      }

      if (analysis.modelo) {
        if (searchText.includes(analysis.modelo.toLowerCase())) score += 25
      }

      for (const kw of analysis.palabras_clave ?? []) {
        if (searchText.includes(kw.toLowerCase())) score += 5
      }

      return { product, score }
    })

    const matches = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ product }) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        images: product.images,
        category: product.category,
        slug: product.slug,
        stock: product.stock,
        isNew: product.isNew,
        plusIva: product.plusIva,
      }))

    return NextResponse.json({
      success: true,
      analysis: {
        categoria: analysis.categoria,
        marca: analysis.marca,
        descripcion: analysis.descripcion,
      },
      results: matches,
      total: matches.length,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error("Image search error:", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
