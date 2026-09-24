"use client";

import { useRef } from "react";
import Intertitle from "@/components/Intertitle";
import { useScene } from "@/lib/use-scene";
import { cutIn, cutOut } from "@/lib/cuts";
import { ITEMS, REVEAL_STEPS } from "./items";

const FIRST_STEP = 1.5;
const STEP = 0.7;
const TOTAL = 6;

// Running total after each reveal step (index 0 = empty table).
const COUNTS = REVEAL_STEPS.reduce<number[]>((acc, step) => [...acc, acc[acc.length - 1] + step.length], [0]);

export default function ChapterTwo() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, { id: "two", palette: "moonrise" }, (tl, q) => {
    const items = q("[data-item]");
    const counts = q("[data-count]");
    const labels = q("[data-label]");
    cutOut(tl, q("[data-intertitle]"), 1);
    cutIn(tl, counts[0], 1);
    // The overhead camera rises straight up off the empty table.
    tl.fromTo(q("[data-board]"), { scale: 1.18 }, { scale: 1, duration: 0.5, ease: "sine.out", immediateRender: true }, 1);
    REVEAL_STEPS.forEach((step, i) => {
      const at = FIRST_STEP + i * STEP;
      // Each object is set down from straight above: a short, straight zoom, no drift.
      tl.fromTo(
        step.map((n) => items[n]),
        { autoAlpha: 0, scale: 1.14 },
        { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power1.out", immediateRender: true },
        at,
      );
      // Its catalogue label slides up into the tile a beat later.
      tl.fromTo(
        step.map((n) => labels[n]),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.14, ease: "power1.out", immediateRender: true },
        at + 0.16,
      );
      cutOut(tl, counts[i], at);
      cutIn(tl, counts[i + 1], at);
    });
    // Inventory complete: a stamp comes down square onto the table.
    tl.fromTo(q("[data-stamp]"), { autoAlpha: 0, scale: 1.4 }, { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power1.out", immediateRender: true }, 5.3);
    tl.to({}, { duration: TOTAL - tl.duration() });
  });

  return (
    <section ref={ref} id="chapter-two" className="segment" style={{ "--length": 7 } as React.CSSProperties} aria-label="Chapter Two: The Camp">
      <div className="scene palette-moonrise" tabIndex={-1}>
        <Intertitle className="palette-moonrise-card" kicker="Chapter Two" numeral="II" title="Inventory of a Runaway">
          Packed the night before, in order of importance, by someone who had thought about it for a very long time.
        </Intertitle>

        <div className="flex h-full flex-col items-center justify-center gap-5 px-4 pt-14 motion-reduce:py-20">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.5em] sm:text-xs">Chapter Two · The Camp</p>

          <div className="relative">
          <ol
            data-board
            className="grid grid-cols-3 gap-[3%] will-change-transform border-2 border-[var(--mk-paper)] p-[3%] outline-1 outline-offset-4 outline-[var(--mk-paper)]"
            style={{ width: "min(88vw, calc(100svh - 14rem))" }}
            aria-label="Nine objects laid out on a table, seen from above"
          >
            {ITEMS.map((item, i) => (
              <li key={item.name} className="relative aspect-square border border-dashed border-[color-mix(in_srgb,var(--mk-paper)_45%,transparent)]">
                <span className="absolute inset-0 flex items-center justify-center font-type text-[0.6rem] opacity-50 sm:text-xs" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div data-item className="motion-hidden absolute inset-0 flex flex-col overflow-hidden bg-[var(--mk-khaki)] text-[var(--mk-ink)] will-change-transform">
                  <div className="min-h-0 flex-1 p-[10%] pb-[4%]">{item.drawing}</div>
                  <p data-label className="bg-[var(--mk-paper)] py-[3%] text-center font-type text-[clamp(0.5rem,1.4vmin,0.8rem)] font-bold uppercase leading-tight">
                    No.{String(i + 1).padStart(2, "0")} {item.name}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p
            data-stamp
            aria-hidden
            className="motion-hidden motion-reduce:hidden pointer-events-none absolute left-1/2 top-1/2 -ml-[min(9rem,40%)] -mt-8 flex h-16 w-[min(18rem,80%)] items-center justify-center border-4 border-double border-[var(--mk-rust)] bg-[var(--mk-paper)] font-type text-lg font-bold uppercase tracking-[0.3em] text-[var(--mk-rust)] sm:text-2xl"
          >
            Packed
          </p>
          </div>

          <p className="relative h-5 w-full text-center font-type text-xs uppercase tracking-[0.2em] sm:text-sm" aria-live="off">
            {COUNTS.map((n, i) => (
              <span key={i} data-count className="motion-hidden absolute inset-x-0 motion-reduce:hidden">
                Items packed: {n} of {ITEMS.length}
              </span>
            ))}
            <span className="static-only">Items packed: {ITEMS.length} of {ITEMS.length}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
