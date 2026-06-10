"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Smartphone, DollarSign, Bitcoin, Banknote } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  useCheckoutStore,
  PAYMENT_METHOD_LABELS,
  type PaymentMethodId,
} from "@/stores/checkout-store"

const paymentSchema = z.object({
  method: z.enum(["pago-movil", "zelle", "binance", "usd-efectivo"], {
    error: "Selecciona un método de pago",
  }),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

const METHODS: Array<{
  id: PaymentMethodId
  icon: typeof Smartphone
  description: string
}> = [
  {
    id: "pago-movil",
    icon: Smartphone,
    description: "Bs. a tasa BCV del día — todos los bancos",
  },
  {
    id: "zelle",
    icon: DollarSign,
    description: "USD · transferencia instantánea",
  },
  {
    id: "binance",
    icon: Bitcoin,
    description: "USDT · red BEP20",
  },
  {
    id: "usd-efectivo",
    icon: Banknote,
    description: "Efectivo al recibir o en tienda (Mérida)",
  },
]

interface PaymentFormProps {
  /** Llamado solo cuando hay un método seleccionado. */
  onValid: () => void
}

export function PaymentForm({ onValid }: PaymentFormProps) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: paymentMethod ?? undefined },
  })

  function onSubmit(data: PaymentFormValues) {
    setPaymentMethod(data.method)
    onValid()
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <h2 className="text-lg font-semibold">Método de Pago</h2>
      <p className="text-sm text-muted-foreground">
        Realizarás el pago después de confirmar — te mostraremos los datos
        exactos y enviarás tu comprobante por WhatsApp.
      </p>

      <Controller
        name="method"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-3"
          >
            {METHODS.map(({ id, icon: Icon, description }) => (
              <div key={id}>
                <RadioGroupItem value={id} id={`pay-${id}`} className="peer sr-only" />
                <Label
                  htmlFor={`pay-${id}`}
                  className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
                >
                  <Icon className="mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">{PAYMENT_METHOD_LABELS[id]}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {errors.method && <p className="text-xs text-destructive">{errors.method.message}</p>}
    </form>
  )
}
