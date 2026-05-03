import { DAY_PLANS, SectionKey, totalItemsForDay } from '../data/plan';
import { DailyCheck } from './supabase';

// Mapa de checks: { 'YYYY-MM-DD': { 'des-0': true, 'eje-1': false, ... } }
export type ChecksMap = Record<string, Record<string, boolean>>;

export const checkKey = (section: SectionKey, idx: number) => `${section}-${idx}`;

export const buildChecksMap = (rows: DailyCheck[]): ChecksMap => {
  const m: ChecksMap = {};
  for (const r of rows) {
    if (!m[r.check_date]) m[r.check_date] = {};
    m[r.check_date][checkKey(r.section, r.item_index)] = !!r.checked;
  }
  return m;
};

export const dayHasAnyChecks = (map: ChecksMap, date: string): boolean => {
  const day = map[date];
  if (!day) return false;
  return Object.values(day).some(Boolean);
};

export const countCheckedDay = (
  map: ChecksMap,
  date: string,
  dayIdx: number
): number => {
  const day = map[date];
  if (!day) return 0;
  let n = 0;
  const plan = DAY_PLANS[dayIdx];
  (Object.keys(plan) as SectionKey[]).forEach((sec) => {
    plan[sec].forEach((_, i) => {
      if (day[checkKey(sec, i)]) n++;
    });
  });
  return n;
};

export const dayCompliance = (
  map: ChecksMap,
  date: string,
  dayIdx: number
): number => {
  const total = totalItemsForDay(dayIdx);
  if (total === 0) return 0;
  const done = countCheckedDay(map, date, dayIdx);
  return Math.round((done / total) * 100);
};

export const sectionCompliance = (
  map: ChecksMap,
  date: string,
  dayIdx: number,
  sec: SectionKey
): { done: number; total: number; pct: number } => {
  const items = DAY_PLANS[dayIdx][sec];
  const total = items.length;
  const day = map[date] || {};
  let done = 0;
  items.forEach((_, i) => {
    if (day[checkKey(sec, i)]) done++;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
};

// Verde ≥80, ambar ≥50, rosa <50 con datos, gris sin datos.
export const colorForChart = (
  pct: number | null
): string => {
  if (pct === null) return '#F4C0D1';
  if (pct >= 80) return '#3B6D11';
  if (pct >= 50) return '#BA7517';
  if (pct > 0) return '#D4537E';
  return '#F4C0D1';
};

// Rojo para badges (no rosa, mas contrastado).
export const colorForBadge = (pct: number): string => {
  if (pct >= 80) return '#3B6D11';
  if (pct >= 50) return '#BA7517';
  return '#A32D2D';
};
