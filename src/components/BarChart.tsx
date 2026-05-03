import { colorForChart } from '../lib/compliance';

export type BarItem = {
  label: string;
  pct: number | null;
  highlight?: boolean;
  sublabel?: string;
};

export default function BarChart({
  items,
  maxVisible,
  emptyMessage = 'Aun sin datos. Marca items para empezar a ver tu progreso.',
}: {
  items: BarItem[];
  maxVisible?: number;
  emptyMessage?: string;
}) {
  const list = maxVisible ? items.slice(-maxVisible) : items;
  const hasAny = items.some((i) => i.pct !== null);

  if (!hasAny) {
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
        {emptyMessage}
      </div>
    );
  }

  const barMax = 110;
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        alignItems: 'flex-end',
        height: barMax + 24,
        overflowX: 'auto',
      }}
      className="no-scrollbar"
    >
      {list.map((it, idx) => {
        const pct = it.pct === null ? 0 : it.pct;
        const h = it.pct === null ? 4 : Math.max(4, (pct / 100) * barMax);
        const color = colorForChart(it.pct);
        return (
          <div
            key={idx}
            style={{
              flex: '1 0 28px',
              minWidth: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: '#4B1528',
                marginBottom: 2,
                fontWeight: 500,
              }}
            >
              {it.pct === null ? '—' : `${it.pct}%`}
            </div>
            <div
              style={{
                width: '100%',
                height: barMax,
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: h,
                  background: color,
                  borderRadius: 6,
                  border: it.highlight ? '2px solid #EF9F27' : 'none',
                  transition: 'height 0.3s ease',
                }}
              />
            </div>
            <div
              style={{
                fontSize: 10,
                color: it.highlight ? '#EF9F27' : '#72243E',
                marginTop: 4,
                fontWeight: it.highlight ? 500 : 400,
                textAlign: 'center',
              }}
            >
              {it.label}
            </div>
            {it.sublabel && (
              <div
                style={{
                  fontSize: 9,
                  color: '#72243E',
                  textAlign: 'center',
                }}
              >
                {it.sublabel}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
