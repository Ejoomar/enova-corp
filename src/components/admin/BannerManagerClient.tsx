"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  LayoutTemplate,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBannerStore, type BannerSlide } from "@/stores/banner-store"
import { cn } from "@/lib/utils"

export function BannerManagerClient() {
  const { slides, toggleActive, deleteSlide, moveUp, moveDown } = useBannerStore()

  const sorted = [...slides].sort((a, b) => a.order - b.order)

  const handleDelete = (slide: BannerSlide) => {
    if (!confirm(`¿Eliminar "${slide.title} ${slide.subtitle}"?`)) return
    deleteSlide(slide.id)
  }

  return (
    <div className="space-y-4">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {slides.filter((s) => s.active).length} activo
          {slides.filter((s) => s.active).length !== 1 ? "s" : ""} ·{" "}
          {slides.length} total
        </p>
        <Button asChild>
          <Link href="/admin/banners/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Banner
          </Link>
        </Button>
      </div>

      {/* Slide list */}
      <div className="space-y-3">
        {sorted.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "flex items-center gap-4 rounded-xl border bg-card p-4 transition-opacity",
              !slide.active && "opacity-50"
            )}
          >
            {/* Thumbnail */}
            <div
              className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg"
              style={{ background: "linear-gradient(to right, #020817, #0a1628, #0c1e3d)" }}
            >
              {slide.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : slide.bgImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.bgImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <LayoutTemplate className="h-5 w-5 text-white/40" />
                </div>
              )}
              {!slide.active && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <EyeOff className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm truncate">
                  {slide.title} {slide.subtitle}
                </span>
                {slide.isBrand && (
                  <Badge variant="secondary" className="text-[10px]">
                    Marca
                  </Badge>
                )}
                <Badge
                  variant={slide.active ? "default" : "outline"}
                  className="text-[10px]"
                >
                  {slide.active ? "Visible" : "Oculto"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {slide.tag}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
                {slide.cta1Label} → {slide.cta1Href}
              </p>
            </div>

            {/* Reorder */}
            <div className="flex flex-col gap-1 shrink-0">
              <button
                onClick={() => moveUp(slide.id)}
                disabled={idx === 0}
                className="flex h-6 w-6 items-center justify-center rounded border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                title="Subir"
              >
                <ArrowUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => moveDown(slide.id)}
                disabled={idx === sorted.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                title="Bajar"
              >
                <ArrowDown className="h-3 w-3" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleActive(slide.id)}
                title={slide.active ? "Ocultar" : "Mostrar"}
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground"
              >
                {slide.active ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/banners/${slide.id}`}>
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(slide)}
                className="text-destructive hover:text-destructive hover:border-destructive/40"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
            <LayoutTemplate className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No hay banners. Crea el primero.</p>
            <Button asChild size="sm">
              <Link href="/admin/banners/new">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Banner
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Preview link */}
      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        💡 Los cambios se aplican en tiempo real en la tienda.{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Ver Home →
        </a>
      </div>
    </div>
  )
}
