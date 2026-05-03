import { PLAN } from '../data/plan';

const MS_DAY = 86400000;

export const ymd = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const today = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};

export const todayYmd = () => ymd(today());

// Lunes (idx 0) ... Viernes (idx 4). Saturday/Sunday => null.
export const dayIndexFromDate = (d: Date): number | null => {
  const w = d.getDay(); // 0 Sun .. 6 Sat
  if (w === 0 || w === 6) return null;
  return w - 1;
};

export const mondayOf = (d: Date): Date => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  const w = dt.getDay();
  const diff = w === 0 ? -6 : 1 - w; // mover a lunes
  dt.setDate(dt.getDate() + diff);
  return dt;
};

export const weekDates = (monday: Date): Date[] => {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export const weekNumberFor = (d: Date): number => {
  const start = mondayOf(PLAN.startDate);
  const m = mondayOf(d);
  const diff = Math.round((m.getTime() - start.getTime()) / MS_DAY / 7);
  return diff + 1; // semana 1 = startDate
};

export const dateForWeek = (weekNumber: number): Date => {
  const start = mondayOf(PLAN.startDate);
  const d = new Date(start);
  d.setDate(start.getDate() + (weekNumber - 1) * 7);
  return d;
};

export const formatNiceDate = (d: Date): string => {
  return d.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export const daysBetween = (a: Date, b: Date): number => {
  const aa = new Date(a); aa.setHours(0, 0, 0, 0);
  const bb = new Date(b); bb.setHours(0, 0, 0, 0);
  return Math.round((bb.getTime() - aa.getTime()) / MS_DAY);
};

export const monthLabel = (d: Date): string => {
  return d.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
};
