export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending:    "Pendiente",
  processing: "En proceso",
  shipped:    "Enviado",
  delivered:  "Entregado",
  cancelled:  "Cancelado",
}

export const ORDER_STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending:    "outline",
  processing: "secondary",
  shipped:    "default",
  delivered:  "default",
  cancelled:  "destructive",
}
