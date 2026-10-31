# NOCTRA — Design memoir

A running record of *why* the site looks and behaves the way it does. Code says what; this file says why.
Add a dated entry to the **Decision log** whenever a design decision is made, changed or reversed.
Newest entries go at the top of the log.

---

## 1. The idea in one sentence

**Each NOCTRA project is a bound volume in a collection, and the studio designs for the hours after dark.**

- The site is a library. The home page is the shelf; every project is a volume with a cover, a contents page and chapters.
- "Noctra" reads as *night*. Light is the brand's material: brass is the only light source in the palette, and the
  home page lets the visitor choose an hour and watch the name light up.

## 2. References and what we took from each

| Reference | What we took | What we left |
|---|---|---|
| *The Wes Anderson Collection: The Grand Budapest Hotel* (Abrams 2015, design Martin Venezky, illustrations Max Dalton) | Books within books: every chapter is an object laid on a textured ground (fabric "bindings"); centred, symmetric covers; chapter title pages; printed objects (playbill, card) inside the book | Its props and IP (crossed keys, Mendl's box), its pink palette |
| Studio KO | Images as objects in a void, restraint, mystery | 9px text, non-responsive layout |
| Tadu Arquitetura | One huge typographic gesture with the name | Monospace, single size |
| Studio MK27 | Cinephile wit as part of an architecture brand | — |
| The New Yorker | Strict roles per type style, editorial hierarchy | Ad clutter |
| NOKE | Confident scale contrast | Inter, acid yellow |
| YOD Group | *Counter-example*: slogan over video, award logo walls | Everything |
| The client's own mock-ups ("Noctra Mythos", "Mythic Architecture") | Left icon rail for chapters, small "CHAPTER / PART" labels above large uppercase titles, panels on dark grounds | — |

Full analysis with screenshots: `analysis/README.md`.

## 3. Design system: "Architectural Noir"

Tokens live in `frontend/app/globals.css` (`@theme`).

- **Ground:** pure black `#000`. Depth comes from surface tone steps (`#0e0e0e → #1b1b1b → #1f1f1f → #2a2a2a → #353535`), never lines or shadows.
- **Brass, the light source:** `#e9c349`, light `#ffe088`, ink on brass `#3c2f00`. It is used for actions and for lit moments only.
- **Violet:** `#d9b9ff` / `#583b7c`, used as a volume accent and ambient depth only.
- **Ink:** text `#e5e2e1`, parchment `#d0c6af`, soft `#b4ab95`, outline `#99907c`.
- **Type:** Noto Serif for text and interface; Noto Serif Display for the monument, titles and chapter openings. That is one family.
  The old font names (`cinzel`, `cormorant`, `dm`) are kept as aliases so saved page-builder content re-themes itself.
- **Shape:** 0 radius everywhere. Buttons are flat brass blocks.
- **Motion:** slow and heavy. Entrances use `[data-reveal]` (see `components/layout/Reveal.tsx`); everything has a reduced-motion fallback.
- **Minimum text size:** 13px. Body text is 16–18px.

## 4. Page architecture

| Page | Metaphor | Key pieces |
|---|---|---|
| `/` | The library | `MonumentHero` (name as six lit letters over Schinkel's starry sky, hour selector) → Foreword (facts row, Boullée) → `Volumes` (title torn at the gutter, short lock when centred) → Marquee → Studio note (portrait as drop cap) → Visit (address rows) → endpaper footer |
| `/projects` | The shelf | Book spines, each in its own binding; category filter in the URL |
| `/projects/[slug]` | A volume | Cover board, contents page, icon chapter rail (from each chapter's `chapterIcon`), chapter title pages, "Next volume" |
| `/about` | The studio's own volume | Cover board, Part one: printed programme ("Dramatis personae"), Part two: process spread |
| `/contact` | The reservation card | Cream printed card form → opens a pre-filled email (no backend endpoint) |

**Bindings:** each volume gets a fabric pattern and accent derived from its slug (`lib/volumes.ts`): chevron, lattice, scallop or stripe.
**Elevations:** until real photography exists, each project's cover is a drawn frontal elevation (`components/volume/Elevation.tsx`).

## 5. Rules we keep

1. **Validate every change** with the skills before calling it done:
   design-taste-frontend (`lint.mjs` + `inspect.mjs`), web-design-guidelines, and Playwright at desktop and phone widths.
   Report what was fixed and what is kept on purpose, with the reason.
2. **Never present a found picture as NOCTRA's own work.** Archival images are captioned as references and credited in the footer (`public/archive/credits.json`).
3. **Don't decorate letters.** Light acts on whole letters, not textures or outlines inside them (see the 2026-10-30 log).
4. **One centred axis per volume:** the cover, contents and pages share the same edges.
5. **Proof is never invented:** no fake awards, client logos or statistics.

## 6. Known gaps (before launch)

- Real project photography and renders (the inspector's "few pictures" FAIL).
- Sample content to replace: the three sample volumes (`lib/sample-volumes.ts`), the team names, opening hours and the "night sheet" practice copy.
- The database is unreachable from IPv4-only machines. Use the Supabase **Session pooler** connection string.
- OneDrive can lock `frontend/.next` and cause 500 errors in dev. Restart the server, or move the project out of OneDrive.

## 7. Kept on purpose (despite the taste skill)

- **"PART ONE" labels above chapter titles:** the skill bans eyebrows, but they come from the client's own design.
- **Glass navigation bar:** required by the Architectural Noir spec.
- **Violet accents:** part of the brand palette.
- **The hero scrim gradient:** a neutral scrim over a photo, which the skill allows.

---

## Decision log

### 2026-10-30
- **Studio page rebuilt as a volume.** It looked "raw" next to the rest, so it gained a lattice binding, a cover board, a cream printed cast programme, chapter openings and a process spread. The full-bleed terracotta image became a muted plate.
- **Name reworked: windows → six lit letters.** Windows inside the strokes plus an outline read as decoration and fought the serif. Following the taste direction ("do not decorate the letters"), each letter is now a building that lights up whole as the hour advances (T, O, A, N, R, C).
- **Name tracking opened** (+0.04em → solid letters at 0.02em). Outlined letters were touching.
- **Collection lock shortened** to about two wheel notches (`LOCK = 0.1`, 160svh per volume). The long lock killed the tear effect; the title still aligns exactly at the centre.
- **Home opening simplified** from a bento of tiles to one cover: picture, name, one line, the hours, one action. The tiles felt cheap and disconnected from the rest of the page.
- **Project chapter rail → icons**, fixed to the left edge, taken from each chapter's `chapterIcon` to match how the admin defines chapters. Cover, contents and pages were aligned on one axis.
- **Chapter openings follow the client's mock-ups:** a small brass label above a large uppercase title.
- **Direction chosen:** the taste skill's `name-as-monument` (seed 145220117) with the brand's palette and type kept, and the Grand Budapest "volume" concept on top.
- **Foundations:** fixed an unlayered CSS reset that disabled every Tailwind spacing utility; `middleware.ts` → `proxy.ts` (Next 16); added a sample-volume fallback when the API is down; set the page language to English, per-page titles, focus states and reduced motion.
