"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Camera, Upload, X, Loader2, Search, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductCard } from "@/components/products/ProductCard"
import type { Product } from "@/types"

interface SearchResult {
  analysis: { categoria: string; marca: string | null; descripcion: string }
  results: Product[]
  total: number
}

export function ImageSearch() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) {
      setError("Solo se aceptan imágenes")
      return
    }
    setFile(f)
    setResult(null)
    setError(null)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function reset() {
    setPreview(null)
    setFile(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  function handleClose() {
    setOpen(false)
    setTimeout(reset, 300)
  }

  async function handleSearch() {
    if (!file) return
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch("/api/search/image", { method: "POST", body: formData })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? "Error buscando")

      setResult(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error procesando la imagen")
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"))
    if (item) {
      const f = item.getAsFile()
      if (f) handleFile(f)
    }
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 relative overflow-hidden border-primary/30 hover:border-primary hover:bg-primary/5"
        onClick={() => setOpen(true)}
        title="Buscar por imagen"
      >
        <Camera className="h-4 w-4 text-primary" />
      </Button>

      <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto p-0"
          onPaste={handlePaste}
        >
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Camera className="h-5 w-5 text-primary" />
              Buscar por imagen
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Sube una foto de cualquier producto y encontramos lo más similar en nuestro catálogo
            </p>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-5 mt-4">
            {/* Upload area */}
            {!preview ? (
              <div
                className={`relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Arrastra una imagen aquí</p>
                  <p className="text-sm text-muted-foreground">o usa una de las opciones de abajo</p>
                  <p className="text-xs text-muted-foreground mt-1">También puedes pegar (Ctrl+V) una imagen copiada</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Subir foto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Usar cámara
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Preview */}
                <div className="relative">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                    <Image src={preview} alt="Imagen a buscar" fill className="object-contain" sizes="600px" />
                  </div>
                  <button
                    onClick={reset}
                    className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-md hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Analysis result badge */}
                {result && (
                  <div className="flex flex-wrap items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
                    <Search className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium capitalize">{result.analysis.descripcion}</span>
                    {result.analysis.marca && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {result.analysis.marca}
                      </span>
                    )}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize">
                      {result.analysis.categoria}
                    </span>
                  </div>
                )}

                {error && (
                  <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
                )}

                {!result && (
                  <Button className="w-full" onClick={handleSearch} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analizando imagen...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Buscar productos similares
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {result.total > 0
                      ? `${result.total} producto${result.total !== 1 ? "s" : ""} encontrado${result.total !== 1 ? "s" : ""}`
                      : "No encontramos productos similares"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
                    Nueva búsqueda
                  </Button>
                </div>

                {result.total === 0 ? (
                  <div className="rounded-xl border bg-muted/30 py-10 text-center text-muted-foreground">
                    <ImageIcon className="mx-auto mb-3 h-10 w-10 opacity-30" />
                    <p className="text-sm">Intenta con otra imagen o busca manualmente</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {result.results.map((product) => (
                      <div key={product.id} onClick={handleClose} className="cursor-pointer">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
