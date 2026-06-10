# Preguntas para el cliente — Datos reales para la entrega
**Proyecto:** ENOVA CORP e-commerce · **Fecha:** 10/06/2026
**Por qué importa:** la web está funcional, pero hay datos marcados como `TODO-CLIENTE` (placeholders) que DEBEN reemplazarse antes de la entrega. Un cliente real podría pagar a una cuenta que no existe.

---

## 🔴 BLOQUEANTES — sin esto no se puede entregar

### 1. Datos de cobro (los más urgentes)
La página de confirmación de pedido muestra estos datos al cliente para que pague:

**Pago Móvil:**
- ¿Banco? (hoy dice "Banesco" de relleno)
- ¿Número de teléfono afiliado?
- ¿Cédula o RIF del titular?

**Zelle:**
- ¿Correo del Zelle?
- ¿Nombre exacto del titular como aparece en Zelle?

**Binance Pay:**
- ¿Binance ID o usuario?
- ¿Confirman que reciben USDT por red BEP20, u otra red?

**USD en efectivo:**
- ¿Solo en tienda, o también contra-entrega con el delivery en Mérida?

**Transferencia bancaria** (el footer muestra Mercantil, BBVA Provincial y Banco de Venezuela):
- ¿Números de cuenta, titular y RIF de cada banco que usan?
- ¿O prefieren NO publicar cuentas y manejarlo solo por WhatsApp?

**Cashea** (aparece en el footer como "Pago en cuotas"):
- ¿Realmente están afiliados a Cashea? Si no, hay que quitarlo — promete algo que no existe.

### 2. Número de WhatsApp oficial
- Todo el sitio usa **0422-3668201**. ⚠️ El prefijo 0422 no es un prefijo móvil venezolano estándar (los normales son 0412/0414/0416/0424/0426). **¿Es correcto ese número, dígito por dígito?** ¿O es 0424…?
- ¿Es el mismo número para: ventas, soporte técnico y recepción de comprobantes? ¿O hay números distintos?

### 3. Identidad fiscal
- **RIF** de la empresa (hoy dice J-00000000-0 de relleno)
- **Razón social exacta**: ¿"ENOVA CORP C.A."? (aparece en facturas, términos y el pie de página)

### 4. Correo electrónico oficial
⚠️ Encontré DOS correos distintos en el sitio: `Gerencia@enovacorp.co` (footer y ayuda) y `Generala@enovacorp.co` (config). 
- ¿Cuál es el correcto? ¿Existe el dominio de correo @enovacorp.co?

---

## 🟡 IMPORTANTES — para que todo sea verídico

### 5. Ubicación y horario
- Dirección exacta: hoy dice "Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida" — ¿es correcta y completa?
- Horario real de atención (hoy dice L-V 9am-6pm, sábados 9am-4pm) — ¿correcto?
- ¿Tienen Google Maps / Google Business? (lo enlazamos y mejora el SEO local)

### 6. Envíos
- ¿Trabajan con MRW y Zoom, ambos? ¿Algún otro courier?
- ¿El envío lo paga el cliente en destino (cobro en destino) siempre?
- La web ofrece "envío gratis en compras sobre $200" — ¿es real o lo ajustamos/quitamos?
- ¿Delivery propio en Mérida? ¿Tiene costo? ¿Mismo día?

### 7. Garantías (la web promete esto — confirmar)
- Laptops y computadoras: ¿1 año?
- Otros equipos: ¿3 a 6 meses? ¿Cuáles exactamente tienen cuánto?
- UPS y reguladores: ¿garantía limitada de cuánto?
- ¿El servicio técnico de garantía lo hacen ustedes directamente?

### 8. Política comercial
- ¿Confirman que NO aceptan devoluciones (solo error de despacho y defecto de fábrica)?
- Los precios: ¿incluyen IVA o se suma aparte? ¿A qué productos se les suma? (la web tiene la marca "plusIva" en algunos)
- ¿Emiten factura fiscal a todos o solo a quien la pida?

### 9. Redes sociales
- ¿Instagram @enovacorpve es el único canal? ¿Facebook, TikTok?
- ¿Quieren que el Instagram aparezca enlazado donde está?

---

## 🟢 DESEABLES — suben la calidad de la entrega

### 10. Dominio propio
- ¿Tienen o quieren comprar un dominio (ej: enovacorp.com.ve / enovacorp.com)? Hoy la web vive en una URL de Vercel. Con el dominio: mejor SEO, mejor imagen y el link de WhatsApp se ve profesional.

### 11. Testimonios reales
- La sección "Lo que dicen de nosotros" usa 3 reseñas de ejemplo. ¿Tienen capturas/textos de clientes reales (con su permiso) para reemplazarlas? Nombre + qué compró + comentario.

### 12. Contraseña del panel admin
- Definir una contraseña fuerte para el panel (hoy usa una por defecto). La configuro en Vercel — solo necesito que el cliente la elija (o la genero yo y se la entrego en privado).

### 13. Fotos propias
- ¿Tienen fotos reales de la tienda/productos? Hoy varias imágenes son de banco de imágenes (Unsplash). Fotos propias = más confianza.

### 14. Decisión de Fase 2 (cotizar aparte)
- El panel admin actual NO persiste cambios entre dispositivos (los productos viven en el navegador). ¿Quieren cotizar la Fase 2 con base de datos real para gestionar inventario/pedidos ellos mismos? Si la respuesta es "por ahora no", el inventario se actualiza por código cuando lo pidan.

---

## Checklist técnico interno (para David, no para el cliente)
- [ ] Rellenar `src/config/empresa.ts` con las respuestas (buscar TODO-CLIENTE)
- [ ] Configurar en Vercel: `NEXT_PUBLIC_SITE_URL` (dominio final) y `ADMIN_PASSWORD` (fuerte)
- [ ] Borrar env vars muertas de Vercel: NEXTAUTH_URL, AUTH_SECRET, ADMIN_SESSION_TOKEN, STRIPE_*, CLOUDINARY_*, DATABASE_URL
- [ ] Unificar el email correcto en config (Gerencia@ vs Generala@)
- [ ] Quitar Cashea del footer si no están afiliados
- [ ] Reemplazar reseñas mock si entregan testimonios reales
- [ ] Registrar el sitio en Google Search Console y enviar /sitemap.xml
- [ ] Verificar rich results: https://search.google.com/test/rich-results
