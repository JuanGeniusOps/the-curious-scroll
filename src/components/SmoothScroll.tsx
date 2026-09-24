"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis-store";

/** Lenis inertia scroll, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock. */
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });
    return () => mm.revert();
  }, []);
  return null;
}
