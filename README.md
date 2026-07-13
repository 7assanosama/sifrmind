# Sifr Mind

A premium brand presence platform with an Apple-inspired landing page, bilingual Arabic/English support, and legal documentation infrastructure.

## Features

- Interactive Canvas particle background with mouse-reactive physics
- Bilingual support: Arabic (RTL) and English (LTR) via `next-intl`
- Monochrome dark theme with glassmorphism UI components
- Full-page sections: Hero, Products, Principles, Features, Process, FAQ, CTA
- Contact page with email, WhatsApp, Instagram, Facebook cards
- Legal pages (Terms of Service, Privacy Policy) with sticky TOC and reading progress
- Scroll-triggered reveal animations with reduced-motion support
- Responsive design with mobile slide-out navigation
- SEO: Open Graph, Twitter cards, JSON-LD breadcrumbs, sitemap-ready

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4, CSS custom properties |
| Animation | Framer Motion 12 |
| i18n | next-intl 4 |
| Icons | lucide-react |
| Linting | ESLint 9 + eslint-config-next |

## Folder Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Landing page (server)
│   │   ├── HomeClient.tsx  # Landing page (client)
│   │   ├── contact/        # Contact page
│   │   ├── terms-of-service/
│   │   ├── privacy-policy/
│   │   └── layout.tsx      # Locale-aware layout
│   ├── providers.tsx       # Client providers wrapper
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Design tokens and base styles
├── components/
│   ├── ui/                 # Primitives: Button, Badge, Container, etc.
│   ├── sections/           # Landing page sections
│   ├── legal/              # Legal page components
│   ├── icons/              # Custom SVG icon set
│   ├── Navbar.tsx          # Server navbar
│   ├── NavbarClient.tsx    # Interactive navbar
│   ├── NavbarActions.tsx   # Language switcher
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── InteractiveSifrBackground.tsx
├── config/
│   └── legal.ts            # Legal config constants
├── data/
│   └── legal/              # Section definitions
├── i18n/
│   └── request.ts          # next-intl request config
├── lib/
│   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│   └── i18n.ts             # Cached getT() helper
├── types/
│   └── legal.ts            # Legal page TypeScript interfaces
├── navigation.ts           # next-intl navigation utilities
├── proxy.ts                # i18n middleware (locale routing)
└── routing.ts              # Locale configuration
messages/
├── ar.json                 # Arabic translations
└── en.json                 # English translations
public/
├── favicon.svg
├── fullSizeIcon.png
├── icon.png
└── icon.svg
```

## Installation

```bash
git clone https://github.com/your-org/sifrmind.git
cd sifrmind
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

See `.env.example` for all documented variables. No variables are required for development.

## Running Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default locale is Arabic (`/ar`). Switch to English at `/en`.

## Production Build

```bash
npm run build
npm start
```

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Start Turbopack development server |
| `build` | Create production build |
| `start` | Start production server |
| `lint` | Run ESLint across all files |
| `type-check` | Run TypeScript compiler check (`tsc --noEmit`) |

## Architecture Overview

### Rendering

- Static pages are pre-rendered at build time where possible
- Dynamic routes (`[locale]/*`) are server-rendered per request
- Client components are clearly marked with `"use client"` directives

### Internationalization

- Locale detection via `next-intl` middleware (now `proxy.ts`)
- Routes: `/ar/...` (Arabic RTL) and `/en/...` (English LTR)
- Translations stored as flat JSON in `messages/`
- Custom `getT()` helper caches translation lookups per locale+namespace

### Styling System

- Dark-only monochrome theme defined as CSS custom properties in `@theme`
- Design tokens: 3 surface levels, 3 text levels, semantic colors, glass effects
- Utility-first approach with Tailwind; custom `cn()` helper for class merging

### Animation

- Framer Motion for scroll reveals, hover effects, and page transitions
- `useReducedMotion()` respected throughout — all animations degrade gracefully
- ScrollReveal component provides configurable directional reveal animations

## Internationalization

- Locales: `en` (English), `ar` (Arabic)
- Default: `ar`
- RTL layout auto-detected from locale
- Translation keys follow dot-notation namespacing
- All user-facing text is translated — no hardcoded strings in components

## Theme System

The app uses a single dark theme with CSS custom properties scoped via `@theme`. All colors, shadows, radii, and easing curves are defined in `src/app/globals.css`. There is no light mode toggle.

## API Overview

This project is a frontend-only application with no backend API. Contact form data is not processed server-side — links go directly to email and WhatsApp.

## Deployment

Deploy to any Node.js 20+ hosting platform:

- **Vercel** (recommended): `vercel --prod`
- **Docker**: Build with `next build`, serve with `next start`
- **Static export**: Not supported (dynamic routes + middleware)

## Performance

- Turbopack for fast development and production builds
- Font optimization via `next/font` (Cairo + IBM Plex Sans Arabic)
- Lazy-loaded framer-motion components
- Canvas background pauses when out of viewport (IntersectionObserver)
- Passive event listeners on scroll and mouse handlers

## Security

- No secrets, API keys, or credentials in the codebase
- All external links use `rel="noopener noreferrer"`
- Content Security Policy-ready (no inline styles beyond Tailwind)
- Input sanitization: no user-generated content rendered
- `dangerouslySetInnerHTML` used only for JSON-LD structured data

## License

MIT — see [LICENSE](LICENSE).

## Author

Built by [7assan Osama](https://github.com/7assanosama).
