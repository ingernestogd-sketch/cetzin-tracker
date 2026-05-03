import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient;

if (isSupabaseConfigured) {
  client = createClient(url, key, {
    realtime: { params: { eventsPerSecond: 5 } },
  });
} else {
  console.error(
    '[Cetzin Tracker] Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. ' +
      'Configurelas en Vercel y vuelve a hacer redeploy.'
  );
  // Cliente "muerto" que no rompe el render. Cada llamada devuelve un error suave.
  const noopError = { message: 'Supabase no configurado en este entorno' };
  const fakeChannel = {
    on() { return this; },
    subscribe() { return this; },
    unsubscribe() { return Promise.resolve('ok'); },
  };
  client = {
    from() {
      return {
        select: async () => ({ data: [], error: noopError }),
        upsert: async () => ({ data: null, error: noopError }),
        insert: async () => ({ data: null, error: noopError }),
        update: async () => ({ data: null, error: noopError }),
        delete: async () => ({ data: null, error: noopError }),
        order() { return this; },
        eq() { return this; },
      };
    },
    channel() { return fakeChannel; },
    removeChannel() { return Promise.resolve('ok'); },
  } as unknown as SupabaseClient;
}

export const supabase = client;

export type DailyCheck = {
  id?: string;
  check_date: string;
  section: 'man' | 'eje' | 'spa' | 'noc';
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
