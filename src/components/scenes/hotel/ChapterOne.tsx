"use client";

import { useRef } from "react";
import Intertitle from "@/components/Intertitle";
import { useScene } from "@/lib/use-scene";
import { cutIn, cutOut } from "@/lib/cuts";
import { Concierge, Lobby, Patisserie } from "./rooms";

const ROOMS = [
  { name: "No. 1 — The Lobby", line: "Two lifts, one staircase, no one waiting.", Room: Lobby },
  { name: "No. 2 — The Concierge", line: "Every key accounted for. The clock insists it is noon.", Room: Concierge },
  { name: "No. 3 — The Pâtisserie", line: "Eighteen boxes, tied twice, never opened.", Room: Patisserie },
];

// Timeline in scroll units: card, then for each room a hold (with a push-in and one detail coming alive) and a pan.
const CARD_END = 1;
const HOLDS = [
  { start: 1, end: 2.3 },
  { start: 3.3, end: 4.6 },
  { start: 5.6, end: 7 },
];
const PAN = 1;

export default function ChapterOne() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, { id: "one", palette: "budapest" }, (tl, q) => {
    const captions = q("[data-caption]");
    const strip = q("[data-strip]");
    const dolly = q("[data-dolly]");
    cutOut(tl, q("[data-intertitle]"), CARD_END);
    cutIn(tl, captions[0], CARD_END);

    HOLDS.forEach((h, i) => {
      // Straight push-in while the camera is parked on a room…
      tl.fromTo(dolly, { scale: 1 }, { scale: 1.06, duration: h.end - h.start, ease: "sine.inOut", immediateRender: i === 0 }, h.start);
      if (i === HOLDS.length - 1) return;
      // …then pull back out while dollying sideways to the next centered room.
      tl.to(dolly, { scale: 1, duration: PAN, ease: "sine.inOut" }, h.end);
      tl.to(strip, { xPercent: (-100 / 3) * (i + 1), duration: PAN, ease: "sine.inOut" }, h.end);
      const mid = h.end + PAN / 2;
      cutOut(tl, captions[i], mid);
      cutIn(tl, captions[i + 1], mid);
    });

    // Lobby: both lifts open at once, doors sliding apart on the horizontal axis.
    const lobby = HOLDS[0].start;
    tl.fromTo(q('[data-door="outer"]'), { x: 0 }, { x: -72, duration: 0.6, ease: "sine.inOut", immediateRender: true }, lobby + 0.3);
    tl.fromTo(q('[data-door="inner"]'), { x: 0 }, { x: 72, duration: 0.6, ease: "sine.inOut", immediateRender: true }, lobby + 0.3);

    // Concierge: keys are hung row by row, then the desk lamps come on.
    const desk = HOLDS[1].start;
    q("[data-key-row]").forEach((row, r) => {
      tl.fromTo(row, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power1.out", immediateRender: true }, desk + 0.1 + r * 0.18);
    });
    tl.fromTo(q("[data-glow]"), { autoAlpha: 0 }, { autoAlpha: 0.55, duration: 0.001, immediateRender: true }, desk + 0.95);

    // Pâtisserie: tiers lowered from straight above, bottom tier first, cherry last.
    const shop = HOLDS[2].start;
    q("[data-tier]").forEach((tier, t) => {
      tl.fromTo(tier, { autoAlpha: 0, y: -160 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power1.out", immediateRender: true }, shop + 0.15 + t * 0.22);
    });
  });

  return (
    <section ref={ref} id="chapter-one" className="segment" style={{ "--length": 8 } as React.CSSProperties} aria-label="Chapter One: The Hotel">
      <div className="scene palette-budapest" tabIndex={-1}>
        <Intertitle className="palette-budapest-card" kicker="Chapter One" numeral="I" title="The Hotel on the Hill">
          In which a guest is shown three rooms, and finds each one exactly where it ought to be.
        </Intertitle>

        <div className="flex h-full flex-col items-center justify-center gap-5 px-4 pt-14 motion-reduce:py-20">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.5em] sm:text-xs">Chapter One · The Hotel</p>

          <div
            className="relative overflow-hidden border-[5px] border-[var(--gb-gold)] outline-2 outline-offset-4 outline-[var(--gb-plum)] motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory"
            style={{ width: "min(92vw, calc((100svh - 15rem) * 1.37))", aspectRatio: "1.37 / 1" }}
            tabIndex={0}
            role="group"
            aria-label="Hotel rooms. With reduced motion, scroll sideways to see all three."
          >
            <div data-dolly className="h-full w-full will-change-transform">
              <div data-strip className="flex h-full w-[300%] will-change-transform">
                {ROOMS.map(({ name, Room }) => (
                  <div key={name} className="h-full w-1/3 shrink-0 snap-center">
                    <Room />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-16 w-full max-w-md text-center motion-reduce:hidden">
            {ROOMS.map(({ name, line }, i) => (
              <div key={name} data-caption className={`absolute inset-x-0 top-0 ${i > 0 ? "motion-hidden" : ""}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.25em]">{name}</p>
                <p className="mt-1.5 font-serif text-sm italic">{line}</p>
              </div>
            ))}
          </div>
          <ol className="static-only text-center text-sm font-semibold uppercase tracking-[0.25em]">
            {ROOMS.map(({ name, line }) => (
              <li key={name} className="mt-3">
                {name}
                <span className="mt-1 block font-serif text-sm font-normal normal-case italic tracking-normal">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
