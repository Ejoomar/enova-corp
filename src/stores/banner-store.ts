import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BannerSlide {
  id: string
  tag: string
  title: string
  subtitle: string
  description: string
  cta1Label: string
  cta1Href: string
  cta2Label: string
  cta2Href: string
  image: string
  imageAlt: string
  bgImage: string
  imagePosition: string
  bg: string
  tagColor: string
  isBrand: boolean
  active: boolean
  order: number
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    tag: 'Computación | Redes | Equipos Fiscales',
    title: 'ENOVA',
    subtitle: 'CORP ®',
    description: 'Distribuidor oficial de tecnología en Venezuela. Laptops, equipos fiscales, impresoras, redes y periféricos con garantía oficial.',
    cta1Label: 'Ver Catálogo',
    cta1Href: '/products',
    cta2Label: 'Equipos Fiscales',
    cta2Href: '/products?category=equipos-fiscales',
    image: '/images/hero/slide-1.jpg',
    imageAlt: 'ENOVA CORP — Tecnología Venezuela',
    bgImage: '/images/hero/bg-1.svg',
    imagePosition: 'center center',
    bg: 'from-[#020817] via-[#0a1628] to-[#0c1e3d]',
    tagColor: 'bg-[var(--brass)]/20 text-[var(--brass-bright)] border border-[var(--brass)]/40',
    isBrand: true,
    active: true,
    order: 0,
  },
  {
    id: 'slide-2',
    tag: 'Laptops empresariales',
    title: 'Dell Vostro',
    subtitle: '& Lenovo',
    description: 'Laptops Core i5 e i7 de última generación. Rendimiento profesional para trabajo, diseño y productividad.',
    cta1Label: 'Ver Laptops',
    cta1Href: '/products?category=laptops',
    cta2Label: 'Ver Todo',
    cta2Href: '/products',
    image: '/images/hero/slide-2.jpg',
    imageAlt: 'Dell Vostro laptop',
    bgImage: '/images/hero/bg-2.svg',
    imagePosition: 'center center',
    bg: 'from-[#0a0a0a] via-[#111827] to-[#1a2744]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 1,
  },
  {
    id: 'slide-3',
    tag: 'Vigilancia inteligente',
    title: 'Cámaras',
    subtitle: 'EZVIZ · Hikvision',
    description: 'Sistemas de seguridad IP con visión nocturna, detección de movimiento y acceso remoto. Protege tu negocio.',
    cta1Label: 'Ver Cámaras',
    cta1Href: '/products?category=camaras',
    cta2Label: 'Ver Redes',
    cta2Href: '/products?category=redes',
    image: '/images/hero/slide-3.jpg',
    imageAlt: 'Cámaras de seguridad EZVIZ',
    bgImage: '/images/hero/bg-3.svg',
    imagePosition: 'center center',
    bg: 'from-[#0c1445] via-[#0f1f5c] to-[#0a2a6e]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 2,
  },
  {
    id: 'slide-4',
    tag: 'Conectividad total',
    title: 'Soluciones',
    subtitle: 'de Red',
    description: 'Routers, switches, access points y cableado TP-Link y Mercusys. Infraestructura de red para empresas y hogares.',
    cta1Label: 'Ver Redes',
    cta1Href: '/products?category=redes',
    cta2Label: 'Ver Todo',
    cta2Href: '/products',
    image: '/images/hero/slide-4.jpg',
    imageAlt: 'Equipos de red TP-Link',
    bgImage: '/images/hero/bg-4.svg',
    imagePosition: 'center center',
    bg: 'from-[#0a0a0a] via-[#141414] to-[#1c1c2e]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 3,
  },
]

interface BannerStore {
  slides: BannerSlide[]
  addSlide: (data: Omit<BannerSlide, 'id' | 'order'>) => void
  updateSlide: (id: string, data: Partial<Omit<BannerSlide, 'id'>>) => void
  deleteSlide: (id: string) => void
  toggleActive: (id: string) => void
  moveUp: (id: string) => void
  moveDown: (id: string) => void
}

export const useBannerStore = create<BannerStore>()(
  persist(
    (set, get) => ({
      slides: DEFAULT_SLIDES,

      addSlide: (data) => {
        const slides = get().slides
        const maxOrder = slides.reduce((m, s) => Math.max(m, s.order), -1)
        const newSlide: BannerSlide = {
          ...data,
          id: `slide-${Date.now()}`,
          order: maxOrder + 1,
        }
        set({ slides: [...slides, newSlide] })
      },

      updateSlide: (id, data) => {
        set((state) => ({
          slides: state.slides.map((s) => (s.id === id ? { ...s, ...data } : s)),
        }))
      },

      deleteSlide: (id) => {
        set((state) => ({
          slides: state.slides
            .filter((s) => s.id !== id)
            .map((s, i) => ({ ...s, order: i })),
        }))
      },

      toggleActive: (id) => {
        set((state) => ({
          slides: state.slides.map((s) =>
            s.id === id ? { ...s, active: !s.active } : s
          ),
        }))
      },

      moveUp: (id) => {
        const slides = [...get().slides].sort((a, b) => a.order - b.order)
        const idx = slides.findIndex((s) => s.id === id)
        if (idx <= 0) return
        const updated = slides.map((s, i) => {
          if (i === idx - 1) return { ...s, order: idx }
          if (i === idx) return { ...s, order: idx - 1 }
          return s
        })
        set({ slides: updated })
      },

      moveDown: (id) => {
        const slides = [...get().slides].sort((a, b) => a.order - b.order)
        const idx = slides.findIndex((s) => s.id === id)
        if (idx < 0 || idx >= slides.length - 1) return
        const updated = slides.map((s, i) => {
          if (i === idx) return { ...s, order: idx + 1 }
          if (i === idx + 1) return { ...s, order: idx }
          return s
        })
        set({ slides: updated })
      },
    }),
    { name: 'enova-banners' }
  )
)
