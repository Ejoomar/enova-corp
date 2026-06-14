"use client"
import { EMPRESA } from "@/config/empresa"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Check, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // General
  const [storeName,        setStoreName]        = useState("ENOVA CORP")
  const [storeEmail,       setStoreEmail]       = useState("Gerencia@enovacorp.co")
  const [storePhone,       setStorePhone]       = useState(EMPRESA.whatsappDisplay)
  const [storeAddress,     setStoreAddress]     = useState("Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida")
  const [storeDescription, setStoreDescription] = useState("Tu tienda de tecnología de confianza")
  const [timezone,         setTimezone]         = useState("america-caracas")
  const [currency,         setCurrency]         = useState("usd")

  // Store
  const [showOutOfStock,   setShowOutOfStock]   = useState(true)
  const [showStockCount,   setShowStockCount]   = useState(true)
  const [allowReviews,     setAllowReviews]     = useState(true)
  const [shippingCost,     setShippingCost]     = useState("15")
  const [freeShippingFrom, setFreeShippingFrom] = useState("200")

  // Notifications
  const [notifyNewOrders,  setNotifyNewOrders]  = useState(true)
  const [notifyLowStock,   setNotifyLowStock]   = useState(true)

  // Exchange rate
  const [bcvRate, setBcvRate] = useState("")

  // Payment methods
  const [acceptCards,    setAcceptCards]    = useState(true)
  const [acceptTransfer, setAcceptTransfer] = useState(true)
  const [acceptDigital,  setAcceptDigital]  = useState(true)

  // Load persisted settings on mount
  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(({ data }) => {
        if (!data) return
        const g = data.general ?? {}
        const s = data.store ?? {}
        const n = data.notifications ?? {}
        const p = data.payments ?? {}

        if (g.storeName)        setStoreName(g.storeName)
        if (g.storeEmail)       setStoreEmail(g.storeEmail)
        if (g.storePhone)       setStorePhone(g.storePhone)
        if (g.storeAddress)     setStoreAddress(g.storeAddress)
        if (g.storeDescription) setStoreDescription(g.storeDescription)
        if (g.timezone)         setTimezone(g.timezone)
        if (g.currency)         setCurrency(g.currency)

        if (s.shippingCost     !== undefined) setShippingCost(String(s.shippingCost))
        if (s.freeShippingFrom !== undefined) setFreeShippingFrom(String(s.freeShippingFrom))
        if (s.showOutOfStock   !== undefined) setShowOutOfStock(s.showOutOfStock)
        if (s.showStockCount   !== undefined) setShowStockCount(s.showStockCount)
        if (s.allowReviews     !== undefined) setAllowReviews(s.allowReviews)
        if (s.bcvRate          != null)       setBcvRate(String(s.bcvRate))

        if (n.notifyNewOrders !== undefined) setNotifyNewOrders(n.notifyNewOrders)
        if (n.notifyLowStock  !== undefined) setNotifyLowStock(n.notifyLowStock)

        if (p.acceptCards    !== undefined) setAcceptCards(p.acceptCards)
        if (p.acceptTransfer !== undefined) setAcceptTransfer(p.acceptTransfer)
        if (p.acceptDigital  !== undefined) setAcceptDigital(p.acceptDigital)
      })
      .catch(() => setLoadError(true))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          general: {
            storeName, storeEmail, storePhone, storeAddress, storeDescription, timezone, currency,
          },
          store: {
            showOutOfStock, showStockCount, allowReviews,
            shippingCost:     Number(shippingCost),
            freeShippingFrom: Number(freeShippingFrom),
            bcvRate:          bcvRate !== "" ? Number(bcvRate) : null,
          },
          notifications: {
            notifyNewOrders, notifyLowStock,
          },
          payments: {
            acceptCards, acceptTransfer, acceptDigital,
          },
        }),
      })
      if (res.ok) {
        setSaved(true)
        toast.success("Configuración guardada")
        setTimeout(() => setSaved(false), 3000)
      } else {
        toast.error("No se pudo guardar la configuración")
      }
    } catch {
      toast.error("No se pudo guardar la configuración")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración de tu tienda
          {loadError && (
            <span className="ml-2 text-destructive text-sm">— Error al cargar, usando valores por defecto</span>
          )}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Tienda</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Tienda</CardTitle>
              <CardDescription>Configura la información básica de tu tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nombre de la tienda</Label>
                  <Input
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email de contacto</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Teléfono</Label>
                  <Input
                    id="storePhone"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Dirección</Label>
                  <Input
                    id="storeAddress"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Descripción</Label>
                <Input
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zona Horaria y Moneda</CardTitle>
              <CardDescription>Configura la zona horaria y moneda de la tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-caracas">America/Caracas (GMT-4)</SelectItem>
                      <SelectItem value="america-bogota">America/Bogota (GMT-5)</SelectItem>
                      <SelectItem value="america-mexico">America/Mexico_City (GMT-6)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Moneda</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">Dólares ($)</SelectItem>
                      <SelectItem value="eur">Euros (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Productos</CardTitle>
              <CardDescription>Configura cómo se muestran los productos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mostrar productos agotados</p>
                  <p className="text-sm text-muted-foreground">
                    Los productos sin stock se mostrarán como «Agotado»
                  </p>
                </div>
                <Switch checked={showOutOfStock} onCheckedChange={setShowOutOfStock} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mostrar cantidad en stock</p>
                  <p className="text-sm text-muted-foreground">
                    Muestra cuántas unidades quedan disponibles
                  </p>
                </div>
                <Switch checked={showStockCount} onCheckedChange={setShowStockCount} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Permitir reseñas de productos</p>
                  <p className="text-sm text-muted-foreground">
                    Los clientes pueden dejar reseñas en los productos
                  </p>
                </div>
                <Switch checked={allowReviews} onCheckedChange={setAllowReviews} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasa de Cambio BCV</CardTitle>
              <CardDescription>
                Tasa manual de respaldo (Bs por $). Se usa cuando la API externa de tasas no está disponible.
                Déjalo vacío para no mostrar precios en Bs cuando la API falle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bcvRate">Tasa BCV (Bs / $)</Label>
                  <Input
                    id="bcvRate"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ej: 46.50"
                    value={bcvRate}
                    onChange={(e) => setBcvRate(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    La tienda primero obtiene la tasa en tiempo real desde BCV. Este valor solo se usa si esa consulta falla.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envío</CardTitle>
              <CardDescription>Configura las opciones de envío</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="shippingCost">Costo de envío estándar ($)</Label>
                  <Input
                    id="shippingCost"
                    type="number"
                    min="0"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingFrom">Envío gratis desde ($)</Label>
                  <Input
                    id="freeShippingFrom"
                    type="number"
                    min="0"
                    value={freeShippingFrom}
                    onChange={(e) => setFreeShippingFrom(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>Configura qué notificaciones recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos pedidos</p>
                  <p className="text-sm text-muted-foreground">
                    Recibe un email cuando hay un nuevo pedido
                  </p>
                </div>
                <Switch checked={notifyNewOrders} onCheckedChange={setNotifyNewOrders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Stock bajo</p>
                  <p className="text-sm text-muted-foreground">
                    Alerta cuando un producto tiene poco stock
                  </p>
                </div>
                <Switch checked={notifyLowStock} onCheckedChange={setNotifyLowStock} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>Habilita o deshabilita métodos de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tarjetas de crédito/débito</p>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                </div>
                <Switch checked={acceptCards} onCheckedChange={setAcceptCards} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transferencia bancaria</p>
                  <p className="text-sm text-muted-foreground">
                    Banco de Venezuela, Mercantil, BBVA Provincial
                  </p>
                </div>
                <Switch checked={acceptTransfer} onCheckedChange={setAcceptTransfer} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Billeteras digitales</p>
                  <p className="text-sm text-muted-foreground">Pago Móvil, Cashea</p>
                </div>
                <Switch checked={acceptDigital} onCheckedChange={setAcceptDigital} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
          ) : saved ? (
            <><Check className="mr-2 h-4 w-4" />Guardado</>
          ) : (
            <><Save className="mr-2 h-4 w-4" />Guardar Cambios</>
          )}
        </Button>
      </div>
    </div>
  )
}
