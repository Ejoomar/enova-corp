"use client"

import { useState } from "react"
import { Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getReviewsForProduct, Review } from "@/data/mock-reviews"

interface ProductReviewsProps {
  productId: string
  rating: number
}

function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-[var(--color-warning)] text-[var(--color-warning)]"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-2 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <StarRow rating={review.rating} />
          <p className="font-semibold text-sm">{review.title}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-medium">{review.author}</p>
          <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
            {new Date(review.date).toLocaleDateString("es-VE", { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
      {review.verified && (
        <div className="flex items-center gap-1.5 text-[var(--color-success)]">
          <CheckCircle className="h-3.5 w-3.5" />
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.12em]">Compra verificada</span>
        </div>
      )}
    </div>
  )
}

export function ProductReviews({ productId, rating }: ProductReviewsProps) {
  const allReviews = getReviewsForProduct(productId)
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allReviews : allReviews.slice(0, 3)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Reseñas</h3>
          <div className="mt-1 flex items-center gap-2">
            <StarRow rating={rating} />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">
              ({allReviews.length} {allReviews.length === 1 ? "reseña" : "reseñas"})
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {allReviews.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Aún no hay reseñas para este producto.
        </p>
      ) : (
        <div className="divide-y divide-[var(--hairline)]">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {allReviews.length > 3 && !showAll && (
        <Button variant="outline" onClick={() => setShowAll(true)} className="w-full">
          Ver todas las reseñas ({allReviews.length})
        </Button>
      )}
    </div>
  )
}
