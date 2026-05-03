import { MickeyEars, DonaldHat, HatterHat } from './DisneyDecorations';

export type Tab = 'inicio' | 'rutina' | 'mediciones' | 'progreso';

const TABS: { key: Tab; label: string }[] = [
  { key: 'inicio', label: 'Inicio' },
  { key: 'rutina', label: 'Rutina' },
  { key: 'mediciones', label: 'Mediciones' },
  { key: 'progreso', label: 'Progreso' },
];

export default function Header({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <header
      style={{
        background: '#F4C0D1',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        paddingTop: 22,
        paddingBottom: 8,
        borderBottom: '1.5px solid #ED93B1',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
        <MickeyEars />
        <DonaldHat />
        <HatterHat />
        <div style={{ textAlign: 'center', padding: '6px 60px 4px' }}>
          <h1
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: '#4B1528',
              margin: 0,
              letterSpacing: 0.4,
            }}
          >
            Cetzin Ha Tracker
          </h1>
          <div
            style={{
              fontSize: 10,
              color: '#72243E',
              letterSpacing: 1.2,
              marginTop: 1,
            }}
          >
            ★ 2026 ★
          </div>
        </div>
        <nav
          style={{
            display: 'flex',
            gap: 6,
            padding: '8px 12px 0',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {TABS.map((t) => {
            const sel = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  border: '1.5px solid #ED93B1',
                  background: sel ? '#D4537E' : '#FFFFFF',
                  color: sel ? '#FFFFFF' : '#4B1528',
                  cursor: 'pointer',
                  transition: 'all .15s ease',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
