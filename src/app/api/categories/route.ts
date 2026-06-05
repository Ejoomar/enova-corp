import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { transformCategory } from "@/lib/transformers"
import { categories as mockCategories, products as mockProducts } from "@/data/mock-products"

export async function GET() {
  // Fallback to mock data when DB is not connected
  if (!prisma) {
    const withCounts = mockCategories.map((cat) => ({
      ...cat,
      productCount: mockProducts.filter((p) => p.category === cat.slug).length,
    }))
    return NextResponse.json(withCounts)
  }

  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(categories.map(transformCategory))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        icon: body.icon,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return NextResponse.json(transformCategory(category), { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    )
  }
}
