"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";
import { animateCard, cutIn, cutOut, hold } from "@/lib/cuts";

const small = "text-[0.7rem] tracking-[0.4em] sm:text-xs";

const CARDS = [
  {
    kicker: "A Scroll Picture",
    body: (
      <>
        <h1 className="text-4xl font-semibold uppercase leading-[1.05] tracking-[0.14em] sm:text-6xl">
          The Curious
          <br />
          Scroll
        </h1>
        <div className="my-7 h-px w-20 bg-current" aria-hidden />
        <p className={`uppercase ${small}`}>In three chapters, with a prologue &amp; a coda</p>
      </>
    ),
  },
  {
    kicker: "Starring",
    body: (
      <ul className="space-y-5 text-xl font-medium uppercase tracking-[0.2em] sm:text-3xl">
        <li data-reveal data-at="0.1">A Pink Hotel</li>
        <li data-reveal data-at="0.28" className={small}>and</li>
        <li data-reveal data-at="0.38">Nine Objects on a Table</li>
        <li data-reveal data-at="0.56" className={small}>and</li>
        <li data-reveal data-at="0.66">A Street That Never Moves</li>
      </ul>
    ),
  },
  {
    kicker: "Photographed in",
    body: (
      <ul className="space-y-2 text-xl font-medium uppercase leading-relaxed tracking-[0.2em] sm:text-3xl">
        <li data-reveal data-at="0.1">Powdered Pink</li>
        <li data-reveal data-at="0.3">Scout Khaki</li>
        <li data-reveal data-at="0.5">&amp; Printer&rsquo;s Ink</li>
      </ul>
    ),
  },
];

export default function Prologue() {
  const ref = useRef<HTMLElement>(null);

  // Opening credits: each card pushes in while it is held, then cuts to the next.
  useScene(ref, { id: "prologue", palette: "cream" }, (tl, q) => {
    const cards = q("[data-card]");
    const cue = q("[data-cue]");
    cards.forEach((card, i) => animateCard(tl, card, i, i + 1));
    tl.fromTo(cue, { y: 0 }, { y: 24, autoAlpha: 0, duration: 0.4, immediateRender: true }, 0);
    cutOut(tl, cards[0], 1);
    cutIn(tl, cards[1], 1);
    cutOut(tl, cards[1], 2);
    cutIn(tl, cards[2], 2);
    hold(tl, 4 - tl.duration());
  });

  return (
    <section ref={ref} id="prologue" className="segment" style={{ "--length": 5 } as React.CSSProperties} aria-label="Prologue">
      <div className="scene palette-cream is-active" tabIndex={-1}>
        {CARDS.map((card, i) => (
          <div
            key={card.kicker}
            data-card
            className={`${i > 0 ? "motion-hidden " : ""}flex items-center justify-center px-4 py-24 motion-safe:absolute motion-safe:inset-0 motion-reduce:min-h-[100svh]`}
          >
            <div data-frame className="intertitle-frame flex w-full max-w-[36rem] flex-col items-center px-6 py-12 text-center will-change-transform sm:px-14 sm:py-16">
              <p className="mb-8 text-[0.7rem] font-medium uppercase tracking-[0.45em] text-[var(--accent)] sm:text-xs">{card.kicker}</p>
              {card.body}
            </div>
          </div>
        ))}
        <p
          data-cue
          className="motion-only absolute inset-x-0 bottom-8 text-center text-[0.65rem] font-medium uppercase tracking-[0.5em]"
        >
          Scroll to begin&nbsp;&darr;
        </p>
      </div>
    </section>
  );
}
