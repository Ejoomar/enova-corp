import { Mail, Phone, MapPin, Instagram } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <span className="col-span-12 font-mono-ui text-[11px] text-[var(--muted-foreground)] lg:col-span-2">— Contacto</span>
        <h1 className="col-span-12 font-display text-5xl font-light tracking-[-0.02em] lg:col-span-8">
          Estamos aquí<br />para ayudarte
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[var(--hairline)] lg:grid-cols-2">
        {/* Contact info */}
        <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-10 space-y-8">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">Canales de contacto</p>

          {[
            { icon: Phone,     label: "Teléfono / WhatsApp", value: "0422-3668201",         href: "tel:+584223668201" },
            { icon: Mail,      label: "Email",               value: "Gerencia@enovacorp.co", href: "mailto:Gerencia@enovacorp.co" },
            { icon: Instagram, label: "Instagram",  value: "@enovacorpve",            href: "https://www.instagram.com/enovacorpve/" },
            { icon: MapPin,    label: "Ubicación",  value: "Venezuela",               href: undefined },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <item.icon className="h-4 w-4 text-[var(--brass)] mt-0.5 shrink-0" />
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener"
                    className="text-sm text-foreground transition-colors hover:text-[var(--brass)]">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hours */}
        <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-10">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-8">Horario de atención</p>
          <div className="space-y-4">
            {[
              { day: "Lunes — Viernes", hours: "8:00 AM — 6:00 PM" },
              { day: "Sábado",          hours: "9:00 AM — 2:00 PM" },
              { day: "Domingo",         hours: "Cerrado" },
            ].map((item) => (
              <div key={item.day} className="flex items-center justify-between border-b border-[var(--hairline)] pb-4 last:border-0">
                <span className="text-sm text-[var(--muted-foreground)]">{item.day}</span>
                <span className={`font-mono-ui text-sm ${item.hours === "Cerrado" ? "text-[var(--muted-foreground)]" : "text-foreground"}`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
