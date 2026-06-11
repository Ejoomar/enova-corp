// Regla de envío — ÚNICA fuente de verdad.
// Antes estaba duplicada (hardcodeada) en CartSummary y OrderSummary, y el valor
// configurable del panel admin se ignoraba. Cuando haya base de datos, estos valores
// deben leerse de la configuración persistida (settings.store).
export const ENVIO = {
  /** Costo de envío en USD. */
  costo: 15,
  /** Subtotal en USD a partir del cual el envío es gratis. */
  gratisDesde: 200,
} as const

export function calcularEnvio(subtotal: number): number {
  return subtotal >= ENVIO.gratisDesde ? 0 : ENVIO.costo
}
