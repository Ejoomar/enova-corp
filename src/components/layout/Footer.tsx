import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const banks = [
  { name: "Banco de Venezuela", src: "/logos/bdv.svg",       w: 150, color: "#CF122D" },
  { name: "Mercantil",          src: "/logos/mercantil.svg", w: 130, color: "#1B5EA6" },
  { name: "BBVA Provincial",    src: "/logos/bbva.svg",      w: 140, color: "#00539B" },
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
    { name: "Periféricos",       href: "/products?category=perifericos"      },
    { name: "Redes",             href: "/products?category=redes"            },
    { name: "Equipos Fiscales",  href: "/products?category=equipos-fiscales" },
    { name: "Impresoras",        href: "/products?category=impresoras"       },
    { name: "Cámaras",           href: "/products?category=camaras"          },
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
              equipos fiscales e impresoras de las mejores marcas del mundo.
            </p>
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2 text-sm text-[var(--steel)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <span>Venezuela</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--steel)]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <a href="mailto:Gerencia@enovacorp.co" className="transition-colors hover:text-[var(--brass-bright)]">
                  Gerencia@enovacorp.co
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--steel)]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--brass)]" />
                <a href="tel:+584223668201" className="transition-colors hover:text-[var(--brass-bright)]">
                  0422-3668201
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
                href="https://wa.me/584223668201"
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

        {/* ── Banner bancos ── */}
        <div className="border-b border-[var(--hairline)] bg-[var(--surface-1)]">
          <div className="py-8">

            {/* Header del banner */}
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--brass)]">
                  Transferencias bancarias
                </p>
                <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                  Transferencias a nuestras cuentas bancarias
                </h3>
              </div>
              <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)]">
                Transferencia · Pago Móvil · TDD / TDC
              </span>
            </div>

            {/* Grid de bancos */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {banks.map((bank) => (
                <div
                  key={bank.name}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-[var(--hairline)] bg-[var(--background)] p-4 transition-all duration-200 hover:border-[var(--brass)]/50 hover:bg-[var(--surface-2)]"
                  style={{ borderTopColor: bank.color, borderTopWidth: "3px" }}
                >
                  <div className="flex h-12 w-full items-center justify-center rounded-md bg-[var(--surface-1)] px-3">
                    <Image
                      src={bank.src}
                      alt={bank.name}
                      width={bank.w}
                      height={36}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <span className="font-mono-ui text-[9px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    {bank.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Métodos de pago + Redes ── */}
        <div className="border-b border-[var(--hairline)] py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0 lg:divide-x lg:divide-[var(--hairline)]">

            {/* Métodos de pago */}
            <div className="flex flex-col gap-3 lg:pr-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Métodos de pago
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {payments.map((p) => (
                  <div
                    key={p.name}
                    className="flex h-9 items-center justify-center rounded-lg bg-[var(--surface-1)] px-3 transition-all duration-200 hover:opacity-80"
                    style={{ minWidth: p.w }}
                  >
                    <Image src={p.src} alt={p.name} width={p.w} height={28} className="h-5 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex flex-col gap-3 lg:pl-10">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Síguenos
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="https://www.instagram.com/enovacorpve/"
                  target="_blank" rel="noopener" aria-label="Instagram"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[var(--surface-1)] px-3 transition-all duration-200 hover:opacity-80"
                >
                  <Image src="/logos/instagram.svg" alt="Instagram" width={18} height={18} className="h-4 w-4 object-contain" />
                  <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)]">@enovacorpve</span>
                </Link>
                <Link
                  href="https://wa.me/584223668201"
                  target="_blank" rel="noopener" aria-label="WhatsApp"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[var(--surface-1)] px-3 transition-all duration-200 hover:opacity-80"
                >
                  <Image src="/logos/whatsapp.svg" alt="WhatsApp" width={18} height={18} className="h-4 w-4 object-contain" />
                  <span className="font-mono-ui text-[10px] text-[var(--muted-foreground)]">WhatsApp</span>
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
