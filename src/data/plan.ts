export const PLAN = {
  startDate: new Date('2026-05-04T00:00:00'),
  goal1Date: new Date('2026-09-28T00:00:00'),
  goal2Date: new Date('2026-11-02T00:00:00'),
  goal1Name: 'Sesion de fotos sexys',
  goal2Name: 'Vacaciones sexys',
  goal1ShortName: 'Fotos',
  goal2ShortName: 'Vacaciones',
  goal1Week: 22,
  goal2Week: 27,
  totalWeeks: 30,
};

export const DAYS = [
  { idx: 0, key: 'lun', short: 'Lu', long: 'Lunes' },
  { idx: 1, key: 'mar', short: 'Ma', long: 'Martes' },
  { idx: 2, key: 'mie', short: 'Mi', long: 'Miercoles' },
  { idx: 3, key: 'jue', short: 'Ju', long: 'Jueves' },
  { idx: 4, key: 'vie', short: 'Vi', long: 'Viernes' },
];

export type SectionKey = 'des' | 'eje' | 'spa' | 'noc';

export const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'des', label: 'Desayunos' },
  { key: 'eje', label: 'Ejercicio' },
  { key: 'spa', label: 'SPA' },
  { key: 'noc', label: 'Ritual noche' },
];

const DESAYUNOS_LARGO = [
  'Desayuno rapido 7am: yogurt coco + fruta (mientras haces el lunch)',
  'Pre-entreno 8am: agua coco + almendras + platano',
  'Barrita Kirkland o scoop HABITS antes del gym (10am) — no entrar en vacio',
  'Creatina 5g + Colageno Vital Proteins post-gym',
  'Desayuno real 12:30pm: smoothie de la nutriologa',
  'Comida familiar con proteina (~3pm)',
  'Cena: proteina + verdura o batido HABITS',
];

const DESAYUNOS_MIE = [
  'Desayuno rapido 7am: yogurt coco + fruta',
  'Pre-baile 8am: agua coco + almendras + platano',
  'Post-baile 11am: scoop HABITS + fruta',
  'Comida familiar con proteina',
  'Cena: proteina + verdura o batido HABITS',
];

const RITUAL_NORMAL = [
  'Aplicar Somatoline o Clarins Body Fit con masaje ascendente en piernas y gluteo (2 min)',
  'Piernas en la pared — legs up the wall (2 min)',
  'Foam roller zona banana roll (1 min)',
];

const RITUAL_MARTES = [
  'Aplicar Clarins Body Fit solamente — NO Somatoline dia de shockwave (2 min)',
  'Piernas en la pared (2 min)',
  'Foam roller zona banana roll (1 min)',
];

export type DayPlan = Record<SectionKey, string[]>;

export const DAY_PLANS: DayPlan[] = [
  // Lunes
  {
    des: DESAYUNOS_LARGO,
    eje: [
      'Baile 8:30–9:30am (1 hora de clase)',
      'Gym 10:00–12:00am con entrenadora — gluteo y pierna pesado',
      'Uso de medias de compresion',
    ],
    spa: ['Radiofrecuencia 5–7pm', 'Drenaje linfatico 5–7pm'],
    noc: RITUAL_NORMAL,
  },
  // Martes
  {
    des: DESAYUNOS_LARGO,
    eje: [
      'Gym 9:30–11:40am con entrenadora — femoral y anticelulitico',
      'Uso de medias de compresion',
    ],
    spa: ['Shockwave 5–7pm', 'Drenaje linfatico 5–7pm'],
    noc: RITUAL_MARTES,
  },
  // Miercoles
  {
    des: DESAYUNOS_MIE,
    eje: [
      'Baile 8:30–9:30am: primera clase (1h)',
      'Baile 9:30–11:00am: segunda clase (1.5h) — 2.5 horas total',
      'Uso de medias de compresion',
    ],
    spa: ['Presoterapia en casa 20–30 min (tarde)'],
    noc: RITUAL_NORMAL,
  },
  // Jueves
  {
    des: DESAYUNOS_LARGO,
    eje: [
      'Gym 9:30–11:40am con entrenadora — gluteo medio y brazos',
      'Uso de medias de compresion',
    ],
    spa: ['Drenaje linfatico 3–5pm'],
    noc: RITUAL_NORMAL,
  },
  // Viernes
  {
    des: DESAYUNOS_LARGO,
    eje: [
      'Gym 9:30–11:40am con entrenadora — gluteo pesado y femoral (si puede)',
      'Uso de medias de compresion',
    ],
    spa: ['Drenaje linfatico 1–3pm', 'Presoterapia 1–3pm'],
    noc: RITUAL_NORMAL,
  },
];

export const totalItemsForDay = (dayIdx: number): number => {
  const p = DAY_PLANS[dayIdx];
  return p.des.length + p.eje.length + p.spa.length + p.noc.length;
};

export const MEASUREMENT_FIELDS: {
  key: keyof import('../lib/supabase').WeeklyMeasurement;
  label: string;
  unit: string;
  group: 'bascula' | 'cinta' | 'subjetiva';
  note?: string;
  min?: number;
  max?: number;
  step?: number;
}[] = [
  { key: 'peso', label: 'Peso', unit: 'kg', group: 'bascula', step: 0.1 },
  { key: 'musculo', label: 'Masa muscular', unit: 'kg', group: 'bascula', step: 0.1 },
  { key: 'grasa', label: 'Grasa corporal', unit: '%', group: 'bascula', step: 0.1 },
  { key: 'cintura', label: 'Cintura', unit: 'cm', group: 'cinta', note: 'Parte mas estrecha', step: 0.1 },
  { key: 'cadera_alta', label: 'Cadera alta', unit: 'cm', group: 'cinta', note: 'Justo arriba del gluteo', step: 0.1 },
  { key: 'gluteo_medio', label: 'Gluteo prominente', unit: 'cm', group: 'cinta', note: 'Parte mas saliente', step: 0.1 },
  { key: 'gluteo_bajo', label: 'Gluteo bajo / pliegue', unit: 'cm', group: 'cinta', note: 'Donde inicia el gluteo', step: 0.1 },
  { key: 'muslo_alto', label: 'Muslo alto', unit: 'cm', group: 'cinta', note: '5–7 cm debajo del pliegue', step: 0.1 },
  { key: 'muslo_medio', label: 'Muslo medio', unit: 'cm', group: 'cinta', note: 'Mitad del muslo', step: 0.1 },
  { key: 'muslo_bajo', label: 'Muslo bajo (5cm arriba rodilla)', unit: 'cm', group: 'cinta', note: 'NUEVA medida clave', step: 0.1 },
  { key: 'pantorrilla', label: 'Pantorrilla', unit: 'cm', group: 'cinta', note: 'Parte mas ancha', step: 0.1 },
  { key: 'sensacion_piernas', label: 'Sensacion piernas', unit: '1–5', group: 'subjetiva', note: '1 muy ligeras / 5 muy pesadas', min: 1, max: 5, step: 0.5 },
  { key: 'celulitis', label: 'Celulitis visible', unit: '1–5', group: 'subjetiva', note: '1 casi no visible / 5 muy visible', min: 1, max: 5, step: 0.5 },
];
