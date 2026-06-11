# Plan Maestro de Cierre — ENOVA CORP

**Fecha:** 11 de junio de 2026
**Qué es:** la consolidación de TODOS los pendientes de las 9 auditorías en un solo plan
ejecutable por bloques, con su prompt de ejecución. Cuando estos bloques se completen
(+ las acciones del dueño), el proyecto queda en estado de entrega profesional completa.
**Fuentes:** BRECHAS-RESTANTES.md · PUNTOS-CIEGOS.md · AUDITORIA-GLOBAL.md (lotes 3–4) ·
PLAN-ADMIN.md (§2.4 y fase 5) · PREGUNTAS-CLIENTE.md

---

## EL PROMPT DE EJECUCIÓN (copiar y pegar, un bloque a la vez)

> Ejecuta el BLOQUE [N] del plan maestro de cierre de ENOVA CORP documentado en
> docs/PLAN-MAESTRO-CIERRE.md. Reglas: (1) lee el bloque completo y sus criterios de
> aceptación antes de tocar código; (2) antes de modificar o borrar cualquier archivo,
> verifica sus consumidores con grep amplio (rutas absolutas, relativas y símbolos);
> (3) un commit por bloque con build verde; (4) verifica cada criterio de aceptación con
> el método indicado (curl, navegador en build de producción, grep) — no a ojo;
> (5) las decisiones marcadas DECISIÓN no se implementan: se preguntan primero;
> (6) al terminar, push a master, reporte final en 4 puntos y actualizar la biblioteca
> de prompts del escritorio si hubo aprendizajes nuevos.

---

## BLOQUE 1 — Seguridad web y fundaciones SEO/PWA (sin dependencias, empezar aquí)

| Tarea | Archivos | Detalle |
|---|---|---|
| 1.1 Headers de seguridad | `next.config.ts` | Bloque `headers()`: HSTS (`max-age=31536000; includeSubDomains`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. CSP estricta NO va en este bloque. |
| 1.2 h1 del home | `HeroBanner.tsx` | El título del slide activo debe ser `h1` (el primero) — o h1 sr-only con marca + propuesta de valor y los slides quedan h2. Revisar que no quede doble h1. |
| 1.3 Manifest PWA | `src/app/manifest.ts` (nuevo) | name/short_name ENOVA CORP, colores de marca (#0057b7 / #f5f4f0), display standalone, icono 512 existente (`src/app/icon.png`). |
| 1.4 theme-color | `src/app/layout.tsx` | `themeColor` en el export `viewport`. |
| 1.5 Política de privacidad | `src/app/(shop)/privacy/page.tsx` (nuevo) | Texto estándar adaptado (datos que recolecta el checkout: nombre, cédula, teléfono, dirección; uso: procesar pedidos; contacto WhatsApp/email desde `EMPRESA`). Enlazar en el footer junto a Términos. Añadir al sitemap. La carpeta vacía actual se rellena (ya no quedará huérfana). |

**Criterios de aceptación:** `curl -sI` del build de producción muestra los 5 headers ·
el home tiene exactamente un `<h1>` (grep en el HTML servido) · `/manifest.webmanifest`
responde 200 · `/privacy` responde 200, aparece en `/sitemap.xml` y tiene enlace en el footer ·
build verde · sin overflow nuevo en 375px.

## BLOQUE 2 — Medición (el negocio deja de volar a ciegas)

| Tarea | Detalle |
|---|---|
| 2.1 Vercel Analytics | `npm i @vercel/analytics` → `<Analytics />` en layout raíz. |
| 2.2 Speed Insights | `npm i @vercel/speed-insights` → `<SpeedInsights />` en layout raíz. |
| 2.3 Anotar para después | GA4/Meta Pixel SOLO cuando el cliente haga pauta (no instalar ahora). |

**Criterios:** tras el deploy, la pestaña Analytics del proyecto Vercel registra visitas ·
peso JS añadido < 5 KB (verificar con Performance API).

## BLOQUE 3 — Integridad operativa (anti-mentiras, anti-pérdida)

| Tarea | Archivos | Detalle |
|---|---|---|
| 3.1 Descuento de stock al vender | `checkout/page.tsx`, `products-store.ts` | Al confirmar pedido: decrementar stock de cada item en el products-store (clamp a 0). Documentar limitación: aplica al navegador del comprador; el stock "real" lo ajusta el admin al verificar el pago (va al SOP del bloque 7). |
| 3.2 Export/Import del catálogo | `admin/settings/page.tsx` (sección nueva "Respaldo") | "Exportar catálogo (JSON)" descarga `allProducts` + banners con fecha en el nombre. "Importar" valida con zod (shape de Product[]) antes de reemplazar, con confirmación que indica cuántos productos trae. Aviso visible de la limitación de localStorage. |
| 3.3 Email de confirmación al comprador | — | **DECISIÓN previa del dueño.** Si sí: reinstalar resend, ruta `/api/orders/confirm-email`, plantilla con resumen del pedido + datos de pago. Si no: saltar. |

**Criterios:** compra de prueba → el stock del producto baja en la tienda del mismo navegador ·
export descarga JSON válido → limpiar localStorage → import lo restaura completo ·
los pedidos previos no se ven afectados.

## BLOQUE 4 — UX admin restante (los U pendientes del PLAN-ADMIN §2.4)

| Tarea | Detalle |
|---|---|
| 4.1 (U1) Búsqueda de pedidos por cliente y teléfono | Filtro global de la tabla que cruce id + shippingAddress.name + phone. |
| 4.2 (U2) Export CSV de pedidos | Botón en /admin/orders: id, fecha, cliente, teléfono, items, total USD, total Bs, método, estado. Separador `;` (Excel es-VE) y BOM UTF-8 para acentos. |
| 4.3 (U3) Stock bajo | Ya hay badge ámbar/rojo en la tabla; falta el FILTRO "Stock bajo / Agotados" + contador en el dashboard (conectar el setting notifyLowStock o quitarlo). |
| 4.4 (U5) Gráfica de ventas | Barras simples por semana (últimas 8) con los tokens --chart-1..5 ya definidos. CSS/SVG propio o recharts (evaluar peso). |
| 4.5 (U10) Tablas → cards en móvil | Pedidos y productos bajo 640px: vista de cards apiladas (el dueño gestiona desde el teléfono). |
| 4.6 (U9, opcional) Preview de banner | Render del BannerForm con los estilos reales del hero antes de guardar. |

**Criterios:** cada feature probada en navegador con datos reales · tablas usables en 375px
sin scroll horizontal del body · CSV abre bien en Excel con acentos.

## BLOQUE 5 — Calidad final (a11y, cross-browser, red de seguridad)

| Tarea | Detalle |
|---|---|
| 5.1 Contraste WCAG | Medir pares reales (azul #0057b7 sobre crema/blanco, muted-foreground sobre fondos, brass sobre surface). Corregir los que bajen de 4.5:1 (texto) / 3:1 (UI). |
| 5.2 Teclado | Recorrer checkout completo SOLO con Tab/Enter/Esc: foco visible siempre, sheets/dialogs atrapan y devuelven foco, sin trampas. |
| 5.3 Safari/iOS | Prueba manual con iPhone real (el dueño): header backdrop-blur, filmstrip, sheets, checkout. Anotar y corregir lo que aparezca. |
| 5.4 Smoke E2E Playwright | 1 spec: home → producto → agregar al carrito → checkout completo con datos de prueba → confirmación visible → carga directa de la URL de confirmación (F5). Correr contra build de producción. |
| 5.5 DECISIÓN dark de la tienda | Recomendado: declarar la tienda solo-claro (el toggle queda solo en admin) y documentarlo. Alternativa: exponer toggle en la tienda → entonces auditar TODO el storefront en oscuro (sesión extra). |

**Criterios:** sin pares de contraste fallando · checkout completable sin mouse ·
spec E2E verde contra `npm run start` · decisión dark documentada en CLAUDE.md.

## BLOQUE 6 — Acciones del dueño (checklist — no es código, nadie puede hacerlo por ti)

- [ ] **Vercel plan Pro** (Hobby prohíbe uso comercial — términos).
- [ ] **Renombrar el proyecto Vercel** → `enova-corp` (la URL actual dice "basictech") y actualizar `NEXT_PUBLIC_SITE_URL`.
- [ ] **Dominio propio**: verificar si `enovacorp.co` está registrado/de quién; conectarlo o registrar alternativa.
- [ ] **Rotar `ADMIN_PASSWORD`** en `.env` local y Vercel (la actual estuvo expuesta en el repo).
- [ ] **Google Search Console**: registrar el sitio y enviar `/sitemap.xml`.
- [ ] **Handoff**: decidir en qué cuentas viven Vercel/GitHub/Blob/Groq y dar acceso al cliente.
- [ ] **Cuestionario de datos** (PREGUNTAS-CLIENTE.md): RIF, teléfono real, Pago Móvil, Zelle, Binance → volcar a `empresa.ts`.
- [ ] **Decisiones de producto**: reseñas/ratings fake (ocultar vs reemplazar) · 10 fotos Unsplash → fotos reales · doble CTA carrito/cotización · email de confirmación (3.3) · dark de la tienda (5.5).

## BLOQUE 7 — Documentos de operación (entregar herramienta, no código)

| Documento | Contenido |
|---|---|
| 7.1 SOP del pedido (1 pág.) | Quién revisa pedidos y cada cuánto · plazo para verificar pago · qué hacer si no llega comprobante (recordatorio → cancelar a las 48h) · quién despacha y registra guía MRW/Zoom · ajuste manual de stock al verificar pago (mientras no haya DB). |
| 7.2 Manual del admin (1-2 págs. con capturas) | Crear/editar/duplicar producto · gestionar pedido y estados · aprobar/rechazar pago + WhatsApp · cambiar banners · respaldo (export/import del 3.2) · qué NO tocar. |
| 7.3 SOP de catálogo | Qué pasa cuando llega lista nueva de precios: flujo por admin (recomendado) vs re-parseo del PDF (scripts catalog:*) y cómo evitar pisar ediciones. |

## BLOQUE FINAL (bloqueado) — Supabase

Ya planificado en PLAN-ADMIN.md fase 5 (días 3–7). Desbloquea: pedidos que cruzan navegadores,
stock real, settings persistentes, multi-admin futuro. **Requiere aprobación + credenciales
del cliente.** Cuando se apruebe, este bloque reemplaza las mitigaciones 3.1/3.2.

---

## Orden recomendado y esfuerzo

| Sesión | Bloques | Por qué este orden |
|---|---|---|
| 1 | **1 + 2** | Máximo valor/riesgo mínimo; deja seguridad y medición activas cuanto antes. |
| 2 | **3** | Integridad: el stock deja de mentir y el catálogo deja de poder perderse. |
| 3 | **4** | UX admin completa antes de capacitar al cliente. |
| 4 | **5** | Calidad final con todo lo anterior ya estable. |
| continuo | **6 + 7** | El dueño avanza su checklist en paralelo; los documentos 7.x se escriben cuando el SOP se acuerde. |

**Definición de "proyecto completo y profesional":** bloques 1–5 ejecutados + checklist 6
completado + documentos 7 entregados. Supabase es la fase siguiente, no un bloqueante del cierre.
