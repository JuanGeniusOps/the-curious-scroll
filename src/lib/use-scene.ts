"use client";

import { type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./gsap";
import { CUT_EVENT } from "./lenis-store";
import { animateCard } from "./cuts";

export type Palette = "cream" | "budapest" | "moonrise" | "dispatch";
export type ChapterId = "prologue" | "one" | "two" | "three" | "coda";

type Build = (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => void;

/**
 * Wires one chapter into the projector:
 * - toggles its fixed scene on/off (dry cut) while the segment is under the playhead
 * - sets the page palette for the chrome (nav, grain)
 * - scrubs the chapter timeline over the segment, leaving the final viewport as a hold
 * Everything is created inside a reduced-motion guard, so the static version gets no choreography.
 */
export function useScene(
  segmentRef: RefObject<HTMLElement | null>,
  chapter: { id: ChapterId; palette: Palette },
  build?: Build,
) {
  useGSAP(
    () => {
      const segment = segmentRef.current;
      if (!segment) return;
      const scene = segment.querySelector<HTMLElement>(".scene");
      if (!scene) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const toggle = (active: boolean) => {
          active = Boolean(active);
          scene.classList.toggle("is-active", active);
          scene.inert = !active;
          if (active) {
            document.documentElement.dataset.palette = chapter.palette;
            document.documentElement.dataset.chapter = chapter.id;
          }
        };
        // Is the playhead (top of the viewport) inside this segment right now?
        const syncFromLayout = () => {
          const rect = segment.getBoundingClientRect();
          toggle(rect.top <= 0 && rect.bottom > 0);
        };
        ScrollTrigger.create({
          trigger: segment,
          start: "top top",
          end: "bottom top",
          onToggle: (self) => toggle(self.isActive),
          onRefresh: syncFromLayout,
        });
        window.addEventListener(CUT_EVENT, syncFromLayout);

        if (build) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: segment, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
          });
          // Every chapter card builds itself over the first unit of scroll, before it is cut away.
          const card = segment.querySelector("[data-intertitle]");
          if (card) animateCard(tl, card, 0, 0.9);
          build(tl, gsap.utils.selector(segment));
        }

        return () => {
          window.removeEventListener(CUT_EVENT, syncFromLayout);
          scene.classList.remove("is-active");
          scene.inert = false;
        };
      });
      return () => mm.revert();
    },
    { scope: segmentRef },
  );
}
