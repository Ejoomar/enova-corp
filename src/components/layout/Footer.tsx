import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone, MapPin, Smartphone, DollarSign, CreditCard } from "lucide-react"

const banks = [
  { name: "Banesco",    color: "#E31837" },
  { name: "Mercantil",  color: "#003087" },
  { name: "Bdv",        color: "#CC0000" },
  { name: "BNC",        color: "#1A5C9E" },
  { name: "Banplus",    color: "#E4002B" },
  { name: "Provincial", color: "#2164C8" },
]

const payments = [
  { label: "Pago Móvil", icon: <Smartphone className="h-3.5 w-3.5" /> },
  { label: "Zelle",      icon: <span className="text-[13px] font-bold leading-none text-[#6B4FBB]">Z</span> },
  { label: "USD",        icon: <DollarSign className="h-3.5 w-3.5" /> },
  { label: "P.O.S.",     icon: <CreditCard className="h-3.5 w-3.5" /> },
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const footerLinks = {
  productos: [
    { name: "Laptops / PCs",     href: "/products?category=laptops"          },
    { name: "Smartphones",       href: "/products?category=smartphones"      },
    { name: "Equipos Fiscales",  href: "/products?category=equipos-fiscales" },
    { name: "Impresoras",        href: "/products?category=impresoras"       },
    { name: "Periféricos",       href: "/products?category=perifericos"      },
    { name: "Gaming",            href: "/products?category=gaming"           },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/about"      },
    { name: "Atención B2B",   href: "/b2b"        },
    { name: "Cotizaciones",   href: "/cotizacion" },
    { name: "Contacto",       href: "/contact"    },
  ],
  ayuda: [
    { name: "Centro de Ayuda",      href: "/help"     },
    { name: "Envíos Venezuela",     href: "/shipping" },
    { name: "Garantía",             href: "/warranty" },
    { name: "Preguntas Frecuentes", href: "/faq"      },
    { name: "Términos y Cond.",     href: "/terms"    },
    { name: "Privacidad",           href: "/privacy"  },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-12 border-b border-[var(--hairline)] py-16 lg:grid-cols-4">

          {/* Brand col */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/images/logo.jpg"
                alt="ENOVA CORP"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--steel)]">
              Distribuidor oficial de tecnología en Venezuela. Computación, equipos fiscales,
              smartphones e impresoras de las mejores marcas del mundo.
            </p>
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2 text-sm text-[var(--steel)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <span>Venezuela</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--steel)]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <a
                  href="mailto:ventas@enovacorp.com.ve"
                  className="transition-colors hover:text-[var(--brass-bright)]"
                >
                  ventas@enovacorp.com.ve
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--steel)]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <a href="tel:+582125550100" className="transition-colors hover:text-[var(--brass-bright)]">
                  +58 212 555 0100
                </a>
              </div>
            </address>
            <div className="flex gap-3">
              <Link
                href="https://www.instagram.com/enovacorpve/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram ENOVA CORP"
                className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Products col */}
          <div>
            <p className="eyebrow mb-6">Productos</p>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--steel)] transition-colors hover:text-[var(--brass)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <p className="eyebrow mb-6">Empresa</p>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[var(--steel)] transition-colors hover:text-[var(--brass)]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help col */}
          <div>
            <p className="eyebrow mb-6">Ayuda</p>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[var(--steel)] transition-colors hover:text-[var(--brass)]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust bar */}
        <div className="border-b border-[var(--hairline)] py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0 lg:divide-x lg:divide-[var(--hairline)]">

            {/* Bancos */}
            <div className="flex flex-col gap-3 lg:pr-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Bancos Venezuela
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {banks.map((bank) => (
                  <span
                    key={bank.name}
                    className="inline-flex items-center rounded border border-[var(--hairline)] bg-[var(--surface-2)] px-2.5 py-1 font-mono-ui text-[10px] font-semibold uppercase tracking-wider text-[var(--steel)]"
                    style={{ borderLeftColor: bank.color, borderLeftWidth: 2 }}
                  >
                    {bank.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Pagos */}
            <div className="flex flex-col gap-3 lg:px-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Métodos de pago
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {payments.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 rounded border border-[var(--hairline)] bg-[var(--surface-2)] px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-wider text-[var(--steel)]"
                  >
                    {p.icon}
                    {p.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex flex-col gap-3 lg:pl-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Síguenos
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.instagram.com/enovacorpve/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded border border-[var(--hairline)] bg-[var(--surface-2)] px-3 py-1.5 text-[var(--steel)] transition-colors hover:border-[var(--brass)] hover:text-[var(--brass)]"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span className="font-mono-ui text-[10px] tracking-wide">@enovacorpve</span>
                </Link>
                <Link
                  href="https://wa.me/584120000000"
                  target="_blank"
                  rel="noopener"
                  aria-label="WhatsApp"
                  className="inline-flex items-center gap-2 rounded border border-[var(--hairline)] bg-[var(--surface-2)] px-3 py-1.5 text-[var(--steel)] transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <WhatsAppIcon />
                  <span className="font-mono-ui text-[10px] tracking-wide">WhatsApp</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Wordmark + Copyright */}
        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-end">
          <p
            className="font-display select-none text-[clamp(1.8rem,5vw,4rem)] font-light leading-none tracking-[-0.04em] text-[var(--hairline)]"
            aria-hidden="true"
          >
            ENOVA CORP
          </p>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} ENOVA CORP ® · Computación | Equipos Fiscales
            </p>
            <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">Venezuela</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
