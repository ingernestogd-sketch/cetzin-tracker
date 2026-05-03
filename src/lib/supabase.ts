import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !key) {
  console.warn('Supabase env vars no definidas. Revisa .env.local');
}

export const supabase = createClient(url, key, {
  realtime: { params: { eventsPerSecond: 5 } },
});

export type DailyCheck = {
  id?: string;
  check_date: string;
  section: 'des' | 'eje' | 'spa' | 'noc';
  item_index: number;
  checked: boolean;
  updated_at?: string;
};

export type WeeklyMeasurement = {
  id?: string;
  week_number: number;
  peso: number | null;
  musculo: number | null;
  grasa: number | null;
  cintura: number | null;
  cadera_alta: number | null;
  gluteo_medio: number | null;
  gluteo_bajo: number | null;
  muslo_alto: number | null;
  muslo_medio: number | null;
  muslo_bajo: number | null;
  pantorrilla: number | null;
  sensacion_piernas: number | null;
  celulitis: number | null;
  notas: string | null;
  updated_at?: string;
};
