import type { Project, Module } from "./projects";

// Sample content shown only when the API cannot be reached or has no published projects.
// Replace with real projects before launch. Archival pictures are captioned as references,
// never presented as NOCTRA's own buildings.

let n = 0;
const m = (type: string, content: Record<string, unknown>, chapter?: string, icon = "◆"): Module => ({
  id: `sample-${++n}`,
  type,
  order: n,
  isChapter: !!chapter,
  chapterLabel: chapter ?? null,
  chapterIcon: chapter ? icon : null,
  content,
});

export const SAMPLE_VOLUMES: Project[] = [
  {
    slug: "the-cliff-house",
    title: "The Cliff House",
    subtitle: "A house cut into the granite above the Atlantic, lit from below.",
    category: "Residential",
    location: "Sintra, Portugal",
    year: "2023",
    coverImage: null,
    modules: [
      m("chapter-hero", { number: "Part one", title: "The site" }, "The site", "▲"),
      m("text-block", {
        title: "Granite, fog and a west wind",
        body:
          "The plot is a shelf of granite forty metres above the sea. Most afternoons the fog climbs the cliff and the house disappears; most nights it clears and the coast lights up below.\n\nWe kept the rock where it stood. The house is three rooms set into it, each turned to a different part of the horizon.",
      }),
      m("quote", { quote: "A house should be the last light on the cliff, not the first.", author: "From the competition brief" }),
      m("chapter-hero", { number: "Part two", title: "The section" }, "The section", "◐"),
      m("split-text-image", {
        label: "Reference",
        title: "Stairs that disappear into the rock",
        body:
          "The plan is simple; the section is not. A single stair falls through the house from the road to the water, past the kitchen, the library and the sleeping room, and each landing is a little darker than the last.",
        image: "/archive/piranesi-carceri-07zugbrucke.jpg",
        caption: "Giovanni Battista Piranesi, Carceri, plate VII, 1761. The stair as a world of its own.",
        imagePosition: "right",
      }),
      m("chapter-hero", { number: "Part three", title: "After dark" }, "After dark", "★"),
      m("text-block", {
        title: "Lit from below",
        body:
          "No lamp in the house is above eye level. Light comes from the floor, from the stair treads, from a slot in the granite at the foot of each wall, so that from the sea the house reads as a thin line of gold under a dark mass of stone.",
      }),
    ],
  },
  {
    slug: "void-pavilion",
    title: "Void Pavilion",
    subtitle: "A reading room on the Oslo fjord that only opens after sunset.",
    category: "Cultural",
    location: "Oslo, Norway",
    year: "2022",
    coverImage: null,
    modules: [
      m("chapter-hero", { number: "Part one", title: "The waterfront" }, "The waterfront", "◉"),
      m("split-text-image", {
        label: "Reference",
        title: "A roof you can walk on",
        body:
          "The pavilion sits a short walk from the opera house, on the same stretch of water. We borrowed one idea from its neighbour: the roof belongs to the city, and people climb it at midnight to look at the fjord.",
        image: "/archive/oslo-opera-house-late-night-walk-on.jpg",
        caption: "The neighbour: Oslo Opera House at night. Photograph by Trine Syvertsen, CC BY 2.0.",
        imagePosition: "left",
      }),
      m("chapter-hero", { number: "Part two", title: "The reading room" }, "The reading room", "◇"),
      m("text-block", {
        title: "Twelve lamps and one window",
        body:
          "Inside there is one long table, twelve brass reading lamps and a single window cut at the height of a seated reader's eyes. In winter the room opens at three in the afternoon; in June it opens at eleven at night and closes at dawn.",
      }),
      m("quote", { quote: "We wanted a building that is busiest when the city is asleep.", author: "NOCTRA, Oslo studio" }),
    ],
  },
  {
    slug: "monolith-studio",
    title: "Monolith Studio",
    subtitle: "A workshop inside a single cast volume of concrete.",
    category: "Workplace",
    location: "Milan, Italy",
    year: "2022",
    coverImage: null,
    modules: [
      m("chapter-hero", { number: "Part one", title: "One pour" }, "One pour", "■"),
      m("text-block", {
        title: "Cast in a single day",
        body:
          "The studio is one block of concrete, poured in a single day into a timber mould built by the client's own carpenters. Its walls are sixty centimetres thick; its only openings are a door and a round light at the top.",
      }),
      m("chapter-hero", { number: "Part two", title: "The sphere" }, "The sphere", "○"),
      m("split-text-image", {
        label: "Reference",
        title: "An architecture of shadows",
        body:
          "Boullée drew a sphere so large that its interior would read as the night sky. Our round light does the same at a smaller scale: at noon it throws a disc of sun across the workbenches, and at night it frames a single star.",
        image: "/archive/etienne-louis-boullee-cenotaphe-de-newton-02.jpg",
        caption: "Étienne-Louis Boullée, Cenotaph for Newton, perspective elevation, 1784.",
        imagePosition: "right",
      }),
    ],
  },
];
