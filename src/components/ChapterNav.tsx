"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { cutTo } from "@/lib/lenis-store";

const CHAPTERS = [
  { id: "prologue", target: "prologue", label: "Prologue", short: "P" },
  { id: "one", target: "chapter-one", label: "Chapter One", short: "I" },
  { id: "two", target: "chapter-two", label: "Chapter Two", short: "II" },
  { id: "three", target: "chapter-three", label: "Chapter Three", short: "III" },
  { id: "coda", target: "coda", label: "Coda", short: "C" },
];

/** Centered chapter plaque. Jumps are cuts, like changing reels. */
export default function ChapterNav() {
  const [current, setCurrent] = useState("prologue");
  const reelRef = useRef<HTMLDivElement>(null);

  // Reel counter: a rule under the plaque that grows out from the axis as the film plays.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        reelRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } },
      );
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setCurrent(root.dataset.chapter ?? "prologue");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-chapter"] });
    return () => observer.disconnect();
  }, []);

  const jump = (target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    cutTo(el.offsetTop);
    // Hand keyboard focus to the chapter so the next Tab continues from there.
    el.querySelector<HTMLElement>(".scene")?.focus({ preventScroll: true });
  };

  return (
    <nav aria-label="Chapters" className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <ol className="relative flex items-center border border-[var(--fg)] bg-[var(--bg)] text-[var(--fg)] outline outline-1 outline-offset-2 outline-[var(--fg)]">
        {CHAPTERS.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => jump(c.target)}
              aria-current={current === c.id ? "step" : undefined}
              aria-label={c.label}
              className="min-w-11 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-none aria-[current=step]:bg-[var(--fg)] aria-[current=step]:text-[var(--bg)]"
            >
              {c.short}
            </button>
          </li>
        ))}
        <li aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[5px] h-[2px]">
          <div ref={reelRef} className="h-full w-full origin-center scale-x-0 bg-[var(--accent)] will-change-transform motion-reduce:hidden" />
        </li>
      </ol>
    </nav>
  );
}
