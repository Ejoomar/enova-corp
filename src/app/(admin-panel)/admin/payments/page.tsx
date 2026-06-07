"use client"

import { useEffect, useState, useTransition } from "react"
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
} from "@tanstack/react-table"
import { ChevronDown, ChevronUp, ChevronsUpDown, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import type { PaymentProofMock } from "@/app/api/admin/payments/route"

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
}

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  approved: "default",
  rejected: "destructive",
}

function SortableHeader({
  column,
  label,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (v: boolean) => void }
  label: string
}) {
  const sorted = column.getIsSorted()
  return (
    <button
      className="flex items-center gap-1 hover:text-foreground"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ChevronUp className="h-3.5 w-3.5" />
      ) : sorted === "desc" ? (
        <ChevronDown className="h-3.5 w-3.5" />
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  )
}

export default function AdminPaymentsPage() {
  const [data, setData] = useState<PaymentProofMock[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sorting, setSorting] = useState<SortingState>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ id: string; status: "approved" | "rejected" } | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setLoading(true)
    const url = statusFilter === "all" ? "/api/admin/payments" : `/api/admin/payments?status=${statusFilter}`
    fetch(url)
      .then((r) => r.json())
      .then((json) => { setData(json.data ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [statusFilter])

  function handleAction(id: string, status: "approved" | "rejected") {
    setConfirmAction({ id, status })
  }

  function confirmPaymentAction() {
    if (!confirmAction) return
    startTransition(async () => {
      await fetch(`/api/admin/payments/${confirmAction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: confirmAction.status }),
      })
      setData((prev) =>
        prev.map((p) =>
          p.id === confirmAction.id ? { ...p, status: confirmAction.status } : p
        )
      )
      setConfirmAction(null)
    })
  }

  const columns: ColumnDef<PaymentProofMock>[] = [
    {
      accessorKey: "imageUrl",
      header: "Comprobante",
      enableSorting: false,
      cell: ({ row }) => (
        <button
          onClick={() => setPreviewUrl(row.original.imageUrl)}
          className="group relative h-12 w-16 overflow-hidden rounded-md border hover:opacity-80"
        >
          <Image
            src={row.original.imageUrl}
            alt="Comprobante"
            fill
            className="object-cover"
            sizes="64px"
          />
          <ZoomIn className="absolute inset-0 m-auto h-4 w-4 text-white opacity-0 drop-shadow group-hover:opacity-100" />
        </button>
      ),
    },
    {
      id: "customer",
      header: "Cliente",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.userName}</p>
          <p className="text-xs text-muted-foreground">{row.original.userEmail}</p>
        </div>
      ),
    },
    {
      accessorKey: "orderNumber",
      header: "Pedido",
      cell: ({ getValue }) => (
        <span className="font-mono text-sm">{String(getValue() ?? "—")}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <SortableHeader column={column} label="Monto" />,
      cell: ({ getValue }) => (
        <span className="font-medium">${Number(getValue()).toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "method",
      header: "Método",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => {
        const s = String(getValue())
        return (
          <Badge variant={STATUS_VARIANTS[s] ?? "outline"}>
            {STATUS_LABELS[s] ?? s}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <SortableHeader column={column} label="Fecha" />,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(String(getValue())).toLocaleDateString("es-VE")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => {
        if (row.original.status !== "pending") return null
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
              onClick={() => handleAction(row.original.id, "approved")}
            >
              Aprobar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs text-destructive border-destructive/20 hover:bg-destructive/5"
              onClick={() => handleAction(row.original.id, "rejected")}
            >
              Rechazar
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  })

  const pendingCount = data.filter((p) => p.status === "pending").length

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Comprobantes de pago</h1>
            <p className="text-sm text-muted-foreground">
              {pendingCount > 0 ? (
                <span className="text-amber-600 font-medium">
                  {pendingCount} pendiente{pendingCount !== 1 ? "s" : ""} de revisión
                </span>
              ) : (
                `${data.length} comprobantes`
              )}
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="rejected">Rechazados</SelectItem>
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
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 animate-pulse rounded bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay comprobantes.
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

        <div className="flex items-center justify-end gap-2">
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

      {/* Image preview dialog */}
      <Dialog open={!!previewUrl} onOpenChange={(open) => !open && setPreviewUrl(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Comprobante de pago</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
              <Image src={previewUrl} alt="Comprobante" fill className="object-contain" sizes="600px" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm action dialog */}
      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.status === "approved" ? "Aprobar comprobante" : "Rechazar comprobante"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.status === "approved"
                ? "¿Confirmas que el pago es válido y deseas aprobar este comprobante?"
                : "¿Confirmas que deseas rechazar este comprobante? El cliente será notificado."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPaymentAction}
              disabled={isPending}
              className={
                confirmAction?.status === "rejected"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {isPending
                ? "Procesando..."
                : confirmAction?.status === "approved"
                ? "Aprobar"
                : "Rechazar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
