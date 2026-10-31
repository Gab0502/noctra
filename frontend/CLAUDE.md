# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,this creates what users call the "AI slop" aesthetic. Avoid this: make creative,distinctive frontends that surprise and delight. 

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Commands

```bash
# Development
npm run dev        # Start dev server (webpack mode)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

Backend API runs separately on `http://localhost:4000`. Set `NEXT_PUBLIC_API_URL` in `.env.local` if different.

---

## Architecture

NOCTRA is an architecture studio portfolio with an integrated visual CMS. The frontend is Next.js 16 App Router with two distinct sections: a public-facing portfolio and a JWT-protected admin with a Craft.js page builder.

### Routing

- `/` → Home (Hero → Philosophy → FeaturedProjects → StudioSection → ContactCTA)
- `/projects` → Masonry grid with category filters
- `/projects/[slug]` → Dynamic project detail with sidebar chapter navigation
- `/about`, `/contact` → Static pages
- `/admin/*` → Protected by `middleware.ts`; JWT verified from `noctra_session` cookie

### Authentication

`middleware.ts` intercepts all `/admin/*` requests except `/admin/login`. It verifies the JWT using `jose` via `lib/session.ts`. The JWT is stored in a cookie (`noctra_session`) — never localStorage. Login POSTs to `NEXT_PUBLIC_API_URL/api/auth/login`.

### Data Fetching

- **Server components** (public pages): `fetch(url, { next: { revalidate: 60 } })` for ISR.
- **Client components** (admin): `useEffect` + `fetch(..., { credentials: 'include' })` for cookie-authenticated requests.
- Image uploads return a URL string from the backend; allowed domains are configured in `next.config.ts`.

### Craft.js Page Builder

The admin editor lives in `components/editor/`. Key files:

- `PageBuilder.tsx` — wraps the canvas in Craft.js `<Editor>`, wires save/load
- `Toolbox.tsx` — draggable component palette
- `PropertiesPanel.tsx` — contextual props editor for selected node
- `CraftRenderer.tsx` — read-only render of saved Craft JSON (used on public project pages)
- `craft-components/` — 14+ editable components (Container, Text, ImageBlock, HeroSection, SplitSection, etc.), each with a `.craft` static property defining its name, props, and settings panel

Saved state is serialized Craft.js JSON stored in the backend as `craftContent`. Project pages check for `craftContent` first; if absent they fall back to the legacy `modules` array rendered by `ModuleRenderer.tsx`.

### Design System

All tokens live in `app/globals.css` as CSS custom properties under `--color-noctra-*`. Tailwind v4 consumes them.

**Typography — three fonts, used semantically:**
- `font-cinzel` (Cinzel) — headings, section labels, titles
- `font-cormorant` (Cormorant Garamond) — body copy, long-form text
- `font-dm` (DM Sans) — UI labels, metadata, small text

**Key utility classes:** `.noctra-container` (max-width 1400px), `.section-label`, `.gold-rule`, `.plate-frame`, `.drop-cap`

**Color palette:** `noctra-black`, `noctra-void`, `noctra-purple-*`, `noctra-gold*`, `noctra-white`, `noctra-cream`, `noctra-muted`, `noctra-subtle`

### Path Alias

`@/` maps to the repo root. Use `@/components/...`, `@/lib/...`, `@/app/...`.
