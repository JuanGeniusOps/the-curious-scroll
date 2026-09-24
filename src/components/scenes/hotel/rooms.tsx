import Mirror from "@/components/Mirror";
import { GB } from "@/lib/palette";

// Every room shares a 1.37:1 Academy-ratio canvas with its axis at x = 685.
export const W = 1370;
export const H = 1000;
const C = W / 2;
const display = { fontFamily: "var(--font-display)" };

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function Ceiling({ label, band = GB.blush, ink = GB.plum }: { label: string; band?: string; ink?: string }) {
  return (
    <>
      <rect width={W} height={130} fill={band} />
      <rect y={130} width={W} height={8} fill={GB.gold} />
      <text x={C} y={84} textAnchor="middle" fontSize={34} letterSpacing={14} fill={ink} style={display} fontWeight={600}>
        {label}
      </text>
    </>
  );
}

/** One-point-perspective floor with the vanishing point on the axis. */
function Floor({ top = 760, fill = GB.purple }: { top?: number; fill?: string }) {
  const vanishY = 430;
  const k = (H - vanishY) / (top - vanishY);
  return (
    <>
      <rect y={top} width={W} height={H - top} fill={fill} />
      {range(13).map((i) => {
        const dx = (i - 6) * 110;
        return <line key={i} x1={C + dx} y1={top} x2={C + dx * k} y2={H} stroke={GB.plum} strokeWidth={3} opacity={0.5} />;
      })}
      {[46, 110, 200].map((dy) => (
        <line key={dy} x1={0} x2={W} y1={top + dy} y2={top + dy} stroke={GB.plum} strokeWidth={3} opacity={0.35} />
      ))}
      <rect y={top} width={W} height={8} fill={GB.gold} />
    </>
  );
}

function Runner({ top = 760, near = 170, far = 90 }: { top?: number; near?: number; far?: number }) {
  return (
    <path
      d={`M${C - far} ${top + 8} L${C + far} ${top + 8} L${C + near} ${H} L${C - near} ${H} Z`}
      fill={GB.red}
      stroke={GB.gold}
      strokeWidth={6}
    />
  );
}

export function Lobby() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      role="img"
      aria-label="A symmetrical pink hotel lobby: twin red elevators flank a central staircase beneath an arched window and a chandelier."
    >
      <defs>
        {/* Local coordinates, so the mirrored elevator reuses the same clip. */}
        <clipPath id="lift-shaft">
          <rect x={240} y={420} width={160} height={340} />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill={GB.pink} />
      <Ceiling label="THE LOBBY" />

      {/* Wainscoting */}
      <rect y={600} width={W} height={160} fill={GB.purple} />
      <Mirror width={W}>
        {range(3).map((i) => (
          <rect key={i} x={30 + i * 150} y={625} width={120} height={110} fill="none" stroke={GB.gold} strokeWidth={3} />
        ))}
      </Mirror>

      {/* Arched window */}
      <path d={`M${C - 110} 560 V330 A110 110 0 0 1 ${C + 110} 330 V560 Z`} fill={GB.blue} stroke={GB.gold} strokeWidth={12} />
      <line x1={C} x2={C} y1={220} y2={560} stroke={GB.gold} strokeWidth={6} />
      <line x1={C - 110} x2={C + 110} y1={420} y2={420} stroke={GB.gold} strokeWidth={6} />

      {/* Staircase */}
      {range(8).map((i) => {
        const w = 280 + i * 26;
        const y = 560 + i * 25;
        return (
          <g key={i}>
            <rect x={C - w / 2} y={y} width={w} height={25} fill={GB.blush} />
            <rect x={C - w / 2} y={y} width={w} height={3} fill={GB.gold} />
            <rect x={C - 55 - i * 4} y={y + 3} width={110 + i * 8} height={22} fill={GB.red} />
          </g>
        );
      })}

      <Mirror width={W}>
        {/* Pilaster with sconce */}
        <rect x={500} y={138} width={34} height={622} fill={GB.purple} />
        <rect x={492} y={138} width={50} height={18} fill={GB.gold} />
        <rect x={492} y={742} width={50} height={18} fill={GB.gold} />
        <circle cx={517} cy={330} r={12} fill={GB.gold} />
        <rect x={511} y={342} width={12} height={20} fill={GB.gold} />

        {/* Elevator: cabin behind two doors that slide apart on the horizontal axis */}
        <rect x={225} y={400} width={190} height={360} fill={GB.gold} />
        <rect x={240} y={420} width={160} height={340} fill={GB.plum} />
        <rect x={262} y={560} width={116} height={6} fill={GB.gold} opacity={0.7} />
        <circle cx={320} cy={470} r={16} fill={GB.blush} opacity={0.5} />
        <g clipPath="url(#lift-shaft)">
          <g data-door="outer">
            <rect x={240} y={420} width={80} height={340} fill={GB.red} />
            <rect x={256} y={440} width={48} height={300} fill="none" stroke={GB.gold} strokeWidth={3} />
            <line x1={318} x2={318} y1={420} y2={760} stroke={GB.plum} strokeWidth={3} />
          </g>
          <g data-door="inner">
            <rect x={320} y={420} width={80} height={340} fill={GB.red} />
            <rect x={336} y={440} width={48} height={300} fill="none" stroke={GB.gold} strokeWidth={3} />
            <line x1={322} x2={322} y1={420} y2={760} stroke={GB.plum} strokeWidth={3} />
          </g>
        </g>
        <path d="M282 385 A38 38 0 0 1 358 385 Z" fill={GB.gold} />
        <line x1={320} x2={320} y1={385} y2={354} stroke={GB.plum} strokeWidth={4} />

        {/* Bench */}
        <rect x={60} y={700} width={120} height={16} fill={GB.red} />
        <rect x={70} y={716} width={10} height={44} fill={GB.gold} />
        <rect x={160} y={716} width={10} height={44} fill={GB.gold} />
      </Mirror>

      {/* Chandelier */}
      <line x1={C} x2={C} y1={138} y2={200} stroke={GB.plum} strokeWidth={4} />
      <rect x={C - 95} y={200} width={190} height={10} fill={GB.gold} />
      {[-80, -40, 0, 40, 80].map((dx) => (
        <g key={dx}>
          <rect x={C + dx - 5} y={176} width={10} height={24} fill={GB.blush} />
          <circle cx={C + dx} cy={172} r={5} fill={GB.gold} />
          <circle cx={C + dx} cy={224} r={6} fill={GB.gold} />
        </g>
      ))}
      <path d={`M${C - 40} 210 L${C + 40} 210 L${C} 250 Z`} fill={GB.gold} />

      <Floor />
      <Runner />
    </svg>
  );
}

export function Concierge() {
  const cols = 8;
  const rows = 4;
  // Empty hooks are mirrored pairs, so the wall stays symmetric.
  const empty = new Set(["1-2", "1-5", "3-0", "3-7", "0-3", "0-4"]);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      role="img"
      aria-label="A symmetrical concierge desk: a red counter with a brass bell, a wall of key cubbies behind it, and a clock above reading twelve."
    >
      <rect width={W} height={H} fill={GB.pink} />
      <Ceiling label="THE CONCIERGE" />

      {/* Clock at twelve: both hands on the axis */}
      <circle cx={C} cy={220} r={58} fill={GB.gold} />
      <circle cx={C} cy={220} r={47} fill={GB.blush} />
      {range(12).map((i) => {
        const a = (i / 12) * Math.PI * 2;
        const sx = Math.sin(a);
        const cy = Math.cos(a);
        return (
          <line
            key={i}
            x1={(C + sx * 38).toFixed(2)}
            y1={(220 - cy * 38).toFixed(2)}
            x2={(C + sx * 44).toFixed(2)}
            y2={(220 - cy * 44).toFixed(2)}
            stroke={GB.plum}
            strokeWidth={3}
          />
        );
      })}
      <line x1={C} x2={C} y1={220} y2={182} stroke={GB.plum} strokeWidth={4} />
      <line x1={C} x2={C} y1={220} y2={196} stroke={GB.plum} strokeWidth={8} />

      {/* Key cabinet */}
      <rect x={440} y={295} width={490} height={250} fill={GB.purple} />
      {range(rows).map((r) =>
        range(cols).map((c) => (
          <rect key={`${r}-${c}`} x={450 + c * 60} y={305 + r * 60} width={50} height={50} fill={GB.blush} />
        )),
      )}
      {/* Keys are hung one row at a time */}
      {range(rows).map((r) => (
        <g key={r} data-key-row={r}>
          {range(cols)
            .filter((c) => !empty.has(`${r}-${c}`))
            .map((c) => {
              const x = 450 + c * 60;
              const y = 305 + r * 60;
              return (
                <g key={c}>
                  <circle cx={x + 25} cy={y + 16} r={7} fill="none" stroke={GB.gold} strokeWidth={4} />
                  <rect x={x + 23} y={y + 22} width={4} height={18} fill={GB.gold} />
                </g>
              );
            })}
        </g>
      ))}

      <Mirror width={W}>
        {/* Archway */}
        <path d="M100 760 V430 A95 95 0 0 1 290 430 V760 Z" fill={GB.purple} />
        <path d="M125 760 V440 A70 70 0 0 1 265 440 V760 Z" fill={GB.plum} />
        <circle cx={360} cy={330} r={12} fill={GB.gold} />
        <rect x={354} y={342} width={12} height={20} fill={GB.gold} />
        {/* Desk lamp and the pool of light it switches on */}
        <path data-glow d="M424 525 L456 525 L500 590 L380 590 Z" fill={GB.blush} opacity={0} />
        <rect x={437} y={525} width={6} height={65} fill={GB.gold} />
        <path d="M405 525 L475 525 L458 488 L422 488 Z" fill={GB.blue} stroke={GB.gold} strokeWidth={3} />
      </Mirror>

      <Floor top={790} />
      <Runner top={790} far={80} near={150} />

      {/* Desk */}
      <rect x={355} y={590} width={660} height={22} fill={GB.plum} />
      <rect x={375} y={612} width={620} height={178} fill={GB.red} />
      <rect x={375} y={622} width={620} height={4} fill={GB.gold} />
      <rect x={375} y={776} width={620} height={4} fill={GB.gold} />
      <Mirror width={W}>
        <rect x={405} y={645} width={180} height={112} fill="none" stroke={GB.gold} strokeWidth={3} />
      </Mirror>
      <rect x={605} y={645} width={160} height={112} fill="none" stroke={GB.gold} strokeWidth={3} />
      <text x={C} y={708} textAnchor="middle" fontSize={17} letterSpacing={5} fill={GB.gold} style={display} fontWeight={600}>
        CONCIERGE
      </text>

      {/* Bell */}
      <rect x={C - 28} y={584} width={56} height={6} fill={GB.gold} />
      <path d={`M${C - 22} 584 A22 22 0 0 1 ${C + 22} 584 Z`} fill={GB.gold} />
      <circle cx={C} cy={558} r={5} fill={GB.gold} />
    </svg>
  );
}

export function Patisserie() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      role="img"
      aria-label="A symmetrical pastry shop: shelves of pink boxes tied with blue ribbon flank a glass counter and a three-tier cake, centered in a round window."
    >
      <rect width={W} height={H} fill={GB.blush} />
      {range(17).map((i) => (
        <rect key={i} x={C - 20 + (i - 8) * 80} y={138} width={40} height={622} fill={GB.pink} />
      ))}
      <Ceiling label="PÂTISSERIE" band={GB.purple} ink={GB.gold} />

      {/* Round window */}
      <circle cx={C} cy={360} r={146} fill={GB.gold} />
      <circle cx={C} cy={360} r={132} fill={GB.blue} />
      <line x1={C} x2={C} y1={228} y2={492} stroke={GB.gold} strokeWidth={6} />
      <line x1={C - 132} x2={C + 132} y1={360} y2={360} stroke={GB.gold} strokeWidth={6} />

      <Mirror width={W}>
        {/* Shelf unit with ribboned boxes */}
        <rect x={80} y={200} width={380} height={560} fill={GB.purple} />
        {[330, 480, 630].map((shelfY) => (
          <g key={shelfY}>
            <rect x={80} y={shelfY} width={380} height={10} fill={GB.gold} />
            {[105, 225, 345].map((bx) => (
              <g key={bx}>
                <rect x={bx} y={shelfY - 76} width={90} height={76} fill={GB.pink} stroke={GB.plum} strokeWidth={3} />
                <rect x={bx + 42} y={shelfY - 76} width={6} height={76} fill={GB.blue} />
                <rect x={bx} y={shelfY - 42} width={90} height={6} fill={GB.blue} />
                <circle cx={bx + 38} cy={shelfY - 80} r={7} fill={GB.blue} />
                <circle cx={bx + 52} cy={shelfY - 80} r={7} fill={GB.blue} />
              </g>
            ))}
          </g>
        ))}
        <rect x={80} y={200} width={380} height={12} fill={GB.gold} />
      </Mirror>

      <Floor top={800} />

      {/* Counter */}
      <rect x={465} y={612} width={440} height={14} fill={GB.gold} />
      <rect x={475} y={626} width={420} height={174} fill={GB.plum} />
      <rect x={495} y={646} width={380} height={120} fill={GB.blue} opacity={0.75} />
      {[-120, -60, 0, 60, 120].map((dx) => (
        <g key={dx}>
          <circle cx={C + dx} cy={735} r={20} fill={GB.pink} stroke={GB.plum} strokeWidth={2} />
          <circle cx={C + dx} cy={712} r={6} fill={GB.red} />
        </g>
      ))}

      {/* Cake on a stand, centered in the window */}
      <rect x={C - 8} y={592} width={16} height={20} fill={GB.gold} />
      <rect x={C - 140} y={584} width={280} height={8} fill={GB.gold} />
      {/* Tiers are lowered onto the stand from straight above, bottom first */}
      <g data-tier>
        <rect x={C - 120} y={512} width={240} height={72} fill={GB.pink} stroke={GB.plum} strokeWidth={3} />
        {range(7).map((i) => (
          <circle key={i} cx={C - 102 + i * 34} cy={584} r={10} fill={GB.blush} stroke={GB.plum} strokeWidth={2} />
        ))}
      </g>
      <g data-tier>
        <rect x={C - 85} y={452} width={170} height={60} fill={GB.blush} stroke={GB.plum} strokeWidth={3} />
      </g>
      <g data-tier>
        <rect x={C - 50} y={402} width={100} height={50} fill={GB.blue} stroke={GB.plum} strokeWidth={3} />
      </g>
      <g data-tier>
        <circle cx={C} cy={388} r={14} fill={GB.red} />
        <line x1={C} x2={C} y1={374} y2={354} stroke={GB.plum} strokeWidth={3} />
      </g>
    </svg>
  );
}
