# Investigación de Brechas — Lo que Falta por Auditar/Implementar

**Fecha:** 10 de junio de 2026
**Pregunta que responde:** "¿qué más falta por auditar o implementar en la web?"
**Método:** inventario de lo ya cubierto en todas las sesiones anteriores + verificación
activa de las áreas nunca revisadas (headers reales con curl, métricas de rendimiento
medidas en build de producción con viewport móvil, greps de instrumentación).

---

## Mapa de lo YA cubierto (no re-auditar)

Checkout y formularios · limpieza de integraciones muertas · feedback UX y bloques de
confianza · SEO técnico (sitemap, robots, JSON-LD, OG, metadata) · animaciones + QA
responsive · tipografía unificada · panel admin (seguridad, datos reales, UX) · navegación
e interfaces (enlaces, overflow, 404 real) · auditoría global de código (deps, reglas
duplicadas, lint, stores, rate limits).

---

## BRECHAS NUEVAS ENCONTRADAS (nunca auditadas hasta hoy)

### 1. Headers de seguridad HTTP — AUSENTES POR COMPLETO (alto, fix de 30 min)
- **Verificado con curl en producción:** la respuesta no trae NINGUNO: ni
  `Strict-Transport-Security`, ni `X-Frame-Options`, ni `X-Content-Type-Options`, ni
  `Referrer-Policy`, ni `Permissions-Policy`, ni CSP.
- **Impacto:** clickjacking posible (el sitio se puede embeber en un iframe ajeno),
  sniffing de MIME, fuga de referrers completos.
- **Corrección:** bloque `headers()` en `next.config.ts` con los 5 básicos. La CSP estricta
  (nonces) es proyecto aparte — empezar con los básicos no rompe nada.

### 2. Cero medición y cero monitoreo — EL NEGOCIO VUELA A CIEGAS (alto para el cliente)
- **Verificado:** no hay Vercel Analytics, ni GA4, ni Meta Pixel, ni Search Console
  declarado, ni Sentry/monitoreo de errores. `error.tsx` existe pero nadie se entera
  de los errores que sufren los usuarios reales.
- **Impacto de negocio:** el cliente no podrá responder "¿cuánta gente entró?, ¿qué
  productos miran?, ¿de dónde llegan?" — y sin eso no hay decisiones de inventario/marketing.
- **Mínimo recomendado:** `@vercel/analytics` + `@vercel/speed-insights` (gratis, 2 líneas
  en el layout). GA4/Pixel solo si el cliente hace pauta. Sentry en fase 2.

### 3. No existe política de privacidad — y el checkout recolecta datos personales (legal)
- **Verificado:** `src/app/(shop)/privacy/` es un directorio VACÍO (la página se eliminó
  en algún commit y quedó la carpeta huérfana). El checkout pide nombre, cédula, teléfono
  y dirección.
- **Corrección:** crear la página de política de privacidad (texto estándar adaptado a
  Venezuela), enlazarla en el footer junto a Términos, añadirla al sitemap, y borrar la
  carpeta vacía mientras tanto.

### 4. El home no tiene `<h1>` (SEO/a11y)
- **Verificado:** la página más importante del sitio no tiene h1 — el hero usa `<h2>`.
- **Corrección:** el título del primer slide del hero (o un h1 visualmente oculto con el
  nombre + propuesta de valor) debe ser h1. Cambio de 5 minutos, revisar jerarquía del resto.

### 5. PWA básica ausente (medio — mejora móvil barata)
- **Verificado:** sin `manifest`, sin `theme-color`. En Android, "Añadir a pantalla de
  inicio" muestra defaults genéricos.
- **Corrección:** `src/app/manifest.ts` (nombre, colores de marca, icono 512 ya existente)
  + `themeColor` en el viewport export. ~20 min. Service worker/offline NO se recomienda
  (complejidad sin retorno aquí).

### 6. Rendimiento — medido de verdad por primera vez (estado: BUENO con notas)
Datos reales (build de producción, viewport móvil 375px, red local):
| Métrica | Valor | Lectura |
|---|---|---|
| CLS | **0.000** | Excelente — cero saltos de layout |
| TTFB | 61 ms (local) | Sano |
| Peso total home | 704 KB | Razonable para e-commerce con imágenes |
| JS comprimido | 223 KB | Sobre el presupuesto de 150 KB para landing — vigilar, no urgente |
| Imágenes | 252 KB / 36 requests | Muchos logos pequeños — candidato a sprite/lazy, menor |
| Fuentes | 115 KB (3 familias woff2) | Razonable; subset posible a futuro |
- Nota menor: `useDolarRate` no comparte caché entre componentes → el home pide
  `/api/exchange-rate` 2 veces (el server cachea con revalidate 300, impacto trivial).
  Mejora elegante futura: caché de módulo o SWR.
- Los ~30 fetches restantes son prefetch normal de Next para los `<Link>` visibles. ✓

### 7. `alt=""` en imágenes del hero y promos — ACEPTADO, no es bug
- Tienen texto adyacente que las describe (título del slide); alt vacío es el patrón
  correcto para imagen decorativa. Documentado para que nadie lo "corrija" de más.

---

## PENDIENTES HEREDADOS (ya documentados en planes anteriores, consolidados aquí)

| Pendiente | Dónde está documentado | Bloqueado por |
|---|---|---|
| Supabase (pedidos cruzan navegadores) | PLAN-ADMIN.md fase 5 | Decisión + credenciales del cliente |
| Búsqueda de pedidos por cliente (U1), export CSV (U2), filtro stock bajo (U3), gráfica de ventas (U5), preview de banner (U9), tablas→cards móvil (U10) | PLAN-ADMIN.md §2.4 | Nada — listas para ejecutar |
| Smoke E2E Playwright del flujo de compra | AUDITORIA-GLOBAL.md lote 4 | Nada |
| Reseñas/ratings fake visibles | AUDITORIA-GLOBAL.md D1 | Decisión del cliente |
| 10 fotos Unsplash en productos reales | AUDITORIA-GLOBAL.md D2 | Fotos del cliente |
| RIF, teléfono, datos de pago reales | Cuestionario Fase G | Respuestas del cliente |
| Rotar ADMIN_PASSWORD + NEXT_PUBLIC_SITE_URL + dominio + Search Console | AUDITORIA-GLOBAL.md A2 | Acción del cliente en Vercel |

---

## Orden sugerido de ejecución (lo implementable sin el cliente)

1. **Headers de seguridad** (#1) + **h1 del home** (#4) — una sesión corta, riesgo casi nulo.
2. **Vercel Analytics + Speed Insights** (#2) — 2 líneas, valor inmediato para el cliente.
3. **Política de privacidad + manifest PWA** (#3, #5) — contenido + 20 min de config.
4. **UX admin restante** (U1, U2, U3, U5, U10) — una sesión.
5. **Smoke E2E** — red de seguridad antes de la entrega final.

Con esos 5 bloques + las respuestas del cliente (datos reales y Supabase), el proyecto
queda en estado de entrega profesional completa.
