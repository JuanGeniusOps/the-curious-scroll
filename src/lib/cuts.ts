import { gsap } from "./gsap";

type Targets = gsap.TweenTarget;
const INSTANT = 0.001;

/** Element appears on a frame boundary, no fade. */
export const cutIn = (tl: gsap.core.Timeline, targets: Targets, at: number) =>
  tl.fromTo(targets, { autoAlpha: 0 }, { autoAlpha: 1, duration: INSTANT, immediateRender: true }, at);

/** Element disappears on a frame boundary, no fade. */
export const cutOut = (tl: gsap.core.Timeline, targets: Targets, at: number) =>
  tl.to(targets, { autoAlpha: 0, duration: INSTANT }, at);

/** Empty tween that holds the frame still for `duration` of scroll. */
export const hold = (tl: gsap.core.Timeline, duration: number) => tl.to({}, { duration });

/**
 * Builds a framed title card over [start, end] of scroll:
 * a straight push-in on [data-frame], rules drawn out from the axis ([data-rule]),
 * letters revealed from the center outward ([data-char][data-dist]) and
 * extra lines entering at their own fraction of the span ([data-reveal][data-at]).
 */
export const animateCard = (tl: gsap.core.Timeline, root: Element, start: number, end: number) => {
  const span = end - start;
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const frame = root.querySelector("[data-frame]");
  if (frame) tl.fromTo(frame, { scale: 1 }, { scale: 1.05, duration: span, immediateRender: true }, start);

  const rules = all("[data-rule]");
  if (rules.length) {
    tl.fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: span * 0.25, ease: "power1.inOut", immediateRender: true }, start + span * 0.05);
  }

  const chars = all("[data-char]");
  if (chars.length) {
    // Set the hidden state up front: a staggered fromTo only applies its "from" values
    // to letters whose delay has started, so the outer letters would show too early.
    gsap.set(chars, { autoAlpha: 0, yPercent: 70 });
    tl.to(
      chars,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: span * 0.08,
        ease: "power1.out",
        stagger: (_i: number, el: HTMLElement) => Number(el.dataset.dist ?? 0) * span * 0.035,
      },
      start + span * 0.12,
    );
  }

  all("[data-reveal]").forEach((el) => {
    const at = start + span * Number(el.dataset.at ?? 0.5);
    tl.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: span * 0.1, ease: "power1.out", immediateRender: true }, at);
  });
};
