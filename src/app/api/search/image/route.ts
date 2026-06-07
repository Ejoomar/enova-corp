import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { products } from "@/data/mock-products"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Analiza esta imagen de un producto tecnológico y responde SOLO con un JSON válido, sin texto adicional, con este formato exacto:
{
  "categoria": "categoría principal del producto en español (ej: laptop, router, impresora, camara, monitor, disco duro, memoria ram, teclado, mouse, audifono, ups, balanza, servidor, switch, access point, cable, computadora de escritorio)",
  "marca": "nombre de la marca si es visible, sino null",
  "modelo": "modelo específico si es visible, sino null",
  "palabras_clave": ["array", "de", "palabras", "clave", "descriptivas"],
  "descripcion": "descripción breve del producto en 1 línea"
}`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
    ])

    const text = result.response.text().trim()

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
      return NextResponse.json({ error: "No se pudo analizar la imagen" }, { status: 422 })
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

      // Category match
      if (analysis.categoria) {
        const cat = analysis.categoria.toLowerCase()
        if (product.category.toLowerCase().includes(cat) || cat.includes(product.category.toLowerCase())) {
          score += 40
        }
      }

      // Brand match
      if (analysis.marca) {
        const brand = analysis.marca.toLowerCase()
        if (searchText.includes(brand)) score += 30
      }

      // Model match
      if (analysis.modelo) {
        const modelo = analysis.modelo.toLowerCase()
        if (searchText.includes(modelo)) score += 25
      }

      // Keyword matches
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
    console.error("Image search error:", error)
    return NextResponse.json({ error: "Error procesando la imagen" }, { status: 500 })
  }
}
