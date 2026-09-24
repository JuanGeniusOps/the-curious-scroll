import type { ReactNode } from "react";
import { MK } from "@/lib/palette";

// Overhead (top-down) drawings on a 100×100 canvas, each symmetric about x = 50.
const Icon = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={label}>
    {children}
  </svg>
);

const S = { stroke: MK.ink, strokeWidth: 2 };

export const ITEMS = [
  {
    name: "Compass",
    drawing: (
      <Icon label="A brass compass, needle pointing north">
        <circle cx={50} cy={52} r={34} fill={MK.mustard} {...S} />
        <circle cx={50} cy={52} r={27} fill={MK.paper} {...S} />
        <rect x={45} y={10} width={10} height={9} fill={MK.mustard} {...S} />
        <path d="M50 29 L56 52 L44 52 Z" fill={MK.rust} />
        <path d="M50 75 L56 52 L44 52 Z" fill={MK.ink} />
        <circle cx={50} cy={52} r={3} fill={MK.mustard} {...S} />
      </Icon>
    ),
  },
  {
    name: "Record Player",
    drawing: (
      <Icon label="A portable record player seen from above">
        <rect x={14} y={14} width={72} height={72} rx={3} fill={MK.rust} {...S} />
        <circle cx={50} cy={50} r={29} fill={MK.ink} />
        {[24, 19, 14].map((r) => (
          <circle key={r} cx={50} cy={50} r={r} fill="none" stroke={MK.khaki} strokeWidth={0.8} opacity={0.6} />
        ))}
        <circle cx={50} cy={50} r={8} fill={MK.mustard} />
        <circle cx={50} cy={50} r={1.5} fill={MK.ink} />
        <rect x={40} y={80} width={20} height={4} fill={MK.paper} />
      </Icon>
    ),
  },
  {
    name: "Scout Badge",
    drawing: (
      <Icon label="An embroidered round badge with a tent">
        <circle cx={50} cy={50} r={34} fill={MK.forest} stroke={MK.mustard} strokeWidth={5} />
        <path d="M50 30 L70 66 L30 66 Z" fill={MK.mustard} {...S} />
        <path d="M50 44 L57 66 L43 66 Z" fill={MK.ink} />
        <rect x={28} y={66} width={44} height={3} fill={MK.paper} />
      </Icon>
    ),
  },
  {
    name: "Canteen",
    drawing: (
      <Icon label="A round canteen with a strap">
        <rect x={47} y={4} width={6} height={92} fill={MK.rust} />
        <circle cx={50} cy={56} r={30} fill={MK.sky} {...S} />
        <circle cx={50} cy={56} r={22} fill="none" stroke={MK.paper} strokeWidth={2} opacity={0.8} />
        <rect x={42} y={18} width={16} height={12} fill={MK.khaki} {...S} />
      </Icon>
    ),
  },
  {
    name: "Island Map",
    drawing: (
      <Icon label="A folded map of an island with a dotted route to an X">
        <rect x={10} y={16} width={80} height={68} fill={MK.paper} {...S} />
        <line x1={36.7} x2={36.7} y1={16} y2={84} stroke={MK.khaki} strokeWidth={1.5} />
        <line x1={63.3} x2={63.3} y1={16} y2={84} stroke={MK.khaki} strokeWidth={1.5} />
        <path d="M50 26 C68 26 76 40 72 54 C70 66 60 76 50 76 C40 76 30 66 28 54 C24 40 32 26 50 26 Z" fill={MK.sky} {...S} />
        <path d="M50 34 C60 34 64 44 62 52 C60 62 56 68 50 68 C44 68 40 62 38 52 C36 44 40 34 50 34 Z" fill={MK.khaki} />
        <line x1={50} x2={50} y1={70} y2={48} stroke={MK.rust} strokeWidth={2} strokeDasharray="3 3" />
        <path d="M45 39 L55 49 M55 39 L45 49" stroke={MK.rust} strokeWidth={3} />
      </Icon>
    ),
  },
  {
    name: "Flashlight",
    drawing: (
      <Icon label="A long metal flashlight">
        <rect x={40} y={30} width={20} height={62} rx={2} fill={MK.forest} {...S} />
        <path d="M34 8 L66 8 L60 30 L40 30 Z" fill={MK.mustard} {...S} />
        <rect x={37} y={8} width={26} height={4} fill={MK.paper} />
        <rect x={46} y={50} width={8} height={12} fill={MK.rust} {...S} />
      </Icon>
    ),
  },
  {
    name: "Letters",
    drawing: (
      <Icon label="A bundle of letters tied with string">
        <rect x={16} y={24} width={68} height={52} fill={MK.paper} {...S} />
        <path d="M16 24 L50 54 L84 24" fill="none" {...S} />
        <line x1={50} x2={50} y1={24} y2={76} stroke={MK.rust} strokeWidth={2.5} />
        <line x1={16} x2={84} y1={50} y2={50} stroke={MK.rust} strokeWidth={2.5} />
        <circle cx={50} cy={50} r={5} fill={MK.rust} />
      </Icon>
    ),
  },
  {
    name: "Binoculars",
    drawing: (
      <Icon label="A pair of binoculars seen from above">
        <rect x={16} y={30} width={26} height={46} rx={4} fill={MK.ink} />
        <rect x={58} y={30} width={26} height={46} rx={4} fill={MK.ink} />
        <rect x={40} y={42} width={20} height={14} fill={MK.khaki} {...S} />
        <rect x={19} y={20} width={20} height={12} fill={MK.sky} {...S} />
        <rect x={61} y={20} width={20} height={12} fill={MK.sky} {...S} />
        <rect x={20} y={80} width={18} height={6} fill={MK.rust} />
        <rect x={62} y={80} width={18} height={6} fill={MK.rust} />
      </Icon>
    ),
  },
  {
    name: "Pocketknife",
    drawing: (
      <Icon label="A folding pocketknife, blade open, pointing up">
        <path d="M44 10 L56 10 L56 44 L44 44 Z" fill={MK.paper} {...S} />
        <path d="M44 10 L50 4 L56 10 Z" fill={MK.paper} {...S} />
        <rect x={40} y={44} width={20} height={48} rx={6} fill={MK.rust} {...S} />
        <circle cx={50} cy={52} r={3} fill={MK.mustard} />
        <path d="M46 66 L54 66 M50 62 L50 70" stroke={MK.paper} strokeWidth={2} />
      </Icon>
    ),
  },
];

// Reveal order keeps every intermediate frame mirror-symmetric:
// the center first, then pairs reflected across the vertical axis, then the axis cells.
export const REVEAL_STEPS = [[4], [3, 5], [1], [7], [0, 2], [6, 8]];
