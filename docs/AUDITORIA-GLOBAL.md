# Auditoría Global del Proyecto — ENOVA CORP

**Fecha:** 10 de junio de 2026
**Alcance:** todo `src/`, `package.json`, scripts, stores, APIs públicas y datos
**Método:** greps sistemáticos + ESLint + análisis de consumidores + revisión de reglas de negocio
**Contexto:** áreas ya auditadas y corregidas antes (no se repiten aquí): panel admin (seguridad + datos), navegación e interfaces, tipografía, SEO técnico, checkout, animaciones/QA.

---

## Resumen ejecutivo

El proyecto está en buen estado general: build verde, sin `console.log`, sin enlaces rotos,
APIs admin protegidas, SEO montado y tipografía unificada. Lo que queda se agrupa en:
**1 riesgo de costo real** (API de búsqueda por imagen sin límite), **1 regla de negocio
duplicada que ignora la configuración del admin** (costo de envío), **un lote de código
muerto** (4 componentes, 1 librería, 5 dependencias, 1 script roto), **datos fake visibles
al cliente final** (reseñas y ratings inventados — decisión de negocio pendiente), e
**higiene de lint** (13 errores, 6 warnings).

---

## A. Seguridad y costos

### A1. `/api/search/image` sin rate limiting — CRÍTICO DE COSTO
- **Evidencia:** [route.ts](../src/app/api/search/image/route.ts) es público (correcto, lo usa la tienda), acepta imágenes de hasta 10 MB y llama a la API de Groq en cada request. No hay límite por IP ni global.
- **Impacto:** cualquiera puede hacer un loop de requests y quemar el saldo/cuota de Groq. Es el único endpoint público que cuesta dinero por llamada.
- **Corrección sugerida:** mismo patrón de rate limit en memoria que ya usa el login (ej. 10 búsquedas/hora por IP); opcional bajar el límite de tamaño a 5 MB.
- **Cosmético:** el log de error dice "Gemini returned" pero el proveedor es Groq/Llama (resto de la migración).

### A2. Recordatorios ya conocidos (sin acción de código)
- Rotar `ADMIN_PASSWORD` en `.env` y Vercel (la actual estuvo expuesta como fallback en el repo).
- `NEXT_PUBLIC_SITE_URL` en Vercel cuando exista dominio final.

## B. Código muerto y dependencias

### B1. Componentes sin un solo importador (verificado por grep de consumidores)
| Componente | Estado |
|---|---|
| `products/BrandFilter.tsx` | muerto |
| `products/CategoryFilter.tsx` | muerto |
| `products/PriceFilter.tsx` | muerto |
| `products/CatalogGrid.tsx` | muerto — reemplazado por `CatalogoClient` |

### B2. Librería muerta con los únicos `any` del proyecto
- [src/lib/transformers.ts](../src/lib/transformers.ts): 0 consumidores y contiene los 3 únicos `: any` de todo `src/`. Borrarlo limpia dos hallazgos a la vez.

### B3. Dependencias instaladas sin un solo import
`@google/generative-ai` (la búsqueda por imagen migró a Groq vía fetch), `pg` (no hay
Postgres), `resend` (no se envían emails), `dotenv` (Next carga .env nativo), `tsx`
(solo lo usaba el script roto de abajo). → `npm uninstall` de las 5.

### B4. Script roto en package.json
- `"db:seed": "npx tsx prisma/seed.ts"` — el directorio `prisma/` se eliminó en la Fase B. Borrar el script.

## C. Reglas de negocio duplicadas / configuración decorativa

### C1. El costo de envío está hardcodeado en 2 lugares y la Configuración del admin se ignora — ALTO
- **Evidencia:** `CartSummary.tsx:35` y `OrderSummary.tsx:21` repiten `subtotal >= 200 ? 0 : 15`. Mientras, Configuración del admin tiene `shippingCost` y `freeShippingFrom` editables que **nada lee**.
- **Impacto:** si el cliente cambia el costo de envío en su panel, la tienda lo ignora silenciosamente — configuración decorativa (mismo anti-patrón que los switches de notificaciones).
- **Corrección sugerida (sin DB):** extraer a `src/config/envio.ts` (una sola fuente) y consumirla en ambos componentes + checkout. Cuando llegue Supabase, leer de settings reales.

## D. Integridad de datos visibles al cliente final (decisiones de negocio)

### D1. Reseñas y ratings inventados a la vista de compradores reales — DECISIÓN PENDIENTE
- **Evidencia:** los productos llevan `rating` inventado en `mock-products.ts` (4.3–4.8) y la página de producto muestra "(96 reseñas)" desde `mock-reviews.ts` con autores ficticios; el bloque Testimonios del home igual.
- **Impacto:** si un comprador pregunta por una reseña o la marca lo detecta, daña la credibilidad — el activo más caro de un e-commerce nuevo.
- **Opciones para el cliente:** (a) ocultar estrellas/conteo hasta tener reseñas reales, (b) reemplazar testimonios por capturas reales de WhatsApp/Instagram con permiso, (c) dejar como "demo" asumiendo el riesgo. Recomendada: (a)+(b).

### D2. 10 productos aún con fotos de Unsplash (genéricas) vs 106 con imagen local
- Identificarlos: `grep -n "images.unsplash" src/data/mock-products.ts` y pedir las fotos reales al cliente.

### D3. TODO-CLIENTE críticos sin completar (bloquean entrega)
- RIF placeholder, teléfono WhatsApp con prefijo inválido (`0422` no es móvil venezolano), datos de Pago Móvil/Zelle/Binance de relleno. **Un cliente real podría intentar pagar a una cuenta que no existe.** El cuestionario de datos ya está creado (Fase G) — falta que el cliente lo responda y volcarlo a `empresa.ts`.

## E. Calidad de código (ESLint: 13 errores, 6 warnings)

| Regla | Casos | Notas |
|---|---|---|
| `react-hooks/set-state-in-effect` | 6 | Patrón de hidratación/reduced-motion en ScrollReveal, Header, checkout, admin dashboard, StatsCard. Funciona, pero React recomienda `useSyncExternalStore` o inicializador lazy. No bloquea build. |
| `react/no-unescaped-entities` | 4 | Comillas sin escapar en settings y ProductForm. |
| `no-unused-vars` | 2 | ~~`whatsappLink` en orders/[id]~~ (corregido en esta auditoría) e `Image` en BannerManagerClient. |
| "Compilation Skipped: incompatible library" | 6 warn | React Compiler no optimiza las páginas con TanStack Table — informativo, sin acción. |

## F. Robustez de stores persistidos

### F1. `cart-store` y `quote-store` persisten SIN `version`/`migrate`
- Los otros 4 stores ya lo tienen (lección de la Fase A). Si mañana cambia el shape de `CartItem`, los navegadores con carritos guardados pueden romper en silencio.
- **Corrección:** añadir `version: 1` + `migrate` conservador a ambos.

## G. Rendimiento — sin hallazgos graves (estado positivo)

- `exchange-rate` cachea bien (`revalidate: 300` + caché de módulo). ✓
- Páginas de producto ahora pre-renderizadas (●). ✓
- Fuentes vía `next/font` self-hosted. ✓
- Opcional a futuro: medir bundle por página (`next build` ya lo reporta) contra presupuesto de 300kb.

## H. Testing — cero pruebas en el proyecto

- No hay tests unitarios ni E2E. Para un e-commerce el mínimo defendible es un **smoke E2E de Playwright del flujo de dinero**: catálogo → producto → carrito → checkout → confirmación (incluida carga directa de la URL de confirmación, donde ya hubo un bug real de hidratación).
- Sugerencia: 1 spec de ~80 líneas que corra en CI o antes de cada entrega.

---

## Plan sugerido (no ejecutado — orden por valor/esfuerzo)

| Lote | Contenido | Esfuerzo |
|---|---|---|
| **1. Quick wins de limpieza** | B1–B4 (borrar 4 componentes, transformers, 5 deps, script), E (lint: comillas + import), F1 (versionar 2 stores) | ~1 sesión |
| **2. Costo y negocio** | A1 (rate limit búsqueda por imagen), C1 (config central de envío) | ~1 sesión |
| **3. Decisiones con el cliente** | D1 (reseñas fake: ocultar/reemplazar), D2 (10 fotos reales), D3 (cuestionario de datos) | depende del cliente |
| **4. Red de seguridad** | H (smoke E2E Playwright del flujo de compra) | ~1 sesión |
| **5. Estructural (ya planificado)** | Supabase — ver [PLAN-ADMIN.md](PLAN-ADMIN.md) fase 5 | bloqueado por cliente |

---

*Verificado durante esta auditoría sin hallazgos: console.log (0), debugger (0), `any` fuera de transformers (0), enlaces internos rotos (0), APIs admin sin guard (0), middlewares duplicados (0), secretos hardcodeados (0), .env fuera del repo (✓).*
