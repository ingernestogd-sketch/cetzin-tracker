import { useState } from 'react';
import Card from './Card';
import DisneyQuote from './DisneyQuote';
import { useDailyChecks } from '../hooks/useDailyChecks';
import {
  DAYS,
  SECTIONS,
  SectionKey,
  DAY_PLANS,
} from '../data/plan';
import {
  today,
  ymd,
  mondayOf,
  weekDates,
  todayYmd,
  formatNiceDate,
} from '../lib/dates';
import { sectionCompliance, dayCompliance, colorForBadge } from '../lib/compliance';

export default function TabRutina({
  initialDayIdx,
}: {
  initialDayIdx?: number;
}) {
  const t = today();
  const tw = t.getDay();
  const isWeekday = tw >= 1 && tw <= 5;
  const fallback = initialDayIdx ?? (isWeekday ? tw - 1 : 0);
  const [dayIdx, setDayIdx] = useState<number>(fallback);
  const [section, setSection] = useState<SectionKey>('man');
  const { map, toggle } = useDailyChecks();

  const monday = mondayOf(t);
  const dates = weekDates(monday);
  const dateForSelected = dates[dayIdx];
  const dateStr = ymd(dateForSelected);
  const ty = todayYmd();

  const items = DAY_PLANS[dayIdx][section];
  const dayMap = map[dateStr] || {};
  const dayPct = dayCompliance(map, dateStr, dayIdx);

  return (
    <div>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#72243E', letterSpacing: 1 }}>
              RUTINA
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#4B1528',
                textTransform: 'capitalize',
              }}
            >
              {formatNiceDate(dateForSelected)}
            </div>
          </div>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: colorForBadge(dayPct),
              }}
            >
              {dayPct}%
            </div>
            <div style={{ fontSize: 10, color: '#72243E' }}>del dia</div>
          </div>
        </div>

        {/* Pills de dias */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
          className="no-scrollbar"
        >
          {DAYS.map((d) => {
            const sel = d.idx === dayIdx;
            const isToday = ymd(dates[d.idx]) === ty;
            return (
              <button
                key={d.idx}
                onClick={() => setDayIdx(d.idx)}
                style={{
                  padding: '7px 13px',
                  borderRadius: 18,
                  fontSize: 12,
                  fontWeight: 500,
                  border: isToday && !sel ? '2px double #4B1528' : '1.5px solid #ED93B1',
                  background: sel ? '#D4537E' : isToday ? '#FBEAF0' : '#FFFFFF',
                  color: sel ? '#FFFFFF' : '#4B1528',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto',
                }}
              >
                {d.long}
              </button>
            );
          })}
        </div>

        {/* Botones de seccion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            marginTop: 10,
          }}
        >
          {SECTIONS.map((s) => {
            const sel = s.key === section;
            const c = sectionCompliance(map, dateStr, dayIdx, s.key);
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1.5px solid #ED93B1',
                  background: sel ? '#D4537E' : '#FFFFFF',
                  color: sel ? '#FFFFFF' : '#4B1528',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</div>
                <div
                  style={{
                    fontSize: 10,
                    marginTop: 2,
                    opacity: 0.85,
                  }}
                >
                  {c.done}/{c.total}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card title={SECTIONS.find((s) => s.key === section)!.label}>
        {items.length === 0 ? (
          <div style={{ fontSize: 12, color: '#72243E' }}>Sin items.</div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((label, i) => {
              const k = `${section}-${i}`;
              const checked = !!dayMap[k];
              return (
                <li key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => toggle(dateStr, section, i, !checked)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: 10,
                      borderRadius: 12,
                      border: '1.5px solid #F4C0D1',
                      background: checked ? '#FBEAF0' : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '2px solid #D4537E',
                        background: checked ? '#D4537E' : 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '0 0 auto',
                        marginTop: 1,
                      }}
                    >
                      {checked && (
                        <svg width="11" height="11" viewBox="0 0 12 12">
                          <path
                            d="M2 6 L5 9 L10 3"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: '#4B1528',
                        textDecoration: checked ? 'line-through' : 'none',
                        opacity: checked ? 0.7 : 1,
                        lineHeight: 1.45,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <DisneyQuote />
    </div>
  );
}
