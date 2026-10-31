# Reference analysis: six studio sites + *The Grand Budapest Hotel* book

Captured 30 Oct 2026 with playwright-cli (Edge, 1440×900 desktop and 390×844 mobile).
Screenshots are in [`shots/`](shots/), and raw extracted data (fonts, sizes, colours, libraries) is in the `*.json` files next to this one.

---

## At a glance

| Site | Stack | Type | Palette | Signature move |
|---|---|---|---|---|
| **Studio KO** | Legacy jQuery, hash routing, custom scrollbar, video.js | Arial only. 9px uppercase, 1px tracking | `#000` `#7F7F7F` `#FFF` | Smoke-video intro with "skip intro". Images float in a black void. The menu appears only when you hover the logo |
| **NOKE** | WordPress, Lenis smooth scroll, Swiper, Splitting.js, marquee | Inter only. 13 → 19 → 58 → 83px | White, black, acid yellow `#FFFF00` | Hand-scribbled logo, giant bold manifesto, credentials marquee, yellow footer |
| **Tadu** | Vue SPA | One mono-ish face (Courier Sans), 16px everywhere | Black + white, with colour from the photos | Huge sheared "TADU" wordmark fixed over a single column of photos, plus "Ar— qui— tetura" |
| **The New Yorker** | Condé Nast stack, 30+ ad/tracking scripts | Irvin (display) · Adobe Caslon (text) · Graphik (UI) · Neutraface (labels) | Black, `#333`, grey `#A2A2A2`, red kicker `#DB3334` | Classic three-role type system, centred symmetry, italic serif decks |
| **YOD Group** | Squarespace + Weglot | Helvetica Neue, uppercase | White / black / `#787575` | Video hero with slogan, 3-col project grid, wall of award logos |
| **Studio MK27** | WordPress, jQuery, Fotorama, Slick | Roboto 300/600 at ~12px only | Black, studio grey | Kewpie-doll logo. Staff portraits mixed with stills from classic films in a tight grid |

---

## 1. Studio KO — studioko.fr
![](shots/studioko-d00.png)
![](shots/studioko-d02.png)
![](shots/studioko-d03.png)

- **Entry:** a black screen, a drifting smoke video and a tiny `| skip intro |` link. It plays like the opening of a film.
- **Home ("diary"):** almost empty. The wordmark `STUDIO KO` sits on a small cloud at top left and today's date is centred. The footer has `OEIL DE KO | INSTAGRAM`, a language switch, a moon icon and a sound toggle.
- **Navigation:** hidden until you hover the logo. Then `PROJECTS / STUDIOS / PUBLICATIONS / CONTACTS` unfold beside it.
- **Projects:** photos are scattered asymmetrically, alternating left and right, inside a fixed band. The page doesn't scroll; an inner scroller with a 1px line on the right does. Captions sit beside each image: a **lowercase bold white** title (Arial 12px/600, 1px tracking) over a grey location (9px).
- **Type:** Arial only. Labels are 9px uppercase with 1px tracking in `#7F7F7F`.
- **Weak points:** not responsive (the mobile view is the desktop stage shrunk down), 9px text, Flash-era code.
- **Takeaway:** mystery and restraint. Images are treated as objects in a void, and sound and the intro make it feel theatrical.

## 2. NOKE Architects — nokearchitects.com
![](shots/noke-d00.png)
![](shots/noke-d01.png)
![](shots/noke-d04.png)
![](shots/noke-d06.png)

- **Header:** a white bar. Nav sits on the left (`Home Projects Universe About Contact`), a **hand-scribbled "NOKE" signature** is centred and spills below the bar, and socials on the right are written as lowercase abbreviations (`ig bē in`).
- **Hero:** a full-bleed interior photo with a bold white Inter headline bottom-left: "Your favourite architecture and design studio."
- **Section rhythm:** stacked category links (Architecture / Public / Private / Design / All Projects) in Inter Bold 83px with 1.0 line-height, next to a small intro paragraph. Then a **manifesto paragraph in Inter Bold ~58px** with underlined keywords, then:
  - an awards grid (6 columns, centred, 13px)
  - Services, with a full-width rule and an accordion
  - testimonials
  - a CREDENTIALS **marquee**: two rows of giant bold text separated by em-dashes
  - a client logo strip
  - a publications carousel of magazine spreads
  - a full-bleed photo
  - an **acid-yellow footer** in 4 columns
- **Type:** Inter only, with high scale contrast. The four sizes are 13 / 19 / 58 / 83px.
- **Takeaway:** confident Swiss-style structure. The personality comes from just two moves: the handwritten logo and the yellow.

## 3. Tadu Arquitetura — taduarq.com
![](shots/tadu-d00.png)
![](shots/tadu-d05.png)
![](shots/tadu-m00.png)

- **One huge gesture:** a white **"TADU" SVG wordmark, sheared and stepped like a staircase**, fixed on the right half and overlapping the photos. Small labels sit at each step and spell out the word: `Ar—` `qui—` `tetura`.
- **Content:** a single left column (~1024px) of large project photos with the name underneath (Marmotta Pasta Bar, Mercado Central, Santokki…), scrolling under the fixed logo.
- **Navigation:** `Sobre · Projetos · Contato`, top left. The header turns into a `rgba(0,0,0,.92)` bar on scroll.
- **Type:** one face (Courier Sans) at one size (16px). Only the logo breaks the scale.
- **Mobile:** the logo moves to the top and the photos go full width. It works well.
- **Takeaway:** radical simplicity everywhere except one unforgettable typographic gesture.

## 4. The New Yorker — newyorker.com
![](shots/newyorker-d00.png)
![](shots/newyorker-d02.png)
![](shots/newyorker-d05.png)

- **Type system (the lesson here):**
  - **Irvin Heading** (display): all-caps headlines at 36/40 and section titles at 28/32
  - **Adobe Caslon** (text): 21px body with 1.5 line-height, plus italic decks ("*A daily column on what you need to know.*")
  - **Graphik** (UI): 12px/500 for bylines, nav and buttons
  - **Neutraface** (labels): kickers at weight 600
- **Colour:** near-black text in three steps (`#000`, `#121212`, `#333`), grey meta `#A2A2A2`, and red rubrics `#DB3334` ("GIFT GUIDES").
- **Layout:** centred masthead. The hero is split 50/50, with centred text on the left and an image on the right. Section headers are centred, with a thin rule above and an italic dek. Cards come in a 4-up carousel separated by hairline vertical dividers.
- **Weak points:** ads and trackers dominate the page.
- **Takeaway:** the closest of the six to the book's editorial voice, with symmetry, serif decks and a strict role for each typeface.

## 5. YOD Group — yod.group
![](shots/yod-d00.png)
![](shots/yod-d01.png)
![](shots/yod-d03.png)

- **Header:** a geometric glyph logo, uppercase Helvetica nav aligned right with an underlined active item, and an EN/UA switch.
- **Hero:** a full-width video with a centred slogan in white uppercase: "YOUR BUSINESS FROM THE CONCEPT TO SUCCESS".
- **Rest of the page:** featured projects in 3 columns (underlined uppercase titles, grey location), a B&W team photo, an 8-column wall of award logos, outlined-box CTAs, and a cookie bar that stays on screen.
- **Takeaway:** strong photography but a template-like structure. It's a useful **counter-example**: the slogan over video and the logo wall are what to avoid.

## 6. Studio MK27 — mk27.com/pb/studiomk27
![](shots/mk27-d00.png)
![](shots/mk27-d02.png)
![](shots/mk27-d05.png)

- **Logo:** a **3D kewpie doll**, a deliberately absurd mark for a very serious architecture practice.
- **Navigation:** a long uppercase category nav (Roboto 12px/300, .6px tracking), including **Filmes**. On scroll the header collapses to the text "STUDIO MK27".
- **Studio page:** a panoramic team photo (everyone in black, on a grey studio backdrop), then a founder portrait / text / video strip. After that comes a **gapless 3-column grid** that mixes staff portraits with **animated stills from classic cinema** (*A Clockwork Orange*, *Blow-Up* and others). Name tags read **Name** | role, in a black tag at the bottom left.
- **Weak points:** the mobile reload was aborted during the capture, so the mobile shot is incomplete.
- **Takeaway:** cinephile wit is part of the architecture brand. That makes MK27 the most direct bridge to a Wes Anderson reference.

---

## 7. *The Wes Anderson Collection: The Grand Budapest Hotel* (book)
Abrams, 2015 · text by Matt Zoller Seitz · **design by Martin Venezky** · illustrations by Max Dalton · 9¾ × 11½ in, 256 pp.
Source spreads: [martinvenezky.com](https://martinvenezky.com/content/wes-anderson-the-grand-budapest-hotel)

![](shots/gbh-001.png)
![](shots/gbh-003.png)
![](shots/gbh-004.png)
![](shots/gbh-012.png)
![](shots/gbh-016.png)
![](shots/gbh-021.png)

- **Core idea: books within books.** Venezky describes a library of embedded "books" plus patterns, fabrics, cards and stamps. Each chapter is designed as a **different physical object laid on a textured ground**:
  - the Zweig excerpts are an old printed book on red/sand upholstery fabric
  - "Worlds of Yesterday" is a kraft-paper newspaper with a **blackletter** masthead
  - the voice-over chapter is a spread of **"Cine-Star" trading cards**
  - the costume essay is a **grey linen-bound book** with an embossed crossed-keys emblem
  - "The Society of the Crossed Keys" is an **embroidered pink handkerchief**
  - the "1,751-Word CRITICAL ESSAY" is framed in a black-and-white scalloped border with a gold drop cap
- **Frame device:** almost every page is a smaller page sitting on a pattern, with a visible border, so you always see an object on a ground.
- **Cover:** Dalton's flat, **perfectly frontal and symmetric** illustration of the pink hotel. The title arches over it like a wrought-iron sign.
- **Typography is deliberately plural:**
  - lowercase geometric-sans headings ("wes anderson takes the 4:3 challenge")
  - classical oldstyle serif text for the excerpts
  - blackletter
  - heavy geometric display caps (CRITICAL ESSAY)
  - Clarendon-style text with spaced small caps
  - huge drop caps, some outlined and some in gold
  - white small-cap labels on terracotta bars
- **Composition:** centred titles, ornamental rules (scalloped, dotted) and symmetry everywhere.
- **Palette** (sampled from the photographed spreads, so treat these as approximate):

| Role | Hex |
|---|---|
| Sky / blush pink | `#DBC6C8` |
| Mendl's facade pink | `#DAA6AF` |
| Mauve (handkerchief) | `#A76C87` |
| Slate roof | `#6A5B5B` |
| Charcoal street | `#413C43` |
| Cream paper | `#E1D8C5` |
| Kraft paper | `#C4B08F` |
| Terracotta / vermilion | `#B86048` · `#BE6551` |
| Rust (blackletter banner) | `#964B31` |
| Deep navy page | `#10273F` |
| Antique gold (drop caps, keys) | no reliable sample; pick by eye |

---

## What the set has in common, and how it could combine

1. **A stage and an object.** KO's images in a void, Tadu's single column, MK27's grid and the book's page-on-fabric all present work as an *object placed on a ground*. On the web this could mean each project shown as a "plate" or "book" on a patterned or coloured field, with fixed chrome around it.
2. **Books within books.** Keep the frame (nav, grid, UI type) strict and constant, and let each project or section carry **its own small visual identity** (palette, display face, ornament), the way each chapter of the book does.
3. **A three-role type system (New Yorker).** One characterful display face, one text serif, and one tiny tracked UI face (sans or mono). Free web options in that spirit:
   - **Display:** a geometric sans such as Jost or League Spartan, or a decorative caps face
   - **Text:** EB Garamond or Libre Caslon
   - **UI:** IBM Plex Mono or Courier Prime, used KO/Tadu-style
4. **One signature gesture.** Tadu's sheared logo, NOKE's scribble, MK27's kewpie and KO's cloud are each a single bold move. Pick one, such as a frontal, symmetric facade illustration (the book cover's language), and keep everything else quiet.
5. **Symmetry for text, freedom for images.** Use centred, editorial headings (book and New Yorker) next to asymmetric, scattered imagery (KO).
6. **Palette options:** a *light* edition in cream, blush pink and charcoal with terracotta accents, or a *dark* edition with a navy or black stage (KO/Tadu/MK27) and pink/cream objects on it.
7. **Motion, sparingly:** smooth scroll (NOKE uses Lenis), a hover-revealed menu (KO), a sticky typographic logo (Tadu), one marquee (NOKE), and an optional intro with a skip link (KO).
8. **Avoid:**
   - YOD's slogan over a video hero and the wall of award logos
   - KO's 9px text and lack of responsiveness
   - the New Yorker's clutter
   - copying film IP (the crossed keys, the Mendl's box). Borrow the *method* instead: the frame, the plurality, the symmetry and the palette.
