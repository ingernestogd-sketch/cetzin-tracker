import { useEffect, useState, useCallback } from 'react';
import { supabase, DailyCheck } from '../lib/supabase';
import { buildChecksMap, ChecksMap, checkKey } from '../lib/compliance';
import { SectionKey } from '../data/plan';

export const useDailyChecks = () => {
  const [rows, setRows] = useState<DailyCheck[]>([]);
  const [map, setMap] = useState<ChecksMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('daily_checks')
      .select('*');
    if (error) {
      console.error('Error cargando daily_checks:', error);
      setLoading(false);
      return;
    }
    const list = (data || []) as DailyCheck[];
    setRows(list);
    setMap(buildChecksMap(list));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const ch = supabase
      .channel('daily_checks_rt')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'daily_checks' },
        () => refresh()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [refresh]);

  const toggle = useCallback(
    async (date: string, section: SectionKey, idx: number, value: boolean) => {
      const k = checkKey(section, idx);
      setMap((prev) => {
        const next = { ...prev };
        if (!next[date]) next[date] = {};
        next[date] = { ...next[date], [k]: value };
        return next;
      });
      const { error } = await supabase
        .from('daily_checks')
        .upsert(
          {
            check_date: date,
            section,
            item_index: idx,
            checked: value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'check_date,section,item_index' }
        );
      if (error) {
        console.error('Error guardando check:', error);
        await refresh();
      }
    },
    [refresh]
  );

  return { rows, map, loading, toggle, refresh };
};
