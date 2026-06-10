"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCheckoutStore, COURIER_LABELS, type ShippingData } from "@/stores/checkout-store"

const ESTADOS = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
  "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón",
  "Guárico", "La Guaira", "Lara", "Mérida", "Miranda", "Monagas",
  "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo",
  "Yaracuy", "Zulia",
] as const

const TELEFONO_REGEX = /^(0412|0414|0416|0424|0426)\d{7}$/
const CEDULA_REGEX = /^[VvEe]?-?\d{6,9}$/

const shippingSchema = z.object({
  nombre: z.string().min(3, "Escribe tu nombre completo"),
  telefono: z
    .string()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .pipe(
      z.string().regex(TELEFONO_REGEX, "Teléfono inválido — ej: 04121234567")
    ),
  cedula: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || CEDULA_REGEX.test(v), "Cédula inválida — ej: V-12345678"),
  email: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || z.email().safeParse(v).success, "Correo inválido"),
  estado: z.string().min(1, "Selecciona tu estado"),
  ciudad: z.string().min(2, "Escribe tu ciudad"),
  direccion: z.string().min(10, "Dirección muy corta — incluye referencias"),
  courier: z.enum(["mrw", "zoom", "delivery-merida"], {
    error: "Selecciona cómo quieres recibir tu pedido",
  }),
  notas: z.string().optional(),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

interface ShippingFormProps {
  /** Llamado solo cuando el formulario es válido. */
  onValid: () => void
}

export function ShippingForm({ onValid }: ShippingFormProps) {
  const { shipping, setShipping } = useCheckoutStore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shipping ?? {
      nombre: "",
      telefono: "",
      cedula: "",
      email: "",
      estado: "",
      ciudad: "",
      direccion: "",
      courier: undefined,
      notas: "",
    },
  })

  function onSubmit(data: ShippingFormValues) {
    setShipping(data as ShippingData)
    onValid()
  }

  return (
    <form id="shipping-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <h2 className="text-lg font-semibold">Información de Envío</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo *</Label>
          <Input id="nombre" placeholder="Juan Pérez" {...register("nombre")} />
          {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input id="telefono" type="tel" placeholder="04121234567" {...register("telefono")} />
          {errors.telefono && <p className="text-xs text-destructive">{errors.telefono.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cedula">Cédula (para el courier)</Label>
          <Input id="cedula" placeholder="V-12345678" {...register("cedula")} />
          {errors.cedula && <p className="text-xs text-destructive">{errors.cedula.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="juan@ejemplo.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="estado">Estado *</Label>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="estado" className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {ESTADOS.map((estado) => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.estado && <p className="text-xs text-destructive">{errors.estado.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad *</Label>
          <Input id="ciudad" placeholder="Mérida" {...register("ciudad")} />
          {errors.ciudad && <p className="text-xs text-destructive">{errors.ciudad.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="direccion">Dirección de entrega *</Label>
        <Input
          id="direccion"
          placeholder="Av. Principal, edificio/casa, punto de referencia"
          {...register("direccion")}
        />
        {errors.direccion && <p className="text-xs text-destructive">{errors.direccion.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>¿Cómo quieres recibir tu pedido? *</Label>
        <Controller
          name="courier"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid gap-2 sm:grid-cols-3"
            >
              {(Object.keys(COURIER_LABELS) as Array<keyof typeof COURIER_LABELS>).map((id) => (
                <div key={id}>
                  <RadioGroupItem value={id} id={`courier-${id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`courier-${id}`}
                    className="flex cursor-pointer items-center justify-center rounded-lg border p-3 text-center text-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
                  >
                    {COURIER_LABELS[id]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.courier && <p className="text-xs text-destructive">{errors.courier.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notas">Notas adicionales (opcional)</Label>
        <Input
          id="notas"
          placeholder="Instrucciones de entrega, referencias, etc."
          {...register("notas")}
        />
      </div>
    </form>
  )
}
