# Portfolio Website — Cappuccino Theme (Vite)

## Overview

A landing portfolio website built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**. Inspired by the existing `referedFile.tsx` (Next.js/Next.js dark theme) but rebuilt from scratch with a **yellow-white Cappuccino** color palette — warm, earthy, and editorial.

## Theme: Cappuccino Yellow-White

### Color Palette

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| BG primary | `--bg-cream` | `#FAF6EF` | Page background |
| BG secondary | `--bg-sand` | `#F0E6D4` | Alternating section backgrounds |
| Surface | `--surface` | `#FFFFFF` | Cards, modals, surfaces |
| Primary accent | `--accent-gold` | `#C8963E` | CTAs, highlights, active states |
| Secondary accent | `--accent-coffee` | `#6B4C3B` | Headings, strong text |
| Body text | `--text-dark` | `#2C2416` | Main content text |
| Muted text | `--text-muted` | `#9C8E7A` | Descriptions, captions |
| Border | `--border-sand` | `#D4C5A9` | Dividers, card borders |
| Hover glow | `--glow-gold` | `#E8C56D` | Interactive feedback |

### Typography

- **Headings**: Playfair Display (serif) — warm, editorial tone
- **Body**: DM Sans (sans-serif) — clean readability
- **Mono**: JetBrains Mono — tags, code snippets, metadata

## Project Structure

```
portfolio/
├── public/
│   ├── homepage1.png              # experience section background
│   ├── homepage2.png              # projects section background
│   ├── duongquocvinh_resume.pdf
│   └── profile.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Fixed, scroll-aware nav
│   │   ├── Section.tsx            # Reusable section wrapper
│   │   ├── SectionTitle.tsx       # Section heading with subtitle
│   │   ├── ProjectCard.tsx        # Project card with sandbox preview
│   │   ├── SocialContactPopup.tsx # Reusable popup component
│   │   ├── CertificateModal.tsx   # Certificate detail modal
│   │   ├── TypewriterText.tsx     # Typewriter animation component
│   │   └── skills/
│   │       ├── SkillCategory.tsx  # Individual skill category
│   │       └── SkillsGrid.tsx     # Skills grid layout
│   ├── data/
│   │   ├── projects.json          # Project data (user fills in)
│   │   ├── certificates.json      # Certificate data (user fills in)
│   │   ├── experience.json        # Experience data (user fills in)
│   │   └── skills.json            # Skills data (user fills in)
│   ├── hooks/
│   │   └── useScrollReveal.ts     # Scroll-reveal animation hook
│   ├── styles/
│   │   ├── index.css              # Tailwind imports + base styles
│   │   └── theme.css              # CSS custom property theme tokens
│   ├── App.tsx                    # Main app with all sections
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Key Patterns & Conventions

### Component Patterns (from referedFile.tsx, adapted)

- **`Section` wrapper**: Accepts `id`, `className`, `style` (including `backgroundImage` for textured sections). Uses a full-bleed background div with `backdrop-blur` for overlay.
- **`SectionTitle`**: Renders heading with a coffee-brown accent bar (`w-2 h-8 bg-accent-gold rounded-full`) and optional subtitle below.
- **`Navbar`**: Fixed top, transparent by default, transitions to solid background on scroll (>50px). Logo with `Cpu` icon and site name links to `#hero`.
- **`ProjectCard`**: Two states — default view (title, description, tags, external link + sandbox button) and preview mode (iframe sandbox). Uses `motion.div` with `whileInView` for entrance animation.
- **`TypewriterText`**: Accepts `text`, `delay`, `speed`, `className`. Uses `setInterval` inside `useEffect` with cleanup.

### Data Fetching

Unlike the Next.js version which uses `/api/*` routes, this Vite portfolio reads **static JSON files** from `/src/data/`. Data is fetched in `App.tsx` with `useEffect` + `useState` — no backend required.

### Animations

- **Scroll reveal**: Framer Motion `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`
- **Hover effects**: Cards lift (`hover:-translate-y-1`) with gold shadow (`shadow-lg hover:shadow-gold-gold/20`)
- **Navbar**: Transitions background on scroll using `window.addEventListener('scroll')`

### JSON Data Schemas

Projects (`/src/data/projects.json`):
```json
[]
```
Each item: `{ "title": string, "desc": string, "link": string, "tags": string[], "color": string (gradient classes), "image": string }`

Certificates (`/src/data/certificates.json`):
```json
[]
```
Each item: `{ "title": string, "issuer": string, "date": string, "desc": string, "verifyUrl": string, "imageUrl": string }`

Experience (`/src/data/experience.json`):
```json
[]
```
Each item: `{ "year": string, "role": string, "org": string, "desc": string }`

Skills (`/src/data/skills.json`):
```json
[]
```
Each item: `{ "category": string, "icon": string (lucide icon name), "items": string[] }`

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Setup Steps

1. Initialize Vite: `npm create vite@latest portfolio -- --template react-ts`
2. Install deps: `npm install framer-motion lucide-react react-router-dom tailwindcss @tailwindcss/vite`
3. Configure `tailwind.config.ts` with Cappuccino custom colors and `theme.css` with CSS custom properties
4. Create the directory structure above
5. Build sections incrementally (Phase 1 → Phase 5)

## Design Principles

- **Warmth**: Every surface, border, and accent should feel warm and inviting
- **Spaciousness**: Generous padding and margins; let the content breathe
- **Contrast**: Dark charcoal text on cream background; coffee brown headings on white
- **Motion**: Purposeful animations — fade-ins on scroll, subtle lifts on hover, no gratuitous movement
- **Responsiveness**: Mobile-first; breakpoints at `md` (768px) and `lg` (1024px)

## What NOT to Include

- **No mock-up data**: All JSON files start as empty arrays `[]` — the user will fill them in
- **No API routes**: Data is static JSON, not server-side fetched
- **No Next.js/App Router**: Pure Vite + React + Browser Router (or hash routing)
- **No cyan/blue dark theme**: Stick to the Cappuccino palette exclusively
