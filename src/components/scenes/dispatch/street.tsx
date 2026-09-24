import Mirror from "@/components/Mirror";
import { FD } from "@/lib/palette";

// Street planes share a 1600×1000 canvas, anchored to the bottom, axis at x = 800.
const W = 1600;
const H = 1000;
const C = W / 2;
const display = { fontFamily: "var(--font-display)" };
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function Plane({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

function Windows({ x, w, top, bottom, cols, shutter }: { x: number; w: number; top: number; bottom: number; cols: number; shutter: string }) {
  const gap = w / cols;
  const rows = Math.max(0, Math.floor((bottom - top) / 90));
  return (
    <>
      {range(rows).map((r) =>
        range(cols).map((c) => {
          const cx = x + gap * (c + 0.5);
          const y = top + r * 90;
          return (
            <g key={`${r}-${c}`}>
              <rect x={cx - 14} y={y} width={28} height={50} fill={FD.ink} opacity={0.82} />
              <rect x={cx - 26} y={y} width={11} height={50} fill={shutter} />
              <rect x={cx + 15} y={y} width={11} height={50} fill={shutter} />
            </g>
          );
        }),
      )}
    </>
  );
}

export function BackPlane() {
  const roofs = [
    { x: 0, w: 260, top: 420 },
    { x: 260, w: 220, top: 380 },
    { x: 480, w: 240, top: 440 },
  ];
  return (
    <Plane>
      <g fill="#D7B9A6">
        <Mirror width={W}>
          {roofs.map((r) => (
            <g key={r.x}>
              <rect x={r.x} y={r.top} width={r.w} height={H - r.top} />
              <rect x={r.x + r.w * 0.3} y={r.top - 50} width={24} height={50} />
              <rect x={r.x + r.w * 0.6} y={r.top - 36} width={20} height={36} />
            </g>
          ))}
        </Mirror>
        {/* Belfry on the axis */}
        <rect x={C - 70} y={230} width={140} height={H - 230} />
        <path d={`M${C - 82} 232 L${C + 82} 232 L${C} 128 Z`} />
        <rect x={C - 2} y={96} width={4} height={34} />
      </g>
      <circle cx={C} cy={310} r={40} fill={FD.cream} />
      <line x1={C} x2={C} y1={310} y2={280} stroke={FD.ink} strokeWidth={4} />
      <line x1={C} x2={C} y1={310} y2={292} stroke={FD.ink} strokeWidth={7} />
    </Plane>
  );
}

export function MidPlane() {
  const colors = [FD.salmon, FD.ochre, FD.cream, "#E7CFA6", FD.cream, FD.ochre, FD.salmon];
  const tops = [520, 470, 540, 430, 540, 470, 520];
  const w = W / 7;
  return (
    <Plane>
      {colors.map((color, i) => {
        const x = i * w;
        return (
          <g key={i}>
            <rect x={x} y={tops[i]} width={w} height={H - tops[i]} fill={color} stroke={FD.ink} strokeWidth={2} />
            <path d={`M${x - 6} ${tops[i]} L${x + w + 6} ${tops[i]} L${x + w - 18} ${tops[i] - 40} L${x + 18} ${tops[i] - 40} Z`} fill={FD.ink} />
            <Windows x={x} w={w} top={tops[i] + 50} bottom={H - 20} cols={2} shutter={i === 3 ? FD.red : FD.teal} />
          </g>
        );
      })}
    </Plane>
  );
}

export function FrontPlane() {
  const colors = [FD.teal, FD.salmon, FD.cream, FD.salmon, FD.teal];
  const tops = [600, 580, 540, 580, 600];
  const w = W / 5;
  return (
    <Plane label="A symmetrical street of pastel buildings with striped awnings, a newspaper kiosk at the center, lamp posts and bunting.">
      {colors.map((color, i) => {
        const x = i * w;
        const stripe = i === 2 ? FD.red : i % 2 ? FD.teal : FD.ochre;
        return (
          <g key={i}>
            <rect x={x} y={tops[i]} width={w} height={H - tops[i]} fill={color} stroke={FD.ink} strokeWidth={3} />
            <rect x={x} y={tops[i]} width={w} height={14} fill={FD.ink} />
            <Windows x={x} w={w} top={tops[i] + 40} bottom={770} cols={3} shutter={i === 2 ? FD.teal : FD.cream} />
            {/* Shopfront */}
            <rect x={x + 30} y={820} width={w - 60} height={100} fill={FD.cream} stroke={FD.ink} strokeWidth={3} />
            <rect x={x + w / 2 - 22} y={840} width={44} height={80} fill={FD.ink} opacity={0.85} />
            {/* Striped awning with a scalloped edge; unrolls downward from its bar */}
            <rect x={x + 16} y={774} width={w - 32} height={8} fill={FD.ink} />
            <g data-awning data-dist={Math.abs(i - 2)}>
              {range(9).map((s) => (
                <rect key={s} x={x + 20 + s * ((w - 40) / 9)} y={780} width={(w - 40) / 9} height={36} fill={s % 2 ? FD.cream : stripe} />
              ))}
              {range(9).map((s) => (
                <circle key={`c${s}`} cx={x + 20 + (s + 0.5) * ((w - 40) / 9)} cy={816} r={(w - 40) / 18} fill={s % 2 ? FD.cream : stripe} />
              ))}
            </g>
          </g>
        );
      })}
      {/* Kiosk sign on the axis */}
      <rect x={C - 120} y={728} width={240} height={40} fill={FD.ink} />
      <text x={C} y={756} textAnchor="middle" fontSize={22} letterSpacing={8} fill={FD.cream} style={display} fontWeight={600}>
        JOURNAUX
      </text>
      {/* Pavement */}
      <rect y={920} width={W} height={80} fill="#8C8577" />
      {range(9).map((i) => (
        <line key={i} x1={i * 200} x2={i * 200} y1={920} y2={H} stroke={FD.ink} strokeWidth={2} opacity={0.4} />
      ))}
      <line x1={0} x2={W} y1={960} y2={960} stroke={FD.ink} strokeWidth={2} opacity={0.4} />
    </Plane>
  );
}

export function ForePlane() {
  // A symmetric sag of bunting between the two lamp posts.
  const flags = 13;
  const x0 = 170;
  const x1 = W - 170;
  const pts = range(flags).map((i) => {
    const t = (i + 0.5) / flags;
    const x = x0 + (x1 - x0) * t;
    const y = 530 + 4 * 90 * t * (1 - t);
    return { x, y, color: [FD.red, FD.cream, FD.teal][Math.abs(i - 6) % 3] };
  });
  return (
    <Plane>
      <path d={`M${x0} 530 Q${C} ${530 + 180} ${x1} 530`} fill="none" stroke={FD.ink} strokeWidth={3} />
      {pts.map((p, i) => (
        <path key={i} d={`M${p.x - 20} ${p.y} L${p.x + 20} ${p.y} L${p.x} ${p.y + 44} Z`} fill={p.color} stroke={FD.ink} strokeWidth={2} />
      ))}
      <Mirror width={W}>
        <rect x={164} y={520} width={12} height={H - 520} fill={FD.ink} />
        <rect x={150} y={960} width={40} height={40} fill={FD.ink} />
        <path d="M146 520 L194 520 L184 476 L156 476 Z" fill={FD.ochre} stroke={FD.ink} strokeWidth={3} />
        <path d="M150 476 L190 476 L170 454 Z" fill={FD.ink} />
      </Mirror>
    </Plane>
  );
}

export function Moon() {
  return (
    <Plane>
      <circle cx={C} cy={150} r={58} fill={FD.cream} />
      <circle cx={C} cy={150} r={70} fill="none" stroke={FD.cream} strokeWidth={2} opacity={0.6} />
    </Plane>
  );
}

/** Line drawing of the street for the magazine page, in ink only. */
export function Engraving() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="An ink drawing of the same street, as printed in the magazine.">
      <g fill="none" stroke={FD.ink} strokeWidth={2}>
        {range(5).map((i) => {
          const tops = [110, 100, 70, 100, 110];
          const x = i * 80;
          return (
            <g key={i}>
              <rect x={x} y={tops[i]} width={80} height={240 - tops[i]} />
              {range(3).map((c) =>
                range(Math.floor((190 - tops[i]) / 30)).map((r) => (
                  <rect key={`${c}-${r}`} x={x + 14 + c * 20} y={tops[i] + 12 + r * 30} width={12} height={18} />
                )),
              )}
              <path d={`M${x + 6} 196 L${x + 74} 196 L${x + 74} 206 L${x + 6} 206 Z`} fill={i === 2 ? FD.red : "none"} />
            </g>
          );
        })}
        <path d="M200 30 L218 70 L182 70 Z" />
        <line x1={0} x2={400} y1={240} y2={240} strokeWidth={3} />
        <circle cx={200} cy={18} r={9} />
      </g>
    </svg>
  );
}
