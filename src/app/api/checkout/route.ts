import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CheckoutBody {
  items: CartItem[]
  customerEmail?: string
  shippingAddressId?: string
  metadata?: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json()
    const { items, customerEmail, metadata } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      )
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const qualifiesForFreeShipping = subtotal >= 200

    const shippingOptions = qualifiesForFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 0, currency: "usd" },
              display_name: "Envío gratis",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 3 },
                maximum: { unit: "business_day" as const, value: 5 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 800, currency: "usd" },
              display_name: "Envío express",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 1 },
                maximum: { unit: "business_day" as const, value: 2 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 500, currency: "usd" },
              display_name: "Envío estándar",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 3 },
                maximum: { unit: "business_day" as const, value: 5 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: { amount: 800, currency: "usd" },
              display_name: "Envío express",
              delivery_estimate: {
                minimum: { unit: "business_day" as const, value: 1 },
                maximum: { unit: "business_day" as const, value: 2 },
              },
            },
          },
        ]

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      customer_email: customerEmail || undefined,
      metadata: {
        ...metadata,
        userId: metadata?.userId ?? "guest",
        items: JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity }))),
      },
      shipping_options: shippingOptions,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["VE", "US", "CO", "MX"],
      },
    })

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    )
  }
}
