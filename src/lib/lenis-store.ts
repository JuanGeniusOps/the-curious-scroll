import type Lenis from "lenis";

let instance: Lenis | null = null;

export const CUT_EVENT = "projector:cut";

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Jump straight to a scroll position: a cut, never a travelling scroll. */
export const cutTo = (top: number) => {
  if (instance) instance.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "instant" });
  // Scenes re-check their segment right away instead of waiting for the next scroll tick.
  window.dispatchEvent(new Event(CUT_EVENT));
};
