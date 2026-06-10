# Plan de Implementación Técnico — ENOVA CORP
**Basado en:** [PLAN-TRABAJO.md](PLAN-TRABAJO.md) (auditoría del 10/06/2026)
**Orden de ejecución:** A → B → C → D → E → F → G (A y B son bloqueantes, el resto puede reordenarse)

---

## FASE A — Checkout real (días 1-2) 🔴 CRÍTICO

**Problema:** los formularios de checkout no guardan nada, el paso Confirmar muestra datos hardcodeados de "Carlos Mendoza", y los pedidos nunca se registran.

### A.1 Config centralizada de empresa
**Crear** `src/config/empresa.ts`:
```ts
export const EMPRESA = {
  nombre: "ENOVA CORP C.A.",
  rif: "J-XXXXXXXX-X",            // TODO-CLIENTE
  whatsapp: "584223668201",        // TODO-CLIENTE: confirmar número real
  whatsappDisplay: "0422-366-8201",
  instagram: "@enovacorpve",
  direccion: "Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida",
  pagos: {
    pagoMovil: { banco: "Banesco", telefono: "...", cedula: "..." }, // TODO-CLIENTE
    zelle:     { email: "...", titular: "..." },                     // TODO-CLIENTE
    binance:   { id: "...", moneda: "USDT · BEP20" },                // TODO-CLIENTE
  },
} as const
```
Reemplazar TODOS los teléfonos/datos dispersos: `Footer.tsx`, `confirmacion/page.tsx`, `contact/page.tsx`, `WhatsAppButton.tsx`, topbar, etc. (buscar con grep `wa.me|0422|0412|0439|0495`).

### A.2 Store de checkout
**Crear** `src/stores/checkout-store.ts` (Zustand, sin persist o con sessionStorage):
- `shipping: ShippingData | null` (nombre, teléfono, cédula, estado, ciudad, dirección, courier MRW/Zoom/Delivery)
- `paymentMethod: "pago-movil" | "zelle" | "binance" | "usd-efectivo" | null`
- `setShipping`, `setPaymentMethod`, `reset`

### A.3 Formularios con react-hook-form + zod (regla del proyecto)
**Modificar** `src/components/checkout/ShippingForm.tsx`:
- Schema zod: nombre min 3; teléfono regex `^(0412|0414|0416|0424|0426)\d{7}$` con mensaje "ej: 04121234567"; cédula opcional; estado (select con los 24); ciudad; dirección min 10; courier.
- `onSubmit` → `setShipping(data)` + avanzar paso. El padre pasa `onValid` callback.

**Modificar** `src/components/checkout/PaymentForm.tsx`:
- RadioGroup de métodos desde `EMPRESA.pagos` + zod (método requerido).

**Modificar** `src/app/(shop)/checkout/page.tsx`:
- "Continuar" dispara el submit del form activo (ref o botón submit dentro del form); NO se avanza con datos inválidos.
- Paso 3 lee `shipping` y `paymentMethod` del store — eliminar el bloque hardcodeado (líneas 113-128).

### A.4 Registro del pedido
**Modificar** `src/data/mock-orders.ts` / `src/types`: asegurar que `Order` soporte: `reference`, `items` (id, nombre, qty, precio), `totalUsd`, `totalBs`, `tasaBcv`, `shipping`, `paymentMethod`, `source: "web"`.

**Modificar** `src/stores/orders-store.ts`: acción `addOrder(order)` que prepende a `allOrders`.

**Modificar** `checkout/page.tsx` botón "Confirmar y Pagar":
1. Genera referencia UNA vez: `ENV-${Date.now().toString(36).toUpperCase()}`
2. `addOrder({...})` con todo el detalle
3. `router.push(/checkout/confirmacion?ref=${reference})`

### A.5 Página de confirmación
**Modificar** `src/app/(shop)/checkout/confirmacion/page.tsx`:
- Lee `ref` del searchParam y busca el pedido en `orders-store` (NO regenerar referencia).
- Muestra resumen real: items, totales USD y Bs.
- Datos de pago desde `EMPRESA.pagos`.
- Mensaje WhatsApp completo:
  ```
  Hola ENOVA CORP, acabo de hacer el pedido [REF]:
  • 2x Laptop Dell ... — $700
  Total: $760 (Bs. 27.000 — tasa BCV)
  Envío: [courier] a [ciudad], [estado]
  Método de pago: [método]
  Adjunto mi comprobante.
  ```
- `clearCart()` solo después de montar Y haber leído el pedido (o al salir).

**Criterio de aceptación:** compro 2 productos → escribo mis datos → el paso 3 muestra MIS datos → confirmo → la confirmación muestra mi pedido con referencia estable → el pedido aparece en `/admin/orders` → el link de WhatsApp lleva el pedido completo.

---

## FASE B — Limpieza de código muerto (día 3) 🔴

### B.1 Eliminar archivos
```
src/lib/stripe.ts
src/app/api/checkout/route.ts
src/app/api/webhook/stripe/route.ts
src/components/cart/StripeCheckoutButton.tsx   (verificar imports antes)
src/app/(shop)/checkout/success/page.tsx
src/app/(shop)/checkout/cancel/page.tsx
src/lib/cloudinary.ts
src/app/api/upload/route.ts                    (admin usa /api/admin/upload con Blob)
src/lib/prisma.ts
src/lib/get-product.ts                         (si solo lo usa código Prisma; api/admin/products/[id] lo importa — migrar a mock/store)
src/app/api/products/route.ts + [id]
src/app/api/users/route.ts + [id]
src/app/api/brands/route.ts
src/app/api/categories/route.ts
src/app/api/admin/dashboard/route.ts           (verificar si el dashboard admin lo consume; si sí, reescribir con mock data)
prisma/                                         (si el cliente no aprueba Fase 2 aún, conservar en una rama `fase-2-db`)
```

### B.2 Desinstalar paquetes
`npm uninstall stripe @stripe/stripe-js cloudinary @prisma/client prisma` (verificar cuáles existen en package.json primero).

### B.3 Limpiar .env
Quitar: `NEXTAUTH_URL`, `AUTH_SECRET`, `ADMIN_SESSION_TOKEN`, `STRIPE_*`, `CLOUDINARY_*`, `DATABASE_URL` (si se elimina Prisma). Hacer lo mismo en variables de entorno de Vercel.

### B.4 Favicon nuevo
- Generar `src/app/icon.png` (512×512) y `src/app/apple-icon.png` (180×180) desde `public/images/logo.png` con sharp (script ya existe como referencia: `scripts/process-logo.js`).
- Eliminar el bloque `icons` de `src/app/layout.tsx` (Next sirve icon.png automático) y el viejo `src/app/icon.jpg`.

**Criterio de aceptación:** `npm run build` limpio; `grep -r "stripe\|cloudinary\|prisma" src/` → 0 resultados; favicon nuevo visible en pestaña del browser.

---

## FASE C — Feedback UX (día 4) 🟡

### C.1 Toasts
- `npm i sonner`; `<Toaster richColors position="bottom-right" />` en `src/app/layout.tsx`.
- `toast.success("Agregado al carrito")` en los puntos que llaman `addItem`: `ProductCard.tsx`, `ProductDetail.tsx`.
- Equivalente para cotización (`quote-store`) y "Pedido registrado" al confirmar checkout.

### C.2 Empty states (componente reutilizable `src/components/ui/EmptyState.tsx`)
- Carrito vacío (`cart/page.tsx`): icono + "Tu carrito está vacío" + CTA "Explorar catálogo".
- Búsqueda sin resultados (`SearchDialog.tsx`): "No encontramos 'X' — prueba otra palabra o escríbenos por WhatsApp".
- Cotización vacía (`cotizacion/page.tsx`).
- Catálogo filtrado sin resultados (`ProductGrid.tsx`): CTA "Limpiar filtros".

### C.3 Páginas de sistema
- `src/app/not-found.tsx` — 404 con buscador y links a categorías.
- `src/app/error.tsx` — "Algo salió mal" + botón reintentar + link WhatsApp.
- `src/app/(shop)/products/loading.tsx` y `products/[id]/loading.tsx` — skeletons.

### C.4 Mensajes de stock
En `ProductCard` y `ProductDetail`:
- `stock === 0` → badge "Agotado" + botón cambia a "Consultar por WhatsApp".
- `stock <= 5` → "¡Últimas {stock} unidades!" en ámbar.

**Criterio de aceptación:** agregar al carrito muestra toast; /ruta-inexistente muestra 404 con marca; producto agotado no se puede agregar al carrito.

---

## FASE D — SEO (día 5) 🟡

1. **`src/app/sitemap.ts`**: rutas estáticas + 150 productos desde `mock-products.ts` (`/products/${slug}`). Base URL desde env `NEXT_PUBLIC_SITE_URL`.
2. **`src/app/robots.ts`**: allow all; disallow `/admin`, `/api`, `/checkout`; sitemap link.
3. **JSON-LD Product** en `products/[id]/page.tsx` (ya es Server Component): `Product` + `Offer` (price USD, availability según stock, brand) en `<script type="application/ld+json">`.
4. **JSON-LD LocalBusiness** en home: nombre, dirección Mérida, teléfono, horario, sameAs Instagram.
5. **FAQPage schema** en `/faq` con las preguntas existentes.
6. **Metadata por categoría**: `products/page.tsx` con `generateMetadata` leyendo `searchParams.category` → "Laptops en Venezuela | ENOVA CORP".
7. **OG fallback**: `src/app/opengraph-image.png` (1200×630) con logo + tagline (generar con sharp o diseño simple).

**Criterio de aceptación:** `/sitemap.xml` y `/robots.txt` responden; validador de schema.org pasa en producto y home.

---

## FASE E — Animaciones (días 6-7) 🟢

1. **`src/components/ui/ScrollReveal.tsx`**: wrapper con IntersectionObserver que agrega clase `.revealed`; CSS en globals: `opacity 0 → 1` + `translateY(16px) → 0`, 400ms ease-out. Aplicar a las 6 secciones del home.
2. **ProductCard hover** (solo desktop): `group` + imagen `group-hover:scale-105 transition-transform duration-300`; botón "Agregar" con `opacity-0 group-hover:opacity-100`.
3. **Badge carrito**: al cambiar `itemCount`, clase `animate-cart-bounce` (keyframe scale 1 → 1.3 → 1, 300ms) — useEffect con timeout en Header.
4. **Count-up** en TrustBanner: hook `useCountUp(target, durationMs)` activado por IntersectionObserver.
5. **Hero autoplay**: `setInterval` 6s + dot activo como barra de progreso (`width` animado con CSS — usar `transform: scaleX` para mantenerlo compositor-friendly). Pausar en hover y con `prefers-reduced-motion`.
6. **Global**: `@media (prefers-reduced-motion: reduce)` desactiva reveal/count-up/autoplay.

**Criterio de aceptación:** sin jank en móvil (probar en Performance tab); con reduced-motion activado no hay animaciones.

---

## FASE F — Bloques nuevos del home (día 8) 🟢

1. **`src/components/home/ComoComprar.tsx`** — 4 pasos con iconos:
   1. "Elige tus productos" → 2. "Confirma por WhatsApp" → 3. "Paga como prefieras (Pago Móvil · Zelle · Binance · USD)" → 4. "Recibe en 24-48h (MRW · Zoom)".
   Insertar entre `PromoBanners` y `FeaturedProducts`.
2. **`src/components/home/Testimonios.tsx`** — carrusel/grid de 3-4 reseñas desde `mock-reviews.ts` (nombre, estrellas, texto corto, producto comprado). Insertar antes de `BrandSection`.
3. **Tasa BCV en TopBar** — `useDolarRate` ya existe: "BCV: Bs. {tasa}/USD" con fecha, al lado derecho del topbar. Tooltip: "Los pagos en Bs. se calculan a esta tasa".

**Criterio de aceptación:** home cuenta la historia completa: hero → categorías → cómo comprar → productos → confianza → testimonios → marcas.

---

## FASE G — QA y entrega (días 9-10) 🟢

### Checklist técnico
- [ ] Responsive: 320, 375, 768, 1024, 1440 — sin overflow horizontal en ninguna página
- [ ] Temas claro y oscuro en todas las páginas (incluido admin)
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90 (home, catálogo, producto)
- [ ] Flujo E2E manual: home → buscar → producto → carrito → checkout (datos reales) → confirmación → pedido visible en admin → WhatsApp con pedido completo
- [ ] Admin completo: login → dashboard → CRUD producto → pedidos → pagos → logout (en móvil y desktop)
- [ ] Cotización B2B: agregar → ver → enviar
- [ ] 404, error y empty states visibles y con marca

### Checklist de datos reales (requiere respuestas del cliente — ver PLAN-TRABAJO.md §9)
- [ ] Número de WhatsApp oficial verificado y unificado en `empresa.ts`
- [ ] Datos de Pago Móvil / Zelle / Binance reales
- [ ] RIF y razón social en footer y términos
- [ ] Dirección y horario reales
- [ ] `ADMIN_PASSWORD` fuerte configurado en Vercel (no el default `enova2024`)
- [ ] `NEXT_PUBLIC_SITE_URL` con el dominio final

---

## Dependencias entre fases

```
A (checkout) ──► C (toasts del checkout) ──► G (QA)
B (limpieza) ──► D (SEO usa estructura limpia)
A.1 (empresa.ts) ──► B.3, C, F (todos consumen la config)
E, F ─ independientes entre sí
```

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Cliente no entrega datos de pago a tiempo | `empresa.ts` con TODO-CLIENTE visibles; la web funciona con placeholders marcados "(por confirmar)" |
| `api/admin/dashboard` u otro consumidor oculto de Prisma rompe el admin al limpiar | Grep de imports antes de borrar cada archivo + build después de cada lote |
| localStorage desactualizado tras cambios de tipos en Order | Bump `version` en orders-store con `migrate` |
| Animaciones causan jank en gama baja | Solo transform/opacity + reduced-motion + probar en throttle 4x |
