import { useMemo } from 'react';
import Card from './Card';
import BarChart, { BarItem } from './BarChart';
import LineChart from './LineChart';
import DisneyQuote from './DisneyQuote';
import { useDailyChecks } from '../hooks/useDailyChecks';
import { useMeasurements } from '../hooks/useMeasurements';
import { mondayOf, weekDates, ymd } from '../lib/dates';
import { dayCompliance } from '../lib/compliance';
import { PLAN } from '../data/plan';
import { WeeklyMeasurement } from '../lib/supabase';

export default function TabProgreso() {
  const { map } = useDailyChecks();
  const { rows: meds } = useMeasurements();

  const weekItems: BarItem[] = useMemo(() => {
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

  const promedioPlan = (() => {
    const v = weekItems.map((x) => x.pct).filter((x): x is number => x !== null);
    if (!v.length) return null;
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  })();

  const semanasRegistradas = weekItems.filter((x) => x.pct !== null).length;
  const semanasOk = weekItems.filter((x) => (x.pct ?? 0) >= 80).length;

  const evol = (key: keyof WeeklyMeasurement, label: string) => (
    <Card title={label}>
      <LineChart
        points={meds.map((r) => ({
          x: r.week_number,
          y: (r[key] as number | null) ?? null,
          label: `S${r.week_number}`,
        }))}
        highlightX={[PLAN.goal1Week, PLAN.goal2Week]}
      />
    </Card>
  );

  return (
    <div>
      <Card title="Cumplimiento por semana">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: '#72243E',
            marginBottom: 10,
          }}
        >
          <span>{semanasRegistradas}/{PLAN.totalWeeks} semanas con datos</span>
          <span>{semanasOk} con 80%+</span>
          <span>
            Promedio: {promedioPlan === null ? '—' : `${promedioPlan}%`}
          </span>
        </div>
        <BarChart items={weekItems} />
      </Card>

      <Card title="Evolucion del peso">
        <LineChart
          points={meds.map((r) => ({
            x: r.week_number,
            y: r.peso ?? null,
            label: `S${r.week_number}`,
          }))}
          highlightX={[PLAN.goal1Week, PLAN.goal2Week]}
          yLabel="kg"
        />
      </Card>

      {evol('musculo', 'Evolucion masa muscular (kg)')}
      {evol('grasa', 'Evolucion grasa corporal (%)')}
      {evol('cintura', 'Evolucion cintura (cm)')}
      {evol('gluteo_medio', 'Evolucion gluteo prominente (cm)')}
      {evol('muslo_alto', 'Evolucion muslo alto (cm)')}
      {evol('muslo_bajo', 'Evolucion muslo bajo (cm)')}
      {evol('celulitis', 'Evolucion celulitis (1–5)')}

      <DisneyQuote />
    </div>
  );
}
