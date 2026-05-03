import { useEffect, useState } from 'react';
import Card from './Card';
import { useMeasurements } from '../hooks/useMeasurements';
import { MEASUREMENT_FIELDS, PLAN } from '../data/plan';
import { dateForWeek, weekNumberFor, today, formatNiceDate } from '../lib/dates';
import { WeeklyMeasurement } from '../lib/supabase';

export default function TabMediciones() {
  const { rows, getByWeek, upsert } = useMeasurements();
  const t = today();
  const currentWeek = Math.max(1, weekNumberFor(t));
  const [week, setWeek] = useState<number>(Math.min(currentWeek, PLAN.totalWeeks));
  const [draft, setDraft] = useState<Partial<WeeklyMeasurement>>({});

  const existing = getByWeek(week);
  const isFutureBlocked = week > currentWeek + 1;

  useEffect(() => {
    setDraft(existing ? { ...existing } : {});
  }, [week, existing?.id, rows.length]);

  const setField = (
    key: keyof WeeklyMeasurement,
    raw: string
  ) => {
    if (key === 'notas') {
      setDraft((p) => ({ ...p, notas: raw }));
      return;
    }
    if (raw === '') {
      setDraft((p) => ({ ...p, [key]: null }));
      return;
    }
    const n = parseFloat(raw);
    if (Number.isNaN(n)) return;
    setDraft((p) => ({ ...p, [key]: n }));
  };

  const save = async () => {
    if (isFutureBlocked) return;
    await upsert(week, { ...draft, week_number: week });
  };

  const groups = [
    { id: 'bascula', label: 'Bascula de composicion corporal' },
    { id: 'cinta', label: 'Cinta metrica' },
    { id: 'subjetiva', label: 'Evaluacion subjetiva (1–5)' },
  ] as const;

  const weekDate = dateForWeek(week);

  const tagForWeek =
    week === PLAN.goal1Week
      ? { label: 'Fotos', color: '#EF9F27' }
      : week === PLAN.goal2Week
      ? { label: 'Vacaciones', color: '#D4537E' }
      : null;

  return (
    <div>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#72243E', letterSpacing: 1 }}>
              MEDICIONES
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#4B1528',
                marginTop: 2,
              }}
            >
              Semana {week}
              {tagForWeek && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 10,
                    fontWeight: 500,
                    color: tagForWeek.color,
                    background: '#FBEAF0',
                    border: `1.5px solid ${tagForWeek.color}`,
                    borderRadius: 10,
                    padding: '2px 8px',
                    letterSpacing: 1,
                  }}
                >
                  ★ {tagForWeek.label}
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#72243E',
                marginTop: 2,
                textTransform: 'capitalize',
              }}
            >
              Lunes {formatNiceDate(weekDate).replace(/^lunes,?\s*/i, '')}
            </div>
          </div>
        </div>

        {/* Selector de semana */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
          className="no-scrollbar"
        >
          {Array.from({ length: PLAN.totalWeeks }, (_, i) => i + 1).map((w) => {
            const sel = w === week;
            const past = w <= currentWeek;
            const isGoal = w === PLAN.goal1Week || w === PLAN.goal2Week;
            return (
              <button
                key={w}
                onClick={() => setWeek(w)}
                style={{
                  flex: '0 0 auto',
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  border: isGoal
                    ? '2px solid #EF9F27'
                    : '1.5px solid #ED93B1',
                  background: sel ? '#D4537E' : past ? '#FBEAF0' : '#FFFFFF',
                  color: sel ? '#FFFFFF' : '#4B1528',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                title={
                  w === PLAN.goal1Week
                    ? PLAN.goal1Name
                    : w === PLAN.goal2Week
                    ? PLAN.goal2Name
                    : `Semana ${w}`
                }
              >
                {w}
              </button>
            );
          })}
        </div>

        {isFutureBlocked && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              background: '#FBEAF0',
              fontSize: 11,
              color: '#72243E',
            }}
          >
            Esta semana esta muy adelantada. Solo puedes registrar la actual y la
            siguiente.
          </div>
        )}
      </Card>

      {groups.map((g) => (
        <Card key={g.id} title={g.label}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MEASUREMENT_FIELDS.filter((f) => f.group === g.id).map((f) => (
              <div
                key={f.key as string}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 110px',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: '#4B1528', fontWeight: 500 }}>
                    {f.label}
                  </div>
                  {f.note && (
                    <div style={{ fontSize: 10, color: '#72243E', marginTop: 1 }}>
                      {f.note}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    border: '1.5px solid #F4C0D1',
                    borderRadius: 10,
                    padding: '4px 8px',
                    background: '#FFF0F5',
                  }}
                >
                  <input
                    type="number"
                    step={f.step ?? 0.1}
                    min={f.min}
                    max={f.max}
                    disabled={isFutureBlocked}
                    value={
                      (draft[f.key] as number | null | undefined) === null ||
                      (draft[f.key] as number | null | undefined) === undefined
                        ? ''
                        : String(draft[f.key])
                    }
                    onChange={(e) => setField(f.key, e.target.value)}
                    onBlur={save}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      color: '#4B1528',
                      fontSize: 14,
                      outline: 'none',
                      textAlign: 'right',
                    }}
                    placeholder="—"
                  />
                  <span style={{ fontSize: 11, color: '#72243E' }}>{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card title="Notas">
        <textarea
          disabled={isFutureBlocked}
          value={(draft.notas as string) ?? ''}
          onChange={(e) => setField('notas', e.target.value)}
          onBlur={save}
          rows={3}
          placeholder="Como te sentiste esta semana, que probaste nuevo, que ajustar..."
          style={{
            width: '100%',
            border: '1.5px solid #F4C0D1',
            borderRadius: 10,
            padding: 8,
            fontSize: 13,
            background: '#FFF0F5',
            color: '#4B1528',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={save}
          disabled={isFutureBlocked}
          style={{
            marginTop: 10,
            width: '100%',
            padding: '10px 14px',
            borderRadius: 12,
            background: isFutureBlocked ? '#ED93B1' : '#D4537E',
            color: '#fff',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            cursor: isFutureBlocked ? 'not-allowed' : 'pointer',
          }}
        >
          Guardar semana {week}
        </button>
      </Card>
    </div>
  );
}
