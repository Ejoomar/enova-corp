# Auditoría y Plan de Trabajo — Panel de Administración

**Fecha:** 10 de junio de 2026
**Alcance:** `src/app/(admin-panel)/`, `src/components/admin/`, `src/app/api/admin/`, stores y librerías de soporte
**Objetivo:** dejar el panel listo para entregar a los clientes como herramienta real de trabajo en 1–2 semanas

---

## 1. Resumen ejecutivo

El panel **se ve profesional** (shadcn, tablas con TanStack, skeletons, dark mode) pero hoy es **una maqueta funcional**: tiene 3 vulnerabilidades de seguridad críticas y una arquitectura de datos que impide operar el negocio — **los pedidos de los clientes nunca llegan al navegador del dueño**, las estadísticas del dashboard son inventadas, y la configuración se borra sola en cada reinicio del servidor.

El plan de 2 semanas tiene dos pilares: **Semana 1 = seguridad + base de datos real (Supabase)**, **Semana 2 = conectar todas las secciones + UX + pulido**. Sin el pilar de datos reales, ninguna mejora visual hace al panel entregable.

---

## 2. Hallazgos de la auditoría

### 2.1 Seguridad — CRÍTICO (corregir antes de cualquier entrega)

| # | Hallazgo | Evidencia | Corrección |
|---|----------|-----------|------------|
| S1 | **Contraseña fallback `"enova2024"` hardcodeada** en 4 archivos. Si `ADMIN_PASSWORD` no está configurada en Vercel, cualquiera entra con esa clave — y el código está en GitHub. | `admin/layout.tsx:13`, `lib/admin-auth.ts:7`, `api/admin/auth/route.ts:10`, `middleware.ts:7` | Eliminar el fallback: si la env no existe, **fallar** (login deshabilitado + error en logs). Rotar la contraseña actual del cliente. |
| S2 | **La cookie de sesión ES la contraseña en texto plano.** Quien lea la cookie (XSS futuro, logs, proxy) obtiene la credencial. | `api/admin/auth/route.ts:22` — `cookies.set(ADMIN_COOKIE, ADMIN_PASSWORD)` | Cookie = token firmado HMAC-SHA256 (`crypto` nativo, sin dependencias): `firma(secreto, expiración)`. Verificar firma en middleware y `admin-auth.ts`. |
| S3 | **`/api/admin/upload` SIN autenticación** — es el único endpoint admin sin guard. Cualquiera puede subir archivos al Blob de Vercel (costo + abuso + contenido ilícito con la URL pública). | `api/admin/upload/route.ts` — no llama `isAdminAuthenticated` | Agregar el guard como en el resto. Verificar con `curl` sin cookie → 401. |
| S4 | **Login sin rate limiting** — fuerza bruta trivial contra una contraseña única. | `api/admin/auth/route.ts` | Contador de intentos en memoria por IP (5 intentos / 15 min) + delay incremental. Suficiente para serverless; Vercel Firewall como capa extra. |
| S5 | **`PUT /api/admin/settings` sin validación** — hace spread directo del body (`route.ts:17-20`); acepta cualquier shape/tipos. | `api/admin/settings/route.ts` | Schema zod (regla del proyecto) con campos y tipos exactos. |

### 2.2 Arquitectura de datos — CRÍTICO (el panel no opera el negocio sin esto)

| # | Hallazgo | Evidencia | Impacto real |
|---|----------|-----------|--------------|
| D1 | **Todo vive en localStorage, aislado por navegador.** El pedido de un cliente queda en SU navegador; el admin del dueño lee SU PROPIO localStorage y no ve nada. | `orders-store`, `products-store`, `payments-store`, `banner-store` (Zustand persist) | El panel solo "funciona" en demos hechas en la misma máquina. **Es el hallazgo más importante de toda la auditoría.** |
| D2 | **Settings se guardan en memoria del servidor** y se pierden en cada cold start de Vercel. El cliente ve "Guardado ✓" y horas después todo vuelve a los defaults. | `lib/settings-store.ts:7` (el propio comentario lo admite) | Configuración fantasma — frustración garantizada del cliente. |
| D3 | **El dashboard muestra estadísticas FALSAS** ($45,231 de ingresos, clientes inventados "Juan Pérez", "María García") mientras la sección Pedidos muestra los reales del navegador. | `api/admin/dashboard/route.ts` lee `mock-admin.ts`; `orders/page.tsx` lee `useOrdersStore` | Inconsistencia visible: el contador de pedidos del dashboard no cuadra con la lista de pedidos. |
| D4 | **La sección Pagos es 100% decorativa**: no existe NINGÚN flujo que registre un comprobante real (nadie llama a un `addPayment` — no existe). Solo muestra 4 comprobantes fake con fotos de Unsplash. | `stores/payments-store.ts` — solo `updatePaymentStatus` | El cliente aprobará/rechazará pagos de personas que no existen. |
| D5 | **El CRUD de productos solo escribe en el navegador del admin** — los clientes NUNCA ven productos creados o editados. Las API routes devuelven respuestas mock (sus comentarios lo dicen: "In UI-only mode"). | `ProductForm.tsx` usa `useProductsStore`; `api/admin/products/route.ts:57` | La función principal del panel (gestionar catálogo) no surte efecto en la tienda. |
| D6 | **Ruta API muerta**: `api/admin/payments/route.ts` tiene los mismos 4 mocks duplicados y ya nadie la consume (la página usa el store). | grep: ningún `fetch("/api/admin/payments")` | Código muerto + datos duplicados que se desincronizan. |

**Recomendación central:** conectar **Supabase** (ya previsto como "posible fase 2" en CLAUDE.md) para `products`, `orders`, `payments` y `settings`. Es la única forma de que el panel sea una herramienta real. **Plan B** si el cliente no aprueba la base de datos: entregar como "demo navegable", eliminar TODOS los datos fake (peor un cero honesto que un Juan Pérez inventado) y documentar la limitación por escrito.

### 2.3 Funcional — ALTO

- **F1. Sección "Usuarios" huérfana**: las páginas existen (`admin/users/`) con datos 100% fake y avatares de pravatar.cc, pero NO aparece ni en la sidebar ni en el nav móvil. Decidir: **eliminarla** (recomendado — sin registro de clientes no tiene fuente de datos) o conectarla cuando exista auth de clientes.
- **F2.** "Pedidos Recientes" del dashboard (fake) contradice la sección Pedidos (real) — se resuelve con D3.
- **F3.** Aprobar/rechazar un comprobante **no notifica al cliente** — ni siquiera abre WhatsApp con mensaje prellenado.
- **F4.** Los switches `notifyNewOrders` / `notifyLowStock` de Configuración **no hacen nada** (decorativos). Conectarlos o quitarlos.
- **F5.** Cambiar estado de un pedido no guarda historial (quién/cuándo pasó a "enviado") — solo pisa `updatedAt`.

### 2.4 UX / bloques que faltan — MEDIO

- **U1.** Pedidos: búsqueda solo por N° de pedido → añadir búsqueda por **nombre de cliente y teléfono**.
- **U2.** Pedidos: **export CSV** (el dueño lleva contabilidad fuera del sistema).
- **U3.** Productos: **indicador de stock bajo** (≤5 en ámbar, 0 en rojo) + filtro "Agotados / Stock bajo". El setting `notifyLowStock` ya existe — conectarlo aquí.
- **U4.** Productos: acción **"Duplicar"** (cargar variantes de un mismo equipo es el caso de uso más común del rubro).
- **U5.** Dashboard: **gráfica simple de ventas** por semana/mes — los colores `--chart-1..5` ya están definidos en el design system y no se usan en ningún lado.
- **U6.** Dashboard: **accesos rápidos** ("+ Nuevo producto", "Ver pendientes (3)").
- **U7.** Detalle de pedido: botón **"Contactar cliente por WhatsApp"** con resumen del pedido prellenado (el negocio YA opera por WhatsApp — es el botón más útil de todo el panel).
- **U8.** Pagos: **lightbox** para ver el comprobante en grande + vínculo al pedido asociado.
- **U9.** Banners: **preview en vivo** de cómo se verá el banner en el home antes de guardar.
- **U10.** Tablas en móvil: scroll horizontal incómodo → **vista de cards** bajo 640px (el dueño gestionará desde el teléfono).

### 2.5 Mensajes / copy a colocar (textos exactos)

- **M1. Empty states con acción:**
  - Pedidos: *"Aún no hay pedidos. Cuando un cliente complete su compra aparecerá aquí."* + botón "Ver la tienda"
  - Pagos: *"No hay comprobantes pendientes. ¡Estás al día!"*
  - Productos (búsqueda vacía): *"Sin resultados para «X». Revisa la ortografía o créalo ahora."* + botón "+ Nuevo producto"
- **M2. Confirmaciones destructivas específicas** (nunca genéricas): *"¿Eliminar «Balanza ACLAS LS2 M3»? Esta acción no se puede deshacer y el producto dejará de mostrarse en la tienda."*
- **M3. Textos de ayuda en Configuración**, ej. tasa BCV manual: *"Solo se usa si la API del BCV no responde. Déjala vacía para usar siempre la tasa automática."*
- **M4. Toasts en CADA mutación** (crear/editar/borrar producto, cambiar estado, aprobar pago, guardar settings) — hoy solo Configuración tiene feedback inline; el resto es inconsistente. Sonner ya está instalado.
- **M5. Login con rate limit:** *"Demasiados intentos. Espera 15 minutos."* (sin revelar más).
- **M6. Saludo útil en el header del dashboard:** *"Buen día — martes 10 de junio. Tienes 3 pedidos pendientes."* (con dato real, no decorativo).

### 2.6 Animaciones (sutiles — el panel es una herramienta, no una vitrina)

- **A1.** StatsCard: contador animado (count-up ~600ms) al cargar el dashboard.
- **A2.** Badge de estado: transición de color al cambiar estado de pedido (feedback inmediato sin recargar).
- **A3.** Fila nueva en tabla: fade-in + highlight breve (cuando entra un pedido).
- **A4.** Sidebar: transición suave del indicador activo.
- **A5.** Skeletons: el dashboard ya los tiene — replicar el patrón en Productos, Pedidos y Pagos.
- **A6.** TODO con `prefers-reduced-motion` respetado (patrón ya establecido en el storefront — reutilizar).

---

## 3. Plan de trabajo — 10 días hábiles

### Semana 1 — Seguridad + datos reales (el fundamento)

| Día | Tareas | Entregable verificable |
|-----|--------|------------------------|
| **1** | **Seguridad bloque 1:** S1 (eliminar fallback + fail-fast), S2 (cookie con token HMAC firmado), S3 (guard en upload). Rotar contraseña del cliente. | `curl` sin cookie a TODAS las rutas admin → 401. Login sigue funcionando. Build verde. |
| **2** | **Seguridad bloque 2 + limpieza:** S4 (rate limit login), S5 (zod en settings), D6 (borrar ruta muerta), F1 (eliminar sección Usuarios + sus rutas API). | 6 intentos seguidos de login → bloqueado. `grep -r "pravatar"` → 0. |
| **3** | **Supabase:** crear proyecto, esquema (`products`, `orders`, `order_items`, `payments`, `settings`), RLS (todo privado salvo lectura de products), seed desde `mock-products.ts`, tipos TS generados. | Tablas visibles en Supabase Studio con los ~30 productos reales cargados. |
| **4** | **Productos y Settings → DB:** API routes leen/escriben Supabase (mantener shapes de respuesta); `ProductForm` persiste real; storefront lee products de DB con fallback estático si falla. Settings persisten (mata D2 y D5). | Crear producto en el admin → **aparece en la tienda desde otro navegador/teléfono**. Guardar settings → sobrevive un redeploy. |
| **5** | **Pedidos → DB:** el checkout escribe el pedido vía route handler público (validación zod); admin Pedidos lee de DB (mata D1). Probar flujo E2E completo. | Pedido hecho desde un teléfono → visible en el admin de la PC. Carga directa de la confirmación funciona. |

### Semana 2 — Conectar todo + UX + pulido

| Día | Tareas | Entregable verificable |
|-----|--------|------------------------|
| **6** | **Dashboard real:** stats calculadas de DB (ingresos del mes, pedidos por estado, recientes reales). Eliminar `mock-admin.ts`. Saludo M6. | El total de pedidos del dashboard cuadra con la sección Pedidos. `grep -r "mock-admin"` → 0. |
| **7** | **Pagos reales:** en la confirmación del pedido el cliente sube su comprobante (reusa `/api/admin/upload` con variante pública limitada al pedido) → tabla `payments` → admin aprueba/rechaza con botón WhatsApp al cliente (mata D4, F3; incluye U8 lightbox). | Comprobante subido por el cliente → visible y aprobable en el admin → WhatsApp se abre con mensaje al cliente. |
| **8** | **UX features:** U1 (buscar por cliente), U2 (export CSV), U3 (stock bajo + filtro), U4 (duplicar producto), U7 (WhatsApp en detalle de pedido). | Cada feature probada con datos reales en navegador. |
| **9** | **Mensajes + animaciones + gráfica:** M1–M5 (copy), A1–A6 (animaciones), U5 (gráfica de ventas), U6 (accesos rápidos), U10 (cards móviles). | Revisión visual en 320/768/1440, claro y oscuro, reduced-motion activado. |
| **10** | **QA final + entrega:** flujo E2E completo (compra → pedido → comprobante → aprobación → estado), `curl` de seguridad, build, deploy, y **mini-guía de uso para el cliente** (1 página: crear producto, gestionar pedido, aprobar pago, cambiar banner). | Checklist de QA firmado + guía entregada + deploy en producción. |

### Versión reducida (si solo hay 1 semana)

Días 1–2 seguridad (**innegociable**) → Días 3–4 Supabase solo `products` + `orders` → Día 5 dashboard real mínimo + QA + guía. Pagos reales y UX quedan como iteración 2.

---

## 4. Decisiones pendientes con el cliente

1. **¿Aprobar Supabase?** (plan gratuito alcanza de sobra para este volumen). Sin esto, el panel queda en modo demo.
2. **¿Sección Usuarios?** Recomendación: eliminar ahora; reintroducir si algún día hay cuentas de clientes.
3. **¿Notificación por email al recibir pedido?** (Resend, ~medio día extra) — los switches de "notificaciones" hoy no hacen nada.
4. **Rotar `ADMIN_PASSWORD`** — la actual pudo quedar comprometida por el fallback en el repo.

## 5. Riesgos y mitigaciones

- **Migrar products a DB toca el storefront** → fallback a datos estáticos si la DB no responde + probar la tienda completa en el día 4, no al final.
- **localStorage viejo de visitantes** → subir `version` del `products-store` (regla ya documentada en CLAUDE.md).
- **Shapes de API** → mantener las formas de respuesta actuales al migrar (los componentes no deberían enterarse del cambio de fuente).
- **Serverless y rate limit en memoria** → es "best effort" (cada instancia cuenta aparte); suficiente como fricción, documentarlo.

---

*Documento generado a partir de auditoría de código completa: 15 páginas del panel, 10 route handlers, 7 stores y librerías de auth/settings.*
