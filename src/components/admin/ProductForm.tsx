"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { ImagePlus, Link as LinkIcon, Loader2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/data/mock-products"

const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  slug: z.string().min(1, "Slug requerido").regex(/^[a-z0-9-]+$/, "Solo letras minúsculas, números y guiones"),
  description: z.string().optional(),
  price: z.number().positive("Precio debe ser positivo"),
  originalPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0, "Stock no puede ser negativo"),
  category: z.string().min(1, "Categoría requerida"),
  brand: z.string().min(1, "Marca requerida"),
  isNew: z.boolean(),
  isFeatured: z.boolean(),
  plusIva: z.boolean(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Partial<ProductFormValues> & { id?: string; images?: string[] }
  mode: "create" | "edit"
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      price: initialData?.price ?? 0,
      originalPrice: initialData?.originalPrice ?? 0,
      stock: initialData?.stock ?? 0,
      category: initialData?.category ?? "",
      brand: initialData?.brand ?? "",
      isNew: initialData?.isNew ?? false,
      isFeatured: initialData?.isFeatured ?? false,
      plusIva: initialData?.plusIva ?? false,
    },
  })

  // Auto-generate slug from name
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    form.setValue("name", e.target.value)
    if (mode === "create") {
      const slug = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()
      form.setValue("slug", slug)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4.5 * 1024 * 1024) {
      setImageError("El archivo no puede superar 4.5 MB")
      return
    }

    setUploading(true)
    setImageError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? "Error subiendo imagen")
      setImages((prev) => [...prev, json.url])
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Error subiendo imagen")
    } finally {
      setUploading(false)
    }
  }

  function addImageUrl() {
    if (!imageUrl.trim()) return
    try {
      new URL(imageUrl)
      setImages((prev) => [...prev, imageUrl.trim()])
      setImageUrl("")
      setImageError(null)
    } catch {
      setImageError("URL inválida")
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function onSubmit(values: ProductFormValues) {
    if (images.length === 0) {
      setImageError("Agrega al menos una imagen")
      return
    }

    startTransition(async () => {
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${initialData?.id}`

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, images }),
      })

      if (res.ok) {
        router.push("/admin/products")
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — main fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información del producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Router TP-Link AC1200"
                  {...form.register("name")}
                  onChange={handleNameChange}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input id="slug" placeholder="router-tp-link-ac1200" {...form.register("slug")} />
                {form.formState.errors.slug && (
                  <p className="text-xs text-destructive">{form.formState.errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el producto..."
                  rows={4}
                  {...form.register("description")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & stock */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Precio y stock</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="price">Precio (USD) *</Label>
                <Input id="price" type="number" step="0.01" min="0" {...form.register("price", { valueAsNumber: true })} />
                {form.formState.errors.price && (
                  <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="originalPrice">Precio original</Label>
                <Input id="originalPrice" type="number" step="0.01" min="0" {...form.register("originalPrice", { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="stock">Stock *</Label>
                <Input id="stock" type="number" min="0" {...form.register("stock", { valueAsNumber: true })} />
                {form.formState.errors.stock && (
                  <p className="text-xs text-destructive">{form.formState.errors.stock.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Imágenes *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute right-0.5 top-0.5 hidden rounded-full bg-destructive p-0.5 text-destructive-foreground group-hover:flex"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 text-center text-[10px] text-white">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Tabs defaultValue="upload">
                <TabsList className="h-8">
                  <TabsTrigger value="upload" className="text-xs">
                    <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
                    Subir archivo
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs">
                    <LinkIcon className="mr-1.5 h-3.5 w-3.5" />
                    Pegar URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-3">
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center hover:border-primary hover:bg-muted/50">
                    {uploading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {uploading ? "Subiendo..." : "Haz clic para seleccionar una imagen"}
                    </span>
                    <span className="text-xs text-muted-foreground">JPG, PNG, WebP — máx 4.5 MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                </TabsContent>

                <TabsContent value="url" className="mt-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                    />
                    <Button type="button" variant="outline" onClick={addImageUrl}>
                      Agregar
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {imageError && <p className="text-xs text-destructive">{imageError}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Right — metadata */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clasificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Categoría *</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(v) => form.setValue("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-xs text-destructive">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="brand">Marca *</Label>
                <Input id="brand" placeholder="Ej: TP-Link" {...form.register("brand")} />
                {form.formState.errors.brand && (
                  <p className="text-xs text-destructive">{form.formState.errors.brand.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Opciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(
                [
                  { name: "isFeatured", label: "Producto destacado", desc: "Aparece en la sección principal" },
                  { name: "isNew", label: "Producto nuevo", desc: "Muestra la etiqueta NUEVO" },
                  { name: "plusIva", label: "Precio + IVA", desc: "El precio no incluye IVA" },
                ] as const
              ).map(({ name, label, desc }) => (
                <div key={name} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch
                    checked={form.watch(name)}
                    onCheckedChange={(v) => form.setValue(name, v)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {mode === "create" ? "Crear producto" : "Guardar cambios"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/admin/products")}
              disabled={isPending}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
