type Point = { x: number; y: number | null; label?: string };

export default function LineChart({
  points,
  yLabel,
  highlightX,
  height = 140,
}: {
  points: Point[];
  yLabel?: string;
  highlightX?: number[];
  height?: number;
}) {
  const valid = points.filter((p) => p.y !== null) as { x: number; y: number; label?: string }[];
  if (valid.length === 0) {
    return (
      <div
        style={{
          fontSize: 12,
          color: '#72243E',
          padding: 14,
          textAlign: 'center',
          background: '#FBEAF0',
          borderRadius: 12,
        }}
      >
        Aun sin mediciones. Captura tu primera semana.
      </div>
    );
  }

  const ys = valid.map((p) => p.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeY = maxY - minY || 1;
  const xs = points.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const rangeX = maxX - minX || 1;

  const W = 320;
  const H = height;
  const padL = 30;
  const padR = 10;
  const padT = 14;
  const padB = 22;

  const sx = (x: number) => padL + ((x - minX) / rangeX) * (W - padL - padR);
  const sy = (y: number) =>
    padT + (1 - (y - minY) / rangeY) * (H - padT - padB);

  const line = valid
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height }}>
      <line
        x1={padL}
        y1={padT}
        x2={padL}
        y2={H - padB}
        stroke="#F4C0D1"
        strokeWidth={1}
      />
      <line
        x1={padL}
        y1={H - padB}
        x2={W - padR}
        y2={H - padB}
        stroke="#F4C0D1"
        strokeWidth={1}
      />
      <text x={4} y={padT + 4} fontSize={9} fill="#72243E">
        {maxY.toFixed(1)}
      </text>
      <text x={4} y={H - padB} fontSize={9} fill="#72243E">
        {minY.toFixed(1)}
      </text>
      {yLabel && (
        <text x={4} y={H / 2} fontSize={9} fill="#4B1528" fontWeight={500}>
          {yLabel}
        </text>
      )}
      {highlightX?.map((wk) => (
        <line
          key={wk}
          x1={sx(wk)}
          y1={padT}
          x2={sx(wk)}
          y2={H - padB}
          stroke="#EF9F27"
          strokeWidth={1.2}
          strokeDasharray="3 3"
          opacity={0.7}
        />
      ))}
      <path d={line} stroke="#D4537E" strokeWidth={2} fill="none" />
      {valid.map((p, i) => (
        <circle
          key={i}
          cx={sx(p.x)}
          cy={sy(p.y)}
          r={3}
          fill="#D4537E"
          stroke="#fff"
          strokeWidth={1.2}
        />
      ))}
      {points.map((p) => (
        <text
          key={`l-${p.x}`}
          x={sx(p.x)}
          y={H - padB + 12}
          fontSize={8}
          fill="#72243E"
          textAnchor="middle"
        >
          {p.label ?? p.x}
        </text>
      ))}
    </svg>
  );
}
