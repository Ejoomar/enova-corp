export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Legal</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Política de<br />Privacidad
        </h1>
      </div>

      <div className="max-w-3xl space-y-10">
        {[
          { title: "1. Datos que recopilamos",   body: "Recopilamos información que usted nos proporciona directamente: nombre, correo electrónico, teléfono y dirección de envío. También recopilamos datos de navegación de forma anónima para mejorar la experiencia del sitio." },
          { title: "2. Uso de la información",   body: "Utilizamos sus datos exclusivamente para procesar pedidos, coordinar envíos, enviar confirmaciones de compra y brindar soporte técnico. No vendemos ni compartimos su información personal con terceros." },
          { title: "3. Seguridad de los datos",  body: "ENOVA CORP ® implementa medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o divulgación." },
          { title: "4. Cookies",                 body: "Utilizamos cookies esenciales para el funcionamiento del carrito de compras y cookies analíticas anónimas. Puede desactivarlas desde la configuración de su navegador." },
          { title: "5. Sus derechos",            body: "Usted tiene derecho a acceder, corregir o solicitar la eliminación de sus datos personales. Para ejercer estos derechos, contáctenos a ventas@enovacorp.com.ve." },
          { title: "6. Cambios a esta política", body: "ENOVA CORP ® puede actualizar esta política de privacidad periódicamente. Le notificaremos cambios significativos mediante aviso en el sitio web." },
        ].map((section) => (
          <div key={section.title} className="border-b border-[var(--hairline)] pb-10 last:border-0">
            <h2 className="font-display text-xl font-light mb-3 tracking-[-0.01em]">{section.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{section.body}</p>
          </div>
        ))}

        <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
          Última actualización: Junio 2025 · ENOVA CORP ® Venezuela
        </p>
      </div>
    </div>
  )
}
