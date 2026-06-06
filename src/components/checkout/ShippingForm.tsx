"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ShippingForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Informacion de Envio</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input id="firstName" placeholder="Juan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" placeholder="Perez" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electronico</Label>
        <Input id="email" type="email" placeholder="juan@ejemplo.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefono</Label>
        <Input id="phone" type="tel" placeholder="+58 412 555 1234" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Direccion</Label>
        <Input id="address" placeholder="Av. Principal 123" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" placeholder="Caracas" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select>
            <SelectTrigger id="state">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amazonas">Amazonas</SelectItem>
              <SelectItem value="anzoategui">Anzoátegui</SelectItem>
              <SelectItem value="apure">Apure</SelectItem>
              <SelectItem value="aragua">Aragua</SelectItem>
              <SelectItem value="barinas">Barinas</SelectItem>
              <SelectItem value="bolivar">Bolívar</SelectItem>
              <SelectItem value="carabobo">Carabobo</SelectItem>
              <SelectItem value="cojedes">Cojedes</SelectItem>
              <SelectItem value="delta-amacuro">Delta Amacuro</SelectItem>
              <SelectItem value="distrito-capital">Distrito Capital</SelectItem>
              <SelectItem value="falcon">Falcón</SelectItem>
              <SelectItem value="guarico">Guárico</SelectItem>
              <SelectItem value="la-guaira">La Guaira</SelectItem>
              <SelectItem value="lara">Lara</SelectItem>
              <SelectItem value="merida">Mérida</SelectItem>
              <SelectItem value="miranda">Miranda</SelectItem>
              <SelectItem value="monagas">Monagas</SelectItem>
              <SelectItem value="nueva-esparta">Nueva Esparta</SelectItem>
              <SelectItem value="portuguesa">Portuguesa</SelectItem>
              <SelectItem value="sucre">Sucre</SelectItem>
              <SelectItem value="tachira">Táchira</SelectItem>
              <SelectItem value="trujillo">Trujillo</SelectItem>
              <SelectItem value="yaracuy">Yaracuy</SelectItem>
              <SelectItem value="zulia">Zulia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">Codigo Postal</Label>
          <Input id="zip" placeholder="1010" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas adicionales (opcional)</Label>
        <Input
          id="notes"
          placeholder="Instrucciones de entrega, referencias, etc."
        />
      </div>
    </div>
  )
}
