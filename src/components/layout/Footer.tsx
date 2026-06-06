import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const banks = [
  { name: "Banesco",   src: "/logos/banesco.svg",   w: 100 },
  { name: "Mercantil", src: "/logos/mercantil.svg", w: 110 },
  { name: "BdV",       src: "/logos/bdv.svg",       w: 100 },
  { name: "BNC",       src: "/logos/bnc.svg",       w: 85  },
  { name: "Banplus",   src: "/logos/banplus.svg",   w: 95  },
  { name: "BBVA",      src: "/logos/bbva.svg",      w: 110 },
]

const payments = [
  { name: "Pago Móvil", src: "/logos/pagomovil.svg", w: 110 },
  { name: "Zelle",      src: "/logos/zelle.svg",     w: 78  },
  { name: "USD",        src: "/logos/usd.svg",       w: 75  },
  { name: "Binance",    src: "/logos/binance.svg",   w: 105 },
  { name: "Cashea",     src: "/logos/cashea.svg",    w: 90  },
]

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
                <a href="mailto:ventas@enovacorp.com.ve" className="transition-colors hover:text-[var(--brass-bright)]">
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
            <div className="flex items-center gap-3">
              <Link
                href="https://www.instagram.com/enovacorpve/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram ENOVA CORP"
                className="group flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Image src="/logos/instagram.svg" alt="Instagram" width={18} height={18} />
                <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--steel)]">
                  @enovacorpve
                </span>
              </Link>
              <span className="text-[var(--hairline)]">·</span>
              <Link
                href="https://wa.me/584120000000"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp ENOVA CORP"
                className="group flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Image src="/logos/whatsapp.svg" alt="WhatsApp" width={18} height={18} />
                <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--steel)]">
                  WhatsApp
                </span>
              </Link>
            </div>
          </div>

          {/* Products col */}
          <div>
            <p className="eyebrow mb-6">Productos</p>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[var(--steel)] transition-colors hover:text-[var(--brass)]">
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

        {/* Trust bar — logos reales */}
        <div className="border-b border-[var(--hairline)] py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0 lg:divide-x lg:divide-[var(--hairline)]">

            {/* Bancos */}
            <div className="flex flex-col gap-4 lg:pr-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Bancos Venezuela
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {banks.map((bank) => (
                  <div
                    key={bank.name}
                    className="flex h-10 items-center justify-center rounded-md bg-white px-3 transition-all duration-200 hover:opacity-80 hover:shadow-sm"
                    style={{ minWidth: bank.w }}
                  >
                    <Image
                      src={bank.src}
                      alt={bank.name}
                      width={bank.w}
                      height={32}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Métodos de pago */}
            <div className="flex flex-col gap-4 lg:px-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Métodos de pago
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {payments.map((p) => (
                  <div
                    key={p.name}
                    className="flex h-10 items-center justify-center rounded-md bg-white px-3 transition-all duration-200 hover:opacity-80 hover:shadow-sm"
                    style={{ minWidth: p.w }}
                  >
                    <Image
                      src={p.src}
                      alt={p.name}
                      width={p.w}
                      height={32}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex flex-col gap-4 lg:pl-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Síguenos
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.instagram.com/enovacorpve/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="group flex h-10 items-center gap-2 rounded-md bg-white px-3 transition-all duration-200 hover:opacity-80 hover:shadow-sm"
                >
                  <Image src="/logos/instagram.svg" alt="Instagram" width={20} height={20} className="h-5 w-5 object-contain" />
                  <span className="font-mono-ui text-[10px] text-gray-600">@enovacorpve</span>
                </Link>
                <Link
                  href="https://wa.me/584120000000"
                  target="_blank"
                  rel="noopener"
                  aria-label="WhatsApp"
                  className="group flex h-10 items-center gap-2 rounded-md bg-white px-3 transition-all duration-200 hover:opacity-80 hover:shadow-sm"
                >
                  <Image src="/logos/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="h-5 w-5 object-contain" />
                  <span className="font-mono-ui text-[10px] text-gray-600">WhatsApp</span>
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
