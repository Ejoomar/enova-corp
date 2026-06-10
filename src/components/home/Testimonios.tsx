import { Star, BadgeCheck } from "lucide-react"
import { reviews } from "@/data/mock-reviews"
import { products } from "@/data/mock-products"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

// Las 3 mejores reseñas verificadas de productos distintos
const destacadas = reviews
  .filter((r) => r.verified && r.rating >= 4)
  .reduce<typeof reviews>((acc, r) => {
    if (acc.length < 3 && !acc.some((x) => x.productId === r.productId)) acc.push(r)
    return acc
  }, [])

function productName(productId: string): string | null {
  return products.find((p) => p.id === productId)?.name ?? null
}

export function Testimonios() {
  if (destacadas.length === 0) return null

  return (
    <section className="border-b border-[var(--hairline)] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono-ui mb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--brass)]">
              — Clientes reales
            </p>
            <h2 className="font-display text-4xl font-light tracking-[-0.02em]">
              Lo que dicen de nosotros.
            </h2>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid gap-6 md:grid-cols-3">
          {destacadas.map((review, i) => {
            const nombre = productName(review.productId)
            return (
              <ScrollReveal
                key={review.id}
                delay={i * 100}
                className="flex flex-col rounded-xl border border-[var(--hairline)] bg-card p-7"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${
                        s < review.rating
                          ? "fill-[var(--brass)] text-[var(--brass)]"
                          : "text-[var(--hairline)]"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="font-display mt-4 text-base font-medium tracking-[-0.02em]">
                  {review.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  &ldquo;{review.body}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 border-t border-[var(--hairline)] pt-4">
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    {review.author}
                    {review.verified && (
                      <BadgeCheck className="h-4 w-4 text-[var(--color-success)]" aria-label="Compra verificada" />
                    )}
                  </p>
                  {nombre && (
                    <p className="font-mono-ui mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      Compró: {nombre}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
