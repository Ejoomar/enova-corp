"use client"
import { EMPRESA } from "@/config/empresa"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Heart, ShoppingCart, Star, Minus, Plus, Check, ClipboardList } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { useQuoteStore } from "@/stores/quote-store"
import { useDolarRate } from "@/hooks/useDolarRate"
import { formatUSD, formatBsF, usdToBsF } from "@/lib/currency"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [quotedAdded, setQuotedAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const addQuoteItem = useQuoteStore((state) => state.addItem)
  const { bcv, paralelo } = useDolarRate()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    toast.success(`${product.name} agregado al carrito`, {
      action: { label: "Ver carrito", onClick: () => router.push("/cart") },
    })
    setTimeout(() => setAdded(false), 2000)
  }

  const handleAddToQuote = () => {
    addQuoteItem(product, quantity)
    setQuotedAdded(true)
    toast.success(`${product.name} agregado a tu cotización`, {
      action: { label: "Ver cotización", onClick: () => router.push("/cotizacion") },
    })
    setTimeout(() => setQuotedAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Badges */}
      <div className="flex gap-2">
        {product.isNew && (
          <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>
        )}
        {hasDiscount && <Badge variant="destructive">-{discountPercent}%</Badge>}
      </div>

      {/* Brand */}
      <p className="text-sm text-muted-foreground">{product.brand}</p>

      {/* Name */}
      <h1 className="font-display text-[length:var(--text-h2)] font-medium leading-[1.15]">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "fill-[var(--color-warning)] text-[var(--color-warning)]"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">({Math.floor(product.rating * 20 + 10)} reseñas)</span>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1">
        {product.price > 0 ? (
          <>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {formatUSD(product.price)}
              </span>
              {product.plusIva && (
                <span className="rounded bg-[var(--color-warning-muted)] px-2 py-0.5 text-sm font-semibold text-[var(--color-warning)]">
                  + IVA
                </span>
              )}
              {/* originalPrice shown only in admin — hidden on storefront */}
            </div>
            {bcv !== null && (
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-muted-foreground">
                  {formatBsF(usdToBsF(product.price, bcv))}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  BCV: Bs. {bcv.toFixed(2)} / $
                </p>
              </div>
            )}
          </>
        ) : (
          <a
            href={`https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent("Hola ENOVA CORP, quiero cotizar: " + product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-[var(--color-success)] hover:underline"
          >
            Solicitar cotización por WhatsApp →
          </a>
        )}
      </div>

      {/* Stock */}
      <p className="text-sm">
        {product.stock > 0 ? (
          <span className="text-[var(--color-success)]">
            {product.stock} unidades disponibles
          </span>
        ) : (
          <span className="text-destructive">Agotado</span>
        )}
      </p>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Descripción</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <Separator />

      {/* Carriers */}
      <div className="flex items-center gap-4 rounded-lg border border-[var(--hairline)] bg-[var(--surface-1)] px-4 py-3">
        <span className="shrink-0 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
          Enviamos con
        </span>
        <div className="flex items-center gap-5">
          <Image
            src="/logos/mrw.svg"
            alt="MRW Venezuela"
            width={640}
            height={183}
            className="h-6 w-auto object-contain opacity-70 dark:invert"
          />
          <Image
            src="/logos/zoom.svg"
            alt="Zoom Envíos Expresos"
            width={572}
            height={162}
            className="h-5 w-auto object-contain opacity-70 dark:invert"
          />
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      {product.price > 0 ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Cantidad:</span>
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-1 gap-2">
            <Button
              className="flex-1"
              size="lg"
              disabled={product.stock === 0 || added}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Agregado
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al Carrito
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFavorite((f) => !f)}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              className={isFavorite ? "border-[var(--brass)] text-[var(--brass)]" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Add to Quote */}
          <Button
            variant="ghost-hairline"
            size="lg"
            className="w-full"
            onClick={handleAddToQuote}
            disabled={quotedAdded}
          >
            {quotedAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Agregado a cotización
              </>
            ) : (
              <>
                <ClipboardList className="mr-2 h-4 w-4" />
                Agregar a cotización
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent("Hola ENOVA CORP, quiero cotizar: " + product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-success)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <ClipboardList className="h-4 w-4" />
            Cotizar por WhatsApp
          </a>
          <p className="text-xs text-muted-foreground text-center">
            Respondemos en menos de 24 horas
          </p>
        </div>
      )}

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Especificaciones técnicas</h3>
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </>
      )}
    </div>
  )
}
