# Auditoría y Plan de Trabajo — ENOVA CORP
**Fecha:** 10 de junio de 2026
**Horizonte:** 10 días hábiles (2 semanas)
**Estado general:** La tienda luce bien y el catálogo funciona, pero el flujo de compra está roto en el último paso, hay código muerto de 3 integraciones abandonadas, y faltan piezas clave de confianza/SEO para entregar un trabajo redondo.

---

## 1. HALLAZGOS CRÍTICOS (bloquean la entrega — corregir primero)

### 1.1 El checkout muestra datos falsos y los ignora todos ❌
`src/app/(shop)/checkout/page.tsx` (líneas 113-128): el paso "Confirmar" muestra **siempre** la dirección hardcodeada de "Carlos Mendoza, Av. Andrés Bello, Caracas" y "Pago Móvil — Banco de Venezuela", sin importar lo que el cliente escribió en los formularios. `ShippingForm` y `PaymentForm` no guardan nada en ningún estado.

**Corrección:** crear un `checkout-store` (Zustand) o estado compartido; los formularios deben usar **react-hook-form + zod** (regla del proyecto que hoy se viola — el checkout no tiene validación alguna) y el paso 3 debe mostrar los datos reales capturados.

### 1.2 Los pedidos nunca se registran ❌
Al pulsar "Confirmar y Pagar" solo se navega a `/checkout/confirmacion`. No se crea ningún pedido: el admin jamás ve los pedidos reales de la web (su panel solo muestra los 235 líneas de pedidos mock). Además, en `confirmacion/page.tsx` la referencia `ENV-xxx` se genera con `Date.now()` **en el cuerpo del render** — cambia en cada re-render, y el carrito se vacía antes de poder mostrar el resumen de lo comprado.

**Corrección:**
- Generar el número de pedido UNA vez (al confirmar, no al renderizar).
- Guardar el pedido completo (items, totales USD/Bs, datos de envío, método de pago) en `orders-store` antes de limpiar el carrito.
- Mostrar el resumen del pedido en la página de confirmación.
- El botón de WhatsApp debe enviar el **pedido completo**: productos, cantidades, total USD + Bs (tasa BCV), datos de envío y referencia — hoy solo envía la referencia.

### 1.3 Datos de pago placeholder en producción ❌
`confirmacion/page.tsx` muestra datos inventados que un cliente real podría usar para pagar:
- Pago Móvil: Banesco / 0412-345-6789 / V-12.345.678
- Zelle: pagos@enovacorp.co / ENOVA CORP C.A.
- Binance: ENOVA-CORP

**Acción:** pedir al cliente los datos REALES de cobro y centralizarlos en un solo archivo de configuración (`src/config/empresa.ts`) para no repetirlos en 5 sitios.

### 1.4 Teléfonos inconsistentes en todo el sitio ❌
Conviven: `0422-3668201`, `+58 422-366-8201`, `584223668201`, `0439-4636190`, `0495253-2319`. Nota: 0422, 0439 y 0495 **no son prefijos móviles venezolanos válidos** (los reales son 0412/0414/0416/0424/0426) — parecen typos. Confirmar el número oficial con el cliente y unificarlo en `src/config/empresa.ts`.

### 1.5 El favicon sigue siendo el logo viejo con recuadro azul
`src/app/layout.tsx:34-36` apunta a `/images/logo.jpg`. Generar favicon/apple-icon desde el nuevo `logo.png` transparente (idealmente `src/app/icon.png` + `apple-icon.png` que Next sirve automático).

---

## 2. CÓDIGO MUERTO A ELIMINAR (limpieza)

Tres integraciones abandonadas siguen en el repo y confunden (ya pasó con NextAuth, que rompió el admin):

| Integración | Archivos |
|---|---|
| **Stripe** (no aplica en Venezuela) | `src/lib/stripe.ts`, `src/app/api/checkout/route.ts`, `src/app/api/webhook/stripe/route.ts`, `src/components/cart/StripeCheckoutButton.tsx`, páginas `checkout/success` y `checkout/cancel`, env vars `STRIPE_*` |
| **Cloudinary** (se usa Vercel Blob) | `src/lib/cloudinary.ts`, `src/app/api/upload/route.ts`, env vars `CLOUDINARY_*` |
| **Prisma** (BD no conectada) | `src/lib/prisma.ts`, `src/lib/get-product.ts` (revisar), rutas `api/products`, `api/products/[id]`, `api/users`, `api/users/[id]`, `api/brands`, `api/categories`, `api/admin/dashboard`, carpeta `prisma/` — **decisión:** eliminar o conservar si se va a conectar BD en fase 2 |
| **Restos NextAuth** | `.env`: `NEXTAUTH_URL`, `AUTH_SECRET`, `ADMIN_SESSION_TOKEN` |

También desinstalar de `package.json` los paquetes que queden huérfanos (`stripe`, `@stripe/*`, `cloudinary`, `@prisma/client`/`prisma` según decisión).

---

## 3. LIMITACIÓN ARQUITECTÓNICA — comunicar al cliente

El catálogo vive en **localStorage del navegador** (Zustand persist). Consecuencia: si el admin crea/edita un producto desde su panel, **solo él lo ve en su navegador** — los clientes siguen viendo el mock. El panel admin hoy es una maqueta funcional, no un gestor real.

**Opciones a plantear al cliente:**
- **Fase 2 (recomendada):** conectar Supabase (Postgres) — productos, pedidos y comprobantes reales. ~3-5 días extra.
- **Alternativa barata:** editar `mock-products.ts` por código en cada cambio de inventario (lo que se hace hoy).

Esta decisión define si el proyecto termina en 2 semanas o si se cotiza una fase 2.

---

## 4. APARTADOS / BLOQUES FALTANTES

1. **`loading.tsx`, `error.tsx`, `not-found.tsx`** — no existe NINGUNO en todo el proyecto. Un error de render hoy muestra la pantalla genérica de Next. Crear al menos: globales + skeleton de catálogo y de producto.
2. **Sistema de toasts (sonner)** — al agregar al carrito o a cotización no hay feedback visual. Es el quick-win de UX más rentable del proyecto.
3. **Sección "Cómo comprar" en el home** — clave para e-commerce venezolano: 4 pasos (elige → confirma por WhatsApp → paga (Pago Móvil/Zelle/Binance) → recibe por MRW/Zoom). Reduce fricción de desconfianza.
4. **Bloque de testimonios / reseñas** en home (ya existe `mock-reviews.ts`, no se aprovecha).
5. **Empty states con copy** — carrito vacío, búsqueda sin resultados, cotización vacía, categoría sin productos.
6. **Mi Cuenta / perfil** — `CLAUDE.md` lo menciona pero no existe. **Decidir:** o se elimina la referencia (no tiene sentido sin BD/login de clientes) o se pospone a fase 2. Recomendación: posponer.
7. **Página 404 personalizada** con buscador y links a categorías.
8. **Indicador de tasa BCV en el header/topbar** — la tasa ya se consume (`useDolarRate`); mostrarla genera confianza y es diferenciador local.

---

## 5. SEO (hoy casi inexistente)

- [ ] `src/app/sitemap.ts` — generar con todas las rutas + productos (150 URLs).
- [ ] `src/app/robots.ts` — permitir todo menos `/admin` y `/api`.
- [ ] **JSON-LD** `Product` + `Offer` en páginas de producto (precio, stock, marca) — habilita rich results en Google.
- [ ] JSON-LD `LocalBusiness` en home (dirección Mérida, teléfono, horario).
- [ ] `FAQPage` schema en `/faq`.
- [ ] Metadata únicas por categoría en `/products?category=X` (hoy comparten la genérica).
- [ ] OG image por defecto con el logo nuevo (hoy si el producto no tiene imagen, no hay fallback).
- [ ] Favicon nuevo (ver 1.5).

---

## 6. ANIMACIONES RECOMENDADAS (sobrias, solo compositor: transform/opacity)

Hoy solo existe `@keyframes marquee`. Agregar:

1. **Scroll-reveal** en secciones del home (IntersectionObserver + CSS, fade-up sutil ~300ms). Sin librerías pesadas.
2. **ProductCard hover:** zoom suave de imagen (scale 1.05) + botón "Agregar" que aparece al hover en desktop.
3. **Badge del carrito:** bounce/scale al agregar un ítem (feedback inmediato).
4. **Count-up** en números del TrustBanner (años, clientes, productos) al entrar en viewport.
5. **Skeletons** con shimmer en catálogo y detalle de producto mientras hidrata Zustand.
6. **Hero:** autoplay con barra de progreso en los dots (hoy hay dots estáticos).
7. **Transición de tema** claro/oscuro suave (`transition: background-color 300ms`).
8. Respetar `prefers-reduced-motion` en todo lo anterior.

---

## 7. MENSAJES / COPY A COLOCAR

- **Toasts:** "✓ Agregado al carrito", "✓ Agregado a tu cotización", "Pedido registrado — envía tu comprobante".
- **Stock:** "Últimas X unidades" (stock ≤ 5), "Agotado — consultar por WhatsApp" (stock 0).
- **Disclaimer BCV:** "Precios en USD. Pagos en Bs. calculados a tasa BCV del día." (footer del carrito y checkout).
- **WhatsApp por producto:** botón "Consultar por WhatsApp" en detalle de producto con mensaje prellenado: "Hola ENOVA, me interesa [producto] (REF [código]). ¿Disponibilidad?"
- **Empty states:** carrito ("Tu carrito está vacío — explora el catálogo"), búsqueda ("No encontramos 'X' — prueba con otra palabra o escríbenos"), cotización.
- **Errores de formulario:** en español, específicos ("El teléfono debe tener 11 dígitos, ej: 04121234567").
- **Garantía visible:** en cada producto "Garantía 6 meses–1 año" según categoría.

---

## 8. PLAN DÍA A DÍA (10 días hábiles)

### Semana 1 — Corregir lo roto y limpiar

| Día | Trabajo | Entregable |
|---|---|---|
| **1** | Checkout real: `checkout-store`, RHF+zod en ShippingForm/PaymentForm, paso Confirmar con datos reales | Checkout captura y valida datos verdaderos |
| **2** | Pedidos: crear pedido en `orders-store` al confirmar, referencia estable, confirmación con resumen completo, mensaje WhatsApp con pedido entero | El admin ve pedidos reales; el cliente envía pedido completo por WhatsApp |
| **3** | Limpieza: eliminar Stripe + Cloudinary + rutas Prisma muertas + env vars; `src/config/empresa.ts` con teléfono/datos de pago centralizados; favicon nuevo | Repo limpio, datos unificados |
| **4** | Toasts (sonner) en carrito/cotización; empty states; mensajes de stock; `not-found.tsx` + `error.tsx` + `loading.tsx` | UX con feedback en todas las acciones |
| **5** | SEO: sitemap, robots, JSON-LD producto + LocalBusiness + FAQ, metadata por categoría, OG fallback | Sitio indexable correctamente |

### Semana 2 — Pulir y entregar

| Día | Trabajo | Entregable |
|---|---|---|
| **6** | Animaciones home: scroll-reveal, count-up stats, hero autoplay con progreso | Home con vida |
| **7** | Animaciones catálogo: hover ProductCard, badge carrito, skeletons shimmer, reduced-motion | Catálogo pulido |
| **8** | Bloques nuevos: "Cómo comprar" (4 pasos), testimonios con mock-reviews, tasa BCV en topbar | Home completo y con confianza local |
| **9** | QA: responsive 320/375/768/1024/1440, ambos temas, Lighthouse (meta ≥90 performance, ≥95 SEO), revisión de todos los links/botones, prueba E2E manual del flujo compra completo | Checklist QA aprobado |
| **10** | Buffer para imprevistos + cargar datos REALES del cliente (pagos, teléfono, dirección, RIF) + walkthrough de entrega | Entrega al cliente |

---

## 9. PREGUNTAS PARA EL CLIENTE (resolver antes del día 3)

1. **Datos de cobro reales:** banco + teléfono + cédula/RIF de Pago Móvil; email de Zelle; ID de Binance.
2. **Número de WhatsApp oficial** (confirmar: ¿0412…? los actuales tienen prefijos inválidos).
3. RIF y razón social exacta para el footer y términos.
4. Dirección física exacta y horario (para LocalBusiness/Google).
5. Política de garantía por categoría (¿6 meses? ¿1 año? ¿qué cubre?).
6. ¿Quieren panel admin REAL (fase 2 con base de datos) o gestionan inventario por ahora con nosotros?
7. Redes sociales activas (¿solo Instagram @enovacorpve?).

---

## 10. FUERA DE ALCANCE (cotizar como Fase 2)

- Base de datos real (Supabase): productos, pedidos y comprobantes persistentes multi-dispositivo.
- Login de clientes + Mi Cuenta + historial de pedidos.
- Subida de comprobantes de pago desde la web (ya existe el panel de revisión en admin).
- Notificaciones por email (Resend) al confirmar pedido.
- Integración del agente de WhatsApp con el catálogo de la web.
