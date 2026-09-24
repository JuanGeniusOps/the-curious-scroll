import type { ReactNode } from "react";
import SplitCaps from "./SplitCaps";

type Props = {
  kicker: string;
  title: string;
  numeral?: string;
  children?: ReactNode;
  className?: string;
};

/** Framed chapter card, centered on the vertical axis like a silent-film intertitle. */
export default function Intertitle({ kicker, title, numeral, children, className = "" }: Props) {
  return (
    <div
      data-intertitle
      className={`flex items-center justify-center bg-[var(--bg)] px-4 py-20 text-[var(--fg)] motion-safe:absolute motion-safe:inset-0 motion-safe:z-10 motion-reduce:min-h-[100svh] ${className}`}
    >
      <div data-frame className="intertitle-frame flex w-full max-w-[34rem] flex-col items-center px-6 py-10 text-center will-change-transform sm:px-12 sm:py-14">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.45em] sm:text-xs">{kicker}</p>
        {numeral && (
          <p data-reveal data-at="0.08" className="mt-5 font-display text-6xl font-medium leading-none text-[var(--accent)] sm:text-7xl">
            {numeral}
          </p>
        )}
        <div data-rule className="my-6 h-px w-16 bg-current" aria-hidden />
        <h2 className="text-2xl font-semibold uppercase leading-tight tracking-[0.18em] sm:text-4xl">
          <SplitCaps text={title} />
        </h2>
        {children && (
          <div data-reveal data-at="0.62" className="mt-6 max-w-[24rem] font-serif text-sm italic leading-relaxed sm:text-base">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
