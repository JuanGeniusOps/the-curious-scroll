import type { ReactNode } from "react";

/** Draws its children, then the same shapes reflected across the vertical axis x = width / 2. */
export default function Mirror({ width, children }: { width: number; children: ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform={`translate(${width} 0) scale(-1 1)`}>{children}</g>
    </>
  );
}
