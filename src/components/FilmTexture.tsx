"use client";

import { useEffect, useRef } from "react";

/** Subtle film grain (a noise tile rendered once, jittered with transform steps) plus a soft vignette. */
export default function FilmTexture() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const size = 180;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx || !grainRef.current) return;
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    grainRef.current.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  }, []);

  return (
    <>
      <div className="vignette" aria-hidden />
      <div ref={grainRef} className="grain" aria-hidden />
    </>
  );
}
