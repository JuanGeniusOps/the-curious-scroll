"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { animateCard, cutIn, cutOut } from "@/lib/cuts";
import SplitCaps from "@/components/SplitCaps";
import { cutTo } from "@/lib/lenis-store";

const CREDITS: [string, string][] = [
  ["Direction & Symmetry", "The Vertical Axis"],
  ["Palettes", "Powdered Pink · Scout Khaki · Printer’s Ink"],
  ["Camera", "One Pan · One Overhead · One Tilt"],
  ["Title Cards", "Set in Capitals"],
  ["Film Grain", "Randomised, Once"],
  ["The Hotel", "An Illustrated Hotel"],
  ["The Camp", "Nine Objects on a Table"],
  ["The Gazette", "A Street That Never Moves"],
  ["Projection", "Next.js · GSAP · ScrollTrigger · Lenis"],
];

const ROLL = { start: 0.3, end: 3.6 };
const FIN = 3.8;
const TOTAL = 5;

export default function Coda() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, { id: "coda", palette: "cream" }, (tl, q) => {
    const roll = q("[data-roll]")[0] as HTMLElement;
    // Credits travel straight up at a constant speed, from below the frame to above it.
    tl.fromTo(
      roll,
      { y: () => window.innerHeight },
      { y: () => -roll.offsetHeight, duration: ROLL.end - ROLL.start, ease: "none", immediateRender: true },
      ROLL.start,
    );
    cutOut(tl, roll, ROLL.end);
    const fin = q("[data-fin]")[0];
    cutIn(tl, fin, FIN);
    animateCard(tl, fin, FIN, TOTAL);
    tl.to({}, { duration: TOTAL - tl.duration() });
  });

  return (
    <section ref={ref} id="coda" className="segment" style={{ "--length": 6 } as React.CSSProperties} aria-label="Coda: Credits">
      <div className="scene palette-cream" tabIndex={-1}>
        <div className="relative h-full overflow-hidden motion-reduce:overflow-visible">
          <div data-roll className="absolute inset-x-0 top-0 px-4 text-center will-change-transform motion-reduce:static motion-reduce:pb-16 motion-reduce:pt-24">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.45em] text-[var(--accent)]">The End Credits</p>
            <p className="mt-4 text-2xl font-semibold uppercase tracking-[0.18em] sm:text-4xl">The Curious Scroll</p>
            <dl className="mx-auto mt-16 max-w-md space-y-10">
              {CREDITS.map(([role, name]) => (
                <div key={role}>
                  <dt className="text-[0.65rem] font-medium uppercase tracking-[0.4em]">{role}</dt>
                  <dd className="mt-2 font-serif text-lg italic sm:text-xl">{name}</dd>
                </div>
              ))}
            </dl>
            <p className="mx-auto mt-16 max-w-sm font-serif text-sm italic leading-relaxed">
              An homage to a way of looking. No stills, logos, characters or artwork from any film were used; every room, object and
              street here is invented.
            </p>
          </div>
        </div>

        <div data-fin className="motion-hidden absolute inset-0 flex items-center justify-center px-4 motion-reduce:static motion-reduce:min-h-[100svh]">
          <div data-frame className="intertitle-frame flex w-full max-w-sm will-change-transform flex-col items-center px-8 py-14 text-center">
            <p className="text-6xl font-medium uppercase tracking-[0.3em] sm:text-7xl">
              <SplitCaps text="Fin" />
            </p>
            <div data-rule className="my-7 h-px w-16 bg-current" aria-hidden />
            <button
              data-reveal
              data-at="0.45"
              type="button"
              onClick={() => cutTo(0)}
              className="border border-current px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              Run it again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
