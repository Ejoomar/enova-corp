# Puntos Ciegos — Lo que Nadie Está Mirando

**Fecha:** 10 de junio de 2026
**Pregunta que responde:** "¿qué estoy obviando para que esto sea un proyecto completo y profesional?"
**Diferencia con las auditorías anteriores:** esto no son bugs de código — son ausencias de
operación, producto y entrega que ninguna auditoría técnica detecta porque "funcionan".

---

## I. OPERACIÓN DEL NEGOCIO (el software funciona; el negocio alrededor no está definido)

### 1. El stock NUNCA se descuenta al vender — VERIFICADO HOY
- Ninguna línea del flujo de compra toca el stock: si hay "¡Últimas 2 unidades!" y se venden
  5, el badge sigue diciendo 2 para siempre. La urgencia honesta que implementamos se vuelve
  deshonesta tras la primera venta.
- **Fix corto (pre-Supabase):** descontar stock en el products-store al confirmar pedido +
  SOP: el admin ajusta stock manualmente al verificar cada pago (porque el descuento local
  solo aplica al navegador del comprador). Documentar la limitación.
- **Fix real:** Supabase (ya planificado).

### 2. No existe el SOP del pedido (el proceso humano)
- El sistema tiene estados (pendiente→procesando→enviado→entregado) pero nadie definió:
  ¿quién revisa los pedidos y cada cuánto? ¿en cuánto tiempo se verifica un pago? ¿qué pasa
  si el comprador nunca envía el comprobante (hoy: nada, queda pendiente eterno)? ¿cuándo se
  cancela? ¿quién despacha con MRW/Zoom y registra la guía?
- **Entregable:** 1 página de SOP acordada con el cliente. Sin esto, el panel es un tablero
  sin reglas de juego.

### 3. El manual de uso para el cliente nunca se hizo
- Estaba prometido (PLAN-ADMIN día 10) y es la pieza que convierte "entregar código" en
  "entregar una herramienta": cómo crear producto, gestionar un pedido, aprobar un pago,
  cambiar un banner, qué NO tocar. 1-2 páginas con capturas.

### 4. No hay proceso de actualización del catálogo
- El catálogo nació de un PDF parseado con scripts (`catalog:parse`, `catalog:images`).
  Cuando el cliente mande la lista nueva de precios: ¿quién corre qué? ¿se pisan las
  ediciones hechas en el admin? Documentar el flujo o decidir que todo cambio va por el admin.

## II. ENTREGA E INFRAESTRUCTURA (de "proyecto en mi cuenta" a "negocio del cliente")

### 5. El plan de Vercel probablemente viola los términos — REVISAR YA
- El plan **Hobby de Vercel prohíbe uso comercial**. Esto es una tienda. Para producción
  real: plan Pro (~$20/mes) o migrar hosting. Nadie lo había mencionado en ningún documento.

### 6. La URL de producción no dice ENOVA por ningún lado
- `basictech-nine.vercel.app` — nombre heredado de otro proyecto. Mínimo HOY: renombrar el
  proyecto en Vercel (→ `enova-corp.vercel.app`, gratis, 2 min + actualizar
  NEXT_PUBLIC_SITE_URL). Meta real: dominio propio. El email corporativo usa `enovacorp.co`
  — verificar si ese dominio está registrado y de quién es; si existe, el sitio debería
  vivir ahí.

### 7. ¿De quién es la cuenta? (handoff de propiedad)
- Proyecto Vercel, repo GitHub, Blob storage, claves de Groq: ¿en cuenta de quién viven?
  El cliente debería ser dueño (o al menos tener acceso de emergencia documentado).
  Definir el handoff antes de la entrega final, no después.

### 8. Riesgo de pérdida TOTAL del trabajo del admin — silencioso y grave
- Los productos/banners editados viven en el localStorage del navegador del dueño.
  **Si limpia el navegador, cambia de PC o usa modo incógnito: pierde todo sin aviso.**
- **Mitigación corta (1 sesión):** botones "Exportar catálogo (JSON)" / "Importar" en el
  admin + aviso de la limitación en Configuración.
- **Fix real:** Supabase.

## III. PRODUCTO / UX (decisiones pendientes, no bugs)

### 9. Doble CTA en cada producto: ¿Carrito o Cotización?
- Cada producto ofrece DOS flujos paralelos (carrito→checkout y cotización→WhatsApp/email)
  que terminan en el mismo lugar: hablar con la tienda. Para el comprador puede ser ruido.
- Decisión con el cliente: ¿mantener ambos (B2B cotiza, B2C compra) o simplificar?
  Si se mantienen, diferenciarlos visualmente con texto de ayuda ("¿Compra por volumen?
  Usa cotización").

### 10. El tema oscuro de la TIENDA no existe para el usuario — VERIFICADO HOY
- El toggle de tema solo está en el header del ADMIN. La tienda pública está fija en claro
  (`defaultTheme="light"`, `enableSystem={false}`) y no hay forma de cambiarla.
- Consecuencia: todo el CSS dark del storefront es código muerto imposible de probar.
- Decisión: (a) exponer el toggle en la tienda (y entonces auditar TODO el storefront en
  oscuro), o (b) declarar la tienda solo-claro y dejar de mantener variantes dark en
  componentes de la tienda. Recomendada: (b) por simplicidad — el dark queda para el admin.

### 11. El comprador no recibe NINGUNA confirmación escrita
- Todo el rastro del pedido queda en el WhatsApp que el COMPRADOR envía. Si no lo envía,
  no hay constancia de nada para ninguna de las partes.
- Un email automático de confirmación (Resend, ~medio día) da seriedad, deja rastro y
  reduce "¿y mi pedido?". Requiere decidirlo (resend se desinstaló por no usarse).

## IV. CALIDAD NUNCA BARRIDA SISTEMÁTICAMENTE

### 12. Accesibilidad real: contraste, teclado, lector
- Nunca se midió contraste WCAG de la paleta (azul #0057b7 sobre fondos, muted-foreground
  sobre crema), ni se recorrió el checkout completo SOLO con teclado, ni se pasó axe-core.
  Media sesión y cierra el frente.

### 13. Safari/iOS jamás probado
- Todo el QA fue en Chrome (preview). Venezuela es Android-mayoritario pero los iPhone
  existen entre compradores B2B. Un vistazo real en Safari (backdrop-blur del header,
  scroll del filmstrip, sheets) — 20 minutos con el teléfono del usuario.

### 14. Una sola contraseña de admin para todos
- Si el cliente tiene empleados, todos compartirán la misma llave, sin registro de quién
  hizo qué. Aceptado para hoy; va en el roadmap post-Supabase (usuarios + roles + auditoría).

---

## Priorización honesta (qué duele más si se ignora)

| # | Punto | Tipo | Esfuerzo |
|---|---|---|---|
| 1 | Stock que no se descuenta (#1) | Integridad | Corto |
| 2 | Export/backup del catálogo (#8) | Anti-pérdida de datos | Corto |
| 3 | Plan Vercel + renombrar proyecto + dominio (#5,#6,#7) | Legal/marca | Acción del usuario |
| 4 | SOP del pedido + manual del cliente (#2,#3) | Operación | Media sesión |
| 5 | Decisiones de producto: dark tienda, doble CTA, email (#9,#10,#11) | Producto | Conversación + corto |
| 6 | A11y contraste/teclado + Safari (#12,#13) | Calidad | Media sesión |
| 7 | Catálogo: SOP de actualización (#4) | Operación | 1 página |

**La síntesis:** el código ya está a nivel profesional; lo que falta para que el PROYECTO
sea profesional es lo de alrededor — que el negocio pueda operarlo (SOP + manual), que no
pierda datos (backup), que no mienta (stock), y que viva en una casa propia (plan, dominio,
propiedad de cuentas).
