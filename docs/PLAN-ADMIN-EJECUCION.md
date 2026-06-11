# Plan de Ejecución — Panel Admin (prompt + auditoría + fases)

> Derivado de [PLAN-ADMIN.md](PLAN-ADMIN.md). Este documento contiene el prompt de
> implementación, su auditoría crítica, la división en fases y el registro de lo ejecutado.

---

## 1. Prompt redactado (lo que se pidió implementar)

> "Endurece la seguridad del panel admin de ENOVA CORP y conéctalo a datos reales. Elimina
> la contraseña fallback hardcodeada, firma la cookie de sesión, protege el endpoint de
> subida, agrega rate limiting al login y validación zod a settings. Limpia el código muerto
> y la sección huérfana de usuarios. Haz que el dashboard muestre métricas reales y agrega la
> UX mínima entregable (toasts, confirmaciones que nombran el ítem, botón de WhatsApp al
> cliente, indicador de stock bajo). Migra los datos a Supabase para que los pedidos del
> cliente lleguen al admin."

## 2. Auditoría del prompt (qué se corrigió antes de ejecutar)

1. **El plan marcaba `/api/admin/payments` como "ruta muerta" (D6) — es FALSO.** El
   `AdminHeader` la consume para el badge de pendientes (campana), y `payments-store` +
   la página importan el tipo `PaymentProofMock` de ahí. Borrarla a ciegas habría roto el
   build y la campana. **Corrección:** mover el tipo al store, hacer que la campana lea del
   store (además arregla un bug real: el contador quedaba desactualizado tras aprobar un
   pago) y solo entonces eliminar la ruta y su variante `[id]` (esta sí sin consumidores).
2. **Hacer `isAdminAuthenticated` asíncrona rompe a sus ~16 llamadores.** La verificación de
   un token firmado es asíncrona (Web Crypto). Hay que actualizar cada `if (!isAdminAuthenticated(...))`
   a `await`. Se contempló y se hizo en bloque.
3. **El middleware corre en Edge runtime.** No puede usar `crypto` de Node; debe usar
   Web Crypto (`crypto.subtle`), que sí existe en Edge y Node. El token se diseñó con Web Crypto.
4. **Supabase requiere decisión del cliente + credenciales que no tengo.** Está marcado en el
   propio plan como "Decisión pendiente #1" y CLAUDE.md dice "NO hay base de datos conectada".
   **No se puede ejecutar autónomamente.** Se implementa todo lo demás y la migración a DB
   queda como fase bloqueada, documentada abajo.
5. **Cambiar el formato de la cookie cierra las sesiones admin abiertas.** Esperado y
   aceptable: el admin vuelve a iniciar sesión una vez.

## 3. División en fases

| Fase | Contenido | Estado |
|------|-----------|--------|
| **1. Seguridad** | S1 fail-fast sin fallback · S2 cookie token HMAC · S3 guard en upload · S4 rate limit login · S5 zod en settings | ✅ Ejecutada |
| **2. Limpieza** | F1 quitar sección Users (páginas + API + store + mock) · arreglar dependencia del tipo de payments + campana consistente · borrar rutas payments muertas | ✅ Ejecutada |
| **3. Dashboard real** | D3 métricas del dashboard calculadas de los stores reales (mata `$45,231` y "Juan Pérez") | ✅ Ejecutada |
| **4. UX entregable** | toasts en mutaciones · confirmación que nombra el producto · botón WhatsApp al cliente en detalle de pedido · indicador stock bajo · count-up en stats · ayuda en settings · empty states | ✅ Ejecutada |
| **5. Datos reales (Supabase)** | D1/D2/D4/D5 — pedidos/productos/pagos/settings en DB para que crucen navegadores | ⛔ Bloqueada: requiere aprobación del cliente + credenciales Supabase |

## 4. Registro de ejecución

Ver commits `feat(admin): ...` asociados. Verificación: `npm run build` verde + `curl` sin
cookie a cada ruta admin → 401. La Fase 5 queda lista para arrancar en cuanto el cliente
apruebe Supabase y se carguen las variables de entorno.
