"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { SortableHeader } from "@/components/admin/SortableHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProductsStore } from "@/stores/products-store"
import type { Product } from "@/types"

export default function AdminProductsPage() {
  const { allProducts, deleteProduct } = useProductsStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function handleDelete(id: string) {
    deleteProduct(id)
    setDeleteId(null)
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "brand",
      enableHiding: true,
      header: () => null,
      cell: () => null,
    },
    {
      accessorKey: "images",
      header: "Imagen",
      enableSorting: false,
      cell: ({ row }) => {
        const img = row.original.images[0]
        return img ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-md border">
            <Image src={img} alt={row.original.name} fill className="object-cover" sizes="40px" />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-md border bg-muted" />
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} label="Producto" />,
      cell: ({ row }) => (
        <div>
          <p className="font-medium leading-tight">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.brand}</p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ getValue }) => (
        <Badge variant="outline" className="text-xs capitalize">
          {String(getValue())}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => <SortableHeader column={column} label="Precio" />,
      cell: ({ getValue }) => (
        <span className="font-medium">${Number(getValue()).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => <SortableHeader column={column} label="Stock" />,
      cell: ({ getValue }) => {
        const stock = Number(getValue())
        return (
          <Badge variant={stock === 0 ? "destructive" : stock < 5 ? "secondary" : "default"}>
            {stock === 0 ? "Agotado" : `${stock} uds`}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href={`/admin/products/${row.original.id}`}>
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: allProducts,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
      columnVisibility: { brand: false },
    },
  })

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Productos</h1>
            <p className="text-sm text-muted-foreground">
              {allProducts.length} productos en el catálogo
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo producto
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative max-w-xs flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="pl-8"
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            />
          </div>
          <Select
            value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
            onValueChange={(v) =>
              table.getColumn("category")?.setFilterValue(v === "all" ? undefined : v)
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {Array.from(new Set(allProducts.map((p) => p.category)))
                .sort()
                .map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn("brand")?.getFilterValue() as string) ?? "all"}
            onValueChange={(v) =>
              table.getColumn("brand")?.setFilterValue(v === "all" ? undefined : v)
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las marcas</SelectItem>
              {Array.from(new Set(allProducts.map((p) => p.brand)))
                .sort()
                .map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border bg-background">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No se encontraron productos.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando{" "}
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            de {table.getFilteredRowModel().rows.length}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
