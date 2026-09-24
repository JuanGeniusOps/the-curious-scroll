"use client";

import { useRef } from "react";
import Intertitle from "@/components/Intertitle";
import { useScene } from "@/lib/use-scene";
import { cutIn, cutOut } from "@/lib/cuts";
import { BackPlane, Engraving, ForePlane, FrontPlane, MidPlane, Moon } from "./street";

// How far each plane travels (in % of the frame) while the camera tilts up. Nearer = faster.
// The moon is the one exception: it rises against the tilt.
const PLANES = [
  { key: "moon", Plane: Moon, travel: -4 },
  { key: "back", Plane: BackPlane, travel: 24 },
  { key: "mid", Plane: MidPlane, travel: 46 },
  { key: "front", Plane: FrontPlane, travel: 78 },
  { key: "fore", Plane: ForePlane, travel: 100 },
];

const TILT = { start: 1.6, end: 4.2 };
const PRINT = 4.8;
const TOTAL = 7;

const COLUMNS = [
  "The street has not moved since the spring of its founding. The baker opens at six, the kiosk at seven, and the bunting, which was hung for a festival nobody remembers, has simply been left where it looks best.",
  "Our correspondent spent eleven days on a folding chair outside the kiosk and reports, with some regret, that nothing happened at all. Every awning was lowered at noon and raised at four, in perfect unison.",
];

export default function ChapterThree() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, { id: "three", palette: "dispatch" }, (tl, q) => {
    cutOut(tl, q("[data-intertitle]"), 1);
    // The street opens for business before the camera rises: awnings unroll, center first, then mirrored pairs.
    q("[data-awning]").forEach((awning) => {
      const dist = Number((awning as HTMLElement).dataset.dist);
      tl.fromTo(
        awning,
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "50% 0%", duration: 0.2, ease: "power1.out", immediateRender: true },
        1.05 + dist * 0.14,
      );
    });
    PLANES.forEach(({ key, travel }) => {
      // A crane move straight up: every plane slides straight down, nothing drifts sideways.
      tl.to(q(`[data-plane="${key}"]`), { yPercent: travel, duration: TILT.end - TILT.start, ease: "sine.inOut" }, TILT.start);
    });
    // Colour to black & white is a cut, used as punctuation.
    cutIn(tl, q("[data-print]"), PRINT);
    // The page sets itself: masthead rule drawn from the axis, then the lead, then the columns.
    tl.fromTo(q("[data-print-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power1.inOut", immediateRender: true }, PRINT + 0.05);
    const rise = { autoAlpha: 1, y: 0, duration: 0.25, ease: "power1.out", immediateRender: true };
    tl.fromTo(q("[data-print-step='1']"), { autoAlpha: 0, y: 30 }, rise, PRINT + 0.45);
    tl.fromTo(q("[data-print-step='2']"), { autoAlpha: 0, y: 30 }, rise, PRINT + 0.95);
    tl.to({}, { duration: TOTAL - tl.duration() });
  });

  return (
    <section ref={ref} id="chapter-three" className="segment" style={{ "--length": 8 } as React.CSSProperties} aria-label="Chapter Three: The Gazette">
      <div className="scene palette-dispatch" tabIndex={-1}>
        <Intertitle className="palette-dispatch-card" kicker="Chapter Three" numeral="III" title="The Evening Esplanade">
          A report from a street so well kept that the weekly paper sends someone every week to confirm it is still there.
        </Intertitle>

        {/* The street, in depth planes */}
        <div className="relative h-full min-h-[100svh] overflow-hidden bg-[var(--fd-mint)]">
          {PLANES.map(({ key, Plane }) => (
            <div key={key} data-plane={key} className="absolute inset-0 will-change-transform">
              <Plane />
            </div>
          ))}
          <p className="absolute inset-x-0 top-20 text-center text-[0.65rem] font-medium uppercase tracking-[0.5em] sm:text-xs">
            Chapter Three · The Gazette
          </p>
        </div>

        {/* The same street, as printed */}
        <article
          data-print
          className="palette-dispatch-print motion-hidden flex flex-col items-center overflow-y-auto bg-[var(--bg)] px-5 pb-10 pt-20 text-[var(--fg)] motion-safe:absolute motion-safe:inset-0 motion-safe:z-[5] sm:pt-24"
        >
          <header className="w-full max-w-5xl text-center">
            <div data-print-rule className="h-1.5 bg-[var(--accent)]" aria-hidden />
            <h2 className="py-3 text-3xl font-semibold uppercase leading-none tracking-[0.12em] sm:py-4 sm:text-6xl">
              The Evening Esplanade
            </h2>
            <p className="border-y border-current py-1.5 font-serif text-[0.65rem] uppercase tracking-[0.25em] sm:text-xs">
              Vol. XII · No. 7 · Belle-sur-Brume · Twenty Centimes
            </p>
          </header>

          <div data-print-step="1" className="motion-hidden mt-5 w-full max-w-5xl text-center sm:mt-8">
            <p className="font-serif text-xl italic sm:text-3xl">A Street That Never Moves</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.35em] text-[var(--accent)]">From our correspondent on the esplanade</p>
          </div>

          <div className="mt-5 grid w-full max-w-5xl grid-cols-1 items-start gap-6 sm:mt-8 md:grid-cols-[1fr_1.3fr_1fr] md:gap-8">
            <p data-print-step="2" className="motion-hidden hidden font-serif text-sm leading-relaxed md:block md:text-justify">
              <span className="float-left mr-2 text-5xl font-bold leading-[0.8] text-[var(--accent)]">T</span>
              {COLUMNS[0].slice(1)}
            </p>
            <figure data-print-step="1" className="motion-hidden mx-auto w-full max-w-sm">
              <div className="aspect-[400/260] border border-current p-2">
                <Engraving />
              </div>
              <figcaption className="mt-2 text-center font-serif text-xs italic">
                Fig. 1 — The esplanade at noon, awnings lowered.
              </figcaption>
            </figure>
            <p data-print-step="2" className="motion-hidden hidden font-serif text-sm leading-relaxed md:block md:text-justify">
              {COLUMNS[1]}
            </p>
            <p data-print-step="2" className="motion-hidden mx-auto max-w-sm text-center font-serif text-sm leading-relaxed md:hidden">
              {COLUMNS[0]}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
