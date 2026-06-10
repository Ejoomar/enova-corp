# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ENOVA CORP is an e-commerce application for computer products in Venezuela (Mérida), built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. Data lives in mock files + Zustand stores persisted to localStorage — there is NO database connected (Supabase is a possible fase 2). Prices are in USD with BCV bolívar conversion via `useDolarRate` / `/api/exchange-rate`. Sales close via WhatsApp (Pago Móvil, Zelle, Binance, USD cash).

### Component Organization
```
src/components/
├── layout/      # Header, Footer, TopBar, MobileNav, WhatsAppButton, ThemeToggle
├── home/        # HeroBanner, CategoryGrid, PromoBanners, FeaturedProducts, TrustBanner, BrandSection
├── products/    # ProductCard, ProductGrid, CatalogoClient, FilterSidebar, filters
├── cart/        # CartItem, CartSummary
├── checkout/    # ShippingForm, PaymentForm, OrderSummary
├── search/      # SearchDialog, ImageSearch
├── admin/       # AdminSidebar, AdminHeader, StatsCard, ProductForm, BannerForm
├── providers/   # ThemeProvider (next-themes wrapper)
└── ui/          # shadcn/ui components
```

### Data Layer
- `src/data/mock-products.ts` - Products, categories, brands (source of truth)
- `src/data/mock-orders.ts`, `mock-reviews.ts`, `mock-user.ts`, `mock-admin.ts`
- `src/stores/` - Zustand stores (products, cart, quote, orders, payments, banners, admin) with localStorage persist
- `src/types/index.ts` - Core interfaces (Product, Category, CartItem, FilterState)

### Auth (admin panel)
- Cookie-based: `enova_admin_session` cookie whose value must equal `ADMIN_PASSWORD` env var
- `src/middleware.ts` protects `/admin`; `src/lib/admin-auth.ts` protects `/api/admin/*` route handlers
- Login via native form POST to `/api/admin/auth`. Do NOT reintroduce NextAuth — it was removed deliberately

### Styling System
- Tailwind CSS v4 with CSS variables in OKLCH color space
- Dark/light themes via `next-themes` (class strategy)
- Theme variables in `src/app/globals.css`
- Use `cn()` utility from `src/lib/utils.ts` for class merging

### Key Patterns

- Server Components by default, `"use client"` for interactivity
- useState for local UI state (filters, quantities)
- useMemo for computed values (filtered/sorted products)
- Layouts with nested routes for shared UI (route groups: `(shop)`, `(admin-panel)`)
- Mobile-first responsive design with Sheet components for mobile nav

## Configuration

- **Path alias**: `@/*` maps to `./src/*`
- **Images**: Remote patterns configured for `images.unsplash.com`
- **shadcn/ui**: "new-york" style, "neutral" base color, lucide icons

## Project Plan

- `/docs/PLAN-TRABAJO.md` — audit findings + 2-week work plan (June 2026)
- `/docs/PLAN-IMPLEMENTACION.md` — technical implementation plan, phases A–G with file-level detail


## Rules

- Al momento de crear datos nuevos no uses Modales, usa paginas dedicadas para los formularios 
- no uses server actions, usa Route handlers
- para manejo de estado global usa Zustand
- para formularios usar react-hook-form y zod

## Deploy — OBLIGATORIO

**Después de CADA cambio de código en este proyecto, sin excepción:**

```bash
git add <archivos modificados>
git commit -m "tipo: descripción del cambio"
git push origin master
```

Vercel detecta el push y despliega automáticamente.
No preguntar si hacer deploy — siempre hacerlo al terminar cualquier tarea.

### Regla de versión de store
Cada vez que cambien URLs de imágenes en `src/data/mock-products.ts`,
incrementar `version` en `src/stores/products-store.ts` para invalidar el caché de localStorage.