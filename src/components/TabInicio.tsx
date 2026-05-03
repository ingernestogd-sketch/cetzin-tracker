import { useMemo } from 'react';
import Card from './Card';
import BarChart, { BarItem } from './BarChart';
import DisneyQuote from './DisneyQuote';
import { useDailyChecks } from '../hooks/useDailyChecks';
import { useMeasurements } from '../hooks/useMeasurements';
import {
  todayYmd,
  today,
  dayIndexFromDate,
  mondayOf,
  weekDates,
  ymd,
  weekNumberFor,
  daysBetween,
} from '../lib/dates';
import { dayCompliance, colorForBadge } from '../lib/compliance';
import { DAYS, PLAN } from '../data/plan';

export default function TabInicio({
  onGoRutina,
}: {
  onGoRutina: () => void;
}) {
  const { map } = useDailyChecks();
  const { rows: meds } = useMeasurements();

  const t = today();
  const ty = todayYmd();
  const dIdx = dayIndexFromDate(t);

  // Hoy
  const hoyPct = dIdx === null ? null : dayCompliance(map, ty, dIdx);

  // Semana actual
  const weekStart = mondayOf(t);
  const wkDates = weekDates(weekStart);
  const semanaItems: BarItem[] = wkDates.map((d, i) => {
    const ds = ymd(d);
    const pct = dayCompliance(map, ds, i);
    const hasData = !!map[ds] && Object.values(map[ds]).some(Boolean);
    return {
      label: DAYS[i].short,
      pct: hasData ? pct : null,
      highlight: ymd(d) === ty,
    };
  });

  // Mes actual: agrupar por semana del mes (lunes en el mes)
  const mesItems: BarItem[] = useMemo(() => {
    const y = t.getFullYear();
    const m = t.getMonth();
    const first = new Date(y, m, 1);
    const startMon = mondayOf(first);
    const items: BarItem[] = [];
    let cur = new Date(startMon);
    let wkLabel = 1;
    while (cur.getMonth() === m || (cur.getMonth() < m && cur.getFullYear() <= y)) {
      // Tomamos lunes que caigan dentro del mes
      if (cur.getMonth() === m) {
        const dates = weekDates(cur);
        const vals = dates
          .map((d, i) => {
            const ds = ymd(d);
            return map[ds] && Object.values(map[ds]).some(Boolean)
              ? dayCompliance(map, ds, i)
              : null;
          })
          .filter((v): v is number => v !== null);
        const avg = vals.length
          ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
          : null;
        items.push({ label: `S${wkLabel}`, pct: avg });
        wkLabel++;
      }
      cur = new Date(cur);
      cur.setDate(cur.getDate() + 7);
      if (items.length > 6) break;
    }
    return items;
  }, [map, t]);

  const promMensual = (() => {
    const v = mesItems.map((x) => x.pct).filter((x): x is number => x !== null);
    if (!v.length) return null;
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  })();

  // Progreso total del plan
  const totalItems: BarItem[] = useMemo(() => {
    const out: BarItem[] = [];
    for (let w = 1; w <= PLAN.totalWeeks; w++) {
      const monday = new Date(mondayOf(PLAN.startDate));
      monday.setDate(monday.getDate() + (w - 1) * 7);
      const dates = weekDates(monday);
      const vals = dates
        .map((d, i) => {
          const ds = ymd(d);
          return map[ds] && Object.values(map[ds]).some(Boolean)
            ? dayCompliance(map, ds, i)
            : null;
        })
        .filter((v): v is number => v !== null);
      const avg = vals.length
        ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
        : null;
      out.push({
        label: `${w}`,
        pct: avg,
        highlight: w === PLAN.goal1Week || w === PLAN.goal2Week,
      });
    }
    return out;
  }, [map]);

  const promTotal = (() => {
    const v = totalItems.map((x) => x.pct).filter((x): x is number => x !== null);
    if (!v.length) return null;
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  })();

  // Objetivos: contador
  const wkNow = weekNumberFor(t);
  const daysToG1 = daysBetween(t, PLAN.goal1Date);
  const daysToG2 = daysBetween(t, PLAN.goal2Date);
  const wksToG1 = Math.max(0, PLAN.goal1Week - wkNow);
  const wksToG2 = Math.max(0, PLAN.goal2Week - wkNow);

  // Ultimas medidas: peso, masa muscular, gluteo, cintura
  const ultimaMed = useMemo(() => {
    const conPeso = meds.filter((r) => r.peso != null).pop();
    const conMusc = meds.filter((r) => r.musculo != null).pop();
    const conGluteo = meds.filter((r) => r.gluteo_medio != null).pop();
    const conCintura = meds.filter((r) => r.cintura != null).pop();
    return {
      peso: conPeso?.peso ?? null,
      musculo: conMusc?.musculo ?? null,
      gluteo: conGluteo?.gluteo_medio ?? null,
      cintura: conCintura?.cintura ?? null,
      pesoSemana: conPeso?.week_number ?? null,
      muscSemana: conMusc?.week_number ?? null,
      gluSemana: conGluteo?.week_number ?? null,
      cinSemana: conCintura?.week_number ?? null,
    };
  }, [meds]);

  return (
    <div>
      {/* Hoy */}
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#72243E', letterSpacing: 1 }}>
              HOY
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: '#4B1528',
                marginTop: 2,
                textTransform: 'capitalize',
              }}
            >
              {t.toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {dIdx === null ? (
              <div
                style={{
                  fontSize: 11,
                  color: '#72243E',
                  background: '#FBEAF0',
                  padding: '6px 10px',
                  borderRadius: 12,
                }}
              >
                Dia de descanso
              </div>
            ) : (
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: colorForBadge(hoyPct ?? 0),
                  }}
                >
                  {hoyPct ?? 0}%
                </div>
                <div style={{ fontSize: 10, color: '#72243E' }}>
                  completado
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onGoRutina}
          style={{
            marginTop: 12,
            width: '100%',
            padding: '10px 14px',
            borderRadius: 12,
            background: '#D4537E',
            color: '#fff',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Ver rutina de hoy
        </button>
      </Card>

      {/* Exito esta semana */}
      <Card title="Exito esta semana" subtitle="Lu / Ma / Mi / Ju / Vi">
        <BarChart items={semanaItems} />
      </Card>

      {/* Exito este mes */}
      <Card
        title="Exito este mes"
        subtitle={
          promMensual !== null
            ? `Promedio mensual: ${promMensual}%`
            : 'Sin datos del mes aun'
        }
      >
        <BarChart items={mesItems} />
      </Card>

      {/* Progreso total del plan */}
      <Card
        title="Progreso total del plan"
        subtitle={
          promTotal !== null
            ? `Promedio general: ${promTotal}% — semanas marcadas: 22 (Fotos), 27 (Vacaciones)`
            : 'Aun sin semanas registradas'
        }
      >
        <BarChart items={totalItems} maxVisible={12} />
      </Card>

      {/* Objetivos */}
      <Card title="Objetivos">
        <ObjetivoRow
          name={PLAN.goal1Name}
          tag="Semana 22"
          weeks={wksToG1}
          days={Math.max(0, daysToG1)}
          progress={Math.min(1, wkNow / PLAN.goal1Week)}
        />
        <ObjetivoRow
          name={PLAN.goal2Name}
          tag="Semana 27"
          weeks={wksToG2}
          days={Math.max(0, daysToG2)}
          progress={Math.min(1, wkNow / PLAN.goal2Week)}
        />
      </Card>

      {/* Ultimas medidas */}
      <Card title="Ultimas medidas">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          <MetricBox
            label="Peso"
            value={ultimaMed.peso}
            unit="kg"
            week={ultimaMed.pesoSemana}
          />
          <MetricBox
            label="Masa muscular"
            value={ultimaMed.musculo}
            unit="kg"
            week={ultimaMed.muscSemana}
          />
          <MetricBox
            label="Gluteo"
            value={ultimaMed.gluteo}
            unit="cm"
            week={ultimaMed.gluSemana}
          />
          <MetricBox
            label="Cintura"
            value={ultimaMed.cintura}
            unit="cm"
            week={ultimaMed.cinSemana}
          />
        </div>
      </Card>

      {/* Recordatorio entrenadora */}
      <Card title="Recordatorio entrenadora">
        <div style={{ fontSize: 12, color: '#4B1528', lineHeight: 1.55 }}>
          Toma estas medidas cada lunes en la manana, en ayunas y siempre en el
          mismo punto:
          <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
            <li>Peso, masa muscular, grasa corporal</li>
            <li>Cintura, cadera alta, gluteo prominente y bajo</li>
            <li>Muslo alto, medio y bajo (5cm arriba de rodilla)</li>
            <li>Pantorrilla</li>
            <li>Sensacion de piernas y celulitis (1–5)</li>
          </ul>
        </div>
      </Card>

      <DisneyQuote />
    </div>
  );
}

function ObjetivoRow({
  name,
  tag,
  weeks,
  days,
  progress,
}: {
  name: string;
  tag: string;
  weeks: number;
  days: number;
  progress: number;
}) {
  return (
    <div
      style={{
        background: '#FBEAF0',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 500, color: '#4B1528' }}>
          {name}
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#EF9F27',
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          ★ {tag}
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#72243E', marginTop: 4 }}>
        Faltan {weeks} {weeks === 1 ? 'semana' : 'semanas'} ({days}{' '}
        {days === 1 ? 'dia' : 'dias'})
      </div>
      <div
        style={{
          marginTop: 8,
          height: 6,
          background: '#F4C0D1',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.round(progress * 100)}%`,
            height: '100%',
            background: '#D4537E',
            transition: 'width .3s ease',
          }}
        />
      </div>
    </div>
  );
}

function MetricBox({
  label,
  value,
  unit,
  week,
}: {
  label: string;
  value: number | null;
  unit: string;
  week: number | null;
}) {
  return (
    <div
      style={{
        background: '#FBEAF0',
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ fontSize: 10, color: '#72243E' }}>{label}</div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: '#4B1528',
          marginTop: 2,
        }}
      >
        {value === null ? '—' : `${value} ${unit}`}
      </div>
      <div style={{ fontSize: 10, color: '#72243E' }}>
        {week ? `Semana ${week}` : 'Sin registro'}
      </div>
    </div>
  );
}
