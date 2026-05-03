-- Cetzin Ha Tracker 2026 — Esquema Supabase
-- Pegar y correr en SQL Editor de Supabase

-- Checklists diarios (guardados por fecha real del calendario)
CREATE TABLE IF NOT EXISTS daily_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  check_date DATE NOT NULL,
  section TEXT NOT NULL,
  item_index INTEGER NOT NULL,
  checked BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(check_date, section, item_index)
);

-- Mediciones semanales
CREATE TABLE IF NOT EXISTS weekly_measurements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  week_number INTEGER NOT NULL UNIQUE,
  peso NUMERIC(5,2),
  musculo NUMERIC(5,2),
  grasa NUMERIC(5,2),
  cintura NUMERIC(5,2),
  cadera_alta NUMERIC(5,2),
  gluteo_medio NUMERIC(5,2),
  gluteo_bajo NUMERIC(5,2),
  muslo_alto NUMERIC(5,2),
  muslo_medio NUMERIC(5,2),
  muslo_bajo NUMERIC(5,2),
  pantorrilla NUMERIC(5,2),
  sensacion_piernas NUMERIC(3,1),
  celulitis NUMERIC(3,1),
  notas TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (acceso publico compartido)
ALTER TABLE daily_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_measurements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_all_checks" ON daily_checks;
DROP POLICY IF EXISTS "public_all_meds" ON weekly_measurements;

CREATE POLICY "public_all_checks" ON daily_checks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all_meds" ON weekly_measurements FOR ALL USING (true) WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE daily_checks;
ALTER PUBLICATION supabase_realtime ADD TABLE weekly_measurements;
