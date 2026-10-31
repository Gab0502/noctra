import { seeded, type ElevationSpec } from "@/lib/volumes";

type Props = {
  spec: ElevationSpec;
  seed: number;
  lit?: number; // 0..1 share of windows lit
  className?: string;
  label: string;
};

// A frontal, symmetric elevation in flat tones: the cover drawing of a volume.
export default function Elevation({ spec, seed, lit = 0.5, className, label }: Props) {
  const rand = seeded(seed);
  const W = 400;
  const ground = 284;
  const floorH = 34;
  const bayW = Math.min(40, 300 / spec.bays);
  const width = bayW * spec.bays;
  const x0 = (W - width) / 2;
  const top = ground - spec.floors * floorH;
  const mid = Math.floor(spec.bays / 2);

  const windows: React.ReactNode[] = [];
  for (let f = 0; f < spec.floors; f++) {
    for (let b = 0; b < spec.bays; b++) {
      const isDoor = f === spec.floors - 1 && b === mid;
      const r = rand();
      if (isDoor) continue;
      const w = bayW * 0.42;
      const h = floorH * 0.56;
      const x = x0 + b * bayW + (bayW - w) / 2;
      const y = top + f * floorH + floorH * 0.22;
      const on = r < lit;
      const d = spec.arch
        ? `M${x} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}V${y + h}Z`
        : `M${x} ${y}h${w}v${h}h${-w}Z`;
      windows.push(
        <path
          key={`${f}-${b}`}
          d={d}
          fill={on ? "#ffe088" : "#131313"}
          opacity={on ? 0.55 + r * 0.45 : 1}
        />
      );
    }
  }

  const doorW = bayW * 0.62;
  const doorH = floorH * 0.86;
  const doorX = x0 + mid * bayW + (bayW - doorW) / 2;
  const doorY = ground - doorH;

  let roof: React.ReactNode = null;
  if (spec.roof === "flat") {
    roof = <rect x={x0 - 6} y={top - 10} width={width + 12} height={10} fill="#353535" />;
  } else if (spec.roof === "mansard") {
    roof = (
      <>
        <path d={`M${x0 - 4} ${top}L${x0 + 18} ${top - 40}H${x0 + width - 18}L${x0 + width + 4} ${top}Z`} fill="#353535" />
        {Array.from({ length: Math.max(1, spec.bays - 2) }).map((_, i) => (
          <rect key={i} x={x0 + (i + 1) * bayW + bayW * 0.32} y={top - 30} width={bayW * 0.36} height={16} fill={rand() < lit ? "#e9c349" : "#131313"} />
        ))}
      </>
    );
  } else if (spec.roof === "gable") {
    roof = <path d={`M${x0 - 8} ${top}L${W / 2} ${top - 70}L${x0 + width + 8} ${top}Z`} fill="#353535" />;
  } else {
    const rr = Math.min(width / 3, 70);
    roof = (
      <>
        <rect x={W / 2 - rr - 6} y={top - 14} width={(rr + 6) * 2} height={14} fill="#353535" />
        <path d={`M${W / 2 - rr} ${top - 14}A${rr} ${rr} 0 0 1 ${W / 2 + rr} ${top - 14}Z`} fill="#2a2a2a" />
      </>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} 300`} className={className} role="img" aria-label={label}>
      {roof}
      <rect x={x0} y={top} width={width} height={ground - top} fill="#2a2a2a" />
      {windows}
      <path
        d={`M${doorX} ${ground}V${doorY + doorW / 2}A${doorW / 2} ${doorW / 2} 0 0 1 ${doorX + doorW} ${doorY + doorW / 2}V${ground}Z`}
        fill="#e9c349"
        opacity={0.35 + lit * 0.65}
      />
      <rect x={0} y={ground} width={W} height={300 - ground} fill="#1b1b1b" />
    </svg>
  );
}
