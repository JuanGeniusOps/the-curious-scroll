# The Curious Scroll

An experimental scroll picture in four parts: a style homage to symmetrical, palette-driven filmmaking.
All rooms, objects, streets, names and copy are original. No stills, logos, characters or assets from any film are used.

```bash
npm install
npm run dev     # http://localhost:3000
```

## How it works

The page is a projector. Each chapter is a tall `.segment` that only provides scroll length; its `.scene` is a
fixed, full-viewport frame, visible only while the segment is under the playhead (the top of the viewport).
Switching `visibility` gives a **dry cut** between chapters: no fades, no sliding.

- `src/lib/use-scene.ts`: wires a chapter into the projector (scene toggle, page palette, scrubbed timeline).
  The last viewport of every segment is a built-in hold.
- `src/lib/cuts.ts`: `cutIn` / `cutOut` / `hold`, the only ways an element enters or leaves the frame.
- `src/components/SmoothScroll.tsx`: Lenis driven by GSAP's ticker.
- `src/components/FilmTexture.tsx`: a noise tile generated once and jittered with `transform` steps, plus a vignette.
- `src/components/Mirror.tsx`: draws SVG shapes and their reflection across the vertical axis, so symmetry is guaranteed rather than approximate.

| Part | Scene | Movement |
|---|---|---|
| Prologue | Three framed opening-credit cards | Push-in on each card, billing lines entering one by one, cuts between cards |
| I · The Hotel | Lobby, concierge, pâtisserie in a 1.37:1 Academy frame | Push-in on each room, pull-back during a horizontal dolly; lift doors slide open, keys hung row by row, lamps switch on, cake tiers lowered from above |
| II · The Camp | Nine objects from overhead, 3×3 | Overhead camera rises; objects set down in mirror-symmetric pairs, labels slide up, a PACKED stamp comes down |
| III · The Gazette | Street in five depth planes, then the magazine page | Awnings unroll center-out, vertical tilt with parallax (moon rises against it), cut to B&W; masthead rule drawn from the axis, columns rise in |
| Coda | End credits, then FIN | Constant-speed vertical roll, FIN card builds like a chapter card |

Every chapter card builds over its first unit of scroll: straight push-in, rule drawn from the axis,
title letters revealed from the middle letter outward (so each frame is still symmetric), then the narrator line.
A rule under the nav plaque grows from the center with overall progress.

## Final palettes

Validated in `/research`. Tokens live in `src/app/globals.css` (CSS custom properties per palette) and `src/lib/palette.ts` (SVG fills).

| Chapter | Palette |
|---|---|
| Prologue / Coda | Cream `#F2E8D5`, ink `#1C1B19`, red `#C23B22` |
| I | Pink `#F1BBBA`, blush `#F7DAD5`*, purple `#6B3E75`, plum `#3E2344`*, red `#A8323E`, gold `#C9A45C`, ribbon blue `#A9C6D6`* |
| II | Khaki `#C2B280`, forest `#3E5641`, mustard `#D4A017`, rust `#A0522D`, sky `#9FB8C8`, paper `#EDE3C4`*, ink `#2A2A22`* |
| III | Cream `#F2E8D5`, ink `#1C1B19`, red `#C23B22`, teal `#2F6F73`, deep teal `#1F4F52`*, ochre `#D9A441`*, salmon `#E3A28C`*, mint `#B9CFC4`* |

\* Added during research, mostly to reach text contrast (for example, plum instead of purple for text on pink: about 8:1 instead of 3.7:1).

## Decisions on the open questions

- **Narrative text:** yes, kept short. One italic narrator line per title card and per room, fictional and deadpan.
- **Ambient audio:** not included in v1. It would need a visible mute control and an opt-in, since autoplay is blocked anyway.
- **Mobile:** all three chapters are kept. The hotel letterboxes in its Academy frame, the grid stays 3×3, the street crops symmetrically (`xMidYMax slice`), and the magazine collapses to one centered column.

## Accessibility and motion

- `prefers-reduced-motion: reduce` gives a static, navigable version: scenes flow as normal full-height sections in their final
  composed state, with no Lenis and no ScrollTrigger. The hotel frame becomes a sideways-scrollable, snap-aligned strip.
- The chapter nav cuts to a chapter and moves focus there. Inactive scenes are `inert`, so Tab never reaches hidden content.
- Every animation uses only `transform`, `opacity` or `visibility`. There are no bitmap assets; all artwork is inline SVG.

## Not used (optional in the brief)

SplitType, Matter.js and OGL were not needed: the chapters didn't call for them, and the grain works as a CSS/canvas layer.

## Deploy

Published on GitHub Pages from the `gh-pages` branch:

```bash
npm run deploy
```

The script builds a static export with the repo name as base path and force-pushes `out/` to `gh-pages`.
