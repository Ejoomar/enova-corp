"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Loader2, Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBannerStore, type BannerSlide } from "@/stores/banner-store"
import { cn } from "@/lib/utils"

// ─── Schema ────────────────────────────────────────────────────────────────
const bannerSchema = z.object({
  tag:         z.string().min(1, "Requerido"),
  title:       z.string().min(1, "Requerido"),
  subtitle:    z.string().min(1, "Requerido"),
  description: z.string().min(1, "Requerido"),
  cta1Label:   z.string().min(1, "Requerido"),
  cta1Href:    z.string().min(1, "Requerido"),
  cta2Label:   z.string().min(1, "Requerido"),
  cta2Href:    z.string().min(1, "Requerido"),
  imageAlt:    z.string().min(1, "Requerido"),
  isBrand:     z.boolean(),
  active:      z.boolean(),
})

type BannerFormValues = z.infer<typeof bannerSchema>

interface BannerFormProps {
  slide?: BannerSlide
}

// ─── BG presets ────────────────────────────────────────────────────────────
const BG_PRESETS = [
  { label: "Azul profundo",  value: "from-[#020817] via-[#0a1628] to-[#0c1e3d]" },
  { label: "Gris oscuro",   value: "from-[#0a0a0a] via-[#111827] to-[#1a2744]" },
  { label: "Índigo",        value: "from-[#0c1445] via-[#0f1f5c] to-[#0a2a6e]" },
  { label: "Negro puro",    value: "from-[#0a0a0a] via-[#141414] to-[#1c1c2e]" },
  { label: "Verde noche",   value: "from-[#021a0e] via-[#032b16] to-[#043d20]" },
  { label: "Borgoña",      value: "from-[#1a0008] via-[#2d0010] to-[#3d0018]" },
]

// ─── Component ─────────────────────────────────────────────────────────────
export function BannerForm({ slide }: BannerFormProps) {
  const router = useRouter()
  const { addSlide, updateSlide } = useBannerStore()

  const [imageUrl, setImageUrl] = useState(slide?.image ?? "")
  const [imagePosition, setImagePosition] = useState(slide?.imagePosition ?? "center center")
  const [selectedBg, setSelectedBg] = useState(slide?.bg ?? BG_PRESETS[0].value)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const previewRef = useRef<HTMLDivElement>(null)

  const handleFocalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
    setImagePosition(`${x}% ${y}%`)
  }, [])

  const isEdit = Boolean(slide)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      tag:         slide?.tag         ?? "",
      title:       slide?.title       ?? "",
      subtitle:    slide?.subtitle    ?? "",
      description: slide?.description ?? "",
      cta1Label:   slide?.cta1Label   ?? "Ver Catálogo",
      cta1Href:    slide?.cta1Href    ?? "/products",
      cta2Label:   slide?.cta2Label   ?? "Ver Todo",
      cta2Href:    slide?.cta2Href    ?? "/products",
      imageAlt:    slide?.imageAlt    ?? "",
      isBrand:     slide?.isBrand     ?? false,
      active:      slide?.active      ?? true,
    },
  })

  // ── Image upload ──────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError("")
    setUploading(true)

    try {
      const form = new FormData()
      form.append("file", file)
      form.append("folder", "banners")

      const res = await fetch("/api/admin/upload", { method: "POST", body: form })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? "Error al subir")
      setImageUrl(data.url)
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────
  const onSubmit = (values: BannerFormValues) => {
    const payload = {
      ...values,
      image:         imageUrl || "/images/hero/slide-1.jpg",
      bgImage:       imageUrl || slide?.bgImage || "/images/hero/bg-1.svg",
      imagePosition: imagePosition,
      bg:            selectedBg,
      tagColor: values.isBrand
        ? "bg-[var(--brass)]/20 text-[var(--brass-bright)] border border-[var(--brass)]/40"
        : "bg-white/15 text-white border border-white/25",
      order: slide?.order ?? 99,
    }

    if (isEdit && slide) {
      updateSlide(slide.id, payload)
    } else {
      addSlide(payload)
    }

    router.push("/admin/banners")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">

      {/* Back */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => router.push("/admin/banners")}
        className="-ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Banners
      </Button>

      {/* Imagen */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Imagen del Banner
        </h2>

        {/* Preview + Focal point picker */}
        <div
          ref={previewRef}
          onClick={imageUrl ? handleFocalClick : undefined}
          className={cn(
            "relative h-44 w-full overflow-hidden rounded-xl bg-gradient-to-r select-none",
            selectedBg,
            imageUrl ? "cursor-crosshair" : "cursor-default"
          )}
        >
          {imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Preview"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                style={{ objectPosition: imagePosition }}
                draggable={false}
              />
              {/* Focal point marker */}
              {(() => {
                const [px, py] = imagePosition.split(" ").map((v) => parseFloat(v))
                return (
                  <div
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${px}%`, top: `${py}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full border-2 border-white shadow-lg shadow-black/50 bg-white/20" />
                      <div className="absolute h-0.5 w-8 bg-white/70" />
                      <div className="absolute h-8 w-0.5 bg-white/70" />
                    </div>
                  </div>
                )
              })()}
              {/* Instruction overlay */}
              <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/80 pointer-events-none">
                Clic para elegir el punto focal
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-white/30 text-sm">
              Sin imagen — sube una o ingresa una URL
            </div>
          )}
        </div>

        {/* Position label */}
        {imageUrl && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Posición:</span>
            <code className="rounded bg-muted px-1.5 py-0.5">{imagePosition}</code>
            <button
              type="button"
              onClick={() => setImagePosition("center center")}
              className="ml-auto text-xs text-primary hover:underline"
            >
              Centrar
            </button>
          </div>
        )}

        {/* Upload */}
        <div className="flex items-center gap-3">
          <label className={cn(
            "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            "hover:border-primary hover:text-primary",
            uploading && "pointer-events-none opacity-50"
          )}>
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {uploading ? "Subiendo…" : "Subir imagen"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>

          <span className="text-xs text-muted-foreground">o</span>

          <Input
            placeholder="https://... (URL directa)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 text-sm"
          />
        </div>

        {uploadError && (
          <p className="text-xs text-destructive">{uploadError}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Recomendado: 1200 × 600 px · JPG o WebP · máx 5 MB
        </p>
      </section>

      {/* Fondo */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Color de fondo
        </h2>
        <div className="flex flex-wrap gap-2">
          {BG_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setSelectedBg(preset.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                selectedBg === preset.value
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "inline-block h-3 w-3 rounded-sm bg-gradient-to-r",
                  preset.value
                )}
              />
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {/* Contenido */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Contenido del slide
        </h2>

        <div className="space-y-2">
          <Label htmlFor="tag">Etiqueta (badge superior)</Label>
          <Input id="tag" placeholder="Ej: Laptops empresariales" {...register("tag")} />
          {errors.tag && <p className="text-xs text-destructive">{errors.tag.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Dell Vostro" {...register("title")} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input id="subtitle" placeholder="& Lenovo" {...register("subtitle")} />
            {errors.subtitle && <p className="text-xs text-destructive">{errors.subtitle.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            rows={3}
            placeholder="Texto descriptivo del slide…"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/50"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageAlt">Texto alt de imagen (accesibilidad)</Label>
          <Input id="imageAlt" placeholder="Descripción de la imagen" {...register("imageAlt")} />
        </div>
      </section>

      {/* CTAs */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Botones (CTAs)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Botón 1 — Texto</Label>
            <Input placeholder="Ver Catálogo" {...register("cta1Label")} />
          </div>
          <div className="space-y-2">
            <Label>Botón 1 — Enlace</Label>
            <Input placeholder="/products" {...register("cta1Href")} />
          </div>
          <div className="space-y-2">
            <Label>Botón 2 — Texto</Label>
            <Input placeholder="Ver Todo" {...register("cta2Label")} />
          </div>
          <div className="space-y-2">
            <Label>Botón 2 — Enlace</Label>
            <Input placeholder="/products" {...register("cta2Href")} />
          </div>
        </div>
      </section>

      {/* Opciones */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Opciones
        </h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded" {...register("isBrand")} />
            <span className="text-sm">Slide de marca (aplica colores dorados)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded" {...register("active")} />
            <span className="text-sm">Visible en la tienda</span>
          </label>
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting || uploading}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isEdit ? "Guardar cambios" : "Crear banner"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/banners")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
