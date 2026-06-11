import { EMPRESA } from "@/config/empresa"

export const metadata = {
  title: "Política de Privacidad — ENOVA CORP",
  description:
    "Cómo ENOVA CORP recolecta, usa y protege tus datos personales al comprar en nuestra tienda.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Legal</span>
        <h1 className="col-span-12 font-display text-[length:var(--text-h1)] font-light leading-[1.1] lg:col-span-8">
          Política de<br />Privacidad
        </h1>
      </div>

      <div className="max-w-3xl space-y-10">
        {[
          {
            title: "1. Qué datos recolectamos",
            body: "Al realizar un pedido solicitamos: nombre y apellido, cédula de identidad, teléfono, dirección de envío, ciudad y estado, y opcionalmente tu correo electrónico. Si usas la búsqueda por imagen, la foto que subes se procesa únicamente para identificar el producto y no se almacena. Tu carrito y cotización se guardan localmente en tu navegador, no en nuestros servidores.",
          },
          {
            title: "2. Para qué usamos tus datos",
            body: "Exclusivamente para procesar tu pedido: verificar tu pago, coordinar el envío con el courier (MRW o Zoom) y contactarte por WhatsApp o correo sobre el estado de tu compra. No usamos tus datos para publicidad ni perfiles de consumo.",
          },
          {
            title: "3. Con quién compartimos tus datos",
            body: "Solo con el courier que entregará tu pedido (nombre, teléfono y dirección, los datos mínimos para el despacho). No vendemos, alquilamos ni cedemos tu información personal a terceros con fines comerciales.",
          },
          {
            title: "4. Cuánto tiempo los conservamos",
            body: "Conservamos los datos de tu pedido el tiempo necesario para gestionar la venta, la garantía del producto y nuestras obligaciones fiscales y contables en Venezuela.",
          },
          {
            title: "5. Tus derechos",
            body: `Puedes solicitar la consulta, corrección o eliminación de tus datos personales escribiéndonos por WhatsApp al ${EMPRESA.whatsappDisplay} o al correo ${EMPRESA.email}. Responderemos en un plazo máximo de 30 días.`,
          },
          {
            title: "6. Seguridad",
            body: "El sitio funciona bajo conexión cifrada (HTTPS). El acceso a los datos de pedidos está restringido al personal autorizado de la tienda mediante credenciales protegidas.",
          },
          {
            title: "7. Cambios a esta política",
            body: "Si modificamos esta política publicaremos la versión actualizada en esta misma página, con su fecha de revisión.",
          },
        ].map((section) => (
          <div key={section.title} className="border-b border-[var(--hairline)] pb-10 last:border-0">
            <h2 className="font-display text-xl font-light mb-3 tracking-[-0.02em]">{section.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{section.body}</p>
          </div>
        ))}

        <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
          Última actualización: Junio 2026 · ENOVA CORP ® Venezuela
        </p>
      </div>
    </div>
  )
}
