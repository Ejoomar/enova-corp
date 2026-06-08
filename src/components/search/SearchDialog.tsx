"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { products } from "@/data/mock-products"
import { Product } from "@/types"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Reset every time dialog opens
  useEffect(() => {
    if (open) {
      setQuery("")
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  // Live search
  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) {
      setResults([])
      return
    }
    const matched = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      )
      .slice(0, 8)
    setResults(matched)
  }, [query])

  const close = useCallback(() => {
    onOpenChange(false)
    setQuery("")
    setResults([])
  }, [onOpenChange])

  const goToProduct = useCallback((slug: string) => {
    close()
    router.push(`/products/${slug}`)
  }, [close, router])

  const goToResults = useCallback(() => {
    const q = query.trim()
    if (!q) return
    close()
    router.push(`/products?q=${encodeURIComponent(q)}`)
  }, [query, close, router])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      goToResults()
    }
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-[600px]"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>

        {/* Search input */}
        <div className="flex items-center border-b border-[var(--hairline)] px-4">
          <Search className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar producto, marca o categoría..."
            className="h-14 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[var(--muted-foreground)]"
          />
          {query ? (
            <button
              onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus() }}
              className="p-1 text-[var(--muted-foreground)] hover:text-foreground"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-[400px] overflow-y-auto py-2">
            {results.map((product) => (
              <li key={product.id}>
                <button
                  onClick={() => goToProduct(product.slug)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--surface-1)]"
                >
                  {/* Product image */}
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-[var(--hairline)] bg-[var(--surface-1)]">
                    {product.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-mono text-[var(--muted-foreground)]">
                        {product.brand.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
                      {product.brand} · {product.category}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono-ui text-[12px] font-medium text-[var(--brass)]">
                    ${product.price.toLocaleString("en-US")}
                  </span>
                </button>
              </li>
            ))}

            {/* Ver todos */}
            <li className="border-t border-[var(--hairline)] pt-2">
              <button
                onClick={goToResults}
                className="flex w-full items-center justify-between px-4 py-3 text-sm text-[var(--brass)] transition-colors hover:bg-[var(--surface-1)]"
              >
                <span>Ver todos los resultados para &quot;{query}&quot;</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </li>
          </ul>
        ) : query.trim().length >= 2 ? (
          <div className="py-14 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Sin resultados para &quot;{query}&quot;
            </p>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
              Escribe al menos 2 caracteres
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[var(--hairline)] px-4 py-2">
          <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)]">
            ESC para cerrar · ENTER para ver todos
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
