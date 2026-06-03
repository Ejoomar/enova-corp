import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

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
            <p className="eyebrow">ENOVA CORP ®</p>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
              Distribuidor oficial de tecnología en Venezuela. Computación, equipos fiscales,
              smartphones e impresoras de las mejores marcas del mundo.
            </p>
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brass-dim)]" />
                <span>Venezuela</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--brass-dim)]" />
                <a
                  href="mailto:ventas@enovacorp.com.ve"
                  className="transition-colors hover:text-[var(--brass)]"
                >
                  ventas@enovacorp.com.ve
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--brass-dim)]" />
                <a href="tel:+582125550100" className="transition-colors hover:text-[var(--brass)]">
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
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]"
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
                  <Link href={link.href} className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]">
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
                  <Link href={link.href} className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--brass)]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark lockup */}
        <div className="overflow-hidden border-b border-[var(--hairline)] py-8">
          <p
            className="font-display select-none text-[clamp(4rem,12vw,10rem)] font-light leading-none tracking-[-0.04em] text-[var(--hairline)]"
            aria-hidden="true"
          >
            ENOVA CORP
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} ENOVA CORP ® · Computación | Equipos Fiscales
          </p>
          <p className="font-mono-ui text-[11px] text-[var(--muted-foreground)]">
            Venezuela
          </p>
        </div>
      </div>
    </footer>
  )
}
