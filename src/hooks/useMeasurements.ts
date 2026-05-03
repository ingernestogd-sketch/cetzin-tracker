import { useEffect, useState, useCallback } from 'react';
import { supabase, WeeklyMeasurement } from '../lib/supabase';

export const useMeasurements = () => {
  const [rows, setRows] = useState<WeeklyMeasurement[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('weekly_measurements')
      .select('*')
      .order('week_number', { ascending: true });
    if (error) {
      console.error('Error cargando weekly_measurements:', error);
      setLoading(false);
      return;
    }
    setRows((data || []) as WeeklyMeasurement[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const ch = supabase
      .channel('weekly_measurements_rt')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'weekly_measurements' },
        () => refresh()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [refresh]);

  const upsert = useCallback(
    async (week: number, patch: Partial<WeeklyMeasurement>) => {
      const existing = rows.find((r) => r.week_number === week);
      const payload = {
        week_number: week,
        ...(existing || {}),
        ...patch,
        updated_at: new Date().toISOString(),
      };
      delete (payload as { id?: string }).id;
      const { error } = await supabase
        .from('weekly_measurements')
        .upsert(payload, { onConflict: 'week_number' });
      if (error) console.error('Error guardando medicion:', error);
    },
    [rows]
  );

  const getByWeek = useCallback(
    (week: number) => rows.find((r) => r.week_number === week),
    [rows]
  );

  return { rows, loading, upsert, refresh, getByWeek };
};
